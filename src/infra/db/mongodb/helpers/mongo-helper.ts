import { Collection, MongoClient } from 'mongodb'
import { AccountModel } from '../../../../domain/models/account'

export const MongoHelper = {
  client: null as unknown as MongoClient,

  async connect (uri: string): Promise<void> {
    this.client = new MongoClient(uri)
    await this.client.connect()
  },

  async disconnect (): Promise<void> {
    await this.client.close()
  },

  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  },
  
  map (mongoAccount: any): AccountModel {
    const account: AccountModel = 
        {
          id: mongoAccount._id.toString(),
          name: mongoAccount.name,
          email: mongoAccount.email,
          password: mongoAccount.password
        }
    return account
  }
}
