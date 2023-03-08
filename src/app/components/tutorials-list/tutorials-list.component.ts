import { Component, OnInit } from '@angular/core';

import { Tutorial } from 'src/app/models/tutorial.model';
import { UtilDirective } from "../../utils/util.directive";
import { TutorialsApiService } from "../../services/tutorials-api.service";

@Component({
  selector: 'app-tutorials-list',
  templateUrl: './tutorials-list.component.html',
  styleUrls: ['./tutorials-list.component.css']
})
export class TutorialsListComponent extends UtilDirective implements OnInit {

  tutorialsSrc?: Tutorial[];
  tutorials?: Tutorial[];
  currentTutorial: Tutorial = {};
  currentIndex = -1;
  title = '';

  constructor(private readonly api: TutorialsApiService) {
    super();
  }

  ngOnInit(): void {
    this.retrieveTutorials();
  }

  retrieveTutorials(): void {
    this.getObservablePipe(this.api.getTutorials()).subscribe(tutorials => {
      this.tutorials = tutorials;
      this.tutorialsSrc = tutorials;
    })
  }

  removeAllTutorials(): void {
    this.getObservablePipe(this.api.deleteAll()).subscribe(tutorials => {
      this.tutorials = tutorials;
      this.tutorialsSrc = tutorials;
    })
  }

  selectTutorial(idx: number): void {
    this.currentIndex = idx;
    this.currentTutorial = this.tutorials ? this.tutorials[idx] : {};
  }

  searchByTitle(): void {
    if (this.title) {
      this.tutorials = this.tutorials?.filter(tutorial => tutorial.title === this.title || tutorial.title?.indexOf(this.title) !== -1);
    } else {
      this.tutorials = this.tutorialsSrc;
    }
  }


}
