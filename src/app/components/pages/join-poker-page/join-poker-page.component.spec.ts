import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinPokerPageComponent } from './join-poker-page.component';

describe('JoinPokerPageComponent', () => {
  let component: JoinPokerPageComponent;
  let fixture: ComponentFixture<JoinPokerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JoinPokerPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoinPokerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
