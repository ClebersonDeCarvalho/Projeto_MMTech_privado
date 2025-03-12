const Datastore = require('nedb');
const Teams = require('./teamsModel'); 
const usersDB = new Datastore({ filename: 'users.db', autoload: true });

const Users = {
    insert: (userData) => {
        return new Promise((resolve, reject) => {
            usersDB.insert(userData, (err, newUser) => {
                if (err) return reject(err);
                resolve(newUser);
            });
        });
    },

    update: (userId, updateData) => {
        return new Promise((resolve, reject) => {
            usersDB.update({ _id: userId }, { $set: updateData }, {}, (err) => {
                if (err) return reject(err);
                usersDB.findOne({ _id: userId }, (err, updatedUser) => {
                    if (err) return reject(err);
                    resolve(updatedUser);
                });
            });
        });
    },

    delete: async (userId) => {
        try {
            console.log(Teams);
            const teams = await Teams.findAll();
            await Promise.all(teams.map(async (team) => {
                if (team.members.includes(userId)) {
                    const updatedMembers = team.members.filter(member => member !== userId);
                    const updateData = { members: updatedMembers };

                    if (team.leaderId === userId) {
                        updateData.leaderId = null;
                    }

                    await Teams.update(team._id, updateData);
                }
            }));

            return new Promise((resolve, reject) => {
                usersDB.remove({ _id: userId }, {}, (err, numRemoved) => {
                    if (err) return reject(err);
                    if (numRemoved === 0) return reject(new Error('Usuário não encontrado'));
                    resolve({ message: 'Usuário deletado com sucesso' });
                });
            });

        } catch (error) {
            return Promise.reject(error);
        }
    },

    findOne: (query) => {
        return new Promise((resolve, reject) => {
            usersDB.findOne(query, (err, user) => {
                if (err || !user) return reject(new Error('Usuário não encontrado'));
                resolve(user);
            });
        });
    },

    findOneByEmail: (email) => {
        return new Promise((resolve, reject) => {
            usersDB.findOne({ email }, (err, user) => {
                if (err) return reject(new Error('Erro ao buscar o usuário'));
                if (user) {
                    return reject(new Error('Já existe um usuário com esse e-mail'));
                }
                resolve(true);
            });
        });
    },

    findAll: () => {
        return new Promise((resolve, reject) => {
            usersDB.find({}, (err, users) => {
                if (err) return reject(err);
                resolve(users);
            });
        });
    }
};

module.exports = Users;