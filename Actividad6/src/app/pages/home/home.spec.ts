import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { HomeComponent } from './home';
import { UsersService } from '../../core/services/users.service';

// Mock del servicio
const mockUsersService = {
  getUsers: jasmine.createSpy('getUsers').and.returnValue(of([
    { id: 1, name: 'John Doe', email: 'john@example.com', image: '' }
  ]))
};

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HomeComponent],
      providers: [{ provide: UsersService, useValue: mockUsersService }]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
