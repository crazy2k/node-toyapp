var express = require('express');
var jade = require('jade');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var app = express();

/*
 * Temporary user management stuff
 */

var temp_users = [
    { id: 1, username: 'lala', password: 'lala' },
    { id: 2, username: 'test', password: '123' }
];

function temp_findUserById(id, fn) {
    var idx = id - 1;
    if (temp_users[idx] === undefined) {
        return fn(new Error('User was not found by id'));
    }
    fn(null, temp_users[idx]);
}

function temp_findUserByUsername(username, fn) {
    var i;
    for (i = 0; i < temp_users.length; i++) {
        var user = temp_users[i];
        if (user.username == username)
            return fn(null, user);
    }
    fn(new Error('User was not found by username'));
}


/*
 * Settings
 */

app.configure(function(){
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');

    app.use(express.logger());
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.session({ secret: 'cat in the bag' }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use('/static', express.static(__dirname + '/static'));

    passport.use(new LocalStrategy(
        function(username, password, done) {
            temp_findUserByUsername(username, function(err, user) {
                if (err)
                    return done(new Error('Username not found'));
                if (user.password !== password)
                    return done(null, false);
                done(null, user);
            });
        }
    ));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        temp_findUserById(id, function (err, user) {
            if (err) {
                done(err);
            }
            else {
                done(null, user);
            }
        });
    });
});



/*
 * Routes
 */

app.get('/', function(req, res) {
    //var user = req.user;
    var username = (req.user !== undefined) ? req.user.username : null;
    res.render('index', { title: 'Welcome!', username: username });
});

app.get('/login', function(req, res) {
    if (req.user)
        return res.redirect('/');

    res.render('login', { title: 'Log in' });
});

app.post('/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login'
    })
);

app.get('/logout', function(req, res) {
    req.logOut();
    res.redirect('/');
});

app.listen(3000);
console.log('Listening on port 3000.');
