import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValoresEntradaComponent } from './valores-entrada.component';

describe('ValoresEntradaComponent', () => {
  let component: ValoresEntradaComponent;
  let fixture: ComponentFixture<ValoresEntradaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValoresEntradaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValoresEntradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
