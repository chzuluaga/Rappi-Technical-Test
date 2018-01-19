import { Injectable } from '@angular/core';
import { Matrix } from '../shared/Matrix';
import { Coordinate } from '../shared/Coordinate';
@Injectable()
export class MatrixService {

  matrix: Matrix;

  constructor() {
    this.matrix = new Matrix();
  }

  // Updates the value of the given cell
  updateCell(coor: Coordinate, value: number) {
    let changedCoor: boolean = false;
    for (let currentCoor of this.matrix.getCoordinates()) {
      if (currentCoor[0].isEqual(coor)) {
        currentCoor[1] = value;
        changedCoor = true;
      }
    }
    if (!changedCoor) {
      this.matrix.addCoordinate(coor, value);
    }
  }

  // Gets the sum of the cells between firstCoor and secondCorr inclusive
  getSum(firstCoor: Coordinate, secondCoor: Coordinate): number {
    let result: number = 0;
    for (let currentCoor of this.matrix.getCoordinates()) {
      if (this.checkIfInside(currentCoor[0], firstCoor, secondCoor)) {
        result += currentCoor[1];
      }
    }
    return result;
  }

  // Checks if currentCoor is between firstCoor and secondCorr in all its dimensions
  checkIfInside(currentCoor: Coordinate, firstCoor: Coordinate, secondCoor: Coordinate): boolean {
    return currentCoor.x >= firstCoor.x &&
      currentCoor.y >= firstCoor.y &&
      currentCoor.z >= firstCoor.z &&
      currentCoor.x <= secondCoor.x &&
      currentCoor.y <= secondCoor.y &&
      currentCoor.z <= secondCoor.z;
  }

  // Restore initial values for new case
  newCase() {
    this.matrix = new Matrix();
  }
}
