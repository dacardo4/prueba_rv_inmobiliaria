import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSaveOkComponent } from './modal-save-ok.component';

describe('ModalSaveOkComponent', () => {
  let component: ModalSaveOkComponent;
  let fixture: ComponentFixture<ModalSaveOkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalSaveOkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSaveOkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
