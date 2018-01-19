import { Case } from './Case';

export class Input {
    testCases: number;
    cases: Case[];

    setTestCases(T: number) {
        this.testCases = T;
    }

    addCase(testCase: Case) {
        if(!this.cases)
            this.cases = [];
        this.cases.push(testCase);
    }

}