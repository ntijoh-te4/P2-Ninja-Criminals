class API {
    static token = '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';

    static async fetch(url, opts = {}) {
        opts['headers'] = {
            'Authorization': `token ${this.token}`
        }
        return await fetch(url, opts);
    }
}