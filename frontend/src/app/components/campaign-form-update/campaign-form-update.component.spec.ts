import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignFormUpdateComponent } from './campaign-form-update.component';

describe('CampaignFormUpdateComponent', () => {
  let component: CampaignFormUpdateComponent;
  let fixture: ComponentFixture<CampaignFormUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignFormUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaignFormUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
