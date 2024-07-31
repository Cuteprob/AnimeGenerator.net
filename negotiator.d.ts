declare module 'negotiator' {
    interface NegotiatorHeaders {
        [key: string]: string | string[] | undefined;
    }

    class Negotiator {
        constructor(headers: NegotiatorHeaders);
        languages(available?: string[]): string[];
        language(available?: string[]): string | undefined;
    }

    export = Negotiator;
}