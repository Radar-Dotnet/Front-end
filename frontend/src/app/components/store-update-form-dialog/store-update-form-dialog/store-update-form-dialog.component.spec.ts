import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreUpdateFormDialogComponent } from './store-update-form-dialog.component';

describe('StoreUpdateFormDialogComponent', () => {
  let component: StoreUpdateFormDialogComponent;
  let fixture: ComponentFixture<StoreUpdateFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreUpdateFormDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreUpdateFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
