import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../core/services/users.service';
import { User } from '../../core/models/users';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css'
})
export class UserFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private usersSrv = inject(UsersService);

  isEdit = false;
  id?: number;

  form = this.fb.group({
    name: ['', Validators.required],
    lastname: ['', Validators.required],     // 👈 coincide con el mock
    email: ['', [Validators.required, Validators.email]],
    image: ['', Validators.required]
  });

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEdit = true;
      this.id = Number(idParam);
      this.usersSrv.getUser(this.id).subscribe(u => {
        this.form.patchValue({
          name: u.name ?? '',
          lastname: (u as any).lastname ?? u.username ?? '', // fallback si no existe en API
          email: u.email ?? '',
          image: u.image ?? ''
        });
      });
    }
  }

  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const payload = this.form.value as User;

    if (this.isEdit && this.id) {
      this.usersSrv.updateUser(this.id, payload).subscribe({
        next: () => { alert('Usuario actualizado'); this.router.navigate(['/user', this.id]); },
        error: () => alert('No se pudo actualizar')
      });
    } else {
      this.usersSrv.createUser(payload).subscribe({
        next: () => { alert('Usuario creado'); this.router.navigate(['/home']); },
        error: () => alert('No se pudo crear')
      });
    }
  }
}
