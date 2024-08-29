import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePokerFormComponent } from './create-poker-form.component';
import { FormsModule } from '@angular/forms';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../../atoms/input/input.component';
import { CreateUserFormComponent } from '../create-user-form/create-user-form.component';

describe('CreatePokerFormComponent', () => {
  let component: CreatePokerFormComponent;
  let fixture: ComponentFixture<CreatePokerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        CreatePokerFormComponent,
        CreateUserFormComponent,
        InputComponent,
      ],
      providers: [ValidatorsService],
    }).compileComponents();

    fixture = TestBed.createComponent(CreatePokerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show poker name input error and disable button if some validation doest not pass', () => {
    const inputElement =
      fixture.debugElement.nativeElement.querySelector('input');

    inputElement.value = 'Sprint #33';
    inputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    const errorMessageElement =
      fixture.debugElement.nativeElement.querySelector('span');
    const submitButton =
      fixture.debugElement.nativeElement.querySelector('button');

    expect(errorMessageElement.textContent.trim()).toBe(
      'El nombre no puede contener los siguientes caracteres: _,.*#/-'
    );
    expect(submitButton.disabled).toBeTrue();
  });

  it('should enable submit button if poker name is valid', () => {
    const inputElement =
      fixture.debugElement.nativeElement.querySelector('input');

    inputElement.value = 'Sprint 33';
    inputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    const submitButton =
      fixture.debugElement.nativeElement.querySelector('button');

    expect(submitButton.disabled).toBeFalse();
  });
});
