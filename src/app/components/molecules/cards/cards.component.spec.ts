import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsComponent } from './cards.component';
import { By } from '@angular/platform-browser';

describe('CardsComponent', () => {
  let component: CardsComponent;
  let fixture: ComponentFixture<CardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title', () => {
    const titleElement =
      fixture.debugElement.nativeElement.querySelector('.title');
    expect(titleElement.textContent).toContain('Elige una carta 👇');
  });

  it('should render a card for each score in scores', () => {
    const cardElements = fixture.debugElement.queryAll(By.css('app-card'));
    expect(cardElements.length).toBe(component.scores.length);
  });

  it('should pass the correct score to each card component', () => {
    const cardElements = fixture.debugElement.queryAll(By.css('app-card'));
    cardElements.forEach((cardElement, index) => {
      expect(cardElement.componentInstance.score).toBe(component.scores[index]);
    });
  });
});
