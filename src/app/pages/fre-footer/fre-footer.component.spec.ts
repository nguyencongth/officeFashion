import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreFooterComponent } from './fre-footer.component';

describe('FreFooterComponent', () => {
  let component: FreFooterComponent;
  let fixture: ComponentFixture<FreFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FreFooterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FreFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
