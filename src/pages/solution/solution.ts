import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import rref from 'rref';
import * as math from 'mathjs'
import Matrix from 'node-matrices'

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
  rechelon = [];
  answers = [];
  inverse = [];
  determinant: number;
  determinants = [];
  square = [];
  right = [];
  cramers = [];
  showrref = false;
  header = '';


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.coefficients = this.navParams.data.coefficients;
    this.method = this.navParams.data.method;
    this.unknowns = this.navParams.data.unknowns;
    this.matrix = this.navParams.data.matrix;

    this.unknowns = '3';
    this.matrix = ["1", "1", "1", "6", "2", "1", "2", "10", "1", "2", "4", "14"];
    this.method = 4;

    if (this.method == 1) {
      this.header = 'Gaussian Elimination'
    }

    if (this.method == 2) {
      this.header = 'Gauss-Jordan Elimination'
    }

    if (this.method == 3) {
      this.header = 'Matrix Equation'
    }

    if (this.method == 4) {
      this.header = 'Cramers Rule'
    }

    console.log(this.header)

    console.log('matrix => ' + this.matrix);

    const cut = Number(this.unknowns) + 1;

    for (let i = 0; i < this.unknowns; i++) {
      this.matrices[i] = this.matrix.splice(0, cut);
    }

    if (this.method >= 2) this.showrref = true;

    this.rechelon = JSON.parse(JSON.stringify(this.matrices));
    rref(this.rechelon);

    this.answers = this.rechelon.map(e => {
      return e[e.length - 1];
    });


    this.echelon = JSON.parse(JSON.stringify(this.matrices))

    this.calculateRowEchelonForm(this.echelon);

    if (this.method >= 3) {
      this.inverse = JSON.parse(JSON.stringify(this.matrices))
      this.inverseMatrix(this.inverse);
    }

    if (this.method == 4) {
      this.cramersRule(this.square, this.right);
    }
  }

  inverseMatrix(inverse) {
    this.right = inverse.map(i => {
      return i[i.length - 1]
    })

    this.square = inverse.map(i => {
      i.pop();
      return i;
    });

    this.getDeterminant(this.square)

    const _inverse = math.inv(this.square)
    this.inverse = _inverse;

  }

  getDeterminant(square) {
    var m = new Matrix(
      square
    );
    this.determinant = m.determinant();
  }

  cramersRule(matrix, freeTerms) {
    var det = this.detr(matrix), returnArray = [], i, tmpMatrix;

    for (i = 0; i < matrix[0].length; i++) {
      var tmpMatrix = this.insertInTerms(matrix, freeTerms, i)
      returnArray.push(this.detr(tmpMatrix) / det)
    }
    this.cramers = returnArray;
  }


  insertInTerms(matrix, ins, at) {
    var tmpMatrix = this.clone(matrix), i;
    for (i = 0; i < matrix.length; i++) {
      tmpMatrix[i][at] = ins[i];
    }
    return tmpMatrix;
  }

  detr(m) {
    var ret = 1, k, A = this.clone(m), n = m[0].length, alpha, i;

    for (var j = 0; j < n - 1; j++) {
      k = j;
      var temp
      for (i = j + 1; i < n; i++) { if (Math.abs(A[i][j]) > Math.abs(A[k][j])) { k = i; } }
      if (k !== j) {
        temp = A[k]; A[k] = A[j]; A[j] = temp;
        ret *= -1;
      }
      var Aj = A[j];
      for (i = j + 1; i < n; i++) {
        var Ai = A[i];
        alpha = Ai[j] / Aj[j];
        for (k = j + 1; k < n - 1; k += 2) {
          var k1 = k + 1;
          Ai[k] -= Aj[k] * alpha;
          Ai[k1] -= Aj[k1] * alpha;
        }
        if (k !== n) { Ai[k] -= Aj[k] * alpha; }
      }
      if (Aj[j] === 0) { return 0; }
      ret *= Aj[j];
    }

    var det = Math.round(ret * A[j][j] * 100) / 100
    this.determinants.push(det);
    return det;
  }


  clone(m) {
    return m.map(function (a) { return a.slice(); });
  }



  calculateRowEchelonForm(matrices) {
    var i, k, j;

    let A: Array<any> = matrices
    let n = A.length;
    let abs = Math.abs;

    A = A.map(m => m.map(n => Number(n)));

    for (i = 0; i < n; i++) {
      // Search for maximum in this column
      var maxEl = abs(Number(A[i][i])),
        maxRow = i;

      for (k = i + 1; k < n; k++) {
        if (abs(A[k][i]) > maxEl) {
          maxEl = abs(A[k][i]);
          maxRow = k;
        }
      }

      for (k = i; k < n + 1; k++) {
        var tmp = A[maxRow][k];
        A[maxRow][k] = A[i][k];
        A[i][k] = tmp;
      }

      // console.log('swap')
      // console.log(A);

      // Make all rows below this one 0 in current column
      for (k = i + 1; k < n; k++) {
        var c = -A[k][i] / A[i][i];
        for (j = i; j < n + 1; j++) {
          if (i === j) {
            A[k][j] = 0;
          } else {
            A[k][j] += c * A[i][j];
          }
        }
      }

      // console.log('zero')
      // console.log(A);


    }

    var x = this.array_fill(0, n, 0);

    for (i = n - 1; i > -1; i--) {
      x[i] = A[i][n] / A[i][i];
      for (k = i - 1; k > -1; k--) {
        A[k][n] -= A[k][i] * x[i];
      }
    }

    this.echelon = A;

  }

  array_fill(i, n, v) {
    var a = [];
    for (; i < n; i++) {
      a.push(v);
    }
    return a;
  }

  printAnswers() {

  }

  print() {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SolutionPage');
  }

}
