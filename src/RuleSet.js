import { Rule } from './rules';

/**
 * Vaidation error object.
 * @typedef {Object} validationError
 * @property {String} error - Error string
 * @property {String} validator - Name of validator (`Rule`) where the error occured
 * @property {Any} value - Value which caused the `Rule` to fail
 */

/**
 * Creates a set of rules for a single key.
 */
class RuleSet {
  /**
   * @ignore
   * @private
   */
  __rules;

  /**
   * @ignore
   * @private
   */
  __label;

  /**
   * Create a ruleset for a particular `key` or `value`.
   * @param {Array<Rule>} arrayOfRules Array of `Rule` objects
   * @param {String} label The name or label of the value being checked
   */
  constructor(arrayOfRules, label) {
    if (label && typeof label !== 'string') {
      throw new TypeError('`label` should be a string.');
    }

    if (!arrayOfRules || !Array.isArray(arrayOfRules)) {
      throw new TypeError('`arrayOfRules` should be an array.');
    }

    if (arrayOfRules.length <= 0) {
      throw new TypeError('`arrayOfRules` should not be empty.');
    }

    this.__rules = [...arrayOfRules];
    this.__label = label;
  }

  /**
   * Validates the `value` and returns an array of errors if any,
   * othewise returns `null`.
   *
   * @param {any} valueToCheck Value to be validated
   * @param {String} key Key of the value being checked
   * @param {Object} options Options for validate
   * @param {Object} options.returnEarly If `true` returns the after getting the first error.
   * @returns {validationError[]} An object containing `value` and `errors` if any
   */
  validate(valueToCheck, key, options) {
    const errors = [];
    let modifiedValue = valueToCheck;
    let returnEarly = false;

    if (options !== undefined) {
      if (typeof options !== 'object') {
        throw new TypeError('`options` should be an object.');
      }

      if (options.returnEarly !== undefined) {
        if (typeof options.returnEarly !== 'boolean') {
          throw new TypeError('`options.returnEarly` should be a boolean.');
        }

        returnEarly = options.returnEarly;
      }
    }

    for (const rule of this.__rules) {
      if (!(rule instanceof Rule)) {
        throw new TypeError('Rule should be an instance of `Rule` class.');
      }
      const { value, error } = rule.validate(
        modifiedValue,
        this.__label || key,
      );
      modifiedValue = value;
      if (error) {
        errors.push({ error, validator: rule.__name, value });
        if (returnEarly) break;
      }
    }

    if (errors.length > 0) return { value: modifiedValue, errors };
    return { value: modifiedValue, errors: null };
  }

  /**
   * Create a ruleset for a particular `key` or `value`.
   * Can be used as an alternative to the constructor.
   * @param {Array} arrayOfRules Array of `Rule` objects
   * @param {String} label The name or label of the value being checked
   * @returns {RuleSet} A new `RuleSet` object
   */
  static create(arrayOfRules, label) {
    return new RuleSet(arrayOfRules, label);
  }
}

export default RuleSet;
