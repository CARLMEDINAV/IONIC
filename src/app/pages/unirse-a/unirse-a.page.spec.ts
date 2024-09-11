import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UnirseAPage } from './unirse-a.page';

describe('UnirseAPage', () => {
  let component: UnirseAPage;
  let fixture: ComponentFixture<UnirseAPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UnirseAPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});