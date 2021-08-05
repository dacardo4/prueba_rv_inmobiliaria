import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePaisComponent } from './update-pais.component';

describe('UpdatePaisComponent', () => {
  let component: UpdatePaisComponent;
  let fixture: ComponentFixture<UpdatePaisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatePaisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
