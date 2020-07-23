import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../common-service.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm: FormGroup;
  showPassword = false;
  submitted: boolean;

  constructor(private fb: FormBuilder,
    private commonService: CommonService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
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

    this.commonService.authenticate(this.loginForm.value).subscribe(
      data => {
        if(data.SellerId) {
          localStorage.setItem('SellerId', data.SellerId);
          //get profile
          this.commonService.getSellerInfo(data.SellerId).subscribe(data => {
            localStorage.setItem('SellerProfile', JSON.stringify(data[0]));
            this.router.navigate(['/stock']);
          });
        }
        else {
          this.messageService.add({key: 'custom', severity:'error', summary:'Error', detail:'Mobile number / password missmatch'});
        }
      });
  }

  public signUp(){
    if(this.loginForm.controls.MobileNo.value && this.loginForm.controls.MobileNo.valid){
      this.router.navigate(['/signup/'+this.loginForm.controls.MobileNo.value]);
    }
    else{
      this.router.navigate(['/signup']);
    }
  }

}
