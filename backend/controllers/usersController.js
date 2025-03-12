const Users = require('../models/usersModel');
const Teams = require('../models/teamsModel');

exports.createUser = async (req, res) => {
    try {
        const { name, email, phone, teamId, isLeader } = req.body;

        if (!name || !email || !phone || !teamId) {
            return res.status(400).send('Nome, email, telefone e time são obrigatórios');
        }

        try {
            await Users.findOneByEmail(email);
        } catch (error) {
            return res.status(400).json('Já existe um usuário com esse e-mail');
        }

        const isLeaderValue = isLeader ? teamId : null;
        const newUser = await Users.insert({ name, email, phone, teamId, isLeader: isLeaderValue });
        const team = await Teams.findOne(teamId);

        if (!team) {
            return res.status(404).json({ message: "Time não encontrado." });
        }

        const updatedMembers = [...team.members, newUser._id];
        await Teams.update(teamId, { members: updatedMembers });

        if (isLeader) {
            await Teams.update(teamId, { leaderId: newUser._id });
        }

        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateUser = async (req, res) => {
    try {
        console.log("Recebendo dados para atualização:", req.body);
        const { name, email, phone, teamId, isLeader } = req.body;
        const userId = req.params.id;
        const cleanedTeamId = teamId.trim();
        console.log("ID do time limpo:", cleanedTeamId);

        const existingUser = await Users.findOne({ _id: userId });
        if (!existingUser) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        if (email && email !== existingUser.email) {
            const emailAvailable = await Users.findOneByEmail(email);
            if (!emailAvailable) {
                return res.status(400).json({ message: "Já existe um usuário com esse e-mail" });
            }
        }

        const updateData = {};

        if (name) updateData.name = name;
        if (email) updateData.email = email;
        if (phone) updateData.phone = phone;
        
        if (cleanedTeamId && cleanedTeamId !== existingUser.teamId) {
            updateData.teamId = cleanedTeamId;

            const previousTeam = await Teams.findOne(existingUser.teamId);
            if (previousTeam) {
                const updatedPreviousTeamMembers = previousTeam.members.filter(memberId => memberId !== userId);
                await Teams.update(existingUser.teamId, { members: updatedPreviousTeamMembers });
            }
            if (existingUser.isLeader === existingUser.teamId) {
                await Users.update(userId, { isLeader: null });
                await Teams.update(existingUser.teamId, { leaderId: null });
            }
            if (isLeader) {
                updateData.isLeader = cleanedTeamId;
                await Teams.update(cleanedTeamId, { leaderId: userId });
            } else {
                updateData.isLeader = null;
            }
        }
        const updatedUser = await Users.update(userId, updateData);
        const newTeam = await Teams.findOne(cleanedTeamId);

        if (newTeam) {
            const updatedMembers = newTeam.members.concat(userId);
            await Teams.update(cleanedTeamId, { members: updatedMembers });
        }

        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({error: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await Users.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await Users.findOne({ _id: req.params.id });
        res.json(user);
    } catch (error) {
        res.status(404).send("Usuário não encontrado");
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const result = await Users.delete(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};