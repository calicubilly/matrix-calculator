import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  gender = 4;

  constructor(public navCtrl: NavController) {

  }

  solve() {
    this.navCtrl.push('SolutionPage')
  }

}
