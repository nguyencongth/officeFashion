import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductNewDetailComponent } from './product-new-detail.component';

describe('ProductNewDetailComponent', () => {
  let component: ProductNewDetailComponent;
  let fixture: ComponentFixture<ProductNewDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductNewDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductNewDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
