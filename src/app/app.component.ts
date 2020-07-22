import { Component, Inject } from '@angular/core';
import {SpinnerService} from './spinner.service';
// import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'buyerApp';
  showHeader: boolean = true;
  showMenu:boolean;
  sellerId: number = +localStorage.getItem('SellerId') || 0;
  cartCount: number = 0;
  currentComponent: string = '';

  constructor(
    // @Inject(DOCUMENT) private document: Document, 
    public spinnerService: SpinnerService,
    ) {}

  ngOnInit(){
    // this.document.body.classList.add('dark-theme');
  }

  onActivate(component){
    this.currentComponent = component.split('Component')[0];
    this.showHeader = ['Login', 'Signup'].indexOf(this.currentComponent) > -1 ? false : true;
  }
}
