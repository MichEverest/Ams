// // import { Component, OnInit, inject, signal } from '@angular/core';
// // import { CommonModule } from '@angular/common';
// // import { RouterModule } from '@angular/router';
// // import { CartService, Product } from '../../Service/cart.service'; 
// // import { CarritoComponent } from '../Carrito/carrito.component';
// // import { HistorialComprasComponent } from '../historial-compras/historial-compras.component';

// // @Component({
// //   selector: 'app-compras',
// //   standalone: true,
// //   imports: [CommonModule, RouterModule, CarritoComponent, HistorialComprasComponent],
// //   templateUrl: './compras.component.html',
// //   styleUrls: ['./compras.component.scss']
// // })
// // export class ComprasComponent implements OnInit {

// //   private cartService = inject(CartService);

// //   isSidebarOpen = signal<boolean>(false);

// //   items: any[] = [
// //     { id: 1, nombre: 'Producto X', precio: 99.99, imagen: 'https://static.wikia.nocookie.net/gensin-impact/images/d/d4/Item_Primogem.png' },
// //     { id: 2, nombre: 'X1', precio: 50.00, imagen: 'https://static.wikia.nocookie.net/gensin-impact/images/d/d4/Item_Primogem.png' },
// //     { id: 3, nombre: 'X2', precio: 25.00, imagen: 'https://static.wikia.nocookie.net/gensin-impact/images/d/d4/Item_Primogem.png' },
// //     { id: 4, nombre: 'X3', precio: 15.99, imagen: 'https://static.wikia.nocookie.net/gensin-impact/images/d/d4/Item_Primogem.png' },
// //     { id: 5, nombre: 'X4', precio: 10.00, imagen: 'https://static.wikia.nocookie.net/gensin-impact/images/d/d4/Item_Primogem.png' },
// //     { id: 6, nombre: 'X5', precio: 5.00, imagen: 'https://static.wikia.nocookie.net/gensin-impact/images/d/d4/Item_Primogem.png' }
// //   ];

// //   constructor() {}

// //   ngOnInit(): void {}

// //   toggleSidebar() {
// //     this.isSidebarOpen.update(state => !state);
// //   }

// //   onAdquirir(item: any) {
// //     console.log('Añadido al carrito Ams:', item.nombre);
    
// //     const productToCart: Product = {
// //       id: item.id,
// //       name: item.nombre,
// //       price: item.precio,
// //       image: item.imagen
// //     };

// //     this.cartService.addToCart(productToCart);
    
// //     this.isSidebarOpen.set(true);
// //   }
// // }

// import { Component, OnInit, inject, signal } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RouterModule } from '@angular/router';
// import { HttpClient, HttpClientModule } from '@angular/common/http';
// import { CartService, Product } from '../../Service/cart.service'; 
// import { CarritoComponent } from '../Carrito/carrito.component';
// import { HistorialComprasComponent } from '../historial-compras/historial-compras.component';

// @Component({
//   selector: 'app-compras',
//   standalone: true,
//   imports: [CommonModule, RouterModule, CarritoComponent, HistorialComprasComponent, HttpClientModule],
//   templateUrl: './compras.component.html',
//   styleUrls: ['./compras.component.scss']
// })
// export class ComprasComponent implements OnInit {

//   private cartService = inject(CartService);
//   private http = inject(HttpClient);

//   isSidebarOpen = signal<boolean>(false);
//   items: any[] = [];

//   constructor() {}

//   ngOnInit(): void {
//     this.obtenerProductosDelBackend();
//   }

//   obtenerProductosDelBackend() {
//     this.http.get<any[]>('http://localhost:8080/api/products').subscribe({
//       next: (data) => {
//         this.items = data;
//       },
//       error: (err) => {
//         console.error('Error al conectar con el backend de Ams:', err);
//       }
//     });
//   }

//   toggleSidebar() {
//     this.isSidebarOpen.update(state => !state);
//   }

//   onAdquirir(item: any) {
//     console.log('Añadido al carrito Ams:', item.name);
    
//     const productToCart: Product = {
//       id: item.id,
//       name: item.name,
//       price: item.price,
//       image: item.imageUrl
//     };

//     this.cartService.addToCart(productToCart);
//     this.isSidebarOpen.set(true);
//   }
// }

import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CartService, Product } from '../../Service/cart.service'; 
import { UserService } from '../../Service/user.service'; // Asegúrate de que la ruta a tu UserService sea la correcta
import { CarritoComponent } from '../Carrito/carrito.component';
import { HistorialComprasComponent } from '../historial-compras/historial-compras.component';

@Component({
  selector: 'app-compras',
  standalone: true,
  imports: [CommonModule, RouterModule, CarritoComponent, HistorialComprasComponent, HttpClientModule],
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.scss']
})
export class ComprasComponent implements OnInit {

  private cartService = inject(CartService);
  private http = inject(HttpClient);
  public userService = inject(UserService);

  isSidebarOpen = signal<boolean>(false);
  dropdownVisible = false;
  items: any[] = [];
  user: any = null;

  constructor() {}

  ngOnInit(): void {
    this.obtenerProductosDelBackend();
    
    // Escuchar el estado global del usuario logueado
    this.userService.currentUser$.subscribe(userData => {
      this.user = userData;
    });
  }

  obtenerProductosDelBackend() {
    this.http.get<any[]>('http://localhost:8080/api/products').subscribe({
      next: (data) => {
        this.items = data;
      },
      error: (err) => {
        console.error('Error al conectar con el backend de Ams:', err);
      }
    });
  }

  toggleSidebar() {
    this.isSidebarOpen.update(state => !state);
  }

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  onAdquirir(item: any) {
    console.log('Añadido al carrito Ams:', item.name);
    
    const productToCart: Product = {
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.imageUrl
    };

    this.cartService.addToCart(productToCart);
    this.isSidebarOpen.set(true);
  }
}