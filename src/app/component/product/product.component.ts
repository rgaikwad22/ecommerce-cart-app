import { Component, OnInit } from '@angular/core';

import { CartService } from 'src/app/service/cart.service';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {

  public filterCategory: any;
  public productList: any;
  searchKey: string = "";

  constructor(private api: ApiService, private cartService: CartService) { }

  ngOnInit(): void {
    this.api.getProduct()
    .subscribe(res=>{
      this.productList=res;
      this.filterCategory=res;
      this.productList.forEach((a:any) => {
        if(a.category=="women's clothing" || a.category=="men's clothing"){
          a.category="fashion";
        }
        Object.assign(a,{quantity:1,total:a.price});
      });
    });

    this.cartService.search.subscribe((val:any)=>{
      this.searchKey=val;
    })
  }

  addtocart(item: any) {
    this.cartService.addtoCart(item);
  }

  filter(category: string) {
    this.filterCategory = this.productList
    .filter((a: any) => {
      if (category == a.category || category == ' ') {
        return a;
      }
      })
  }
}