import { Component, OnInit } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  totalAmount: number = 0;
  isCheckoutComplete: boolean = false;

  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe((cart) => {
      this.totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    });
  }

  completeCheckout(): void {
    this.isCheckoutComplete = true;

    // Clear the cart after 3 seconds and navigate to the homepage
    setTimeout(() => {
      this.cartService.clearCart();
      this.router.navigate(['/']);
    }, 3000);
  }
}
