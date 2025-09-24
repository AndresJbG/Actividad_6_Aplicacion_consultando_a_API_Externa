import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from '../../core/services/users.service';
import { User } from '../../core/models/users';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {
  private usersSrv = inject(UsersService);
  private router = inject(Router);

  users: User[] = [];
  loading = false;

  ngOnInit(): void {
    this.fetch();
  }

  fetch(): void {
    this.loading = true;
    this.usersSrv.getUsers().subscribe({
      next: (u) => { this.users = u; this.loading = false; },
      error: () => { this.loading = false; alert('Error cargando usuarios'); }
    });
  }

  view(id?: number) {
    if (!id) return;
    this.router.navigate(['/user', id]);
  }

  edit(id?: number) {
    if (!id) return;
    this.router.navigate(['/updateuser', id]);
  }

  remove(id?: number) {
    if (!id) return;
    if (confirm(`¿Seguro que deseas eliminar el usuario ${id}?`)) {
      this.usersSrv.deleteUser(id).subscribe({
        next: () => { alert('Usuario eliminado'); this.fetch(); },
        error: () => alert('No se pudo eliminar')
      });
    }
  }
}
