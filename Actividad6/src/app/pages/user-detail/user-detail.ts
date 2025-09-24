import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../core/services/users.service';
import { User } from '../../core/models/users';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.css'
})
export class UserDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private usersSrv = inject(UsersService);

  user?: User;
  id!: number;

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.usersSrv.getUser(this.id).subscribe({
      next: u => this.user = u,
      error: () => alert('No se pudo cargar el usuario')
    });
  }

  back() { this.router.navigate(['/home']); }

  edit() { this.router.navigate(['/updateuser', this.id]); }

  remove() {
    if (confirm(`¿Eliminar el usuario ${this.id}?`)) {
      this.usersSrv.deleteUser(this.id).subscribe({
        next: () => { alert('Usuario eliminado'); this.back(); },
        error: () => alert('No se pudo eliminar')
      });
    }
  }
}
