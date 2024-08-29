import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputComponent } from '../../atoms/input/input.component';
import { CreatePokerPageComponent } from './create-poker-page.component';

describe('CreatePokerPageComponent', () => {
  let component: CreatePokerPageComponent;
  let fixture: ComponentFixture<CreatePokerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, InputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreatePokerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
