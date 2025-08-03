// 

import pkg from 'mongoose';
const { model, models, Schema } = pkg;

const UserSchema = new Schema({
   tgId: {
      type: String,
      required: true
   },

   firstName: {
      type: String,
      required: true
   },
})

export const User = models.User || model('User', UserSchema)