import { Injectable, signal, computed } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  price: number;
  image?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  date: Date;
  items: CartItem[];
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSignal = signal<CartItem[]>([]);
  private ordersSignal = signal<Order[]>([]);

  cartItems = computed(() => this.cartItemsSignal());
  orders = computed(() => this.ordersSignal());
  
  cartTotal = computed(() => {
    return this.cartItemsSignal().reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  });

  cartCount = computed(() => {
    return this.cartItemsSignal().reduce((acc, item) => acc + item.quantity, 0);
  });

  addToCart(product: Product) {
    this.cartItemsSignal.update(items => {
      const existing = items.find(i => i.product.id === product.id);
      if (existing) {
        return items.map(i => i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...items, { product, quantity: 1 }];
    });
  }

  removeFromCart(productId: number) {
    this.cartItemsSignal.update(items => items.filter(i => i.product.id !== productId));
  }

  updateQuantity(productId: number, quantity: number) {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }
    this.cartItemsSignal.update(items =>
      items.map(i => i.product.id === productId ? { ...i, quantity } : i)
    );
  }

  checkout() {
    if (this.cartItemsSignal().length === 0) return;

    const newOrder: Order = {
      id: 'SCOT-' + Math.floor(1000 + Math.random() * 9000),
      date: new Date(),
      items: [...this.cartItemsSignal()],
      total: this.cartTotal()
    };

    this.ordersSignal.update(orders => [newOrder, ...orders]);
    this.cartItemsSignal.set([]);
  }
}