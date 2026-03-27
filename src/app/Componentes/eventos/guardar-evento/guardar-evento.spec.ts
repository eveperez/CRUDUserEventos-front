import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardarEvento } from './guardar-evento';

describe('GuardarEvento', () => {
  let component: GuardarEvento;
  let fixture: ComponentFixture<GuardarEvento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuardarEvento]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuardarEvento);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
