import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInmobiliariaComponent } from './view-inmobiliaria.component';

describe('ViewInmobiliariaComponent', () => {
  let component: ViewInmobiliariaComponent;
  let fixture: ComponentFixture<ViewInmobiliariaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewInmobiliariaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewInmobiliariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
