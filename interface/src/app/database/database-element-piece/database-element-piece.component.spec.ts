import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseElementPieceComponent } from './database-element-piece.component';

describe('DatabaseElementPieceComponent', () => {
  let component: DatabaseElementPieceComponent;
  let fixture: ComponentFixture<DatabaseElementPieceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatabaseElementPieceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabaseElementPieceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
