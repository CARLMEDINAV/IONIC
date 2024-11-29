import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CursoMovilPage } from './curso-movil.page';

describe('CursoMovilPage', () => {
  let component: CursoMovilPage;
  let fixture: ComponentFixture<CursoMovilPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CursoMovilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
