import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignVisualizerComponent } from './campaign-visualizer.component';

describe('CampaignVisualizerComponent', () => {
  let component: CampaignVisualizerComponent;
  let fixture: ComponentFixture<CampaignVisualizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignVisualizerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaignVisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
