import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutLayoutComponent } from './checkout-layout.component';

describe('CheckoutLayoutComponent', () => {
  let component: CheckoutLayoutComponent;
  let fixture: ComponentFixture<CheckoutLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CheckoutLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
