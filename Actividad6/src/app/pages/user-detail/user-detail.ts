import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../core/services/users.service';
import { User } from '../../core/models/user';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './user-detail.html',   // <-- nombres REALES de tus archivos
  styleUrls: ['./user-detail.css']     // <-- plural
})
export class UserDetailComponent implements OnInit {
  user?: User;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')); // <-- sin "value:" ni "name:"
    this.loading = true;

    this.usersService.getUser(id).subscribe({
      next: (data: User) => {
        this.user = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  back(): void {
    this.router.navigate(['/home']); // <-- sin "commands:"
  }
}
