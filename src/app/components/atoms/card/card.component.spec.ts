import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { By } from '@angular/platform-browser';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders the correct score', () => {
    component.score = '5';

    fixture.detectChanges();

    const buttonElement =
      fixture.debugElement.nativeElement.querySelector('button');

    expect(buttonElement.textContent.trim()).toBe('5');
  });

  it('should apply selected style', () => {
    component.isSelected = true;

    fixture.detectChanges();

    const buttonElement =
      fixture.debugElement.nativeElement.querySelector('button');

    expect(buttonElement).toHaveClass('selected');
  });

  it('should call onSelected function', () => {
    spyOn(component.onSelect, 'emit');

    const buttonElement = fixture.debugElement.query(By.css('button'));

    buttonElement.triggerEventHandler('click', null);

    expect(component.onSelect.emit).toHaveBeenCalled();
  });

  it('should render info text', () => {
    component.infoText = 'Texto de prueba';

    fixture.detectChanges();

    const spanElement =
      fixture.debugElement.nativeElement.querySelector('span');

    expect(spanElement.textContent).toBe('Texto de prueba');
  });
});
