import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketReportListComponent } from './ticket-report-list.component';

describe('TicketReportListComponent', () => {
  let component: TicketReportListComponent;
  let fixture: ComponentFixture<TicketReportListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketReportListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
