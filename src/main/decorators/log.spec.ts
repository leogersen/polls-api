import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'
import { LogControllerDecorator } from './log'

interface SutTypes {
  sut: LogControllerDecorator
  controllerStub: Controller

}
const makeSut = (): SutTypes => {
  const controllerStub = makeController()
  const sut = new LogControllerDecorator(controllerStub)
  return {
    sut,
    controllerStub
  }
}
const makeController = (): Controller => {
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
  return new ControllerSub()
}
describe('LogController Decorator', () => {
  test('Should call controller handler', async () => {
    const { sut, controllerStub } = makeSut()
    const handleSpy = jest.spyOn(controllerStub, 'handler')
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
