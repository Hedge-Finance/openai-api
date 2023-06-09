declare module 'openai-api' {
    /**
     * Interface for options to be passed to a completion engine.
     * @param {string} engine - The name of the completion engine to use.
     * @param {string} [prompt] - The prompt to use for completion.
     * @param {number} [maxTokens] - The maximum number of tokens to generate for the completion.
     * @param {number} [temperature] - The temperature to use for sampling.
     * @param {number} [topP] - The value for top-p sampling.
     * @param {number} [n] - The number of completions to generate.
     * @param {boolean} [stream] - Whether to stream the results or not.
     * @param {number} [logprobs] - The number of log probabilities to return.
     * @param {boolean} [echo] - Whether to echo the prompt in the results or not.
     * @param {string|string[]} [stop] - The stop sequence(s) to use.
     * @param {number} [presencePenalty] - The presence penalty to use.
     * @param {number} [frequencyPenalty] - The frequency penalty to use.
     * @param {number} [bestOf] - The number of best completions to return.
     * @param {string} [user] - The user to use for the completion.
     * @param {{ [token: string]: number; }} [logitBias] - The logit bias to use.
     */
    export interface CompletionOpts {
        engine: string;
        prompt?: string;
        maxTokens?: number;
        temperature?: number;
        topP?: number;
        n?: number;
        stream?: boolean;
        logprobs?: number;
        echo?: boolean;
        stop?: string | string[];
        presencePenalty?: number;
        frequencyPenalty?: number;
        bestOf?: number;
        user?: string;
        logitBias?: { [token: string]: number; };
    }

    /**
     * Interface for a completion object.
     * @interface
     * @property {object} data - The completion data.
     * @property {string} data.id - The ID of the completion.
     * @property {string} data.object - The type of object the completion is.
     * @property {number} data.created - The timestamp of when the completion was created.
     * @property {string} data.model - The model of the completion.
     * @property {Choice[]} data.choices - An array of choices made in the completion.
     */
    export interface Completion {
        data: {
            id: string;
            object: string;
            created: number;
            model: string;
            choices: Choice[];
        };
    }

    /**
     * Represents a choice with text, index, log probabilities, and finish reason.
     * @interface
     * @property {string} text - The text of the choice.
     * @property {number} index - The index of the choice.
     * @property {any} logprobs - The log probabilities of the choice.
     * @property {string} finish_reason - The reason the choice finished.
     */
    export interface Choice {
        text: string;
        index: number;
        logprobs: any;
        finish_reason: string;
    }

    /**
     * Interface for defining search options.
     * @param {string} engine - The search engine to use.
     * @param {string[]} [documents] - An optional array of document IDs to search within.
     * @param {string} [file] - An optional file to search within.
     * @param {string} query - The search query.
     * @param {number} [maxRerank] - An optional maximum number of times to rerank results.
     * @param {boolean} [returnMetadata] - An optional flag indicating whether to return metadata with search results.
     */
    export interface SearchOpts {
        engine: string;
        documents?: string[];
        file?: string;
        query: string;
        maxRerank?: number;
        returnMetadata?: boolean;
    }

    /**
     * Interface for a search object.
     * @interface
     * @property {Document[]} data - An array of Document objects.
     * @property {string} object - A string representing the type of object being searched.
     */
    export interface Search {
        data: Document[];
        object: string;
    }

    /**
     * Interface for a document object.
     * @interface
     * @property {number} document - The document ID.
     * @property {string} object - The document object.
     * @property {number} score - The document score.
     * @property {any} [metadata] - Optional metadata associated with the document.
     */
    export interface Document {
        document: number;
        object: string;
        score: number;
        metadata?: any;
    }

    /**
     * Interface for Embedding objects.
     * @interface
     * @property {string} object - The type of object being embedded.
     * @property {EmbeddingData[]} data - An array of EmbeddingData objects.
     * @property {string} model - The model being used for the embedding.
     */
    export interface Embedding {
        object: string;
        data: EmbeddingData[];
        model: string;
    }

    /**
     * Interface for EmbeddingData object.
     * @param {string} object - The name of the object.
     * @param {number} index - The index of the object.
     * @param {number[]} embedding - An array of numbers representing the embedding data.
     */
    export interface EmbeddingData {
        object: string;
        index: number;
        embedding: number[];
    }

    /**
     * Represents an instance of the OpenAI API.
     * @class
     * @param {string} api - The API key to use for authentication.
     * @returns {OpenAI} An instance of the OpenAI class.
     * @remarks This class provides methods for completing text, encoding text, and searching documents using the OpenAI API.
     * @example
     * const openai = new OpenAI('my-api-key');
     * openai.complete({ prompt: 'Hello', maxTokens: 5 }).then(result => console.log(result));
     *
     * @method complete
     * @param {CompletionOpts} opts - The options to complete.
     * @returns {Promise<Completion>} - A Promise that resolves to a Completion object.
     *
     * @method encode
     * @param {string} str - The string to be encoded.
     * @returns {number[]} An array of numbers representing the encoded string.
     *
     * @method search
     * @param {SearchOpts} opts - The search options to use.
     * @returns {Promise<Search>} - A promise that resolves with the search results.
     */
    class OpenAI {
        constructor(api: string);
        /**
         * Completes the given options and returns a Promise that resolves to a Completion object.
         * @param {CompletionOpts} opts - The options to complete.
         * @returns {Promise<Completion>} - A Promise that resolves to a Completion object.
         */
        complete(opts: CompletionOpts): Promise<Completion>;
        /**
         * Encodes a given string into an array of numbers.
         * @param {string} str - The string to be encoded.
         * @returns {number[]} An array of numbers representing the encoded string.
         */
        encode(str: string): number[];
        /**
         * Searches for items based on the provided search options.
         * @param {SearchOpts} opts - The search options to use.
         * @returns {Promise<Search>} - A promise that resolves with the search results.
         */
        search(opts: SearchOpts): Promise<Search>;
    }

    export default OpenAI;
}
