import { Component, DoCheck, OnInit } from '@angular/core';

import { CartService } from 'src/app/service/cart.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit, DoCheck {

  public totalItem: number = 0;
  public searchTerm: string = '';
  // ishover: boolean = false;
  isLogin: boolean = true;

  constructor(private cartService: CartService, private login: LoginService) { }

  ngDoCheck(): void {
    if (localStorage.getItem('token')) {
      this.isLogin = false
    }
  }

  ngOnInit(): void {
    this.cartService.getProduct().subscribe(res => {
      if (localStorage.getItem('token')) {
        this.totalItem = res.length;
      }
    })
  }

  logOut() {
    localStorage.clear()
  }

  // openDropDown() {
  //   this.ishover = true;
  //   console.log("dsd")
  // }

  // closeDropDown() {
  //   this.ishover = false;
  // }

  search(event: any) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.cartService.search.next(this.searchTerm)
  }
}
