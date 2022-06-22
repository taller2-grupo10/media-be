import chai from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";
import worldLocations from "../../helpers/worldLocations.js";
import { testUrl } from "../testHelper.js";

const expect = chai.expect;
chai.use(chaiHttp);

describe("Locations tests", () => {
  it("should return all locations", (done) => {
    chai
      .request(testUrl)
      .get("/locations")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        expect(res.body).to.have.lengthOf(worldLocations.length);
        done();
      });
  });
});
