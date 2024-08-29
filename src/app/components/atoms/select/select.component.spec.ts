import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectComponent } from './select.component';
import { By } from '@angular/platform-browser';

describe('SelectComponent', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render label correctly', () => {
    component.label = 'Jugador';

    fixture.detectChanges();

    const labelElement =
      fixture.debugElement.nativeElement.querySelector('label');

    expect(labelElement.textContent.trim()).toBe('Jugador');
  });

  it('should emit onChanges event when select change', () => {
    component.value = 'player';

    fixture.detectChanges();

    spyOn(component.onChanges, 'emit');

    const selectElement =
      fixture.debugElement.nativeElement.querySelector('input');

    selectElement.dispatchEvent(new Event('change'));

    fixture.detectChanges();

    expect(component.onChanges.emit).toHaveBeenCalledWith('player');
  });
});
