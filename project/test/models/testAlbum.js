import { Album } from "../../models/album.js";
import assert from "assert";

describe("Creating <Album> documents in MongoDB", () => {
  it("Creates a New Album", (done) => {
    const newAlbum = new Album({ title: "Test Album", artist: {} });
    newAlbum
      .save() // returns a promise after some time
      .then(() => {
        //if the newAlbum is saved in db and it is not new
        assert(!newAlbum.isNew);
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });
});

describe("Get Album by name", () => {
  it("Retrieves the Album named Pepito", (done) => {
    let newAlbum = new Album({ title: "Pepito", artist: {} });
    newAlbum.save().then(() => {
      Album.findOne({ title: "Pepito" })
        .then((album) => {
          assert(album.title === "Pepito");
          done();
        })
        .catch((err) => {
          console.log(err);
          done(err);
        });
    });
  });
});
