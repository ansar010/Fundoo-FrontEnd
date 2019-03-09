import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrashNoteComponent } from './trash-note.component';

describe('TrashNoteComponent', () => {
  let component: TrashNoteComponent;
  let fixture: ComponentFixture<TrashNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrashNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrashNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
