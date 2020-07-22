import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common-service.service';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {

  productList: any[] = [];
  selectedItem: any = {label:'', value:{SellerItemtId: 0, IsAvailable: true, Price: 0}};
  displayDialog:boolean = false;
  sellerId: number = +this.route.snapshot.paramMap.get('sellerId') || 0;
  cart: any = {};
  sellerInfo: any = {};

  constructor(
    private commonService: CommonService,
    private route: ActivatedRoute,
    private parent: AppComponent,
  ) { }

  ngOnInit() {
    setTimeout(() => { this.parent.sellerId = this.sellerId; }, 0);
    this.commonService.getMyProducts(this.sellerId).subscribe(data=> {
      let items = [];
      data.SellerItemList.forEach(item => {
        let model = {SellerItemtId: item.SellerItemtId, IsAvailable: item.IsAvailable, Price: item.Price};
        items.push({label: item.ItemName + (item.UnitName ? ' ('+item.UnitName+')' : ''), value: model});
        this.cart[item.SellerItemtId] = 0;
      });
      this.productList = items;
      this.cart = sessionStorage.getItem('cart') ? JSON.parse(sessionStorage.getItem('cart')) : this.cart;
      this.evaluateCount();
      this.getSellerInfo();
    });
  }

  public getSellerInfo(){
    this.commonService.getSellerInfo(this.sellerId).subscribe(data=> {
      this.sellerInfo = data[0];
    });
  }

  public evaluateCount(){
    this.parent.cartCount = Object.keys(this.cart).reduce((sum,key)=>sum+(this.cart[key]||0),0);
    sessionStorage.setItem('cart', JSON.stringify(this.cart));
  }
  
  selectCar(event: Event, item) {
    this.selectedItem = item;
    this.displayDialog = true;
    event.preventDefault();
  }

  onDialogHide() {
      this.selectedItem = null;
  }

  public save(){
    console.log(this.cart);
  }

}
