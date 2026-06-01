import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService, Product } from '../../Service/cart.service'; 
import { CarritoComponent } from '../Carrito/carrito.component';
import { HistorialComprasComponent } from '../historial-compras/historial-compras.component';

@Component({
  selector: 'app-compras',
  standalone: true,
  imports: [CommonModule, RouterModule, CarritoComponent, HistorialComprasComponent],
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.scss']
})
export class ComprasComponent implements OnInit {

  private cartService = inject(CartService);

  isSidebarOpen = signal<boolean>(false);

  items: any[] = [
    { id: 1, nombre: 'Producto X', precio: 99.99, imagen: 'https://static.wikia.nocookie.net/gensin-impact/images/d/d4/Item_Primogem.png' },
    { id: 2, nombre: 'X1', precio: 50.00, imagen: 'https://static.wikia.nocookie.net/gensin-impact/images/d/d4/Item_Primogem.png' },
    { id: 3, nombre: 'X2', precio: 25.00, imagen: 'https://static.wikia.nocookie.net/gensin-impact/images/d/d4/Item_Primogem.png' },
    { id: 4, nombre: 'X3', precio: 15.99, imagen: 'https://static.wikia.nocookie.net/gensin-impact/images/d/d4/Item_Primogem.png' },
    { id: 5, nombre: 'X4', precio: 10.00, imagen: 'https://static.wikia.nocookie.net/gensin-impact/images/d/d4/Item_Primogem.png' },
    { id: 6, nombre: 'X5', precio: 5.00, imagen: 'https://static.wikia.nocookie.net/gensin-impact/images/d/d4/Item_Primogem.png' }
  ];

  constructor() {}

  ngOnInit(): void {}

  toggleSidebar() {
    this.isSidebarOpen.update(state => !state);
  }

  onAdquirir(item: any) {
    console.log('Añadido al carrito Ams:', item.nombre);
    
    const productToCart: Product = {
      id: item.id,
      name: item.nombre,
      price: item.precio,
      image: item.imagen
    };

    this.cartService.addToCart(productToCart);
    
    this.isSidebarOpen.set(true);
  }
}