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

  tmpMatrix = [];

  constructor(public navCtrl: NavController) {

  }

  move1(slides) {
    console.log(slides)
    this.matrix = [];

    slides.slideTo(1)
  }

  move2(slides) {
    console.log(slides)
    slides.slideTo(2)
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter')
    try {
      const matrix = JSON.parse(sessionStorage.getItem('matrix'))
      if (matrix.length > 0) {
        this.matrix = matrix;
      }
    } catch (e) {
      console.log(e)
    }

  }

  solve() {
    console.log(this.method, this.unknowns, this.coefficients, this.matrix);
    this.tmpMatrix = this.matrix;
    sessionStorage.setItem('matrix', JSON.stringify(this.matrix))
    const params = {
      method: this.method,
      unknowns: this.unknowns,
      matrix: this.matrix
    }
    console.log(params)
    console.log('params')
    this.navCtrl.push('SolutionPage', params);
  }

  changeSize(event) {
    console.log('changeSize')
    sessionStorage.clear();

    // this.matrix = this.matrix.map(c => {
    //   return null;
    // })

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
