import { Album } from "../models/album.js";
import { Artist } from "../models/artist.js";
import { Playlist } from "../models/playlist.js";
import { Song } from "../models/song.js";

const homeData = async (req, res) => {
  let artistId = req.params.id;
  let subscriptionLevelQuery = req.query.subscriptionLevel
    ? { $lte: +req.query.subscriptionLevel }
    : { $lte: 0 };
  const artist = await Artist.findById(artistId);

  // iterate all artist's genres and find all songs with that genre
  var allSongs = [];
  for (let i = 0; i < artist.genres.length; i++) {
    let genre = artist.genres[i];
    let songsByGenre = await Song.find({
      $and: [
        { genres: genre },
        { isDeleted: false },
        { isActive: true },
        { subscriptionLevel: subscriptionLevelQuery },
      ],
    });
    allSongs = [...allSongs, ...songsByGenre];
  }

  // find all songs with the artist's location
  let songsByLocation = await Song.find({
    $and: [
      { location: artist.location },
      { isDeleted: false },
      { isActive: true },
      { subscriptionLevel: subscriptionLevelQuery },
    ],
  });
  allSongs = [...allSongs, ...songsByLocation];

  // if no songs found, pick random songs
  if (allSongs.length === 0) {
    let randomSongs = await Song.find({
      $and: [
        { isDeleted: false },
        { isActive: true },
        { subscriptionLevel: subscriptionLevelQuery },
      ],
    }).limit(15);
    allSongs = [...allSongs, ...randomSongs];
  }

  let allPlaylists = [];
  // find all playlists
  for (let i = 0; i < artist.genres.length; i++) {
    let artistGenre = artist.genres[i];
    let result = await Playlist.find({
      $and: [{ isDeleted: false, isActive: true }],
    }).populate("songs", null, {
      $and: [
        { isDeleted: false },
        { isActive: true },
        { subscriptionLevel: subscriptionLevelQuery },
      ],
    });
    //filter all playlists that don't have songs with genre = artistGenre or location = artist.location
    result = result.filter((playlist) => {
      for (let i = 0; i < playlist.songs.length; i++) {
        let song = playlist.songs[i];
        if (
          song.genres.includes(artistGenre) ||
          song.location === artist.location
        )
          return true;
      }
      return false;
    });
    allPlaylists = [...allPlaylists, ...result];
  }

  // if no playlists found, pick random playlists
  if (allPlaylists.length === 0) {
    let randomPlaylists = await Playlist.find({
      $and: [{ isDeleted: false, isActive: true }],
    })
      .populate("songs", null, {
        $and: [
          { isDeleted: false },
          { isActive: true },
          { subscriptionLevel: subscriptionLevelQuery },
        ],
      })
      .limit(15);
    allPlaylists = [...allPlaylists, ...randomPlaylists];
  }

  // iterate all artist's genres and find all albums with that genre
  let allAlbums = [];
  for (let i = 0; i < artist.genres.length; i++) {
    let genre = artist.genres[i];
    let albumsByGenre = await Album.find({
      $and: [
        { genres: genre },
        { isDeleted: false },
        { isActive: true },
        { subscriptionLevel: subscriptionLevelQuery },
      ],
    });
    allAlbums = [...allAlbums, ...albumsByGenre];
  }

  // if no albums found pick randomly from all albums
  if (allAlbums.length === 0) {
    let allOtherAlbums = await Album.find({
      $and: [
        { isDeleted: false },
        { isActive: true },
        { subscriptionLevel: subscriptionLevelQuery },
      ],
    }).limit(15);
    allAlbums = [...allAlbums, ...allOtherAlbums];
  }

  // Send filtering duplicates
  res.status(200).send({
    songs: [...new Map(allSongs.map((v) => [JSON.stringify(v), v])).values()],
    playlists: [
      ...new Map(allPlaylists.map((v) => [JSON.stringify(v), v])).values(),
    ],
    albums: [...new Map(allAlbums.map((v) => [JSON.stringify(v), v])).values()],
  });
};

export { homeData };
