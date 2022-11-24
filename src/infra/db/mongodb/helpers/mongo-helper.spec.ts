import { MongoHelper as sut } from './mongo-helper'

describe('Mongo Helper', () => {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await sut.disconnect()
  })

  test('Should reconnect if mongodb id down', async () => {
    const accountCollection = sut.getCollection('accounts')
    expect(accountCollection).toBeTruthy()
  })
})
