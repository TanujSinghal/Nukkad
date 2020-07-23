import { Component, Inject } from '@angular/core';
import {SpinnerService} from './spinner.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
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
  sellerId: number = 0;
  sellerName: string = '';
  cartCount: number = 0;
  currentComponent: string = '';
  showPopup: boolean = false;

  constructor(
    // @Inject(DOCUMENT) private document: Document, 
    public spinnerService: SpinnerService,
    private router: Router,
    private messageService: MessageService,
    ) {}

  ngOnInit(){
    // this.document.body.classList.add('dark-theme');
  }

  onActivate(component){
    this.sellerId = +localStorage.getItem('SellerId') || 0;
    this.sellerName = localStorage.getItem('SellerProfile') ? JSON.parse(localStorage.getItem('SellerProfile')).SellerName : '';
    console.log(this.sellerId,this.sellerName);
    this.currentComponent = component.split('Component')[0];
    console.log(this.currentComponent);
    this.showHeader = ['Login', 'Signup'].indexOf(this.currentComponent) > -1 ? false : true;
  }

  public logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  public toggle(){
    this.showMenu = !this.showMenu;
  }

  public copyLink(inputElement){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
    this.showPopup=false;
    this.messageService.add({key: 'custom', severity:'success', summary:'Copied', detail:'Catalogue link copied to clipbord'});
  }
}
