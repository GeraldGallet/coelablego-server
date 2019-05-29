import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PieceConfirmDialogComponent } from './piece-confirm-dialog.component';

describe('PieceConfirmDialogComponent', () => {
  let component: PieceConfirmDialogComponent;
  let fixture: ComponentFixture<PieceConfirmDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PieceConfirmDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PieceConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
