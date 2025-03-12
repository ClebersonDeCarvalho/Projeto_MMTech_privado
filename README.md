# Projeto MM Tech  

## 🛠️ Criador:  
- **Cleberson de Carvalho**  

![Projeto MM-Tech](./Readme%20images/Cabecalho.png)  

## 📚 Descrição  

O projeto tem como objetivo desenvolver um sistema de gerenciamento de usuários, permitindo o cadastro com informações como nome, e-mail e telefone. Além disso, é possível criar times, definir um líder e adicionar membros a cada equipe. O sistema oferece todas as operações de CRUD, além de um módulo de cadastro e login para que o administrador possa gerenciar os times e usuários. O banco de dados utilizado é o **NeDB**.  

---  

## 📸 Capturas de Tela  

<div align="center">
    <h3>Home</h3>
    <img src="./Readme images/Home.png" alt="Home" width="900">
</div>

<div align="center">
    <h3>Cadastrar</h3>
    <img src="./Readme images/Cadastrar.png" alt="Cadastrar" width="900">
</div>

<div align="center">
    <h3>Login</h3>
    <img src="./Readme images/Login.png" alt="Login" width="900">
</div>

<div align="center">
    <h3>Manual</h3>
    <img src="./Readme images/Manual.png" alt="Manual" width="900">
</div>

<div align="center">
    <h3>Criar time</h3>
    <img src="./Readme images/CriarTime.png" alt="Criar time" width="900">
</div>

<div align="center">
    <h3>Adicionar membros</h3>
    <img src="./Readme images/AdicionarMembro.png" alt="Adicionar membros" width="900">
</div>

<div align="center">
    <h3>Gerenciar times</h3>
    <img src="./Readme images/GerenciarTime.png" alt="Gerenciar times" width="900">
</div>

<div align="center">
    <h3>Editar time</h3>
    <img src="./Readme images/EditarTime.png" alt="Editar time" width="900">
</div>

<div align="center">
    <h3>Gerenciar membros</h3>
    <img src="./Readme images/GerenciarMembros.png" alt="Gerenciar membro" width="900">
</div>

<div align="center">
    <h3>Editar membro</h3>
    <img src="./Readme images/EditarMembro.png" alt="Editar membro" width="900">
</div>

---  

## 📌 Funcionalidades  

### 🔹 Home  
✅ Explica a definição do projeto.  
✅ Contém um botão que redireciona para o cadastro de administrador.  

### 🔹 Cadastrar  
✅ Permite o cadastro do administrador.  
✅ Salva nome, e-mail, telefone e senha.  
✅ Possui validações para cada campo.  

### 🔹 Login  
✅ Permite o login do administrador cadastrado.  
✅ Possui validações para cada campo.  

### 🔹 Manual  
✅ Explica a funcionalidade de cada link da navbar.  

### 🔹 Criar time  
✅ Permite a criação de um time.  
✅ Solicita apenas o nome do time.  
✅ Possui validação no campo nome.  

### 🔹 Adicionar membros  
✅ Permite a criação de um novo membro.  
✅ Solicita nome, e-mail, telefone e time.  
✅ Lista todos os times já cadastrados.  
✅ Possui validações para cada campo.  

### 🔹 Gerenciar times  
✅ Lista todos os times cadastrados.  
✅ Permite buscar times pelo nome.  
✅ Exibe o nome do time e o líder atual.  
✅ Possui opções para editar e deletar cada time.  
✅ Ao deletar um time, todos os seus membros são removidos.  

### 🔹 Editar time  
✅ Permite editar o nome do time.  
✅ Lista os membros do time.  
✅ Permite selecionar um novo líder.  
✅ Possui opção para cancelar a edição.  
✅ Valida o campo nome.  

### 🔹 Gerenciar membros  
✅ Lista todos os membros cadastrados.  
✅ Permite buscar membros pelo nome.  
✅ Permite filtrar membros por time.  
✅ Exibe nome, e-mail, telefone, time e função (líder ou membro).  

### 🔹 Editar membro  
✅ Permite a edição de todos os dados do membro, incluindo o time.  
✅ Lista todos os times cadastrados.  
✅ Possui opção para cancelar a edição.  
✅ Conta com validações em cada campo.  

---  

## 🛠️ Tecnologias Utilizadas  

### 🔹 Front-end  
- **React**  
- **HTML**  
- **CSS**  

#### 📦 Dependências:  
- **react**: ^19.0.0  
- **react-dom**: ^19.0.0  
- **react-router-dom**: ^7.2.0  

#### 🛠 Dependências de Desenvolvimento:  
- **@eslint/js**: ^9.19.0  
- **@types/react**: ^19.0.8  
- **@types/react-dom**: ^19.0.3  
- **@vitejs/plugin-react**: ^4.3.4  
- **eslint**: ^9.19.0  
- **vite**: ^6.1.1  

### 🔹 Back-end  
- **Node.js - API (Express)**  
  
#### 📦 Dependências:  
- **bcrypt**: ^5.1.1  
- **body-parser**: ^1.20.3  
- **cors**: ^2.8.5  
- **express**: ^4.21.2  
- **jsonwebtoken**: ^9.0.2  
- **nedb**: ^1.8.0  

---  
## 🚀 Como Rodar o Projeto  

1️⃣ Instalar dependências:  
```sh
npm install
```

2️⃣ Rodar o Front-end:  
```sh
npm run dev
```

3️⃣ Rodar o Back-end:  
```sh
npm start
```
## 📢 Contato

📧 **E-mail:** [clebersoncarvalhomc5@gmail.com](mailto:clebersoncarvalhomc5@gmail.com)  
🔗 **LinkedIn:** [linkedin.com/in/cleberson-carvalho-1102nov](https://www.linkedin.com/in/cleberson-carvalho-1102nov/)  


🛠️ **Desenvolvido por: Cleberson de Carvalho** 🚀  
© 2025 Projeto MM Tech - Proposta A.