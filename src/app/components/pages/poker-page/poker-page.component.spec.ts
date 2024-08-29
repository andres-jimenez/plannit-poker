import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokerPageComponent } from './poker-page.component';

describe('PokerPageComponent', () => {
  let component: PokerPageComponent;
  let fixture: ComponentFixture<PokerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokerPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
