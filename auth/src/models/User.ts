import {
  pre,
  prop,
  getModelForClass,
  modelOptions,
} from '@typegoose/typegoose';

import { hash } from '@/helpers/password';

@pre<UserClass>('save', async function () {
  if (this.isModified('password')) {
    const hashedPassword = await hash(this.get('password'));
    this.set('password', hashedPassword);
  }
})
@modelOptions({
  schemaOptions: {
    toJSON: {
      // Note: Ideally, view related code should be separated from the model
      transform: (_, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  },
})
class UserClass {
  @prop()
  public email: string;

  @prop()
  public password: string;
}

const User = getModelForClass(UserClass);

export { User };
