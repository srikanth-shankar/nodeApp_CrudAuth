const httpError = require('../models/http-error');
const uuid=  require('uuid/v4');

const DUMMY_USERS = [
    {id: 'u1', name: 'u1 name', email: 'u1.email@abc.com', pwd: 'u1Pwd'},
    {id: 'u2', name: 'u2 name', email: 'u2.email@abc.com', pwd: 'u2Pwd'},
    {id: 'u3', name: 'u3 name', email: 'u3.email@abc.com', pwd: 'u3Pwd'}
]

getUsers = (req, res, next) => {
    res.status(200).json({users: DUMMY_USERS});
};

signup = (req, res, next) => {
    const {name, email, pwd} = req.body;
    const createdUser = {
        id: uuid(),  name, email, pwd
    };
    DUMMY_USERS.push(createdUser);
    res.status(201).json({user: createdUser});
};

login = (req, res, next) => {
    const {email, pwd} = req.body;
    const identifiedUSer = DUMMY_USERS.find(x => (x.email == email && x.pwd == pwd));
    if(!identifiedUSer){
        throw new httpError('wrong creds', 401);
    }
    res.json({msg: 'logged in'});
};

exports.getUsers = getUsers;
exports.login = login;
exports.signup = signup;