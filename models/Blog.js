const mongoose = require('mongoose');

var blogSchema = new mongoose.Schema({
	name: String,
	// image: String,
	// video: String,
	email: String,
	// pwd: String,
	title: String,
	content: String,
	image: String,
	// photo: String,
	// uid: String,
    // token: String,
	// likes: String,
	// hearts: String,
	// dislikes: String
});

const TrueBlog = mongoose.model('Blog', blogSchema);
module.exports = TrueBlog;