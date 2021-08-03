import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCatAddComponent } from './sub-cat-add.component';

describe('SubCatAddComponent', () => {
  let component: SubCatAddComponent;
  let fixture: ComponentFixture<SubCatAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubCatAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubCatAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
