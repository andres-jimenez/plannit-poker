import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinTemplateComponent } from './join-template.component';

describe('JoinTemplateComponent', () => {
  let component: JoinTemplateComponent;
  let fixture: ComponentFixture<JoinTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JoinTemplateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(JoinTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('it renders given title', () => {
    component.title = 'Título de ejemplo';

    fixture.detectChanges();

    const titleElement = fixture.debugElement.nativeElement.querySelector('h1');

    expect(titleElement.textContent).toBe('Título de ejemplo');
  });

  it('should render the with alt text', () => {
    const logoElement = fixture.debugElement.nativeElement.querySelector('img');

    expect(logoElement).toBeTruthy();

    expect(logoElement.getAttribute('alt')).toBe('Plannit Poker');
  });
});
