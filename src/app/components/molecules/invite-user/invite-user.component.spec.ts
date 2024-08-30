import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteUserComponent } from './invite-user.component';

describe('InviteUserComponent', () => {
  let component: InviteUserComponent;
  let fixture: ComponentFixture<InviteUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InviteUserComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InviteUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should copy invite link to clipboard', () => {
    spyOn(navigator.clipboard, 'writeText').and.resolveTo(undefined);

    component.copyToClipboard();

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      component.inviteLink
    );
  });
});
