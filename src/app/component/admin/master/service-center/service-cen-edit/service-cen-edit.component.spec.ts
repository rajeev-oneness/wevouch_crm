import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceCenEditComponent } from './service-cen-edit.component';

describe('ServiceCenEditComponent', () => {
  let component: ServiceCenEditComponent;
  let fixture: ComponentFixture<ServiceCenEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceCenEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceCenEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
