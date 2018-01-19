import { Component, OnInit } from '@angular/core';
import { Input } from '../shared/Input';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  inputBox: string;
  outputBox: string;
  input: Input;

  constructor() { }

  ngOnInit() {
  }

  // Solves Cube Summation problem
  solve() {
  }

}
