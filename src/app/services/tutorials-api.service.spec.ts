import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { TutorialsApiService } from "./tutorials-api.service";
import { Tutorial } from "../models/tutorial.model";

const mockedTutorial: Tutorial = {
  title: 'title',
  description: 'description',
  id: '1',
  published: false
}

const mockedTutorials: Tutorial[] = [mockedTutorial];

describe('TutorialsApiService suite', () => {
  let service: TutorialsApiService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = new TutorialsApiService(httpClient);
  });

  it('saveTutorial should call API', (done: DoneFn) => {
    service.saveTutorial(mockedTutorial).subscribe((response) => {
      expect(response).toBeTruthy();
      done();
    });

    const req = httpTestingController.expectOne((testRequest) => testRequest.url === 'fake_api/tutorials');
    expect(req.request.method).toEqual('POST');
    req.flush({});
    httpTestingController.verify();
  });

  it('updateTutorial should call API', () => {
    service.updateTutorial(mockedTutorial, mockedTutorial.id).subscribe((result) => {
      expect(result).toEqual(mockedTutorial);
    });

    const req = httpTestingController.expectOne((mockReq) => mockReq.url === `fake_api/tutorials/${mockedTutorial.id}`);
    req.flush(mockedTutorial);
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body).toEqual(mockedTutorial);
  });

  it('deleteTutorial should call API', () => {
    service.deleteTutorial(mockedTutorial.id).subscribe((result) => {
      expect(result).toEqual(mockedTutorial);
    });

    const req = httpTestingController.expectOne((mockReq) => mockReq.url === `fake_api/tutorials/${mockedTutorial.id}`);
    req.flush(mockedTutorial);
    expect(req.request.method).toEqual('DELETE');
  });

  it('deleteAll should call API', () => {
    service.deleteAll().subscribe((result) => {
      expect(result).toEqual(mockedTutorials);
    });

    const req = httpTestingController.expectOne((mockReq) => mockReq.url === `fake_api/tutorials`);
    req.flush(mockedTutorials);
    expect(req.request.method).toEqual('DELETE');
  });

  it('getTutorials should call API', (done: DoneFn) => {
    service.getTutorials().subscribe((response) => {
      expect(response).toBeTruthy();
      done();
    });

    const req = httpTestingController.expectOne((testRequest) => testRequest.url === 'fake_api/tutorials');
    expect(req.request.method).toEqual('GET');
    req.flush(mockedTutorial);
    httpTestingController.verify();
  });

  it('getTutorials should call API', (done: DoneFn) => {
    service.getTutorial(mockedTutorial.id).subscribe((response) => {
      expect(response).toBeTruthy();
      done();
    });

    const req = httpTestingController.expectOne((testRequest) => testRequest.url === `fake_api/tutorials/${mockedTutorial.id}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockedTutorial);
    httpTestingController.verify();
  });
});
