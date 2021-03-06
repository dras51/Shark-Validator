const assert = require('assert');
const { Validator, RuleSet, isString } = require('../lib');

const schema = new Validator({

  name: RuleSet.create([isString()]),
  username: RuleSet.create([isString()]),
  email: RuleSet.create([isString()]),
  password: RuleSet.create([isString()]),
  confirmPassword: RuleSet.create(
    [isString({ message: '%name% should be a string.' })],
    'Confirm password',
  ),
});

/**
 * @test {IsString}
 */
describe('01. IsString', () => {
  describe('With null, undefined, object and array', () => {
    let result;
    before(() => {
      const data = schema.validate({
        name: null,
        username: undefined,
        email: {},
        password: [],
        confirmPassword: null,
      });
      result = data.errors;
    });

    it('Should return error', () => {
      assert.equal(typeof result, 'object');
      assert.notEqual(result, null);
    });

    it('Should return error on null', () => {
      const errorArray = result.name;
      assert.equal(Array.isArray(errorArray), true);
      assert.equal(errorArray.length, 1);
      assert.equal(typeof errorArray[0], 'object');
      assert.equal(errorArray[0].validator, 'IsString');
      assert.equal(errorArray[0].value, null);
      assert.equal(errorArray[0].path, 'name');
    });

    it('Should return error on undefined', () => {
      const errorArray = result.username;
      assert.equal(Array.isArray(errorArray), true);
      assert.equal(errorArray.length, 1);
      assert.equal(typeof errorArray[0], 'object');
      assert.equal(errorArray[0].validator, 'IsString');
      assert.equal(errorArray[0].value, undefined);
      assert.equal(errorArray[0].path, 'username');
    });

    it('Should return error on object', () => {
      const errorArray = result.email;
      assert.equal(Array.isArray(errorArray), true);
      assert.equal(errorArray.length, 1);
      assert.equal(typeof errorArray[0], 'object');
      assert.equal(errorArray[0].validator, 'IsString');
      assert.deepEqual(errorArray[0].value, {});
      assert.equal(errorArray[0].path, 'email');
    });

    it('Should return error on array', () => {
      const errorArray = result.password;
      assert.equal(Array.isArray(errorArray), true);
      assert.equal(errorArray.length, 1);
      assert.equal(typeof errorArray[0], 'object');
      assert.equal(errorArray[0].validator, 'IsString');
      assert.deepEqual(errorArray[0].value, []);
      assert.equal(errorArray[0].path, 'password');
    });

    it('Should return custom message on error', () => {
      const errorArray = result.confirmPassword;
      assert.equal(Array.isArray(errorArray), true);
      assert.equal(errorArray.length, 1);
      assert.equal(typeof errorArray[0], 'object');
      assert.equal(errorArray[0].validator, 'IsString');
      assert.equal(errorArray[0].value, null);
      assert.equal(errorArray[0].error, 'Confirm password should be a string.');
      assert.equal(errorArray[0].path, 'confirmPassword');
    });
  });

  describe('With strings', () => {
    let result;
    before(() => {
      const data = schema.validate({
        name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
      result = data.errors;
    });

    it('Should not return error', () => {
      assert.equal(result, null);
    });
  });
});
