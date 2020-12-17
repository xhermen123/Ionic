import { Component, ViewChild } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import {SignaturePad} from 'angular2-signaturepad/signature-pad';

@Component({
  selector: 'app-signature',
  templateUrl: 'signature.page.html',
  styleUrls: ['signature.page.scss'],
})
export class SignaturePage {
  @ViewChild(SignaturePad) public signaturePad : SignaturePad;

  public signaturePadOptions : Object = {
    'minWidth': 2,
    // 'canvasWidth': 340,
    'canvasHeight': 200
  };
  public signatureImage : string;

  constructor(
    public modalCtrl: ModalController,
    navParams: NavParams
  ) {
    this.signatureImage = navParams.data.signatureImage;
    // this.signaturePad.set(this.signatureImage);
  }

  // canvasResize() {
  //   let canvas = document.querySelector('canvas');
  //   console.log(canvas.offsetHeight, canvas.offsetWidth)
  //   this.signaturePad.set('minWidth', 1);
  //   this.signaturePad.set('canvasWidth', canvas.offsetWidth);
  //   this.signaturePad.set('canvasHeight', canvas.offsetHeight);
  // }

  // ngAfterViewInit() {
  //   this.signaturePad.clear();
  //   this.canvasResize();
  // }

  ngOnInit() {
  }

  drawCancel() {
    this.modalCtrl.dismiss();
  }

  drawComplete() {
    this.signatureImage = this.signaturePad.toDataURL();
    this.modalCtrl.dismiss({signatureImage: this.signatureImage});
  }

  drawClear() {
    this.signaturePad.clear();
  }

}
