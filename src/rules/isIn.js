import Rule from './Rule';

/**
 * @description
 * Checks if the value is in the given array (works for number and strings) (is type sensitive)
 */
class IsIn extends Rule {
  /**
   * @ignore
   */
  message;

  /**
   * @ignore
   */
  in;

  /**
   * @description
   * Checks if the value is in the given array (works for number and strings) (is type sensitive)
   *
   * @param {Object} options Options for `isIn`
   * @param {Array} options.in Array containing possible values
   * @param {String} options.message Custom error message if test fails
   * (check {@link Rule#formatMessage} for more customization details)
   */
  constructor(options) {
    super('isIn');
    if (!options || typeof options !== 'object') {
      throw new TypeError('`options` should be an object.');
    }

    if (Object.keys(options).length <= 0) {
      throw new Error('`options` should have `in` key.');
    }

    if (!options.in || !Array.isArray(options.in)) {
      throw new Error('`in` key in `options` should be an array.');
    }

    if (options.message !== undefined && typeof options.message !== 'string') {
      throw new Error('`message` key in `options` should be a string.');
    }

    this.in = options.in;
    this.message = options.message;
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

    const data = {
      name: label,
      in: this.in.join(', '),
    };
    const errorMsg = this.message
      ? this.formatMessage(this.message, data)
      : this.formatMessage("'%name%' should be one of '%in%'.", data);

    if (
      (typeof value !== 'string' && typeof value !== 'number')
      || !this.in.includes(value)
    ) {
      return { value, error: errorMsg };
    }

    return { value, error: null };
  }
}

/**
 * @description
 * Checks if the value is in the given array (works for number and strings) (is type sensitive)
 *
 * @param {Object} options Options for `isIn`
 * @param {Array} options.in Array containing possible values
 * @param {String} options.message Custom error message if test fails
 * (check {@link Rule#formatMessage} for more customization details)
 */
export default function isIn(options) {
  return new IsIn(options);
}
