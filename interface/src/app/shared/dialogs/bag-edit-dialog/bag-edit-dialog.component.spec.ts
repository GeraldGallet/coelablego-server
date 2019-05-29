import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BagEditDialogComponent } from './bag-edit-dialog.component';

describe('BagEditDialogComponent', () => {
  let component: BagEditDialogComponent;
  let fixture: ComponentFixture<BagEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BagEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BagEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
