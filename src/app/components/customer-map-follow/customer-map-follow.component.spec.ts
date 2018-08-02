import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerMapFollowComponent } from './customer-map-follow.component';

describe('CustomerMapFollowComponent', () => {
  let component: CustomerMapFollowComponent;
  let fixture: ComponentFixture<CustomerMapFollowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerMapFollowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerMapFollowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
