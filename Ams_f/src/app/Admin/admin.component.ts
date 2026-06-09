import { Component, OnInit, AfterViewInit, inject, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Chart } from 'chart.js/auto';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, LottieComponent],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, AfterViewInit {
  private http = inject(HttpClient);
  private router = inject(Router);
  
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;

  usuarios: any[] = [];
  stats = { ingresos: 0, usuarios: 0, ventas: 0 };
  
  lottieOptions: AnimationOptions = {
    path: 'animacion.json',
  };

  ngOnInit() {
    const usuariosGuardados = localStorage.getItem('usuarios_cache');
    if (usuariosGuardados) {
      this.usuarios = JSON.parse(usuariosGuardados);
      this.stats.usuarios = this.usuarios.length;
    }

    this.obtenerUsuarios();
  }

  ngAfterViewInit() {
    this.renderChart();
  }

  obtenerUsuarios() {
    this.http.get<any[]>('http://localhost:8080/api/usuarios').subscribe({
      next: (data) => {
        this.usuarios = data;
        this.stats.usuarios = data.length;
        
        localStorage.setItem('usuarios_cache', JSON.stringify(data));
      },
      error: (err) => {
        console.error('El backend falló o hay CORS, pero conservamos la copia del LocalStorage:', err);
      }
    });
  }

  renderChart() {
    if (!this.chartCanvas || !this.chartCanvas.nativeElement) {
      return;
    }

    try {
      new Chart(this.chartCanvas.nativeElement, {
        type: 'line',
        data: {
          labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
          datasets: [{
            data: [12, 19, 3, 5, 2, 3, 10],
            borderColor: 'rgba(255,255,255,0.8)',
            tension: 0.4
          }]
        },
        options: { 
          responsive: true, 
          maintainAspectRatio: false,
          plugins: { legend: { display: false } } 
        }
      });
    } catch (error) {
      console.error('Chart.js falló al inicializarse, pero se salvó el resto de la interfaz:', error);
    }
  }

  irATienda() {
    this.router.navigate(['/compras']);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}