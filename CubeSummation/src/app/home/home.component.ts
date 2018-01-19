import { Component, OnInit } from '@angular/core';
import { Input } from '../shared/Input';
import { InputService } from '../services/input.service';
import { MatrixService } from '../services/matrix.service';

import { Constants } from '../shared/Constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  inputBox: string;
  outputBox: string;
  input: Input;
  answer: string;

  constructor(private inputService: InputService, private matrixService: MatrixService) { }

  ngOnInit() {
  }

  /*
    Extracts data from the input box
    returns true if input data is valid
  */
  ExtractInputData(): boolean {
    if (!this.inputBox) {
      return false;
    }

    let inputText = this.inputBox.replace(/\r?\n|\r\s\s+/g, ' ').split(" ");

    this.inputService.setInput(inputText)
      .subscribe(input => this.input = input);

    return this.input != null;
  }

  // Solves Cube Summation problem
  solve() {
    this.outputBox = "";
    let result = "";
    if (!this.ExtractInputData()) {
      result = Constants.INVALID_DATA;
    } else {
      for (let testCase of this.input.getCases()) {
        this.matrixService.newCase();
        result += this.answerQueries(testCase);
      }
    }
    this.outputBox = result;
  }

  // returns the answers to the queries
  answerQueries(testCase): string {
    let result = "";
    for (let query of testCase.getQueries()) {
      if (query.getType() == Constants.UPDATE) {
        this.matrixService.updateCell(query.getCoordinateAt(0), query.getValueToChange());
      } else {
        result += this.matrixService.getSum(query.getCoordinateAt(0), query.getCoordinateAt(1)) + "\n";
      }
    }
    return result;
  }

}
