const Admin = require('../models/admModel');

exports.register = (req, res) => {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
        return res.status(400).send('Todos os campos são obrigatórios');
    }

    Admin.findByEmail(email)
        .then(existingUser => {
            if (existingUser) {
                return res.status(400).json({ message: 'Este e-mail já está em uso' });
            }
            Admin.register(name, email, phone, password)
                .then(newUser => {
                    res.status(201).json(newUser);
                })
                .catch(err => {
                    console.error("Erro ao registrar usuário:", err.message);
                    res.status(500).send(err.message);
                });
        })
        .catch(err => {
            console.error("Erro ao verificar e-mail:", err.message);
            res.status(500).send('Erro ao verificar e-mail');
        });
};

exports.login = (req, res) => {
    const { email, password } = req.body;

    Admin.login(email, password)
        .then(token => {
            res.json({ token });
        })
        .catch(err => {
            console.error("Erro ao fazer login:", err.message);

            if (err.message === 'Usuário não encontrado' || err.message === 'Senha incorreta') {
                return res.status(401).json({ message: err.message });
            }

            res.status(500).json({ message: 'Erro ao fazer login' });
        });
};
