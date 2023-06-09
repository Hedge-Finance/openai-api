"use strict";

const config = require('./config');
const axios = require('axios');

const DEFAULT_ENGINE = "davinci";

/**
 * Class representing the OpenAI API client.
 * @class
 * @param {string} api_key - The API key for authentication.
 * @throws {Error} Throws an error if the provided engine name for embeddings is not valid.
 * @returns {Object} An instance of the OpenAI class.
 * @remarks This class provides methods for interacting with the OpenAI API, including completing text, searching documents, classifying text, and more.
 */
class OpenAI {
  constructor(api_key) {
    this._api_key = api_key;
  }

  /**
   * Sends a request to the specified URL using the specified method and options.
   * @param {string} url - The URL to send the request to.
   * @param {string} method - The HTTP method to use for the request.
   * @param {Object} opts - The options to include in the request.
   * @returns {Promise} A Promise that resolves with the response data.
   */
  _send_request(url, method, opts = {}) {
    let camelToUnderscore = (key) => {
      let result = key.replace(/([A-Z])/g, " $1");
      return result.split(' ').join('_').toLowerCase();
    };

    const data = {};
    for (const key in opts) {
      data[camelToUnderscore(key)] = opts[key];
    }

    return axios({
      url,
      headers: {
        'Authorization': `Bearer ${this._api_key}`,
        'Content-Type': 'application/json'
      },
      data: Object.keys(data).length ? data : '',
      method,
    });
  }

  /**
   * Checks if the provided engine name is valid for embeddings.
   * @param {string} engine - The name of the engine to check.
   * @throws {Error} Throws an error if the engine name is not valid.
   */
  _check_embeddings_engine_name(engine) {
    const availableEngineNames = [
      'text-similarity-ada-001',
      'text-similarity-babbage-001',
      'text-similarity-curie-001',
      'text-similarity-davinci-001',
      'text-search-ada-doc-001',
      'text-search-ada-query-001',
      'text-search-babbage-doc-001',
      'text-search-babbage-query-001',
      'text-search-curie-doc-001',
      'text-search-curie-query-001',
      'text-search-davinci-doc-001',
      'text-search-davinci-query-001',
      'code-search-ada-code-001',
      'code-search-ada-text-001',
      'code-search-babbage-code-001',
      'code-search-babbage-text-001',
    ];

    if (!availableEngineNames.includes(engine)) {
      throw new Error(`Unknown engine name for embeddings. Available engine names are ${availableEngineNames}`);
    }
  }

  /**
   * Sends a POST request to the completion URL with the provided options.
   * @param {object} opts - The options to be sent in the request.
   * @param {string} opts.engine - The engine to use for completion. If not provided, the default engine will be used.
   * @returns {Promise} A Promise that resolves with the response from the completion URL.
   */
  complete(opts) {
    const url = config.completionURL(opts.engine || DEFAULT_ENGINE);
    delete opts.engine;

    return this._send_request(url, 'post', opts);
  }

  /**
   * This method returns a Promise that resolves to an array of 2047 empty strings.
   *
   * @returns {Promise<string[]>} An array of 2047 empty strings.
   *
   * @remarks
   * This method is no longer supported in Node>=v14. See documentation for alternative methods.
   */
  encode() {
    // This method is no longer supported in Node>=v14. See
    return Promise.resolve(new Array(2047).fill(""));
  }

  /**
   * Searches for a query using the specified search engine.
   * @param {Object} opts - The options for the search query.
   * @param {string} opts.engine - The search engine to use. Defaults to DEFAULT_ENGINE if not provided.
   * @returns {Promise<Object>} - A Promise that resolves with the search results.
   */
  search(opts) {
    const url = config.searchURL(opts.engine || DEFAULT_ENGINE);
    delete opts.engine;
    return this._send_request(url, 'post', opts);
  }

  /**
   * Sends a POST request to the answers URL with the provided options.
   * @param {object} opts - The options to include in the request body.
   * @returns {Promise} A Promise that resolves with the response from the server.
   */
  answers(opts) {
    const url = config.answersUrl();
    return this._send_request(url, 'post', opts);
  }

  /**
   * Sends a POST request to the classifications URL with the provided options.
   * @param {Object} opts - The options to be sent in the request body.
   * @returns {Promise} A Promise that resolves with the response data.
   */
  classification(opts) {
    const url = config.classificationsUrl();
    return this._send_request(url, "post", opts);
  }

  /**
   * Retrieves the engines from the specified URL using a GET request.
   * @returns {Promise<any>} A Promise that resolves with the engines data.
   */
  engines() {
    const url = config.enginesUrl();
    return this._send_request(url, 'get');
  }

  /**
   * Sends a GET request to the engine URL and returns the response.
   * @param {string} engine - The engine to send the request to.
   * @returns {Promise<any>} - A Promise that resolves with the response data.
   */
  engine(engine) {
    const url = config.engineUrl(engine);
    return this._send_request(url, 'get');
  }

  /**
   * Sends a POST request to the embeddings API endpoint with the provided options.
   * @param {Object} opts - The options to be sent with the request.
   * @param {string} opts.engine - The name of the embeddings engine to use.
   * @returns {Promise<Object>} A Promise that resolves with the response data from the API.
   */
  embeddings(opts) {
    this._check_embeddings_engine_name(opts.engine);

    const url = config.embeddingsUrl(opts.engine);
    return this._send_request(url, 'post', opts);
  }
}

module.exports = OpenAI;
