const assert = require('assert');
const { Validator, RuleSet, toInt } = require('../lib');

const schema = new Validator({

  id: RuleSet.create([toInt()]),
  age: RuleSet.create([toInt()]),
  yearOfBirth: RuleSet.create([toInt()]),
  monthOfBirth: RuleSet.create(
    [
      toInt({
        message: '%name% should be a number.',
      }),
    ],
    'Month of birth',
  ),
});

/**
 * @test {ToInt}
 */
describe('08. ToInt', () => {
  describe('With error values', () => {
    let errors;
    before(() => {
      const data = schema.validate({
        id: '2014.05',
        age: '~10',
        yearOfBirth: '20181.01a',
        monthOfBirth: 'Jan',
      });
      errors = data.errors;
    });

    it('Should return error', () => {
      assert.equal(typeof errors, 'object');
      assert.notEqual(errors, null);
    });

    it('Should return error if decimal number', () => {
      const errorArray = errors.id;
      assert.equal(Array.isArray(errorArray), true);
      assert.equal(errorArray.length, 1);
      assert.equal(typeof errorArray[0], 'object');
      assert.equal(errorArray[0].validator, 'ToInt');
      assert.equal(errorArray[0].value, '2014.05');
      assert.equal(errorArray[0].path, 'id');
    });

    it('Should return error if a symbol is present', () => {
      const errorArray = errors.age;
      assert.equal(Array.isArray(errorArray), true);
      assert.equal(errorArray.length, 1);
      assert.equal(typeof errorArray[0], 'object');
      assert.equal(errorArray[0].validator, 'ToInt');
      assert.equal(errorArray[0].value, '~10');
      assert.equal(errorArray[0].path, 'age');
    });

    it('Should return error if character after `.`', () => {
      const errorArray = errors.yearOfBirth;
      assert.equal(Array.isArray(errorArray), true);
      assert.equal(errorArray.length, 1);
      assert.equal(typeof errorArray[0], 'object');
      assert.equal(errorArray[0].validator, 'ToInt');
      assert.equal(errorArray[0].value, '20181.01a');
      assert.equal(errorArray[0].path, 'yearOfBirth');
    });

    it('Should return custom message on error', () => {
      const errorArray = errors.monthOfBirth;
      assert.equal(Array.isArray(errorArray), true);
      assert.equal(errorArray.length, 1);
      assert.equal(typeof errorArray[0], 'object');
      assert.equal(errorArray[0].validator, 'ToInt');
      assert.equal(errorArray[0].value, 'Jan');
      assert.equal(errorArray[0].error, 'Month of birth should be a number.');
      assert.equal(errorArray[0].path, 'monthOfBirth');
    });
  });

  describe('With valid values', () => {
    let errors;
    let values;
    before(() => {
      const data = schema.validate({
        id: '10',
        age: 1.0,
        yearOfBirth: '2018',
        monthOfBirth: '5',
      });
      errors = data.errors;
      values = data.values;
    });

    it('Should not return error', () => {
      assert.equal(errors, null);
    });

    it('Should convert decimal string to number', () => {
      assert.equal(typeof values, 'object');
      const value = values.id;
      assert.equal(typeof value, 'number');
      assert.equal(value, 10);
    });

    it('Should number as number', () => {
      assert.equal(typeof values, 'object');
      const value = values.age;
      assert.equal(typeof value, 'number');
      assert.equal(value, 1.0);
    });

    it('Should convert string to number', () => {
      assert.equal(typeof values, 'object');
      const value = values.yearOfBirth;
      assert.equal(typeof value, 'number');
      assert.equal(value, 2018);
    });
  });
});
