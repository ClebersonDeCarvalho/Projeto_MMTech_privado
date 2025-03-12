const Datastore = require('nedb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = 'supersecret';

const admDB = new Datastore({ filename: 'adm.db', autoload: true });

const Admin = {

    findByEmail: (email) => {
        return new Promise((resolve, reject) => {
            admDB.findOne({ email }, (err, user) => {
                if (err) return reject(err);
                resolve(user);
            });
        });
    },

    register: (name, email, phone, password) => {
        return new Promise((resolve, reject) => {

            Admin.findByEmail(email)
                .then(existingUser => {
                    if (existingUser) {
                        return reject(new Error('Este e-mail já está em uso'));
                    }

                    bcrypt.hash(password, 10, (err, hash) => {
                        if (err) return reject(err);

                        const newAdmin = { name, email, phone, password: hash };
                        admDB.insert(newAdmin, (err, newUser) => {
                            if (err) return reject(err);
                            resolve(newUser);
                        });
                    });
                })
                .catch(err => reject(err));
        });
    },

    login: (email, password) => {
        return new Promise((resolve, reject) => {

            admDB.findOne({ email }, (err, user) => {
                if (err) return reject(err);
                if (!user) return reject(new Error('Usuário não encontrado'));

                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) return reject(err);
                    if (!result) return reject(new Error('Senha incorreta'));

                    const token = jwt.sign({ id: user._id }, secret, { expiresIn: '1h' });
                    resolve(token);
                });
            });
        });
    }
};

module.exports = Admin;