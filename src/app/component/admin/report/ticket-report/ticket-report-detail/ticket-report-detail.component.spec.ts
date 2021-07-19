import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketReportDetailComponent } from './ticket-report-detail.component';

describe('TicketReportDetailComponent', () => {
  let component: TicketReportDetailComponent;
  let fixture: ComponentFixture<TicketReportDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketReportDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketReportDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
