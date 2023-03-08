import { Component } from '@angular/core';

import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialsApiService } from "../../services/tutorials-api.service";
import { UtilDirective } from "../../utils/util.directive";

@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.css']
})
export class AddTutorialComponent extends UtilDirective {

  private readonly initialTutorial = {
    title: '',
    description: '',
    published: false
  }

  tutorial: Tutorial = {
    ...this.initialTutorial
  };

  submitted = false;

  constructor(private readonly api: TutorialsApiService) {
    super();
  }

  saveTutorial(): void {
    this.getObservablePipe(this.api.saveTutorial(this.tutorial))
      .subscribe(res => this.submitted = true);
  }

  newTutorial(): void {
    this.submitted = false;
    this.tutorial = {
      ...this.initialTutorial
    };
  }

}
