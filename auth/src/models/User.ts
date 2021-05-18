import { pre, prop, getModelForClass } from '@typegoose/typegoose';

import { hash } from '@/helpers/password';

@pre<UserClass>('save', async function () {
  if (this.isModified('password')) {
    const hashedPassword = await hash(this.get('password'));
    this.set('password', hashedPassword);
  }
})
class UserClass {
  @prop()
  public email: string;

  @prop()
  public password: string;
}

const User = getModelForClass(UserClass);

export { User };
