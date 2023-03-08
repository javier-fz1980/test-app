import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { AddTutorialComponent } from './add-tutorial.component';
import { TutorialsApiService } from "../../services/tutorials-api.service";
import { UtilDirective } from "../../utils/util.directive";

describe('AddTutorialComponent', () => {
  let component: AddTutorialComponent;
  let fixture: ComponentFixture<AddTutorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTutorialComponent ],
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        UtilDirective,
        TutorialsApiService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTutorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call api', () => {
    const mockedTutorial = {
      title: 'someTitle',
      description: 'someDescription',
      published: false
    };
    component.tutorial = {
      ...mockedTutorial
    };
    const saveTutorialSpy = spyOn<any>(component['api'], 'saveTutorial').and.callThrough();
    component.saveTutorial();
    expect(saveTutorialSpy).toHaveBeenCalledWith(mockedTutorial)

  });

  it('should reset tutorial', () => {
    const mockedTutorial = {
      title: 'someTitle',
      description: 'someDescription',
      published: false
    };
    component.tutorial = {
      ...mockedTutorial
    };
    component.newTutorial();
    expect(component.tutorial).toEqual(component['initialTutorial'])
  });
});
