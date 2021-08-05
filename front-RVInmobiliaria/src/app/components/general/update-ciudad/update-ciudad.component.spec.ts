import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCiudadComponent } from './update-ciudad.component';

describe('UpdateCiudadComponent', () => {
  let component: UpdateCiudadComponent;
  let fixture: ComponentFixture<UpdateCiudadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateCiudadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCiudadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
