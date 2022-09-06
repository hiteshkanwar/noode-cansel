var sinon = require("sinon");
var chai = require("chai");
var expect = chai.expect;

var mongoose = require("mongoose");
require("sinon-mongoose");

//Importing our todo model for our unit testing.
const Contact = require("../models/model");

describe("Post a new contact", function () {
  it("should create new contact", function (done) {
    var ContactMock = sinon.mock(
      new Contact({
        firstName: "test",
        lastName: "test",
        email: "test@gmail.com",
        message: "test",
      })
    );
    var contact = ContactMock.object;
    var expectedResult = { status: true };
    ContactMock.expects("save").yields(null, expectedResult);
    contact.save(function (err, result) {
      ContactMock.verify();
      ContactMock.restore();
      expect(result.status).to.be.true;
      done();
    });
  });

  //Test will pass if the contact is not saved
  it("should return error, if contact is  not saved", function (done) {
    var ContactMock = sinon.mock(
      new Contact({
        firstName: "test",
        lastName: "test",
        email: "test@gmail.com",
        message: "test",
      })
    );
    var contact = ContactMock.object;
    var expectedResult = { status: false };
    ContactMock.expects("save").yields(expectedResult, null);
    contact.save(function (err, result) {
      ContactMock.verify();
      ContactMock.restore();
      expect(err.status).to.not.be.true;
      done();
    });
  });
});
