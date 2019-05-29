import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BagConfirmDialogComponent } from './bag-confirm-dialog.component';

describe('BagConfirmDialogComponent', () => {
  let component: BagConfirmDialogComponent;
  let fixture: ComponentFixture<BagConfirmDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BagConfirmDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BagConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
