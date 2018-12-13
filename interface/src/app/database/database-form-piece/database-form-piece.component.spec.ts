import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseFormPieceComponent } from './database-form-piece.component';

describe('DatabaseFormPieceComponent', () => {
  let component: DatabaseFormPieceComponent;
  let fixture: ComponentFixture<DatabaseFormPieceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatabaseFormPieceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabaseFormPieceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
