import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder, ValidatorFn } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CommonService } from '../common-service.service';
import { LocationService } from '../location.service';
import { ActivatedRoute, Router } from '@angular/router';

function passwordMatchValidator(password: string): ValidatorFn {
  return (control: FormControl) => {
    if (!control || !control.parent) {
      return null;
    }
    return control.parent.get(password).value === control.value ? null : { mismatch: true };
  };
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  signupForm1: FormGroup;
  profileForm: FormGroup;
  showPassword = false;
  viewState: number = 0;
  submitted: boolean;
  sellerId: number = +localStorage.getItem('SellerId') || 0;
  items = [
    {label: ''},
    {label: ''},
    {label: ''},
  ];
  cityList: any[] = [
    {label: 'Noida', value : 2},
    {label: 'Greater Noida', value : 3},
    {label: 'Others', value : 1},
  ]

  constructor(private fb: FormBuilder,
    private commonService: CommonService,
    private locationService: LocationService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
    ) { }

  ngOnInit() {
    let mobile = this.route.snapshot.paramMap.get('mobile') || '';

    this.signupForm = this.fb.group({
      'MobileNo': new FormControl(mobile, Validators.required),
    });

    this.signupForm1 = this.fb.group({
      'MobileNo': new FormControl('', Validators.required),
      'Password': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
      'RePassword': new FormControl('', Validators.compose([Validators.required, passwordMatchValidator('Password')])),
    });

    this.locationService.getPosition().then(pos=>{
      localStorage.setItem('latlng', pos.lat + ',' + pos.lng);
    });

    this.profileForm = this.fb.group({
      'SellerId': new FormControl(+localStorage.getItem('SellerId')),
      'SellerName': new FormControl('', Validators.required),
      'ShopName': new FormControl('', Validators.required),
      'Address': new FormControl('', Validators.required),
      'CityId': new FormControl('', Validators.required),
      'Email': new FormControl('', Validators.required),
      'ContactNo': new FormControl(localStorage.getItem('MobileNo'), Validators.required),
      'IsHomeDelevery': new FormControl(true, Validators.required),
    });

    this.populateCity();

    if(this.sellerId > 0) {
      this.getSellerInfo();
      this.viewState = 2;
    }
  }

  public getSellerInfo(){
    this.commonService.getSellerInfo(this.sellerId).subscribe(data=> {
      this.profileForm.controls.SellerId.setValue(data[0].SellerId);
      this.profileForm.controls.SellerName.setValue(data[0].SellerName);
      this.profileForm.controls.ShopName.setValue(data[0].ShopName);
      this.profileForm.controls.Address.setValue(data[0].Address);
      this.profileForm.controls.CityId.setValue(data[0].CityId);
      this.profileForm.controls.Email.setValue(data[0].Email);
      this.profileForm.controls.ContactNo.setValue(data[0].ContactNo);
      this.profileForm.controls.IsHomeDelevery.setValue(data[0].IsHomeDelevery);
    });
  }

  private populateCity(){
    this.commonService.getCity().subscribe(data=> {
      let list = [];
      data.forEach(element => {
          list.push({label: element.CityName, value: element.CityId});
      });
      this.cityList = list;
    });
  }

  public submit(){
    
    console.log(this.signupForm.value);
    this.submitted = true;
    if (this.signupForm.invalid) {
      return;
    }
    
    this.submitted = false;

    this.commonService.validate(this.signupForm.controls.MobileNo.value, 'SELLER').subscribe(
      data => {
        if(data.StatusCode == 1) {
          this.messageService.add({key: 'custom', severity:'error', summary:'Error', detail:'User exist with this mobile number'});
         }
        else {
          let MobileNo = this.signupForm.controls.MobileNo.value;
          this.signupForm1.controls.MobileNo.setValue(MobileNo);
          localStorage.setItem('MobileNo', MobileNo);
          this.viewState++;
        }
      });
  }

  public submit1(){
    console.log(this.signupForm1.value);
    this.submitted = true;
    if (this.signupForm1.invalid) {
      return;
    }
    
    this.submitted = false;

    let postData = {
      MobileNo : this.signupForm1.value.MobileNo,
      Password : this.signupForm1.value.Password,
      Latitude : localStorage.getItem('latlng').split(',')[0],
      Longitude : localStorage.getItem('latlng').split(',')[1]
    }

    this.commonService.register(postData).subscribe(
      data => {
        if(data.SellerId > 0) {
          this.messageService.add({key: 'custom', severity:'success', summary:'Success', detail:'User created'});
          localStorage.setItem('SellerId', data.SellerId);
          this.sellerId = data.SellerId;
          this.profileForm.controls.SellerId.setValue(this.sellerId);
          this.profileForm.controls.ContactNo.setValue(localStorage.getItem('MobileNo'));
          // this.commonService.geoCode().subscribe(data=> {
          //   console.log(data);
          //   this.profileForm.controls.Address.setValue(data.results[0].formatted_address)
          // });

          this.viewState++;
        }
        else {
          this.messageService.add({key: 'custom', severity:'error', summary:'Error', detail:'Some error occured'});
        }
      });
  }
  
  public submit2(){
    
    console.log(this.profileForm.value);
    this.submitted = true;
    if (this.profileForm.invalid) {
      return;
    }
    
    this.submitted = false;

    this.commonService.updateProfile(this.profileForm.value).subscribe(
      data => {
        if(data.StatusCode == 0) {
          this.messageService.add({key: 'custom', severity:'error', summary:'Error', detail:'Some error occured'});
        }
        else {
          this.messageService.add({key: 'custom', severity:'success', summary:'Success', detail:'Saved Successfully'});
          setTimeout(() => { this.router.navigate(['/stock']); }, 2000);
        }
      });
  }
}
