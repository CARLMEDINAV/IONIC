import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrudApiPage } from './crud-api.page';

describe('CrudApiPage', () => {
  let component: CrudApiPage;
  let fixture: ComponentFixture<CrudApiPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudApiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
