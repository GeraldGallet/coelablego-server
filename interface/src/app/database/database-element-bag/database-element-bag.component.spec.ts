import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseElementBagComponent } from './database-element-bag.component';

describe('DatabaseElementBagComponent', () => {
  let component: DatabaseElementBagComponent;
  let fixture: ComponentFixture<DatabaseElementBagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatabaseElementBagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabaseElementBagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
