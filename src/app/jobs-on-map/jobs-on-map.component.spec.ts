import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsOnMapComponent } from './jobs-on-map.component';

describe('JobsOnMapComponent', () => {
  let component: JobsOnMapComponent;
  let fixture: ComponentFixture<JobsOnMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobsOnMapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobsOnMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
