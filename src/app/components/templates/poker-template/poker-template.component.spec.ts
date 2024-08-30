import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokerTemplateComponent } from './poker-template.component';
import { LOCAL_STORAGE } from '../../../constants/local-storage';
import { LocalStorageService } from '../../../services/local-storage/local-storage.service';

class MockLocalStorageService {
  get(key: string) {
    if (key === LOCAL_STORAGE.gameData) {
      return { name: 'Test Game' };
    }
    return null;
  }
}

describe('PokerTemplateComponent', () => {
  let component: PokerTemplateComponent;
  let fixture: ComponentFixture<PokerTemplateComponent>;
  let localStorageService: LocalStorageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokerTemplateComponent],
      providers: [
        { provide: LocalStorageService, useClass: MockLocalStorageService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PokerTemplateComponent);
    component = fixture.componentInstance;
    localStorageService = TestBed.inject(LocalStorageService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set title from local storage data', () => {
    component.ngOnInit();
    expect(component.title).toBe('Test Game');
  });

  it('should set showInviteModal to true when calling onShowInviteModal', () => {
    component.onShowInviteModal(true);

    fixture.detectChanges();

    expect(component.showInviteModal).toBeTrue();
  });
});
