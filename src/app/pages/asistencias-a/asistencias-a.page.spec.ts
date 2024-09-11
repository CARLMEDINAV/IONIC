import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsistenciasAPage } from './asistencias-a.page';

describe('AsistenciasAPage', () => {
  let component: AsistenciasAPage;
  let fixture: ComponentFixture<AsistenciasAPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AsistenciasAPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});