const Teams = require('../models/teamsModel');
const Users = require('../models/usersModel');

exports.createTeam = (req, res) => {
    const { name, leaderId } = req.body;

    if (!name) return res.status(400).send('Nome do time é obrigatório');

    const newTeamData = {
        name,
        leaderId: leaderId || null,
        members: leaderId ? [leaderId] : []
    };

    Teams.insert(newTeamData)
        .then((newTeam) => res.status(201).json(newTeam))
        .catch((err) => res.status(500).send(err));
};

exports.getAllTeams = (req, res) => {
    Teams.findAll()
        .then((teams) => res.json(teams))
        .catch((err) => res.status(500).send(err));
};

exports.getTeamById = (req, res) => {
    const { id } = req.params;
    Teams.findOne(id)
        .then((team) => res.json(team))
        .catch((err) => res.status(404).send(err.message));
};
exports.updateTeam = async (req, res) => {
    try {
        const { name, leaderId, memberToRemove, memberToAdd } = req.body;
        const teamId = req.params.id;

        const team = await Teams.findOne(teamId);
        if (!team) {
            return res.status(404).json({ message: "Time não encontrado." });
        }

        const oldLeaderId = team.leaderId;

        if (leaderId) {
            const newLeader = await Users.findOne({ _id: leaderId });
            if (!newLeader) {
                return res.status(404).json({ message: "Novo líder não encontrado." });
            }

            if (oldLeaderId && oldLeaderId !== leaderId) {
                await Users.update(oldLeaderId, { isLeader: null });
            }

            await Users.update(leaderId, { isLeader: teamId });
        }

        await Teams.update(teamId, { name, leaderId: leaderId || null });

        if (memberToRemove) {
            await Teams.update(teamId, {
                $pull: { members: memberToRemove },
            });

            await Users.update(memberToRemove, { isLeader: null });
        }

        if (memberToAdd) {
            await Teams.update(teamId, {
                $push: { members: memberToAdd },
            });

            await Users.update(memberToAdd, { isLeader: null });
        }

        const updatedTeam = await Teams.findOne(teamId);
        res.status(200).json(updatedTeam);
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar time.", error: error.message });
    }
};

exports.deleteTeam = async (req, res) => {
    try {
        const teamId = req.params.id;
        const team = await Teams.findOne(teamId);

        if (!team) {
            return res.status(404).send('Time não encontrado');
        }

        if (team.members && team.members.length > 0) {
            await Promise.all(team.members.map(memberId => Users.delete(memberId)));
        }

        await Teams.remove(teamId);

        res.send('Time e todos os membros foram deletados com sucesso');
    } catch (error) {
        res.status(500).send(error.message);
    }
};
