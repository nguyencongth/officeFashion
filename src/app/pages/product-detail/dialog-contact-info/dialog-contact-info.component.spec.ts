import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogContactInfoComponent } from './dialog-contact-info.component';

describe('DialogContactInfoComponent', () => {
  let component: DialogContactInfoComponent;
  let fixture: ComponentFixture<DialogContactInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogContactInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogContactInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
