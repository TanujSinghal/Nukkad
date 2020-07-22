import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginbComponent } from './loginb.component';

describe('LoginbComponent', () => {
  let component: LoginbComponent;
  let fixture: ComponentFixture<LoginbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
