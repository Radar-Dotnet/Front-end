import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreVisualizerComponent } from './store-visualizer.component';

describe('StoreVisualizerComponent', () => {
  let component: StoreVisualizerComponent;
  let fixture: ComponentFixture<StoreVisualizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreVisualizerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreVisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
