import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../common-service.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  orderId: number = +this.route.snapshot.paramMap.get('orderId') || 0;
  productList: any[] = [];
  cartValue: number = 0;
  cartCount: number = 0;

  constructor(
    private route: ActivatedRoute,
    private commonService: CommonService,
  ) { }

  ngOnInit() {
    this.commonService.getOrderDetail(this.orderId).subscribe(data=> {
      let items = [];
      data.forEach(item => {
          this.cartValue += (item.Quantity * item.Price);
          this.cartCount += +item.Quantity;
      });
      this.productList = data;
    });
  }

  public cancel(){

  } 
}
