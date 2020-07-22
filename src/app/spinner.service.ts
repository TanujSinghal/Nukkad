import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  showSpinner: boolean = false;

  hide() {
    // setTimeout(()=>{ this.showSpinner = false },100);
    this.showSpinner = false;
  }

  show() {
    setTimeout(()=>{ this.showSpinner = true },0);
  }
}