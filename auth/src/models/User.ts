import { model, Schema } from 'mongoose';

import { hash } from '@/helpers/password';

interface UserAttrs {
  email: string;
  password: string;
}

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashedPassword = await hash(this.get('password'));
    this.set('password', hashedPassword);
  }

  done();
});

const UserModel = model('User', userSchema);

class User extends UserModel {
  constructor(attrs: UserAttrs) {
    super(attrs);
  }
}

export { User };
