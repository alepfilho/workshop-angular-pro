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

  it('should list users', () => {
    const users: HTMLElement[] = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(users.length).toBe(mockUser.length);

    users.forEach((tdElement, index) => {
      expect(tdElement.querySelector('.name')?.textContent).toContain(mockUser[index].name);
    });
    
  });
});
