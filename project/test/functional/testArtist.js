import chai from "chai";
import chaiHttp from "chai-http";
import { beforeEach, describe, it } from "mocha";
import { Artist } from "../../models/artist.js";
import { testUrl } from "../testHelper.js";

const expect = chai.expect;
chai.use(chaiHttp);

describe("Artist tests (removes all artists before each test)", () => {
  beforeEach((done) => {
    Artist.deleteMany({}, (err) => {
      done();
    });
  });

  describe("Create Artist with controller", () => {
    it("Creates a New Artist OK", (done) => {
      chai
        .request(testUrl)
        .post("/artists")
        .send({ name: "Pepito", uid: 1 })
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).to.equal(201);
          expect(res.body.name).to.equal("Pepito");
          done();
        });
    });

    it("Creates a New Artist raises Error: Body missing required parameter uid", (done) => {
      chai
        .request(testUrl)
        .post("/artists")
        .send({ name: "Pepito", notUid: 1 })
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal(
            "artists validation failed: uid: Path `uid` is required.",
          ); // maybe not test that specific message
          done();
        });
    });

    it("Creates a New Artist raises Error: Body missing required parameter name", (done) => {
      chai
        .request(testUrl)
        .post("/artists")
        .send({ uid: 1 })
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal(
            "artists validation failed: name: Path `name` is required.",
          ); // maybe not test that specific message
          done();
        });
    });
  });

  describe("Update Artist with controller", () => {
    it("Update an Artist OK", (done) => {
      chai
        .request(testUrl)
        .get("/artists")
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).to.equal(200);
          expect(res.body.length).to.equal(0);
          let newArtist = new Artist({ name: "Pepito", uid: 1 });
          newArtist.save().then(() => {
            chai
              .request(testUrl)
              .put(`/artists/${newArtist._id}`)
              .send({ name: "Juan" })
              .end((err, res) => {
                if (err) done(err);
                expect(res.status).to.equal(200);
                expect(res.body.name).to.equal("Juan");
                done();
              });
          });
        });
    });

    it("Update an Artist with invalid _id returns status 400", (done) => {
      let newArtist = new Artist({ name: "Pepito", uid: 1 });
      newArtist.save().then(() => {
        chai
          .request(testUrl)
          .put(`/artists/1`)
          .send({ notUid: 1 })
          .end((err, res) => {
            if (err) done(err);
            expect(res.status).to.equal(400);
            done();
          });
      });
    });
  });

  describe("Artist get by name", () => {
    it("Get Artist by name OK", (done) => {
      let newArtist = new Artist({ name: "Pepito", uid: 1 });
      newArtist.save().then(() => {
        chai
          .request(testUrl)
          .get(`/artists/name/${newArtist.name}`)
          .end((err, res) => {
            if (err) done(err);
            expect(res.status).to.equal(200);
            expect(res.body[0].name).to.equal("Pepito");
            expect(res.body[0].uid).to.equal("1");
            done();
          });
      });
    });

    it("Get Artist by name with no matching name returns empty list", (done) => {
      chai
        .request(testUrl)
        .get(`/artists/name/NotPepito`)
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).to.equal(200);
          expect(res.body).to.have.lengthOf(0);
          done();
        });
    });
  });

  describe("Artist get by id", () => {
    it("Get Artist by id OK", (done) => {
      let newArtist = new Artist({ name: "Pepito", uid: 1 });
      newArtist.save().then(() => {
        chai
          .request(testUrl)
          .get(`/artists/${newArtist._id}`)
          .end((err, res) => {
            if (err) done(err);
            expect(res.status).to.equal(200);
            expect(res.body.name).to.equal("Pepito");
            expect(res.body._id).to.equal(newArtist._id.toString());
            done();
          });
      });
    });

    it("Get Artist by id with no matching id returns status code 400", (done) => {
      chai
        .request(testUrl)
        .get(`/artists/1`)
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).to.equal(400);
          done();
        });
    });
  });

  describe("Artist get all", () => {
    it("Get All Artists OK", (done) => {
      let newArtist = new Artist({ name: "Pepito", uid: 1 });
      newArtist.save().then(() => {
        let newArtist2 = new Artist({ name: "Juan", uid: 2 });
        newArtist2.save().then(() => {
          chai
            .request(testUrl)
            .get("/artists")
            .end((err, res) => {
              if (err) done(err);
              expect(res.status).to.equal(200);
              expect(res.body).to.have.lengthOf(2);
              done();
            });
        });
      });
    });
  });
});
