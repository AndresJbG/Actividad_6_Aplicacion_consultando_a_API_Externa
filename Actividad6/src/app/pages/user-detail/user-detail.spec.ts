import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { UserDetailComponent } from './user-detail';
import { UsersService } from '../../core/services/users.service';
import { CommonModule } from '@angular/common';

// Mock del servicio
const mockUsersService = {
  getUser: jasmine.createSpy('getUser').and.returnValue(
    of({ id: 1, name: 'John', email: 'john@example.com' })
  ),
  deleteUser: jasmine.createSpy('deleteUser').and.returnValue(of({}))
};

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule,   
        UserDetailComponent         
      ],
      providers: [
        { provide: UsersService, useValue: mockUsersService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ id: '1' })
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
