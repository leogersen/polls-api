
import { HttpResponse, HttpRequest } from '../protocols/http'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'
import { Controller } from '../protocols/controller';
export class SignUpController implements Controller {

  handler(httpRequest: HttpRequest): HttpResponse {
    const fields = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of fields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field));
      }
    }
    return badRequest(new Error('Not Found'));
  }
}
