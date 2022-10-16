import { AddAccountRepository } from '../../../../data/protocols/add-account-repository'
import { AccountModel } from '../../../../domain/models/account'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    const getResult = await accountCollection.findOne(result.insertedId)
    if (getResult) {
      const account: AccountModel = 
      {
        id: getResult._id.toString(),
        name: getResult.name,
        email: getResult.email,
        password: getResult.password
      }
      return account
    } else {
      throw new Error()
    }

  }
}
