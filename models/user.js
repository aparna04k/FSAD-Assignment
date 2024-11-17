/*const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profile: {
    favoriteGenres: [String],
    ownedBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]
  }
});

module.exports = mongoose.model('User', UserSchema);*/



const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  condition: { type: String, required: true },
  availability: { type: Boolean, default: true }
});

const UserProfileSchema = new mongoose.Schema({
  bio: { type: String },
  location: { type: String },
  favoriteGenres: [String]
});

const ExchangeRequestSchema = new mongoose.Schema({
  requester: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  bookId: { type: mongoose.Schema.Types.ObjectId },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' }
});

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    books: [BookSchema],  // Embed Book schema
    profile: UserProfileSchema,
    books: [BookSchema],
    exchangeRequests: [ExchangeRequestSchema]
}, 
{ timestamps: true});

module.exports = mongoose.model('User', userSchema);



