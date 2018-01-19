import { Query } from './Query';

export class Case {
    N: number;
    M: number;
    queries: Query[];

    setNM(n: number, m: number) {
        this.N = n;
        this.M = m;
    }

    addQuery(query: Query) {
        if(!this.queries)
            this.queries = [];
        this.queries.push(query);
    }
}