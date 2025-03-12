import { useNavigate } from "react-router-dom";  
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  const handleCadastroClick = () => {
    navigate("/Cadastrar");
  };

  return (
    <div>
      <h1 className="title">Projeto: Criação de Times</h1>
      <p className="description">
        O projeto tem como objetivo desenvolver um sistema de gerenciamento de usuários, permitindo<br />  
        o cadastro de informações como nome, e-mail e telefone. Além disso, é possível criar times,definir<br />
        um líder e adicionar membros a cada equipe. O sistema oferece todas as operações de CRUD, além <br />
        de um módulo de cadastro e login para que o administrador possa gerenciar os times e usuários. <br /> 
        O banco de dados utilizado foi o NeDB.
      </p>
      <div className="button">
        <button className="btn-home" onClick={handleCadastroClick}>Criar seu Cadastro</button>
      </div>
    </div>
  );
};

export default Home;