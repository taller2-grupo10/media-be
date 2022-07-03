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

  // find all artist's playlists
  let allPlaylists = await Playlist.find({
    $or: [{ owner: artistId }, { collaborators: artistId }],
    isDeleted: false,
    isActive: true,
  })
    .limit(15)
    .populate("songs", null, {
      $and: [
        { isDeleted: false },
        { isActive: true },
        { subscriptionLevel: subscriptionLevelQuery },
      ],
    });

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

  res.status(200).send({
    songs: allSongs,
    playlists: allPlaylists,
    albums: allAlbums,
  });
};

export { homeData };
