import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-signup-popup',
  templateUrl: './signup-popup.component.html',
  styleUrls: ['./signup-popup.component.css']
})
export class SignupPopupComponent implements OnInit {

  constructor(
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
  ) { }

  ngOnInit() {
  }

}
