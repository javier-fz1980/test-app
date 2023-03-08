import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

import { of } from "rxjs";

import { TutorialDetailsComponent } from './tutorial-details.component';

describe('TutorialDetailsComponent', () => {
  let component: TutorialDetailsComponent;
  let fixture: ComponentFixture<TutorialDetailsComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [ TutorialDetailsComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        {
          provide: ActivatedRoute, useValue: {
            params: of({ id: 3 }),
            snapshot: {
              params: {
                id: 1
              },
            },
          }
        },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TutorialDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
