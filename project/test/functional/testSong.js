import { Album } from "../../models/album.js";
import chai from "chai";
import chaiHttp from "chai-http";
import { beforeEach, describe, it } from "mocha";
import { testUrl } from "../testHelper.js";
import { Artist } from "../../models/artist.js";
import { Song } from "../../models/song.js";

const expect = chai.expect;
chai.use(chaiHttp);

describe("Songs tests (removes all songs before each test)", () => {
  beforeEach((done) => {
    Song.deleteMany({}, (err) => {
      done();
    });
  });

  describe("Create Song with controller", () => {
    // TODO: test that the song is created (with files)
  });

  describe("Update song with controller", () => {
    it("Updates an existing Song OK", (done) => {
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
              .put(`/songs/${song._id}`)
              .send({ title: "Song 1" })
              .end((err, res) => {
                if (err) done(err);
                expect(res.status).to.equal(200);
                expect(res.body.title).to.equal("Song 1");
                done();
              });
          });
        });
      });
    });

    it("Updates a non existing Song raises Error 400", (done) => {
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
              .put(`/songs/1`)
              .send({ title: "Song 1" })
              .end((err, res) => {
                if (err) done(err);
                expect(res.status).to.equal(400);
                done();
              });
          });
        });
      });
    });
  });

  describe("Get by artist id", () => {
    it("Get songs by artist id OK", (done) => {
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
              .get(`/songs/artistId/${artist._id}`)
              .end((err, res) => {
                if (err) done(err);
                expect(res.status).to.equal(200);
                expect(res.body.length).to.equal(1);
                done();
              });
          });
        });
      });
    });

    it("Get songs by artist id with no songs returns empty array", (done) => {
      const artist = new Artist({ name: "Pepito", uid: 1 });
      artist.save().then(() => {
        chai
          .request(testUrl)
          .get(`/songs/artistId/${artist._id}`)
          .end((err, res) => {
            if (err) done(err);
            expect(res.status).to.equal(200);
            expect(res.body.length).to.equal(0);
            done();
          });
      });
    });

    it("Get songs by artist id with no artist raises error 400", (done) => {
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
              .get(`/songs/artistId/1`)
              .end((err, res) => {
                if (err) done(err);
                expect(res.status).to.equal(400);
                done();
              });
          });
        });
      });
    });
  });

  describe("Get by album id", () => {
    it("Get songs by album id OK", (done) => {
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
              .get(`/songs/albumId/${album._id}`)
              .end((err, res) => {
                if (err) done(err);
                expect(res.status).to.equal(200);
                expect(res.body.length).to.equal(1);
                done();
              });
          });
        });
      });
    });

    it("Get songs by album id with no songs returns empty array", (done) => {
      const artist = new Artist({ name: "Pepito", uid: 1 });
      artist.save().then(() => {
        const album = new Album({
          title: "Album Pepito",
          artist: { artist: artist._id, name: artist.name },
        });
        album.save().then(() => {
          chai
            .request(testUrl)
            .get(`/songs/albumId/${album._id}`)
            .end((err, res) => {
              if (err) done(err);
              expect(res.status).to.equal(200);
              expect(res.body.length).to.equal(0);
              done();
            });
        });
      });
    });

    it("Get songs by album id with no album raises error 400", (done) => {
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
              .get(`/songs/albumId/1`)
              .end((err, res) => {
                if (err) done(err);
                expect(res.status).to.equal(400);
                done();
              });
          });
        });
      });
    });
  });

  describe("Get by name", () => {
    it("Get songs by name OK", (done) => {
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
              .get(`/songs/name/${song.title}`)
              .end((err, res) => {
                if (err) done(err);
                expect(res.status).to.equal(200);
                expect(res.body.length).to.equal(1);
                done();
              });
          });
        });
      });
    });

    it("Get songs by name with no songs returns empty array", (done) => {
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
              .get(`/songs/name/Not song`)
              .end((err, res) => {
                if (err) done(err);
                expect(res.status).to.equal(200);
                expect(res.body.length).to.equal(0);
                done();
              });
          });
        });
      });
    });
  });

  describe("Get by id", () => {
    it("Get song by id OK", (done) => {
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
              .get(`/songs/${song._id}`)
              .end((err, res) => {
                if (err) done(err);
                expect(res.status).to.equal(200);
                expect(res.body.title).to.equal(song.title);
                done();
              });
          });
        });
      });
    });

    it("Get song by id with no song raises error 400", (done) => {
      chai
        .request(testUrl)
        .get(`/songs/1`)
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).to.equal(400);
          done();
        });
    });
  });

  describe("Get all songs", () => {
    it("Get all songs OK", (done) => {
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
              .get(`/songs`)
              .end((err, res) => {
                if (err) done(err);
                expect(res.status).to.equal(200);
                expect(res.body.length).to.equal(1);
                done();
              });
          });
        });
      });
    });

    it("Get all songs with no songs returns empty array", (done) => {
      chai
        .request(testUrl)
        .get(`/songs`)
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).to.equal(200);
          expect(res.body.length).to.equal(0);
          done();
        });
    });
  });

  describe("Get by genre", () => {
    it("Get songs by genre OK", (done) => {
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
            genres: ["Rock"],
          });
          song.save().then(() => {
            chai
              .request(testUrl)
              .get(`/songs/genre/Rock`)
              .end((err, res) => {
                if (err) done(err);
                expect(res.status).to.equal(200);
                expect(res.body.length).to.equal(1);
                done();
              });
          });
        });
      });
    });

    it("Get songs by genre with no songs returns empty array", (done) => {
      chai
        .request(testUrl)
        .get(`/songs/genre/Pop`)
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).to.equal(200);
          expect(res.body.length).to.equal(0);
          done();
        });
    });
  });
});
