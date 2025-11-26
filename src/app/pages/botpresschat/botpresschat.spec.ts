import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Botpresschat } from './botpresschat';

describe('Botpresschat', () => {
  let component: Botpresschat;
  let fixture: ComponentFixture<Botpresschat>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Botpresschat]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Botpresschat);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
