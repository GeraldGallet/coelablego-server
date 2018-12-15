import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BagDialogComponent } from './bag-dialog.component';

describe('BagDialogComponent', () => {
  let component: BagDialogComponent;
  let fixture: ComponentFixture<BagDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BagDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BagDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
