import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseElementComponent } from './database-element.component';

describe('DatabaseElementComponent', () => {
  let component: DatabaseElementComponent;
  let fixture: ComponentFixture<DatabaseElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatabaseElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabaseElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
