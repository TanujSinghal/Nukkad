import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../common-service.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  currentPage: string = 'orders';
  orderList: any[] = [];
  myProduct: any[] = [];
  
  actionLable = {
    1: {label: 'New', color: 'goldenrod'},
    2: {label: 'Approved', color: 'orange'},
    3: {label: 'Rejected', color: 'red'},
    4: {label: 'Ready', color: 'orange'},
    5: {label: 'Out for delivery', color: 'orange'},
    6: {label: 'Delivered', color: '#13af13'},
    7: {label: 'Paid', color: '#13af13'}
  }
  types = [
    {label: 'Update Catalogue', value: 'stock'},
    {label: 'Manage Orders', value: 'orders'},
  ];
  

  constructor(private commonService: CommonService,
    private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit() {
    this.commonService.getOrderList(+localStorage.getItem('SellerId')).subscribe(data=> {
      this.orderList = data;
    });
  }
  
  public action(event){
    // if(event.Status && event.status == 1){
      this.router.navigate(['/order-process/'+event.OrderId+'/'+event.OrderStatusId]);
    // }
    console.log(event);
  }

  public navigateRoute(){
    // console.log(this.currentPage)
    this.router.navigate(['/'+this.currentPage]);
  }

}
