import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseFormBagComponent } from './database-form-bag.component';

describe('DatabaseFormBagComponent', () => {
  let component: DatabaseFormBagComponent;
  let fixture: ComponentFixture<DatabaseFormBagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatabaseFormBagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabaseFormBagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
