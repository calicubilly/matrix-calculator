import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  method: number;

  unknowns: number;

  coefficients = [];

  matrix = [];

  constructor(public navCtrl: NavController) {

  }

  solve() {
    console.log(this.method, this.unknowns, this.coefficients, this.matrix);
    const params = {
      method: this.method,
      unknowns: this.unknowns,
      coefficients: this.coefficients,
      matrix: this.matrix
    }
    this.navCtrl.push('SolutionPage', params);
  }

  changeSize(event) {
    this.matrix = this.matrix.map(c => {
      return '';
    })

  }

  getRows() {
    const rows = [];
    for (let i = 0; i < this.unknowns; i++) {
      rows.push(i);
    }

    return rows;
  }

  getSize() {
    const rows = [];
    for (let i = 0; i <= this.unknowns; i++) {
      rows.push(i);
    }

    return rows;

  }

}
