import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputComponent } from './input.component';
import { By } from '@angular/platform-browser';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render label correctly', () => {
    component.label = 'Input de prueba';

    fixture.detectChanges();

    const labelElement =
      fixture.debugElement.nativeElement.querySelector('label');

    expect(labelElement.textContent.trim()).toBe('Input de prueba');
  });

  it('should call on change function', () => {
    spyOn(component, 'onChange');

    const inputElement =
      fixture.debugElement.nativeElement.querySelector('input');

    inputElement.value = 'Prueba';
    inputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(component.onChange).toHaveBeenCalled();
  });

  it('should render error message if is invalid input', () => {
    component.isInvalid = true;
    component.errorMessage = 'Error';

    fixture.detectChanges();

    const errorMessageElement =
      fixture.debugElement.nativeElement.querySelector('span');

    expect(errorMessageElement.textContent.trim()).toBe('Error');
  });

  it('should call onChange when input value changes', () => {
    spyOn(component, 'onChange').and.callThrough();
    const inputElement = fixture.debugElement.query(
      By.css('input')
    ).nativeElement;

    inputElement.value = 'new value';
    inputElement.dispatchEvent(new Event('input'));

    expect(component.onChange).toHaveBeenCalledWith('new value');
  });
});
