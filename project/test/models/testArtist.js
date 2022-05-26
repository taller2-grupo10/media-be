import { Artist } from "../../models/artist.js";
import assert from "assert";
import chai from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";
import { testUrl } from "../testHelper.js";

const expect = chai.expect;
chai.use(chaiHttp);

describe("Creating <Artist> documents in MongoDB", () => {
  it("Creates a New Artist", (done) => {
    const newArtist = new Artist({ name: "Pepito", uid: 1 });
    newArtist
      .save() // returns a promise after some time
      .then(() => {
        //if the newArtist is saved in db and it is not new
        assert(!newArtist.isNew);
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });
});

describe("Get Artist by name", () => {
  it("Retrieves the artist named Pepito", (done) => {
    let newArtist = new Artist({ name: "Pepito", uid: 1 });
    newArtist.save().then(() => {
      Artist.findOne({ name: "Pepito" })
        .then((artist) => {
          assert(artist.name === "Pepito");
          done();
        })
        .catch((err) => {
          console.log(err);
          done(err);
        });
    });
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
