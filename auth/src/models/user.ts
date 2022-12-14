import mongoose from 'mongoose';
import { Password } from '../services/password';

//Interface that describes properties for new user

interface UserAttrs {
  email: string;
  password: string;
}

//Interface that describes properties that User model has

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs) : UserDoc
}

//Interface that describes properties that User document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  } }
  ,
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;

      },
    }
  }
);

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
}

userSchema.pre('save', async function(done) {
  if(this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
})

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);



export { User };
