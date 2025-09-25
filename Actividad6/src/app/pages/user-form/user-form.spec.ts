import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { UserFormComponent } from './user-form';
import { UsersService } from '../../core/services/users.service';

// --- Mocks del servicio que usa el componente ---
const mockUsersService = {
  getUser: jasmine.createSpy('getUser').and.returnValue(
    of({ id: 1, name: 'John', email: 'john@example.com', image: '' })
  ),
  createUser: jasmine.createSpy('createUser').and.returnValue(of({})),
  updateUser: jasmine.createSpy('updateUser').and.returnValue(of({}))
};

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, UserFormComponent],
      providers: [
        { provide: UsersService, useValue: mockUsersService },

        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: new Map() } } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
