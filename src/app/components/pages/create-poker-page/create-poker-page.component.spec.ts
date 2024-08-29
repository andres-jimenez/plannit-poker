import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePokerPageComponent } from './create-poker-page.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateUserFormComponent } from '../../molecules/create-user-form/create-user-form.component';
import { InputComponent } from '../../atoms/input/input.component';

describe('CreatePokerPageComponent', () => {
  let component: CreatePokerPageComponent;
  let fixture: ComponentFixture<CreatePokerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        CreateUserFormComponent,
        InputComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreatePokerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
