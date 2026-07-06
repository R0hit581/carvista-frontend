import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendCarComponent } from './recommend-car.component';

describe('RecommendCarComponent', () => {
  let component: RecommendCarComponent;
  let fixture: ComponentFixture<RecommendCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecommendCarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecommendCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
