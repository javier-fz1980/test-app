import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialsApiService } from "../../services/tutorials-api.service";
import { UtilDirective } from "../../utils/util.directive";

@Component({
  selector: 'app-tutorial-details',
  templateUrl: './tutorial-details.component.html',
  styleUrls: ['./tutorial-details.component.css']
})
export class TutorialDetailsComponent extends UtilDirective  implements OnInit {

  @Input() viewMode = false;

  @Input() currentTutorial: Tutorial = {
    title: '',
    description: '',
    published: false
  };

  message = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private readonly api: TutorialsApiService) {
    super();
  }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getTutorial(this.route.snapshot.params['id']);
    }
  }

  getTutorial(id: string): void {
    this.getObservablePipe(this.api.getTutorial(id))
      .subscribe(tutorial => {
        console.log('this.currentTutorial:', this.currentTutorial, id)
        this.currentTutorial = tutorial
      });
  }

  updatePublished(status: boolean): void {
    const data = {
      ...this.currentTutorial,
      published: status
    };

    this.getObservablePipe(this.api.updateTutorial(data, this.currentTutorial.id))
      .subscribe( tutorial => {
        this.currentTutorial = tutorial;
        this.message = 'Status updated';
      });
  }

  updateTutorial(): void {
    this.getObservablePipe(this.api.updateTutorial(this.currentTutorial, this.currentTutorial.id))
      .subscribe( tutorial => {
        this.currentTutorial = tutorial;
        this.message = 'Tutorial updated';
      });
  }

  deleteTutorial(): void {
    this.getObservablePipe(this.api.deleteTutorial(this.currentTutorial.id))
      .subscribe(res => {
        console.log('res:', res)
        this.router.navigate(['/tutorials'])
      })
  }

}
