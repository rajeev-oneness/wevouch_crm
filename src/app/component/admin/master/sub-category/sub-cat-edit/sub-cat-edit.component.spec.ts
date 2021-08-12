import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCatEditComponent } from './sub-cat-edit.component';

describe('SubCatEditComponent', () => {
  let component: SubCatEditComponent;
  let fixture: ComponentFixture<SubCatEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubCatEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubCatEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
