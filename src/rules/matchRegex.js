import Rule from './Rule';

/**
 * Checks if the value matches the regular expression.
 */
export default class matchRegex extends Rule {
  /**
   * @ignore
   */
  message;

  /**
   * @ignore
   */
  regex;

  /**
   * Checks if the value matches the regular expression.
   * @param {Object} options Options for `matchRegex`
   * @param {RegExp} options.regex Regex expression
   * @param {String} options.message Custom error message if test fails (check {@link Rule#formatMessage} for more customization details)
   */
  constructor(options) {
    super('matchRegex');

    this.message = undefined;

    if (options === undefined) {
      throw new TypeError('`options` is required.');
    }

    if (typeof options !== 'object') {
      throw new TypeError('`options` should be an object.');
    }
    if (
      typeof options.regex !== 'object' ||
      !(options.regex instanceof RegExp)
    ) {
      throw new Error(
        '`regex` key in should be an instance of `RegExp` class.',
      );
    }

    if (options.message !== undefined && typeof options.message !== 'string') {
      throw new Error('`message` key in `options` should be a string.');
    }

    this.message = options.message;
    this.regex = options.regex;
  }

  /**
   * Validate the `value` and return the error `string` if there are any
   * otherwise return `null`.
   * @param {any} value The value to be checked.
   * @param {String} label Name or Label of the value being checked.
   * @returns {{ value: any, error: String }} Value and error string.
   */
  validate(value, label) {
    if (typeof value === 'string') {
      const data = {
        name: label,
        regex: this.regex.source,
      };

      if (!this.regex.test(value))
        return {
          value,
          error: this.message
            ? this.formatMessage(this.message, data)
            : this.formatMessage(
                "'%name%' should match the regex '%regex%'.",
                data,
              ),
        };
    }
    return { value, error: null };
  }
}
