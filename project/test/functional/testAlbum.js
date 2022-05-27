import { Album } from "../../models/album.js";
import chai from "chai";
import chaiHttp from "chai-http";
import { beforeEach, describe, it } from "mocha";
import { testUrl } from "../testHelper.js";
import { Artist } from "../../models/artist.js";

const expect = chai.expect;
chai.use(chaiHttp);

describe("Albums tests (removes all albums before each test)", () => {
  beforeEach((done) => {
    Album.deleteMany({}, (err) => {
      done();
    });
  });

  describe("Create Album with controller", () => {
    // TODO: test that the album is created (with files)
  });

  describe("Update album with controller", () => {
    it("Updates an existing Album OK", (done) => {
      const artist = new Artist({ name: "Pepito", uid: 1 });
      artist.save().then(() => {
        const album = new Album({
          title: "Album Pepito",
          artist: { artist: artist._id, name: artist.name },
        });
        album.save().then(() => {
          chai
            .request(testUrl)
            .put(`/albums/${album._id}`)
            .send({ title: "Album 1" })
            .end((err, res) => {
              if (err) done(err);
              expect(res.status).to.equal(200);
              expect(res.body.title).to.equal("Album 1");
              done();
            });
        });
      });
    });

    it("Updates a non existing Album raises Error 400", (done) => {
      const artist = new Artist({ name: "Pepito", uid: 1 });
      artist.save().then(() => {
        const album = new Album({
          title: "Album Pepito",
          artist: { artist: artist._id, name: artist.name },
        });
        album.save().then(() => {
          chai
            .request(testUrl)
            .put(`/albums/1`)
            .send({ title: "Album 1" })
            .end((err, res) => {
              if (err) done(err);
              expect(res.status).to.equal(400);
              done();
            });
        });
      });
    });
  });

  describe("Album get by artist id", () => {
    it("Get albums by artist id OK", (done) => {
      const artist = new Artist({ name: "Pepito", uid: 1 });
      artist.save().then(() => {
        const album = new Album({
          title: "Album Pepito",
          artist: { artist: artist._id, name: artist.name },
        });
        album.save().then(() => {
          chai
            .request(testUrl)
            .get(`/albums/artistId/${artist._id}`)
            .end((err, res) => {
              if (err) done(err);
              expect(res.status).to.equal(200);
              expect(res.body[0].title).to.equal("Album Pepito");
              expect(res.body[0].artist.name).to.equal("Pepito");
              done();
            });
        });
      });
    });

    it("Get albums by artist id with invalid id returns status 400", (done) => {
      const artist = new Artist({ name: "Pepito", uid: 1 });
      artist.save().then(() => {
        const album = new Album({
          title: "Album Pepito",
          artist: { artist: artist._id, name: artist.name },
        });
        album.save().then(() => {
          chai
            .request(testUrl)
            .get(`/albums/artistId/1`)
            .end((err, res) => {
              if (err) done(err);
              expect(res.status).to.equal(400);
              done();
            });
        });
      });
    });
  });

  /*
  describe("album get by name", () => {
    it("Get albums by name OK", (done) => {
      const artist = new Artist({ name: "Pepito", uid: 1 });
      artist.save().then(() => {
        const album = new Album({
          title: "Album Pepito",
          artist: { artist: artist._id, name: artist.name },
        });
        album.save().then(() => {
          chai
            .request(testUrl)
            .get(`/albums/name/${album.title}`)
            .end((err, res) => {
              if (err) done(err);
              expect(res.status).to.equal(200);
              expect(res.body[0].title).to.equal("Album Pepito");
              expect(res.body[0].artist.name).to.equal("Pepito");
              done();
            });
        });
      });
    });

    it("Get albums by name with invalid name returns status 400", (done) => {
      const artist = new Artist({ name: "Pepito", uid: 1 });
      artist.save().then(() => {
        const album = new Album({
          title: "Album Pepito",
          artist: { artist: artist._id, name: artist.name },
        });
        album.save().then(() => {
          chai
            .request(testUrl)
            .get(`/albums/name/Album`)
            .end((err, res) => {
              if (err) done(err);
              expect(res.status).to.equal(400);
              done();
            });
        });
      });
    });
  });
  */

  describe("Album get by id", () => {
    it("Get album by id OK", (done) => {
      const artist = new Artist({ name: "Pepito", uid: 1 });
      artist.save().then(() => {
        const album = new Album({
          title: "Album Pepito",
          artist: { artist: artist._id, name: artist.name },
        });
        album.save().then(() => {
          chai
            .request(testUrl)
            .get(`/albums/${album._id}`)
            .end((err, res) => {
              if (err) done(err);
              expect(res.status).to.equal(200);
              expect(res.body.title).to.equal("Album Pepito");
              expect(res.body.artist.name).to.equal("Pepito");
              done();
            });
        });
      });
    });

    it("Get album by id with invalid id returns status 400", (done) => {
      const artist = new Artist({ name: "Pepito", uid: 1 });
      artist.save().then(() => {
        const album = new Album({
          title: "Album Pepito",
          artist: { artist: artist._id, name: artist.name },
        });
        album.save().then(() => {
          chai
            .request(testUrl)
            .get(`/albums/1`)
            .end((err, res) => {
              if (err) done(err);
              expect(res.status).to.equal(400);
              done();
            });
        });
      });
    });
  });

  describe("Album get all", () => {
    it("Get all albums OK", (done) => {
      const artist = new Artist({ name: "Pepito", uid: 1 });
      artist.save().then(() => {
        const album = new Album({
          title: "Album Pepito",
          artist: { artist: artist._id, name: artist.name },
        });
        album.save().then(() => {
          const album2 = new Album({
            title: "Album Pepito 2",
            artist: { artist: artist._id, name: artist.name },
          });
          album2.save().then(() => {
            chai
              .request(testUrl)
              .get(`/albums`)
              .end((err, res) => {
                if (err) done(err);
                expect(res.status).to.equal(200);
                expect(res.body[0].title).to.equal("Album Pepito");
                expect(res.body[0].artist.name).to.equal("Pepito");
                expect(res.body).to.have.lengthOf(2);
                done();
              });
          });
        });
      });
    });

    it("Get all albums with no saved albums returns empty list", (done) => {
      chai
        .request(testUrl)
        .get(`/albums`)
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).to.equal(200);
          expect(res.body).to.have.lengthOf(0);
          done();
        });
    });
  });

  describe("Get album by genre", () => {
    it("Get album by genre OK", (done) => {
      const artist = new Artist({ name: "Pepito", uid: 1 });
      artist.save().then(() => {
        const album = new Album({
          title: "Album Pepito",
          artist: { artist: artist._id, name: artist.name },
          genres: ["Rock"],
        });
        album.save().then(() => {
          chai
            .request(testUrl)
            .get(`/albums/genre/Rock`)
            .end((err, res) => {
              if (err) done(err);
              expect(res.status).to.equal(200);
              expect(res.body[0].title).to.equal("Album Pepito");
              expect(res.body[0].artist.name).to.equal("Pepito");
              done();
            });
        });
      });
    });

    it("Get album by genre with no matching genre returns empty list", (done) => {
      const artist = new Artist({ name: "Pepito", uid: 1 });
      artist.save().then(() => {
        const album = new Album({
          title: "Album Pepito",
          artist: { artist: artist._id, name: artist.name },
          genres: ["Rock"],
        });
        album.save().then(() => {
          chai
            .request(testUrl)
            .get(`/albums/genre/Pop`)
            .end((err, res) => {
              if (err) done(err);
              expect(res.status).to.equal(200);
              expect(res.body).to.have.lengthOf(0);
              done();
            });
        });
      });
    });
  });
});
