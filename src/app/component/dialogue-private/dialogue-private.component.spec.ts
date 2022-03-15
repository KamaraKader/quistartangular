import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialoguePrivateComponent } from './dialogue-private.component';

describe('DialoguePrivateComponent', () => {
  let component: DialoguePrivateComponent;
  let fixture: ComponentFixture<DialoguePrivateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialoguePrivateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialoguePrivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
