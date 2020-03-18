const assert = require('assert');
const { Validator, RuleSet } = require('../dist');
const { isString } = require('../dist/rules');

const schema = new Validator({
  name: RuleSet.create([new isString()]),
  username: RuleSet.create([new isString()]),
  email: RuleSet.create([new isString()]),
  password: RuleSet.create([new isString()]),
});

describe('isString', () => {
  describe('With null, undefined, object and array', () => {
    let result;
    before(() => {
      result = schema.validate({
        name: null,
        username: undefined,
        email: {},
        password: [],
      });
    });

    it('Should return error', () => {
      assert.equal(typeof result, 'object');
    });

    it('Should return error on null', () => {
      const errorArray = result.name;
      assert.equal(Array.isArray(errorArray), true);
      assert.equal(errorArray.length, 1);
      assert.equal(typeof errorArray[0], 'object');
      assert.equal(errorArray[0].validator, 'isString');
      assert.equal(errorArray[0].value, null);
    });

    it('Should return error on undefined', () => {
      const errorArray = result.username;
      assert.equal(Array.isArray(errorArray), true);
      assert.equal(errorArray.length, 1);
      assert.equal(typeof errorArray[0], 'object');
      assert.equal(errorArray[0].validator, 'isString');
      assert.equal(errorArray[0].value, undefined);
    });

    it('Should return error on object', () => {
      const errorArray = result.email;
      assert.equal(Array.isArray(errorArray), true);
      assert.equal(errorArray.length, 1);
      assert.equal(typeof errorArray[0], 'object');
      assert.equal(errorArray[0].validator, 'isString');
      assert.deepEqual(errorArray[0].value, {});
    });

    it('Should return error on array', () => {
      const errorArray = result.password;
      assert.equal(Array.isArray(errorArray), true);
      assert.equal(errorArray.length, 1);
      assert.equal(typeof errorArray[0], 'object');
      assert.equal(errorArray[0].validator, 'isString');
      assert.deepEqual(errorArray[0].value, []);
    });
  });

  describe('With strings', () => {
    let result;
    before(() => {
      result = schema.validate({
        name: '',
        username: '',
        email: '',
        password: '',
      });
    });

    it('Should not return error', () => {
      assert.equal(result, null);
    });
  });
});
