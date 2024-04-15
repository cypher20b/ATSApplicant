import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationSpecificJobsComponent } from './location-specific-jobs.component';

describe('LocationSpecificJobsComponent', () => {
  let component: LocationSpecificJobsComponent;
  let fixture: ComponentFixture<LocationSpecificJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationSpecificJobsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LocationSpecificJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
