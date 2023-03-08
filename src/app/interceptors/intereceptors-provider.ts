import { HTTP_INTERCEPTORS } from "@angular/common/http";

import { TutorialsApiMock } from "../services/tutorials-api-mock.interceptor.service";

const mockInterceptors = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TutorialsApiMock,
    multi: true
  }
];

export const interceptorProviders = [...mockInterceptors]
