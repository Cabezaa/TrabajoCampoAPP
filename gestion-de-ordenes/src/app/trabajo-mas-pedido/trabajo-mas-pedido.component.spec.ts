import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabajoMasPedidoComponent } from './trabajo-mas-pedido.component';

describe('TrabajoMasPedidoComponent', () => {
  let component: TrabajoMasPedidoComponent;
  let fixture: ComponentFixture<TrabajoMasPedidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrabajoMasPedidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrabajoMasPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
