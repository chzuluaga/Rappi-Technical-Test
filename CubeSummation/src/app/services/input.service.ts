import { Injectable } from '@angular/core';
import { Input } from '../shared/Input';
import { Observable } from 'rxjs/Observable';
import { Constants } from '../shared/Constants';
import { Case } from '../shared/Case';
import { Coordinate } from '../shared/Coordinate';
import { Query } from '../shared/Query';

import 'rxjs/add/observable/of';

@Injectable()
export class InputService {
  input: Input
  constructor() {
    this.input = new Input();
  }

  getNumber(data: string) {
    let num = Number(data);
    if (isNaN(num)) {
      num = null;
    }
    return num;
  }

  getCoordinate(dataArray: string[], tokenCounter: number, maxN: number): Coordinate {
    let coor = new Coordinate();
    coor.x = this.getNumber(dataArray[tokenCounter++]);
    if (coor.x === null || coor.x < 1 || coor.x > maxN) {
      throw new Error();
    }

    coor.y = this.getNumber(dataArray[tokenCounter++]);
    if (coor.y === null || coor.y < 1 || coor.y > maxN) {
      throw new Error();
    }
    coor.z = this.getNumber(dataArray[tokenCounter++]);
    if (coor.z === null || coor.z < 1 || coor.z > maxN) {
      throw new Error();
    }
    return coor;
  }

  // Checks if Input is valid and stores it  
  setInput(dataArray: string[]): Observable<any> {
    this.input = new Input();
    let errmess = null;
    let tokenCounter = 0;
    try {
      let testCases = this.getNumber(dataArray[tokenCounter++]);
      if (testCases === null) {
        throw new Error();
      }

      this.input.setTestCases(testCases);
      for (let i = 0; i < testCases; i++) {
        let testCase: Case = new Case();
        let N = this.getNumber(dataArray[tokenCounter++]);
        if (N === null) {
          throw new Error();
        }
        let M = this.getNumber(dataArray[tokenCounter++]);
        if (M === null) {
          throw new Error();
        }

        testCase.setNM(N, M);

        for (let q = 0; q < M; q++) {
          let query: Query = new Query();
          let typeOfQuery = dataArray[tokenCounter++];
          if (typeOfQuery === Constants.UPDATE) {
            let coor = this.getCoordinate(dataArray, tokenCounter, N);
            tokenCounter += 3;
            let value = this.getNumber(dataArray[tokenCounter++]);

            if (value === null) {
              throw new Error();
            }
            query.setType(Constants.UPDATE);
            query.addCoordinate(coor);
            query.updateValue(value);
          } else {
            let firstCoor = this.getCoordinate(dataArray, tokenCounter, N);
            tokenCounter += 3;
            let secondCoor = this.getCoordinate(dataArray, tokenCounter, N);
            tokenCounter += 3;
            query.addCoordinate(firstCoor);
            query.addCoordinate(secondCoor);
          }
          testCase.addQuery(query);
        }
        this.input.addCase(testCase);
      }

    } catch (e) {
      errmess = Constants.INVALID_DATA + e;
      return Observable.of(null);
    }

    return Observable.of(this.input);
  }

}
