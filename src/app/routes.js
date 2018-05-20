module.exports = (app, passport, url, mongodb, MongoClient, bodyParser) => {
    //jarvi index inteface
    app.get('/', (req, res) => {
        res.render('index', {
            message: req.flash('signupMessage'),
            message: req.flash('loginMessage'),
            user: req.user
        });
    });
    //header page render
    app.get('/head', (req, res) => {
        res.render('head', {
            message: req.flash('signupMessage'),
            message: req.flash('loginMessage'),
            user: req.user
        });
    });
    //footer page render
    app.get('/footer', (req, res) => {
        res.render('footer', {
            user: req.user
        });
    });
    //login post to auth profile
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/',
        failureRedirect: '/',
        failureFlash: true
    }));
    //register page post create profile
    app.post('/register', passport.authenticate('local-register', {
        successRedirect: '/',
        failureRedirect: '/register',
        failureFlash: true
    }));
    //profile page render get -temporal-
    app.get('/prof', isLoggedIn, (req, res) =>{
        res.render('prof', {
            user: req.user,
            message: req.flash('profileMessage')
        });
    });
    //profile page post update profile -temporal-
    app.post('/prof', passport.authenticate('local-profile', {
        successRedirect: '/',
        failureRedirect: '/prof',
        failureFlash: true
    }));

    //jarvi start works ----------------------------------------------
    app.post('/getjson', (req, res) =>{
        var mesjnow = req.body.inputmessage;
        var trains = require('./models/dataset');    
        var result = classifier.getClassifications(mesjnow);
        const MIN_CONFIDENCE = 0.06;
        result.sort(function(x, y) {return y.value - x.value});
        var best = (result[0]);
        console.log(best);
        var choosen;
        if (best["value"] < MIN_CONFIDENCE) {
            // Re-prompt user in the next iteration
            var unkownans = "I dont understand you";
            choosen = unkownans;
        } else {
           var classLabel = best["label"];
            switch (classLabel) {
                case "hellosir":
                    text = "Hello %s, what can I do for you?.";
                    choosen = text;
                    break;
                case "goodbyesir":
                    text = "See you soon %s.";
                    choosen = text;
                    break;
                case "imfine":
                    text = "Im fine thanks for ask.";
                    choosen = text;
                    break;
                case "music":
                    text = "I hope you like my music.";
                    choosen = text;
                    break;
                case "hellofriends":
                    text = "Hello %s friends.";
                    choosen = text;
                    break;
                case "hellomeet":
                    text = "its nice to meet %s friends.";
                    choosen = text;
                    break;
                case "knowme":
                    text = "You are %s.";
                    choosen = text;
                    break;
                case "stopmusic":
                    text = "Music Off";
                    choosen = text;
                    break;
                case "identMe":
                    text = "Starting Identification";
                    choosen = text;
                    break;
            }
        }
        console.log(choosen);   
        var jarvir = choosen;
        res.send(jarvir);
    });
    //logout page action
    app.get('/logout', (req, res) =>{
        req.logout();
        res.redirect('/');
    });
    //if its logged can pass if not back home
    function isLoggedIn(req, res, next){
        if (req.isAuthenticated()){
            return next();
        }
        return res.redirect('/');
    };
    //if its logged on cant go login or register and home only api
    function isLoggedOn(req, res, next){
        if (req.isAuthenticated()){
            return res.redirect('/');
        }
            return next();
    };
    /*app.get('*', (req, res) => {
        res.end('Cant Found This page');
    });*/
};