import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginbComponent } from '../loginb/loginb.component';
import { DialogService } from 'primeng/dynamicdialog';
import { SignupbComponent } from '../signupb/signupb.component';
import { LoginPopupComponent } from '../popup/login-popup/login-popup.component';
import { MessageService } from 'primeng/api';
import { SignupPopupComponent } from '../popup/signup-popup/signup-popup.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [DialogService]
})
export class CartComponent implements OnInit {
  

  cart: any = JSON.parse(sessionStorage.getItem('cart')) || {};
  productList: any[] = [];
  cartObj: any[] = [];
  sellerId: number = +this.route.snapshot.paramMap.get('sellerId') || 0;
  buyerId: number = +localStorage.getItem('BuyerId') || 0;
  cartCount: number = 0;
  cartValue: number = 0;
  sellerInfo: any = {};
  buyerInfo: any = {};
  displayDialog: boolean = false;

  constructor(
    private commonService: CommonService,
    private router: Router,
    private route: ActivatedRoute,
    public dialogService: DialogService,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    this.cartCount = Object.keys(this.cart).reduce((sum,key)=>sum+(this.cart[key]||0),0);
    this.commonService.getMyProducts(this.sellerId).subscribe(data=> {
      let items = [];
      data.SellerItemList.forEach(item => {
        if(this.cart[item.SellerItemtId]){
          let model = {SellerItemtId: item.SellerItemtId, Price: item.Price, Quantity: this.cart[item.SellerItemtId]};
          items.push({label: item.ItemName + (item.UnitName ? ' ('+item.UnitName+')' : ''), value: model});
          this.cartValue += (this.cart[item.SellerItemtId] * item.Price);
          this.cartObj.push(model);
        }
      });
      this.productList = items;

      this.getSellerInfo();
      this.getBuyerInfo();
    });
  }

  public getSellerInfo(){
    this.commonService.getSellerInfo(this.sellerId).subscribe(data=> {
      this.sellerInfo = data[0];
    });
  }

  public getBuyerInfo(){
    if (this.buyerId) this.commonService.getBuyerInfo(this.buyerId).subscribe(data=> {
      this.buyerInfo = data[0];
    });
  }

  public login(){
    const ref = this.dialogService.open(LoginPopupComponent, {
        header: 'Login to Proceed',
        width: '100%',
        height:'100%',
        contentStyle: {height:'100%'}
    });
    
    ref.onClose.subscribe((data) => {
      console.log('1',data);      
      this.buyerId = +localStorage.getItem('BuyerId') || 0; 
      if (this.buyerId) {
        this.getBuyerInfo();
      }
      else {
        setTimeout(() => {
          const signUpRef = this.dialogService.open(SignupPopupComponent, {
            data: data,
            header: 'Register as New',
            width: '100%',
            height:'100%',
            contentStyle: {height:'100%'}
          }); 
          signUpRef.onClose.subscribe((data) => {
            console.log('2',data);
            this.buyerId = +localStorage.getItem('BuyerId') || 0; 
            if (this.buyerId){
              this.getBuyerInfo();
            }
            else {
              this.messageService.add({key: 'custom', severity:'error', summary:'Error', detail:'Some error occured'});
            }
          });
        }, 500);
      }
    });
  }

  public save(){
    console.log(this.cart);
    if (this.buyerId){
      this.placeOrder();
      return;
    }
    const ref = this.dialogService.open(LoginPopupComponent, {
        header: 'Login to Proceed',
        width: '100%',
        height:'100%',
        contentStyle: {height:'100%'}
    });
    
    ref.onClose.subscribe((data) => {
      console.log('1',data);      
      this.buyerId = +localStorage.getItem('BuyerId') || 0; 
      if (this.buyerId) {
        this.placeOrder();
      }
      else {
        setTimeout(() => {
          const signUpRef = this.dialogService.open(SignupPopupComponent, {
            data: data,
            header: 'Register as New',
            width: '100%',
            height:'100%',
            contentStyle: {height:'100%'}
          }); 
          signUpRef.onClose.subscribe((data) => {
            console.log('2',data);
            this.buyerId = +localStorage.getItem('BuyerId') || 0; 
            if (this.buyerId){
              this.placeOrder();
            }
            else {
              this.messageService.add({key: 'custom', severity:'error', summary:'Error', detail:'Some error occured'});
            }
          });
        }, 500);
      }
    });
  }

  private placeOrder(){
    let postData = {
      SellerId: this.sellerId,
      BuyerId: this.buyerId,
      TotalItem: this.cartCount,
      TotalAmount: this.cartValue,
      ItemList: this.cartObj
    };
    console.log(postData);
    this.commonService.placeOrder(postData).subscribe(data=> {
      console.log(data);
      if(data){
        let orderId = data.OrderId || 1;
        this.router.navigate(['/order-success/'+orderId]);
        sessionStorage.removeItem('cart');
      }
      else {
        this.messageService.add({key: 'custom', severity:'error', summary:'Error', detail:'Failed to place order'});
      }
    });
  }

}