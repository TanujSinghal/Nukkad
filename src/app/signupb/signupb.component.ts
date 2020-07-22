import { Component, OnInit, Input } from '@angular/core';
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
  selector: 'app-signupb',
  templateUrl: './signupb.component.html',
  styleUrls: ['./signupb.component.css']
})
export class SignupbComponent implements OnInit {

  @Input() ref: any;
  @Input() config: any;
  signupForm: FormGroup;
  signupForm1: FormGroup;
  profileForm: FormGroup;
  showPassword = false;
  viewState: number = 0;
  submitted: boolean;
  buyerId: number = +localStorage.getItem('BuyerId') || 0;
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
    // console.log(this.config);
    let mobile = this.route.snapshot.paramMap.get('mobile') || (this.config ? this.config.data.MobileNo : '');

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
      'BuyerId': new FormControl(+localStorage.getItem('BuyerId')),
      'BuyerName': new FormControl('', Validators.required),
      'Address': new FormControl('', Validators.required),
      'CityId': new FormControl('', Validators.required),
      'Email': new FormControl('', Validators.required),
      'ContactNo': new FormControl(localStorage.getItem('MobileNoB'), Validators.required),
    });

    this.populateCity();

    if(this.buyerId > 0) {
      this.getBuyerInfo();
      this.viewState = 2;
    }
  }

  private getBuyerInfo(){
    this.commonService.getBuyerInfo(this.buyerId).subscribe(data=> {
      this.profileForm.controls.BuyerId.setValue(data[0].BuyerId);
      this.profileForm.controls.BuyerName.setValue(data[0].BuyerName);
      this.profileForm.controls.Address.setValue(data[0].Address);
      this.profileForm.controls.CityId.setValue(data[0].CityId);
      this.profileForm.controls.Email.setValue(data[0].Email);
      this.profileForm.controls.ContactNo.setValue(data[0].ContactNo);
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

    this.commonService.validate(this.signupForm.controls.MobileNo.value, 'BUYER').subscribe(
      data => {
        if(data.StatusCode == 1) {
          this.messageService.add({key: 'custom', severity:'error', summary:'Error', detail:'User exist with this mobile number'});
         }
        else {
          let MobileNo = this.signupForm.controls.MobileNo.value;
          this.signupForm1.controls.MobileNo.setValue(MobileNo);
          localStorage.setItem('MobileNoB', MobileNo);
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

    this.commonService.registerB(postData).subscribe(
      data => {
        if(data.BuyerId > 0) {
          this.messageService.add({key: 'custom', severity:'success', summary:'Success', detail:'User created'});
          localStorage.setItem('BuyerId', data.BuyerId);
          this.buyerId = data.BuyerId;
          this.profileForm.controls.BuyerId.setValue(this.buyerId);
          this.profileForm.controls.ContactNo.setValue(localStorage.getItem('MobileNoB'));
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

    this.commonService.updateProfileB(this.profileForm.value).subscribe(
      data => {
        if(data.StatusCode == 0) {
          this.messageService.add({key: 'custom', severity:'error', summary:'Error', detail:'Some error occured'});
        }
        else {
          this.messageService.add({key: 'custom', severity:'success', summary:'Success', detail:'Saved Successfully'});
          setTimeout(() => {
            if(this.ref){
              this.ref.close(data);
            }
            else {
              this.router.navigate(['/search']);
            }
          }, 2000);
        }
      });
  }
}
