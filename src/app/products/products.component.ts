import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common-service.service';
import { MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productList: any[] = [];
  myProduct: any[] = [];
  myProductOld: any[] = [];
  selectedCategories: any[] = [];
  
  constructor(private commonService: CommonService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService) { }

  ngOnInit() {
    this.commonService.getProducts().subscribe(data=> {
      let list = [];
      data.forEach(category => {
        let items = [];
        category.ItemList.forEach(item => {
          items.push({label: item.ItemName + (item.UnitName ? ' ('+item.UnitName+')' : ''), value: {CategoryId: category.CategoryId, ItemId: item.ItemId, UnitId: item.UnitId}});
          // items.push({label: item.ItemName+(item.UnitName?' ('+item.UnitName+')':''), value: {ItemId: item.ItemId, UnitId: item.UnitId}});
        })
        this.productList.push({label: category.CategoryName, value: {label: category.CategoryName, value: items}});
        this.selectedCategories.push({label: category.CategoryName, value: items});
      });
    });
    
    this.commonService.getMyProducts(+localStorage.getItem('SellerId')).subscribe(data=> {
      data.SellerItemList.forEach(item => {
        this.myProduct.push({CategoryId: item.CategoryId, ItemId: item.ItemId, UnitId: item.UnitId});
        // this.myProduct.push({ItemId: item.ItemId, UnitId: item.UnitId});
        this.myProductOld.push({CategoryId: item.CategoryId, ItemId: item.ItemId, UnitId: item.UnitId, SellerItemtId: item.SellerItemtId});
      });
    });
  }

  private getDiff(list1: any[], list2: any[]): any[]{
    let diff: any[] = [];
    list1.forEach(newItem => {
      let isNewItem = true;
      list2.forEach(item => {
        if(item.ItemId == newItem.ItemId && item.UnitId == newItem.UnitId && item.CategoryId == newItem.CategoryId) {
          isNewItem = false;
          return;
        }
      });
      if(isNewItem) diff.push(newItem);
    });
    return diff;
  }

  public save(){
    let itemsAdded = this.getDiff(this.myProduct, this.myProductOld);;
    let itemsRemoved = this.getDiff(this.myProductOld, this.myProduct);
    // console.log(itemsAdded, itemsRemoved);
    //save new products
    if (itemsAdded.length || itemsRemoved.length){
      let postData = {SellerId: +localStorage.getItem('SellerId'), ItemList: itemsAdded};
      if(itemsAdded.length) this.commonService.addMyProducts(postData).subscribe(data =>{
        if(data.StatusCode) {
          this.messageService.add({key: 'custom', severity:'success', summary:'Items Saved', detail:'Please proceed to set price'});
          sessionStorage.setItem('newUser', 'false');
          setTimeout(() => { this.router.navigate(['/stock']); }, 2000);
        }
        else {
          this.messageService.add({key: 'custom', severity:'error', summary:'Error', detail:'Could not save'});
        }
      });
      let postDataDelete = {SellerItemList: itemsRemoved};
      if(itemsRemoved.length) this.commonService.deleteMyProducts(postDataDelete).subscribe(data =>{
        if(data.StatusCode) {
          this.messageService.add({key: 'custom', severity:'success', summary:'Items Saved', detail:'Please proceed to set price'});
          setTimeout(() => { this.router.navigate(['/stock']); }, 2000);
        }
        else {
          this.messageService.add({key: 'custom', severity:'error', summary:'Error', detail:'Could not save'});
        }
      });
    }
    else {
      this.messageService.add({key: 'custom', severity:'error', summary:'Error', detail:'No item selected'});
    }
  }
}