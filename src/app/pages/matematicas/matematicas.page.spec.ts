import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatematicasPage } from './matematicas.page';

describe('MatematicasPage', () => {
  let component: MatematicasPage;
  let fixture: ComponentFixture<MatematicasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MatematicasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
