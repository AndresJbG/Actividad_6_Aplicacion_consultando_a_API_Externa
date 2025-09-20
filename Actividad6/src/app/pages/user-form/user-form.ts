import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../core/services/users.service';
import { User } from '../../core/models/user';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.html',      // <-- nombres reales
  styleUrls: ['./user-form.css']        // <-- plural
})
export class UserFormComponent implements OnInit {
  isEdit = false;
  id?: number;

  // declaramos la variable y la inicializamos en el constructor/ngOnInit (para no usar 'fb' antes de tiempo)
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    // inicializa aquí el form (ya existe this.fb)
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      image: ['', Validators.required]
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEdit = true;
      this.id = Number(idParam);
      this.usersService.getUser(this.id).subscribe((user: User) => {
        this.form.patchValue(user);
      });
    }
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = this.form.value as User;

    if (this.isEdit && this.id) {
      this.usersService.updateUser(this.id, payload).subscribe(() => {
        this.router.navigate(['/user', this.id]);
      });
    } else {
      this.usersService.createUser(payload).subscribe(() => {
        this.router.navigate(['/home']);
      });
    }
  }
}
