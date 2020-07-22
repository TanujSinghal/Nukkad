import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  apiMaster: any = {
    domain: 'http://api.owllabz.com/',
    postHeaderJson: { headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }) },
    geocodingHeader: { headers: new HttpHeaders({
      "x-rapidapi-host": "google-maps-geocoding.p.rapidapi.com",
      "x-rapidapi-key": "589185cf73mshc571651dbc9c561p11a567jsn81cf0ac74276"
    }) },
    login: 'api/Seller/LoginSeller/',
    signup: 'api/Seller/RegisterSeller/',
    validate: 'api/System/ValidateLoginId/',
    geoCoding: 'https://google-maps-geocoding.p.rapidapi.com/geocode/json?language=en&latlng=',
    update: 'api/Seller/AddUpdateSellerProfile/',
    cityList: 'api/System/CityList/',
    productMaster: 'api/System/CategoryWtihItemList/',
    addMyProducts: 'api/Seller/AddSellerItemList/',
    myProducts: 'api/Seller/GetSellerItemList/',
    updateMyProducts: 'api/Seller/UpdateSellerItemList/',
    deleteMyProducts: 'api/Seller/DeleteSellerItemList/',
    sellerInfo: 'api/Seller/GetSellerProfile/',
    orderDetails: 'api/Seller/GetSellerOrderDetails/',
    orderList: 'api/Seller/GetSellerOrderList/',
    approveOrder: 'api/Seller/UpdateOrderList/',
    updateStatus: 'api/System/UpdateOrderStatus/',

    //buyer specific
    loginB: 'api/Buyer/BuyerLogin/',
    signupB: 'api/Buyer/RegisterBuyer/',
    updateB: 'api/Buyer/AddUpdateBuyerProfile/',
    placeOrder: 'api/Buyer/PlaceOrder/',
    buyerInfo: 'api/Buyer/GetBuyerProfile/',
    buyerOrderList: 'api/Buyer/GetBuyerOrderList/',
    buyerOrderDetails: 'api/Buyer/GetBuyerOrderDetails/',
  }

  constructor(private httpClient : HttpClient) { }
  
  authenticate(formData: any): Observable<any>{
    return this.httpClient.post(this.apiMaster.domain + this.apiMaster.login, formData, this.apiMaster.postHeaderJson);
  }
  
  register(formData: any): Observable<any>{
    return this.httpClient.post(this.apiMaster.domain + this.apiMaster.signup, formData, this.apiMaster.postHeaderJson);
  }
  
  updateProfile(formData: any): Observable<any>{
    return this.httpClient.post(this.apiMaster.domain + this.apiMaster.update, formData, this.apiMaster.postHeaderJson);
  }

  validate(mobileNo, userType): Observable<any>{
    return this.httpClient.get(this.apiMaster.domain + this.apiMaster.validate + mobileNo + '/' + userType);
  }

  geoCode(): Observable<any>{
    return this.httpClient.get(this.apiMaster.geoCoding + localStorage.getItem('latlng'), this.apiMaster.geocodingHeader);
  }

  getCity(): Observable<any>{
    return this.httpClient.get(this.apiMaster.domain + this.apiMaster.cityList );
  }

  getProducts(): Observable<any>{
    return this.httpClient.get(this.apiMaster.domain + this.apiMaster.productMaster );
  }
  
  addMyProducts(formData: any): Observable<any>{
    return this.httpClient.post(this.apiMaster.domain + this.apiMaster.addMyProducts, formData, this.apiMaster.postHeaderJson);
  }
  
  getMyProducts(sellerId: number): Observable<any>{
    return this.httpClient.get(this.apiMaster.domain + this.apiMaster.myProducts + sellerId );
  }
  
  updateMyProducts(formData: any): Observable<any>{
    return this.httpClient.post(this.apiMaster.domain + this.apiMaster.updateMyProducts, formData, this.apiMaster.postHeaderJson);
  }
  
  deleteMyProducts(formData: any): Observable<any>{
    return this.httpClient.post(this.apiMaster.domain + this.apiMaster.deleteMyProducts, formData, this.apiMaster.postHeaderJson);
  }
  
  getSellerInfo(sellerId): Observable<any>{
    return this.httpClient.get(this.apiMaster.domain + this.apiMaster.sellerInfo+sellerId);
  }

  getOrderDetail(orderId: number): Observable<any>{
    return this.httpClient.get(this.apiMaster.domain + this.apiMaster.orderDetails+orderId);
  }

  getOrderList(sellerId: number): Observable<any>{
    return this.httpClient.get(this.apiMaster.domain + this.apiMaster.orderList+sellerId+'/1');
  }

  approveOrderList(formData: any): Observable<any>{
    return this.httpClient.post(this.apiMaster.domain + this.apiMaster.approveOrder, formData, this.apiMaster.postHeaderJson);
  }

  updateOrderStatus(formData: any): Observable<any>{
    return this.httpClient.post(this.apiMaster.domain + this.apiMaster.updateStatus, formData, this.apiMaster.postHeaderJson);
  }

  //buyer services
  authenticateB(formData: any): Observable<any>{
    return this.httpClient.post(this.apiMaster.domain + this.apiMaster.loginB, formData, this.apiMaster.postHeaderJson);
  }
  
  registerB(formData: any): Observable<any>{
    return this.httpClient.post(this.apiMaster.domain + this.apiMaster.signupB, formData, this.apiMaster.postHeaderJson);
  }
  
  updateProfileB(formData: any): Observable<any>{
    return this.httpClient.post(this.apiMaster.domain + this.apiMaster.updateB, formData, this.apiMaster.postHeaderJson);
  }
  
  getBuyerInfo(buyerId): Observable<any>{
    return this.httpClient.get(this.apiMaster.domain + this.apiMaster.buyerInfo+buyerId);
  }
  
  placeOrder(formData: any): Observable<any>{
    return this.httpClient.post(this.apiMaster.domain + this.apiMaster.placeOrder, formData, this.apiMaster.postHeaderJson);
  }

  getOrderDetailB(orderId: number): Observable<any>{
    return this.httpClient.get(this.apiMaster.domain + this.apiMaster.buyerOrderDetails+orderId);
  }

  getOrderListB(buyerId: number): Observable<any>{
    return this.httpClient.get(this.apiMaster.domain + this.apiMaster.buyerOrderList+buyerId+'/1/');
  }
}
