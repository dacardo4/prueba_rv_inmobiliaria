import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudInmobiliariaComponent } from './crud-inmobiliaria.component';

describe('CrudInmobiliariaComponent', () => {
  let component: CrudInmobiliariaComponent;
  let fixture: ComponentFixture<CrudInmobiliariaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudInmobiliariaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudInmobiliariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
