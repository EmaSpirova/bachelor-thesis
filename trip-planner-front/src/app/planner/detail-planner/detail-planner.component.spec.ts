import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPlannerComponent } from './detail-planner.component';

describe('DetailPlannerComponent', () => {
  let component: DetailPlannerComponent;
  let fixture: ComponentFixture<DetailPlannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailPlannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPlannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
