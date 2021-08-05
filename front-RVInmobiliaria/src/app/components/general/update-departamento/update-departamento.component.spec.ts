import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDepartamentoComponent } from './update-departamento.component';

describe('UpdateDepartamentoComponent', () => {
  let component: UpdateDepartamentoComponent;
  let fixture: ComponentFixture<UpdateDepartamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateDepartamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDepartamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
