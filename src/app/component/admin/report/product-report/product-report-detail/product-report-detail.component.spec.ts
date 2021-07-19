import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductReportDetailComponent } from './product-report-detail.component';

describe('ProductReportDetailComponent', () => {
  let component: ProductReportDetailComponent;
  let fixture: ComponentFixture<ProductReportDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductReportDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductReportDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
