//import the User model
import { Artist } from "../../models/artist.js";
import assert from "assert";

describe("Creating <Artist> documents in MongoDB", () => {
  it("Creates a New Artist", (done) => {
    const newArtist = new Artist({ name: "Pepito", userId: 1 });
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
    let newArtist = new Artist({ name: "Pepito", userId: 1 });
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
