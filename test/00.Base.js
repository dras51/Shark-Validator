const assert = require('assert');
const {
  Validator, RuleSet, IsString, IsRequired,
} = require('../lib');

/**
 * @test {Validator}
 * @test {RuleSet}
 */
describe('00. Base for all Rules', () => {
  describe('With returnEarly: true', () => {
    let result;
    before(() => {
      const schema = new Validator(
        {
          name: RuleSet.create([new IsString(), new IsRequired()]),
          username: RuleSet.create([new IsString()]),
        },
        { returnEarly: true },
      );
      const data = schema.validate({
        name: null,
        username: undefined,
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
      assert.equal(errorArray.length, 2);
      assert.equal(typeof errorArray[0], 'object');
      assert.equal(errorArray[0].validator, 'IsString');
      assert.equal(errorArray[0].value, null);
      assert.equal(errorArray[0].path, 'name');
    });

    it('Should not return error on undefined', () => {
      const errorArray = result.username;
      assert.equal(errorArray, undefined);
    });
  });

  describe('With returnEarly: false', () => {
    let result;
    before(() => {
      const schema = new Validator(
        {
          name: RuleSet.create([new IsString(), new IsRequired()]),
          username: RuleSet.create([new IsString()]),
        },
        { returnEarly: false },
      );

      const data = schema.validate({
        name: null,
        username: undefined,
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
      assert.equal(errorArray.length, 2);
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
  });

  describe('With returnEarly: true & returnRuleSetEarly: true', () => {
    let result;
    before(() => {
      const schema = new Validator(
        {
          name: RuleSet.create([new IsString(), new IsRequired()]),
          username: RuleSet.create([new IsString()]),
        },
        { returnEarly: true, returnRuleSetEarly: true },
      );

      const data = schema.validate({
        name: null,
        username: undefined,
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

    it('Should not return error on undefined', () => {
      const errorArray = result.username;
      assert.equal(errorArray, undefined);
    });
  });

  describe('With returnEarly: false & returnRuleSetEarly: true', () => {
    let result;
    before(() => {
      const schema = new Validator(
        {
          name: RuleSet.create([new IsString(), new IsRequired()]),
          username: RuleSet.create([new IsString()]),
        },
        { returnEarly: false, returnRuleSetEarly: true },
      );

      const data = schema.validate({
        name: null,
        username: undefined,
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
  });
});
