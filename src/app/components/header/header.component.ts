import { Component, OnInit } from '@angular/core';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  cartItemsCount: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    // Subscribe to cart changes
    this.cartService.getCartItems().subscribe((cart) => {
      this.cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);
    });
  }
}
