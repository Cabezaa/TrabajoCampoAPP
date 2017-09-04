import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalizarTrabajoComponent } from './finalizar-trabajo.component';

describe('FinalizarTrabajoComponent', () => {
  let component: FinalizarTrabajoComponent;
  let fixture: ComponentFixture<FinalizarTrabajoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalizarTrabajoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalizarTrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
