import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import rref from 'rref';

/**
 * Generated class for the SolutionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-solution',
  templateUrl: 'solution.html',
})
export class SolutionPage {
  coefficients = [];
  method: number;
  unknowns: any;
  matrix = [];
  matrices = [];
  echelon = [];
  answers = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.coefficients = this.navParams.data.coefficients;
    this.method = this.navParams.data.method;
    this.unknowns = this.navParams.data.unknowns;
    this.matrix = this.navParams.data.matrix;

    console.log('unknowns => ' + this.unknowns);
    console.log('matrix => ' + this.matrix);
    const cut = Number(this.unknowns) + 1;
    console.log('cut => ' + cut)

    for (let i = 0; i < this.unknowns; i++) {
      this.matrices[i] = this.matrix.splice(0, cut);
    }

    this.echelon = JSON.parse(JSON.stringify(this.matrices));
    rref(this.echelon);

    this.answers = this.echelon.map(e => {
      return e[e.length - 1];
    })

    console.log(this.answers);



  }

  print() {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SolutionPage');
  }

}
