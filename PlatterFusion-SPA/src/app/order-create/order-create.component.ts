import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css']
})
export class OrderCreateComponent implements OnInit {

  formattedaddress=" "; 
  constructor() { }

  ngOnInit(): void {
  }

  options={ 
    componentRestrictions:{ 
      country:["AU"] 
    } 
  } 
  public AddressChange(address: any) { 
  //setting address from API to local variable 
   this.formattedaddress=address.formatted_address 
} 

}
