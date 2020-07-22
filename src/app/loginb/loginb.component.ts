import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../common-service.service';

@Component({
  selector: 'app-loginb',
  templateUrl: './loginb.component.html',
  styleUrls: ['./loginb.component.css'],
})
export class LoginbComponent implements OnInit {

  @Input() ref: any;
  loginForm: FormGroup;
  showPassword = false;
  submitted: boolean;

  constructor(private fb: FormBuilder,
    private commonService: CommonService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    ) { }

  ngOnInit() {

    this.loginForm = this.fb.group({
      'MobileNo': new FormControl('', Validators.required),
      'Password': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
    });
  }

  public login(){
    console.log(this.loginForm.value);
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    
    this.submitted = false;

    this.commonService.authenticateB(this.loginForm.value).subscribe(
      data => {
        if(data.BuyerId) {
          localStorage.setItem('BuyerId', data.BuyerId);
          this.messageService.add({key: 'custom', severity:'success', summary:'Success', detail:'Login Successful'});
          setTimeout(() => {
            if (this.ref) {
              this.ref.close(data);
            }
            else {
              //navigate to buyer dashboard
            }
          }, 2000);
        }
        else {
          this.messageService.add({key: 'custom', severity:'error', summary:'Error', detail:'Mobile number / password missmatch'});
        }
      });
  }

  public signUp(){

    if(this.loginForm.controls.MobileNo.value && this.loginForm.controls.MobileNo.valid){
      if(this.ref){
        this.ref.close({MobileNo: this.loginForm.controls.MobileNo.value});
      }
      else {
        this.router.navigate(['/signup-b/'+this.loginForm.controls.MobileNo.value]);
      }
    }
    else{
      if(this.ref){
        this.ref.close({MobileNo: ''});
      }
      else {
        this.router.navigate(['/signup-b']);
      }
    }
  }
}