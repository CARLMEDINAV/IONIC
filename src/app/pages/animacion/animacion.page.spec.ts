import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnimacionPage } from './animacion.page';

describe('AnimacionPage', () => {
  let component: AnimacionPage;
  let fixture: ComponentFixture<AnimacionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
