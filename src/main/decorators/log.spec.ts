import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'
import { LogControllerDecorator } from './log'

describe('LogController Decorator', () => {
  test('Should call controller handler', async () => {
    class ControllerSub implements Controller {
      async handler (httpRequest: HttpRequest): Promise<HttpResponse> {
        const HttpResponse: HttpResponse = {
          statusCode: 200,
          body: {
            name: 'Leo'
          }
        }
        return await new Promise(resolve => resolve(HttpResponse))
      }
    }
    const controllerStub = new ControllerSub()
    const handleSpy = jest.spyOn(controllerStub, 'handler')
    const sut = new LogControllerDecorator(controllerStub)
    const httpRequest: HttpRequest = {
      body: {
        email: 'any_mail@mail.com',
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }  
    await sut.handler(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })
})
