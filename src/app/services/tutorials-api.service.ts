import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";

import { Tutorial } from "../models/tutorial.model";

@Injectable({
  providedIn: 'root'
})
export class TutorialsApiService {

  readonly FAKE_API = 'fake_api';

  constructor(private readonly http: HttpClient) { }

  saveTutorial(tutorial: Tutorial): Observable<Tutorial> {
    return this.http.post<Tutorial>(`${this.FAKE_API}/tutorials`, tutorial);
  }

  getTutorials(): Observable<Tutorial[]> {
    return this.http.get<Tutorial[]>(`${this.FAKE_API}/tutorials`);
  }

  getTutorial(id: string): Observable<Tutorial> {
    return this.http.get<Tutorial>(`${this.FAKE_API}/tutorials/${id}`);
  }

  updateTutorial(tutorial: Tutorial, id: string): Observable<Tutorial> {
    return this.http.put<Tutorial>(`${this.FAKE_API}/tutorials/${id}`, tutorial);
  }

  deleteTutorial(id: string): Observable<Tutorial> {
    return this.http.delete<Tutorial>(`${this.FAKE_API}/tutorials/${id}`);
  }

  deleteAll(): Observable<Tutorial[]> {
    return this.http.delete<Tutorial[]>(`${this.FAKE_API}/tutorials`);
  }
}
