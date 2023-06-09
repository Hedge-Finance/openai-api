const DEFAULT_ENGINE = 'davinci';
const ORIGIN = 'https://api.openai.com';
const API_VERSION = 'v1';
const OPEN_AI_URL = `${ORIGIN}/${API_VERSION}`;

module.exports = {
  /**
   * Returns the completion URL for the specified engine.
   * @param {string} engine - The ID of the engine.
   * @returns {string} - The completion URL.
   */
  completionURL(engine) {
    return `${OPEN_AI_URL}/engines/${engine}/completions`;
  },
  /**
   * Returns the search URL for the specified engine.
   * @param {string} engine - The name of the engine to search with.
   * @returns {string} - The search URL for the specified engine.
   */
  searchURL(engine) {
    return `${OPEN_AI_URL}/engines/${engine}/search`;
  },
  /**
   * Returns the URL for the engines endpoint of the OpenAI API.
   * @returns {string} The URL for the engines endpoint.
   */
  enginesUrl() {
    return `${OPEN_AI_URL}/engines`;
  },
  /**
   * Returns the URL for the specified engine.
   * @param {string} engine - The name of the engine.
   * @returns {string} - The URL for the engine.
   */
  engineUrl(engine) {
    return `${OPEN_AI_URL}/engines/${engine}`;
  },
  /**
   * Returns the URL for OpenAI classifications.
   * @returns {string} The URL for OpenAI classifications.
   */
  classificationsUrl() {
    return `${OPEN_AI_URL}/classifications`;
  },
  /**
   * Returns the URL for the files endpoint.
   * @returns {string} The URL for the files endpoint.
   */
  filesUrl() {
    return `${OPEN_AI_URL}/files`;
  },
  /**
   * Returns the URL for the OpenAI answers endpoint.
   * @returns {string} The URL for the OpenAI answers endpoint.
   */
  answersUrl() {
    return `${OPEN_AI_URL}/answers`;
  },
  /**
   * Returns the URL for retrieving embeddings for a given engine.
   * @param {string} engine - The name of the engine.
   * @returns {string} - The URL for retrieving embeddings for the specified engine.
   */
  embeddingsUrl(engine) {
    return `${OPEN_AI_URL}/engines/${engine}/embeddings`;
  }
};
