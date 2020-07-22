import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-order-process',
  templateUrl: './order-process.component.html',
  styleUrls: ['./order-process.component.css']
})
export class OrderProcessComponent implements OnInit {
  orderedItems: any[] = [];
  selectedItems: any[] = [];
  orderId: number = +this.route.snapshot.paramMap.get('orderId') || 0;
  status: number = +this.route.snapshot.paramMap.get('status') || 1;
  cartCount: number = 0;
  cartValue: number = 0;
  finalList: any[] = [];

  constructor(private commonService: CommonService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService) { }

  ngOnInit() {
    this.commonService.getOrderDetail(this.orderId).subscribe(data=> {
      data.forEach(item => {
        this.orderedItems.push({
          label: item.ItemName + (item.UnitName ? ' ('+item.UnitName+')' : ''), 
          value: item.OrderDetailId,
          Quantity: item.Quantity,
          Price: item.Price
        });
        this.selectedItems.push(item.OrderDetailId);
        this.cartValue += (item.Quantity * item.Price);
        this.cartCount += +item.Quantity;
      });
    });
  }

  public reCalculate(){
    this.cartValue = 0; this.cartCount = 0; this.finalList = [];
    this.orderedItems.forEach(item => {
      let itemStatus = 0;
      if(this.selectedItems.indexOf(item.value) > -1) {
        itemStatus = 1;
        this.cartValue += (item.Quantity * item.Price);
        this.cartCount += +item.Quantity;
      }
      this.finalList.push({OrderDetailId: item.value, ItemStatus: itemStatus});
    });
  }

  public save(){
    let postData = {
      OrderId: this.orderId,
      FinalTotalItem: this.cartCount,
      FinalTotalAmount: this.cartValue,
      ItemList: this.finalList
    };
      
    this.commonService.approveOrderList(postData).subscribe(data=> {
      if (data.StatusCode == 1){
        this.messageService.add({key: 'custom', severity:'success', summary:'Success', detail:'Order Accepted'});
        setTimeout(()=>{this.router.navigate(['/orders']);}, 2000)
      }
      else{
        this.messageService.add({key: 'custom', severity:'error', summary:'Error', detail:'Some Error Occured'});
      }
    });
  }

  public updateStatus(statusId){
    this.commonService.updateOrderStatus({OrderId: this.orderId, OrderStatusId: statusId}).subscribe(data=> {
      if (data.StatusCode == 1){
        this.messageService.add({key: 'custom', severity:'info', summary:'Rejected', detail:'Order Rejected'});
        setTimeout(()=>{this.router.navigate(['/orders']);}, 2000)
      }
      else{
        this.messageService.add({key: 'custom', severity:'error', summary:'Error', detail:'Some Error Occured'});
      }
    });
  }

}
