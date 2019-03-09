import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrashBarComponent } from './trash-bar.component';

describe('TrashBarComponent', () => {
  let component: TrashBarComponent;
  let fixture: ComponentFixture<TrashBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrashBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrashBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
