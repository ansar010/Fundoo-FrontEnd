import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveNoteComponent } from './archive-note.component';

describe('ArchiveNoteComponent', () => {
  let component: ArchiveNoteComponent;
  let fixture: ComponentFixture<ArchiveNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchiveNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiveNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
