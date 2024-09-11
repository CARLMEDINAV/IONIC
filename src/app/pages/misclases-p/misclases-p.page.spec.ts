import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MisclasesPPage } from './misclases-p.page';

describe('MisclasesPPage', () => {
  let component: MisclasesPPage;
  let fixture: ComponentFixture<MisclasesPPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MisclasesPPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});