import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClipListRowComponent } from './clip-list-row.component';

describe('ClipListRowComponent', () => {
  let component: ClipListRowComponent;
  let fixture: ComponentFixture<ClipListRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClipListRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClipListRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
