const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const puppeteer = require('puppeteer');
const bodyParser = require("body-parser")
const app = express();
const User = require('./models/User');
const Blog = require('./models/Blog');
const bcrypt = require('bcryptjs');
const { ensureAuthenticated, forwardAuthenticated } = require('./config/auth');

// Passport Config
require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true ,useUnifiedTopology: true}
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// EJS
app.use(expressLayouts);
app.set('view engine','ejs');

app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

app.use(express.static('public'));

// Routes
app.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));
app.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
      user: req.user
    })
);

app.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Register Page
app.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

// Register
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  let errors = [];

  if (!name || !email || !password) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          name,
          email,
          password,
        });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                console.log('no error');
                res.redirect('/login');
              })
              .catch(err => console.log('A LOT OF ERRORS'+ name +' '+email + err));
          });
        });
      }
    });
  }
});

// Login
app.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
});

// Logout
app.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/');
});


// app.get('/chat/home', ensureAuthenticated, (request, response) => {
//   if (request.user) {
//       db.getDB().collection("users").findOne({ _id: db.getPrimaryKey(request.session.user.user_id) }, (err, result) => {

//           request.session.user = {
//               "username": result.username,
//               "fullname": result.fullname,
//               "points": result.points,
//               "chats": result.chats,
//               "online": result.online,
//               "user_id": result._id
//           };
//           response.render('home', { user: request.session.user });
//       });

//   } else {
//       response.redirect('/login');
//   }
// });

app.post("/newPost", function(req, res){
	var title = req.body.title;
	var content = req.body.content;
	var image = req.body.image;
	var newPost = {title: title, content: content, image: image};
	Blog.create(newPost, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
			const link = '/blog';
			res.redirect(link);
			console.log(newlyCreated);
		};
	});
});

app.get('/blog',ensureAuthenticated, (req,res) => {
  Blog.find({}).sort({ _id: -1 }).exec(
		function(err, Allblogs){
		if(err){
			res.render('error');
		} else {
			res.render("blog",{Allblogs: Allblogs, name:req.name});
		};
	});
});


app.get('/doctors', (req, res)=>{
    let scrape = async () => {
    const browser = await puppeteer.launch({
        headless: true,
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    });
    const page = await browser.newPage();

    await page.goto('https://www.google.com/search?q=clinic+and+hospital+near+me');

    const result = await page.evaluate(() => {
        let data = []; // Create an empty array that will store our data
        let elements = document.querySelectorAll('.dbg0pd'); // Select all Products

        for (var element of elements){ // Loop through each proudct
            let title = element.childNodes[0].innerText; // Select the title

            data.push({title}); // Push an object with the data onto our array
        }
        window.scrollBy(50, 240);
        return data; // Return our data array
    });

        await page.setViewport({ width: 850, height: 200 });
        await page.screenshot({
            path: "./public/images/screenshot.jpg",
            type: "jpeg",
            fullPage: true
        });


    browser.close();
    return result; // Return the data

};

scrape().then((value) => {
    res.render('find_doctor.ejs', {
        results: value
    });
});

})

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server running on  ${PORT}`));
