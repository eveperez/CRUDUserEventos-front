import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarEventos } from './listar-eventos';

describe('ListarEventos', () => {
  let component: ListarEventos;
  let fixture: ComponentFixture<ListarEventos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarEventos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarEventos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
