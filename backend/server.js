const cors = require('cors'); 
const express = require('express');
const app = express();

const admRoutes = require('./routes/admRoutes'); 
const teamsRoutes = require('./routes/teamsRoutes');
const usersRoutes = require('./routes/usersRoutes'); 

app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST','PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.use('/users', usersRoutes);
app.use('/teams', teamsRoutes);
app.use('/adm',admRoutes); 

app.listen(5000, () => {
    console.log('Servidor rodando na porta 5000');
});
