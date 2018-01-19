import { Case } from './Case';

export class Input {
    testCases: number;
    cases: Case[];

    setTestCases(T: number) {
        this.testCases = T;
    }

    addCase(testCase: Case) {
        this.cases.push(testCase);
    }

}