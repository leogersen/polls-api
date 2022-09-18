import { HttpRequest, HttpResponse } from './http';

export interface Controller {
  handler: (HttpRequest: HttpRequest) => HttpResponse
}
