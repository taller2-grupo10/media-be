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
});
