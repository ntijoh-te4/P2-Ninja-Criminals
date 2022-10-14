class API {
    static token = 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;

    static async fetch(url, opts = {}) {
        opts['headers'] = {
            'Authorization': `token ${this.token}`
        }
        return await fetch(url, opts);
    }
}