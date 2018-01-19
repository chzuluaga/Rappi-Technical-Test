import { Component, OnInit } from '@angular/core';
import { Input } from '../shared/Input';
import { InputService } from '../services/input.service';
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

  constructor(private inputService: InputService) { }

  ngOnInit() {
  }

  /*
    Extracts data from the input box
    returns true if input data is valid
  */
  ExtractData(): boolean {
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
    if (!this.ExtractData()) {
      this.outputBox = Constants.INVALID_DATA;
    } else {
      console.log("ok");
      this.outputBox = "all its okay";
    }
  }

}
