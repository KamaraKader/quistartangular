import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingPComponent } from './loading-p.component';

describe('LoadingPComponent', () => {
  let component: LoadingPComponent;
  let fixture: ComponentFixture<LoadingPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
