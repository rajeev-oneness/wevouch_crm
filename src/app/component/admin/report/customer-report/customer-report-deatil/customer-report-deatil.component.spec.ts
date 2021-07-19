import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerReportDeatilComponent } from './customer-report-deatil.component';

describe('CustomerReportDeatilComponent', () => {
  let component: CustomerReportDeatilComponent;
  let fixture: ComponentFixture<CustomerReportDeatilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerReportDeatilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerReportDeatilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
