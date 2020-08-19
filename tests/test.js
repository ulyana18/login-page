let assert = require('assert');
const { expect } = require('chai');
describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});

describe('Array', function () {
    describe('#indexOf()', function () {
      it('should return -1 when the value is not present', function () {
        expect([1, 2, 3].indexOf(5)).to.equal(-1);
        expect([1, 2, 3].indexOf(1)).to.equal(-1);
      });
    });
  });