import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceCenListComponent } from './service-cen-list.component';

describe('ServiceCenListComponent', () => {
  let component: ServiceCenListComponent;
  let fixture: ComponentFixture<ServiceCenListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceCenListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceCenListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
