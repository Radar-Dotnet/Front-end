import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignFormDialogComponent } from './campaign-form-dialog.component';

describe('CampaignFormDialogComponent', () => {
  let component: CampaignFormDialogComponent;
  let fixture: ComponentFixture<CampaignFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignFormDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaignFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
