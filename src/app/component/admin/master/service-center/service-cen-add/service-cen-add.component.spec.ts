import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceCenAddComponent } from './service-cen-add.component';

describe('ServiceCenAddComponent', () => {
  let component: ServiceCenAddComponent;
  let fixture: ComponentFixture<ServiceCenAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceCenAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceCenAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
