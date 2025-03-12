const Datastore = require('nedb');
const teamsDB = new Datastore({ filename: 'teams.db', autoload: true });


const Teams = {
    insert: (teamData) => {
        return new Promise((resolve, reject) => {
            if (teamData.leaderId) {
                teamData.members.push(teamData.leaderId);
            }
    
            teamsDB.insert(teamData, (err, newTeam) => {
                if (err) return reject(err);
                resolve(newTeam);
            });
        });
    },

    findAll: () => {
        return new Promise((resolve, reject) => {
            teamsDB.find({}, (err, teams) => {
                if (err) return reject(err);
                resolve(teams);
            });
        });
    },

    findOne: (teamId) => {
        console.log('Procurando time com ID:', teamId);
        return new Promise((resolve, reject) => {
            teamsDB.findOne({ _id: teamId }, (err, team) => {
                console.log('Resultado da consulta:', team); 
                if (err || !team) return reject(new Error('Time não encontrado'));
                resolve(team);
            });
        });
    },

    update: (teamId, updateData) => {
        return new Promise((resolve, reject) => {
            teamsDB.update({ _id: teamId }, { $set: updateData }, {}, (err) => {
                if (err) return reject(err);
                resolve();
            });
        });
    },

    remove: (teamId) => {
        return new Promise((resolve, reject) => {
            teamsDB.remove({ _id: teamId }, {}, (err, numRemoved) => {
                if (err) return reject(err);
                if (numRemoved === 0) return reject(new Error('Time não encontrado'));
                resolve();
            });
        });
    },
};

module.exports = Teams;