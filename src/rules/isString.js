import Rule from './Rule';

/**
 * @description
 * Requires the field to be a `string`
 */
class IsString extends Rule {
  /**
   * @ignore
   */
  message;

  /**
   * @description
   * Requires the field to be a `string`
   *
   * @param {Object} options Options for `isString`
   * @param {String} options.message Custom error message if test fails
   * (check {@link Rule#formatMessage} for more customization details)
   */
  constructor(options) {
    super('IsString');

    this.message = undefined;
    if (options !== undefined && typeof options !== 'object') {
      throw new TypeError('`options` should be an object.');
    }

    if (options !== undefined) {
      if (
        options.message !== undefined
        && typeof options.message !== 'string'
      ) {
        throw new Error('`message` key in `options` should be a string.');
      }

      this.message = options.message;
    }
  }

  /**
   * @description
   * Validate the `value` and return the error `string` if there are any
   * otherwise return `null`.
   *
   * @param {any} value The value to be checked.
   * @param {Object} options Options for validate.
   * @param {String} options.label Name or Label of the value being checked.
   * @param {String} options.path Validator path.
   * @returns {{ value: any, error: String }} Value and error string.
   */
  validate(value, options) {
    if (typeof options !== 'object') {
      throw new TypeError('`options` should be an object.');
    }

    if (typeof options.label !== 'string') {
      throw new TypeError('`options.label` should be a string.');
    }

    const { label } = options;

    if (typeof value !== 'string') {
      const data = {
        name: label,
      };

      return {
        value,
        error: this.message
          ? this.formatMessage(this.message, data)
          : this.formatMessage("'%name%' should be a string.", data),
      };
    }
    return { value, error: null };
  }
}

/**
 * @description
 * Requires the field to be a `string`
 *
 * @param {Object} options Options for `isString`
 * @param {String} options.message Custom error message if test fails
 * (check {@link Rule#formatMessage} for more customization details)
 */
export default function isString(options) {
  return new IsString(options);
}
