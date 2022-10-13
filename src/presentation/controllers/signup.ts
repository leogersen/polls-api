
import { HttpResponse, HttpRequest } from '../protocols/http'
import { badRequest, serverError } from '../helpers/http-helper'
import { InvalidParamError, MissingParamError } from '../errors'
import { Controller, EmailValidator } from '../protocols'
import { AddAccount } from '../../domain/usecases/add-account'
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
      this.addAccount.add({
        name,
        email,
        password
      })
      return badRequest(new Error('Not Found'))
    } catch (error) {
      return serverError()
    }
  }
}
