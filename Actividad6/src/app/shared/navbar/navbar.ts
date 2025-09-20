// src/app/shared/navbar/navbar.ts
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',               // <--- DEBE ser app-root (coincide con index.html)
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {
  // smoke test
  constructor() { console.log('Navbar cargado'); }
}
