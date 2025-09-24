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
    email: ['', [Validators.required, Validators.email]],
    username: ['', Validators.required],
    phone: [''],
    website: [''],
    image: ['', Validators.required],
    address: this.fb.group({
      street: [''],
      city: ['']
    })
  });

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEdit = true;
      this.id = Number(idParam);
      this.usersSrv.getUser(this.id).subscribe(u => {
        // precarga del formulario
        const { name, email, username, phone, website, image, address } = u;
        this.form.patchValue({
          name: name || '',
          email: email || '',
          username: username || '',
          phone: phone || '',
          website: website || '',
          image: image || '',
          address: { street: address?.street || '', city: address?.city || '' }
        });
      });
    }
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const payload = this.form.value as User;

    if (this.isEdit && this.id) {
      this.usersSrv.updateUser(this.id, payload).subscribe({
        next: (res) => { alert('Usuario actualizado (mock ok)'); this.router.navigate(['/user', this.id]); },
        error: () => alert('No se pudo actualizar')
      });
    } else {
      this.usersSrv.createUser(payload).subscribe({
        next: (res) => { alert('Usuario creado (mock ok)'); this.router.navigate(['/home']); },
        error: () => alert('No se pudo crear')
      });
    }
  }
}
