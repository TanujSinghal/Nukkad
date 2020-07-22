  import { Component, OnInit } from '@angular/core';
  import { CommonService } from '../common-service.service';
  import { MessageService } from 'primeng/api';
  import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  productList: any[] = [];
  myProduct: any[] = [];
  currentPage: string = 'stock';
  newUser: boolean = sessionStorage.getItem('newUser') ? false: true;
  
  types = [
    {label: 'Update Catalogue', value: 'stock'},
    {label: 'Manage Orders', value: 'orders'},
  ];
  
  constructor(private commonService: CommonService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
    ) { }

  ngOnInit() {
    this.commonService.getMyProducts(+localStorage.getItem('SellerId')).subscribe(data=> {
      let items = [];
      data.SellerItemList.forEach(item => {
        let model = {SellerItemtId: item.SellerItemtId, IsAvailable: item.IsAvailable, Price: item.Price};
        items.push({label: item.ItemName + (item.UnitName ? ' ('+item.UnitName+')' : ''), value: model});
        this.myProduct.push(model);
      })
      if (items.length){
        sessionStorage.setItem('newUser', 'false');
        this.newUser = false;
      }
      this.productList = items;
    });
  }

  public navigateRoute(){
    // console.log(this.currentPage)
    this.router.navigate(['/'+this.currentPage]);
  }

  public save(){
    let postData = {ItemList: this.myProduct};
    if (this.myProduct.length){
      this.commonService.updateMyProducts(postData).subscribe(data =>{
        if(data.StatusCode) {
          this.messageService.add({key: 'custom', severity:'success', summary:'Details Saved', detail:'Keep your catalog up to date'});
        }
        else {
          this.messageService.add({key: 'custom', severity:'error', summary:'Error', detail:'Could not save'});
        }
      });
    }
    else {
      this.messageService.add({key: 'custom', severity:'error', summary:'Error', detail:'Some error occured. Please leave a feedback'});
    }
  }
}
