import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseAddPieceComponent } from './database-add-piece.component';

describe('DatabaseAddPieceComponent', () => {
  let component: DatabaseAddPieceComponent;
  let fixture: ComponentFixture<DatabaseAddPieceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatabaseAddPieceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabaseAddPieceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
