import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  print() {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SolutionPage');
  }

}
