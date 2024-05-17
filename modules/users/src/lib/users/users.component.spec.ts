import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersComponent } from './users.component';
import { UserService } from './shared/user.service';

import { mockUser } from './mocks/user.mock';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersComponent],
      providers: [
        {
          provide: UserService,
          useValue: {
            getUsers: () => of(mockUser),
          },
        },
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should list users', () => {
    const users: HTMLElement[] = fixture.nativeElement.querySelectorAll('li');
    expect(users.length).toBe(mockUser.length);

    users.forEach((user, index) => {
      expect(user.textContent).toContain(mockUser[index].name);
    });
    
  });
});
