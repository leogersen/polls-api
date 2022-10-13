
import { HttpResponse, HttpRequest, Controller, EmailValidator, AddAccount } from './signup.protocols'
import { badRequest, serverError, ok } from '../../helpers/http-helper'
import { InvalidParamError, MissingParamError } from '../../errors'
export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount

  constructor (emailValidator: EmailValidator, addAccount: AddAccount) {
    this.addAccount = addAccount
    this.emailValidator = emailValidator
  }

  handler (httpRequest: HttpRequest): HttpResponse {
    try {   
      const fields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of fields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { name, email, password, passwordConfirmation } = httpRequest.body
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      const account = this.addAccount.add({
        name,
        email,
        password
      })
      return ok(account)
    } catch (error) {
      return serverError()
    }
  }
}
