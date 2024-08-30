import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render text correctly', () => {
    component.text = 'Continuar';

    fixture.detectChanges();

    const buttonElement =
      fixture.debugElement.nativeElement.querySelector('button');

    expect(buttonElement.textContent.trim()).toBe('Continuar');
  });

  it('should render the passed variant', () => {
    component.variant = 'purple';

    fixture.detectChanges();

    const buttonElement =
      fixture.debugElement.nativeElement.querySelector('button');

    expect(buttonElement).toHaveClass('purple');
  });
});
