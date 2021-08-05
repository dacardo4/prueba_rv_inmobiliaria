import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateInmuebleComponent } from './update-inmueble.component';

describe('UpdateInmuebleComponent', () => {
  let component: UpdateInmuebleComponent;
  let fixture: ComponentFixture<UpdateInmuebleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateInmuebleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateInmuebleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
