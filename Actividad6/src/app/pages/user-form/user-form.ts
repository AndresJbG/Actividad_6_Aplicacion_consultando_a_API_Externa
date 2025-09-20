import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../core/services/users.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {
  isEdit = false;
  id?: number;

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    image: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEdit = true;
      this.id = Number(idParam);
      this.usersService.getUser(this.id).subscribe(user => {
        this.form.patchValue(user);
      });
    }
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.isEdit && this.id) {
      this.usersService.updateUser(this.id, this.form.value as any).subscribe(() => {
        this.router.navigate(['/user', this.id]);
      });
    } else {
      this.usersService.createUser(this.form.value as any).subscribe(() => {
        this.router.navigate(['/home']);
      });
    }
  }
}
