import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpRequest, HttpResponse} from "@angular/common/http";

import { Observable, of } from "rxjs";

import { Tutorial } from "../models/tutorial.model";
import { TutorialsApiService } from "./tutorials-api.service";

let tutorials: Tutorial[] = [
  {title: 'tutorial 1', description: 'description 1', id: '1'},
  {title: 'tutorial 2', description: 'description 2', id: '2'}
]

@Injectable({
  providedIn: 'root'
})
export class TutorialsApiMock {

  private readonly FAKE_API = this.tutorialsApiService.FAKE_API;
  private counter = tutorials.length;

  constructor(private readonly tutorialsApiService: TutorialsApiService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method === 'POST' && req.url.endsWith(`${this.FAKE_API}/tutorials`)) {
      this.counter ++;
      tutorials.push({
        ...req.body,
        id: (this.counter).toString()
      });
      return of(new HttpResponse({ status: 200, body: tutorials}));
    }

    if (req.method === 'GET' && req.url.endsWith(`${this.FAKE_API}/tutorials`)) {
      return of(new HttpResponse({ status: 200, body: tutorials }));
    }

    if (req.method === 'GET' && req.url.includes(`${this.FAKE_API}/tutorials/`)) {
      const id = req.url.split('/')[2];
      return of(new HttpResponse({ status: 200, body: tutorials.find(tutorial => tutorial.id === id) }));
    }

    if (req.method === 'PUT' && req.url.includes(`${this.FAKE_API}/tutorials/`)) {
      const id = req.url.split('/')[2];
      const index = tutorials.findIndex(tutorial => tutorial.id === id);
      tutorials[index] = req.body;
      return of(new HttpResponse({ status: 200, body: tutorials[index]}));
    }

    if (req.method === 'DELETE' && req.url.includes(`${this.FAKE_API}/tutorials/`)) {
      const id = req.url.split('/')[2];
      tutorials = tutorials.filter(tutorial => tutorial.id !== id);
      return of(new HttpResponse({ status: 200, body: tutorials}));
    }

    if (req.method === 'DELETE' && req.url.includes(`${this.FAKE_API}/tutorials`)) {
      tutorials = [];
      return of(new HttpResponse({ status: 200, body: tutorials}));
    }

    return next.handle(req);
  }

}
