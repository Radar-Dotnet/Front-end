import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragndropComponent } from './dragndrop.component';

describe('DragndropComponent', () => {
  let component: DragndropComponent;
  let fixture: ComponentFixture<DragndropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragndropComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DragndropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
