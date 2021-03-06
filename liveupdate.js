const db = require('./models');
const socketio = require('socket.io');
const session = require('cookie-session')({
    name: 'session',
    secret: process.env.COOKI_SESSION_SECRET,
    saveUninitialized: false,
    cookie: { secure: false },
});

function init(server) {
    const io = socketio(server);
    init.io = io;

    io.on('connection', socket => {
        let cookieString = socket.request.headers.cookie;

        let req = { connection: { encrypted: false }, headers: { cookie: cookieString } };
        let res = { getHeader: () => { }, setHeader: () => { } };

        session(req, res,  async () => {
            //console.log(req.session);
            if (req.session && req.session.passport && req.session.passport.user) {
                console.log('user authenticated');
                const user = await db.Users.findByPk(req.session.passport.user, function(err, user) { // fixed here 
                    if (err) return socket.disconnect();
                });
                //req.flash('success',`User connected:  ${user.Name}`);
            } else {
                console.log('--- 2 user not authenticatetd, bye bye');
                socket.disconnect();
            }
            console.log('333');
        });
    })
}

module.exports = init;