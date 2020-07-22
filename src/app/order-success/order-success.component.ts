import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})

export class OrderSuccessComponent implements OnInit {
orderId: number = +this.route.snapshot.paramMap.get('orderId') || 0;

  constructor(
    private route: ActivatedRoute,
    ) { }

  ngOnInit() {
  }

}
