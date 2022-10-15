import mongoose from 'mongoose';

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
  }
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);



export { User };
