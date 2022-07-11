import chai from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";
import musicGenres from "../../helpers/musicGenres.js";
import { testUrl } from "../testHelper.js";

const expect = chai.expect;
chai.use(chaiHttp);

describe("Genres endpoint test", () => {
  it("should return all genres", (done) => {
    chai
      .request(testUrl)
      .get("/genres")
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(JSON.stringify(res.body)).to.equal(JSON.stringify(musicGenres));
        expect(res.body).to.have.lengthOf(musicGenres.length);
        done();
      });
  });
});
