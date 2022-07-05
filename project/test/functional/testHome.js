import chai from "chai";
import chaiHttp from "chai-http";
import { beforeEach, describe, it } from "mocha";
import { Album } from "../../models/album.js";
import { Artist } from "../../models/artist.js";
import { Playlist } from "../../models/playlist.js";
import { Song } from "../../models/song.js";
import { testUrl } from "../testHelper.js";

const expect = chai.expect;
chai.use(chaiHttp);

describe("Artist tests (removes all artists before each test)", () => {
  beforeEach((done) => {
    Artist.deleteMany({}, (err) => {
      Album.deleteMany({}, (err) => {
        Song.deleteMany({}, (err) => {
          Playlist.deleteMany({}, (err) => {
            done();
          });
        });
      });
    });
  });

  describe("Home endpoint", () => {
    it("Should return all random data", (done) => {
      const artist = new Artist({ name: "Pepito", uid: 1 });
      artist.save().then(() => {
        const album = new Album({
          title: "Album Pepito",
          artist: { artist: artist._id, name: artist.name },
        });
        album.save().then(() => {
          const song = new Song({
            title: "Song Pepito",
            artists: { artist: artist._id, name: artist.name },
            album: { album: album._id, name: album.title },
            url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          });
          song.save().then(() => {
            const playlist = new Playlist({
              title: "Playlist Pepito",
              description: "Playlist Pepito",
              owner: artist._id,
              songs: [song._id],
            });
            playlist.save().then(() => {
              chai
                .request(testUrl)
                .get(`/home/${artist._id}`)
                .end((err, res) => {
                  if (err) done(err);
                  expect(res.status).to.equal(200);
                  console.log("res.body", res.body);
                  expect(res.body.songs).to.have.lengthOf(1);
                  expect(res.body.albums).to.have.lengthOf(1);
                  expect(res.body.playlists).to.have.lengthOf(1);
                  done();
                });
            });
          });
        });
      });
    });

    it("Should return genre data", (done) => {
      const artist = new Artist({ name: "Pepito", uid: 1, genres: ["Rock"] });
      artist.save().then(() => {
        const album = new Album({
          title: "Album Pepito",
          artist: { artist: artist._id, name: artist.name },
          genres: ["Rock"],
        });
        album.save().then(() => {
          const song = new Song({
            title: "Song Pepito",
            artists: { artist: artist._id, name: artist.name },
            album: { album: album._id, name: album.title },
            url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            genres: ["Rock"],
          });
          song.save().then(() => {
            const playlist = new Playlist({
              title: "Playlist Pepito",
              description: "Playlist Pepito",
              owner: artist._id,
              songs: [song._id],
            });
            playlist.save().then(() => {
              chai
                .request(testUrl)
                .get(`/home/${artist._id}?subscriptionLevel=0`)
                .end((err, res) => {
                  if (err) done(err);
                  expect(res.status).to.equal(200);
                  console.log("res.body", res.body);
                  expect(res.body.songs).to.have.lengthOf(1);
                  expect(res.body.albums).to.have.lengthOf(1);
                  expect(res.body.playlists).to.have.lengthOf(1);
                  done();
                });
            });
          });
        });
      });
    });

    it("Should return location data", (done) => {
      const artist = new Artist({ name: "Pepito", uid: 1, location: "Europe" });
      artist.save().then(() => {
        const album = new Album({
          title: "Album Pepito",
          artist: { artist: artist._id, name: artist.name },
          location: "Europe",
        });
        album.save().then(() => {
          const song = new Song({
            title: "Song Pepito",
            artists: { artist: artist._id, name: artist.name },
            album: { album: album._id, name: album.title },
            url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            location: "Europe",
          });
          song.save().then(() => {
            const playlist = new Playlist({
              title: "Playlist Pepito",
              description: "Playlist Pepito",
              owner: artist._id,
              songs: [song._id],
            });
            playlist.save().then(() => {
              chai
                .request(testUrl)
                .get(`/home/${artist._id}?subscriptionLevel=0`)
                .end((err, res) => {
                  if (err) done(err);
                  expect(res.status).to.equal(200);
                  expect(res.body.songs).to.have.lengthOf(1);
                  expect(res.body.albums).to.have.lengthOf(1);
                  expect(res.body.playlists).to.have.lengthOf(1);
                  done();
                });
            });
          });
        });
      });
    });
  });
});
