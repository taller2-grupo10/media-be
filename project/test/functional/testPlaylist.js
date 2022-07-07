import { Album } from "../../models/album.js";
import chai from "chai";
import chaiHttp from "chai-http";
import { beforeEach, describe, it } from "mocha";
import { testUrl } from "../testHelper.js";
import { Artist } from "../../models/artist.js";
import { Song } from "../../models/song.js";
import { Playlist } from "../../models/playlist.js";

const expect = chai.expect;
chai.use(chaiHttp);

describe("Playlists tests (removes all playlists before each test)", () => {
  beforeEach((done) => {
    Playlist.deleteMany({}, (err) => {
      done();
    });
  });

  describe("Create Playlist with controller", () => {
    it("Creates a new Playlist OK", (done) => {
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
            chai
              .request(testUrl)
              .post(`/playlists`)
              .send({
                title: "Playlist Pepito",
                description: "Playlist Pepito",
                owner: artist._id,
                songs: [song._id],
              })
              .end((err, res) => {
                if (err) done(err);
                expect(res.status).to.equal(201);
                expect(res.body.title).to.equal("Playlist Pepito");
                expect(res.body.songs).to.have.lengthOf(1);
                done();
              });
          });
        });
      });
    });

    it("Creates a new Playlist with no songs OK", (done) => {
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
            chai
              .request(testUrl)
              .post(`/playlists`)
              .send({
                title: "Playlist Pepito",
                description: "Playlist Pepito",
                owner: artist._id,
              })
              .end((err, res) => {
                if (err) done(err);
                expect(res.status).to.equal(201);
                expect(res.body.title).to.equal("Playlist Pepito");
                expect(res.body.songs).to.have.lengthOf(0);
                done();
              });
          });
        });
      });
    });

    it("Creates a new Playlist with no title raises error 400", (done) => {
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
            chai
              .request(testUrl)
              .post(`/playlists`)
              .send({
                description: "Playlist Pepito",
                owner: artist._id,
                songs: [song._id],
              })
              .end((err, res) => {
                if (err) done(err);
                expect(res.status).to.equal(400);
                expect(res.body.message).to.equal(
                  "playlists validation failed: title: Path `title` is required.",
                );
                done();
              });
          });
        });
      });
    });
  });

  describe("Get by id Playlist with controller", () => {
    it("Get Playlist OK", (done) => {
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
                .get(`/playlists/${playlist._id}`)
                .end((err, res) => {
                  if (err) done(err);
                  expect(res.status).to.equal(200);
                  expect(res.body.title).to.equal("Playlist Pepito");
                  expect(res.body.songs).to.have.lengthOf(1);
                  done();
                });
            });
          });
        });
      });
    });

    it("Get Playlist with invalid id raises error 400", (done) => {
      chai
        .request(testUrl)
        .get(`/playlists/123`)
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).to.equal(400);
          done();
        });
    });
  });

  describe("Get by userId Playlist with controller", () => {
    it("Get Playlist OK", (done) => {
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
                .get(`/playlists/userId/${artist._id}`)
                .end((err, res) => {
                  if (err) done(err);
                  expect(res.status).to.equal(200);
                  expect(res.body).to.have.lengthOf(1);
                  expect(res.body[0].title).to.equal("Playlist Pepito");
                  expect(res.body[0].songs).to.have.lengthOf(1);
                  done();
                });
            });
          });
        });
      });
    });
  });

  describe("Update Playlist with controller", () => {
    it("Update Playlist OK", (done) => {
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
            const song2 = new Song({
              title: "Song Pepito 2",
              artists: { artist: artist._id, name: artist.name },
              album: { album: album._id, name: album.title },
              url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            });
            song2.save().then(() => {
              const playlist = new Playlist({
                title: "Playlist Pepito",
                description: "Playlist Pepito",
                owner: artist._id,
                songs: [song._id],
              });
              playlist.save().then(() => {
                chai
                  .request(testUrl)
                  .put(`/playlists/${playlist._id}`)
                  .send({
                    title: "Playlist Pepito Updated",
                    songs: [song._id, song2._id],
                  })
                  .end((err, res) => {
                    if (err) done(err);
                    expect(res.status).to.equal(200);
                    expect(res.body.title).to.equal("Playlist Pepito Updated");
                    expect(res.body.songs).to.have.lengthOf(2);
                    done();
                  });
              });
            });
          });
        });
      });
    });

    it("Update Playlist with invalid id raises error 400", (done) => {
      chai
        .request(testUrl)
        .put(`/playlists/123`)
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).to.equal(400);
          done();
        });
    });
  });

  describe("Playlists get all", () => {
    it("Should return all playlists", (done) => {
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
                .get(`/playlists`)
                .end((err, res) => {
                  if (err) done(err);
                  expect(res.status).to.equal(200);
                  expect(res.body).to.have.lengthOf(1);
                  expect(res.body[0].title).to.equal("Playlist Pepito");
                  expect(res.body[0].songs).to.have.lengthOf(1);
                  done();
                });
            });
          });
        });
      });
    });

    it("Should return all deleted playlists", (done) => {
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
              isDeleted: true,
            });
            playlist.save().then(() => {
              chai
                .request(testUrl)
                .get(`/playlists/noFilter/all`)
                .end((err, res) => {
                  if (err) done(err);
                  expect(res.status).to.equal(200);
                  expect(res.body).to.have.lengthOf(1);
                  expect(res.body[0].title).to.equal("Playlist Pepito");
                  expect(res.body[0].songs).to.have.lengthOf(1);
                  done();
                });
            });
          });
        });
      });
    });

    it("Should return all inactive playlists", (done) => {
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
              isActive: false,
            });
            playlist.save().then(() => {
              chai
                .request(testUrl)
                .get(`/playlists/noFilter/all`)
                .end((err, res) => {
                  if (err) done(err);
                  expect(res.status).to.equal(200);
                  expect(res.body).to.have.lengthOf(1);
                  expect(res.body[0].title).to.equal("Playlist Pepito");
                  expect(res.body[0].songs).to.have.lengthOf(1);
                  done();
                });
            });
          });
        });
      });
    });
  });
});
