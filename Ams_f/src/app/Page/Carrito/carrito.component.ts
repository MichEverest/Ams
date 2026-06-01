import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../Service/cart.service';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent {
  private cartService = inject(CartService);
  
  cartItems = this.cartService.cartItems;
  total = this.cartService.cartTotal;
  cartCount = this.cartService.cartCount;

  onQuantityChange(productId: number, event: any) {
    const qty = parseInt(event.target.value, 10);
    if (!isNaN(qty)) this.cartService.updateQuantity(productId, qty);
  }

  removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
  }

  processPayment() {
    this.cartService.checkout();
  }
}