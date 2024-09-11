import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeAPage } from './home-a.page';

describe('HomeAPage', () => {
  let component: HomeAPage;
  let fixture: ComponentFixture<HomeAPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeAPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
