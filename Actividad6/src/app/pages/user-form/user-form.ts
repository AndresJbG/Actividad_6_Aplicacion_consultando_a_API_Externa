import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../core/services/users.service';
import { User } from '../../core/models/users';

type AddressForm = {
  street: FormControl<string>;
  city: FormControl<string>;
};

type UserForm = {
  name: FormControl<string>;
  email: FormControl<string>;
  username: FormControl<string>;
  phone: FormControl<string>;
  website: FormControl<string>;
  image: FormControl<string>;
  address: FormGroup<AddressForm>;
};

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

  form: FormGroup<UserForm> = this.fb.group({
    name: this.fb.control('', { nonNullable: true, validators: [Validators.required] }),
    email: this.fb.control('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    username: this.fb.control('', { nonNullable: true, validators: [Validators.required] }),
    phone: this.fb.control('', { nonNullable: true }),
    website: this.fb.control('', { nonNullable: true }),
    image: this.fb.control('', { nonNullable: true, validators: [Validators.required] }),
    address: this.fb.group<AddressForm>({
      street: this.fb.control('', { nonNullable: true }),
      city: this.fb.control('', { nonNullable: true }),
    })
  });

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEdit = true;
      this.id = Number(idParam);
      this.usersSrv.getUser(this.id).subscribe(u => {
        const { name, email, username, phone, website, image, address } = u;
        this.form.patchValue({
          name: name ?? '',
          email: email ?? '',
          username: username ?? '',
          phone: phone ?? '',
          website: website ?? '',
          image: image ?? '',
          address: { street: address?.street ?? '', city: address?.city ?? '' }
        });
      });
    }
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const payload = this.form.getRawValue() as User;

    if (this.isEdit && this.id) {
      this.usersSrv.updateUser(this.id, payload).subscribe({
        next: () => { alert('Usuario actualizado (mock ok)'); this.router.navigate(['/user', this.id]); },
        error: () => alert('No se pudo actualizar')
      });
    } else {
      this.usersSrv.createUser(payload).subscribe({
        next: () => { alert('Usuario creado (mock ok)'); this.router.navigate(['/home']); },
        error: () => alert('No se pudo crear')
      });
    }
  }
}
