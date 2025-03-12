import "./Manual.css";

const Manual = () => {
  return (
    <div>
      <h1 className="title">Funções:</h1>
      <p className="description">
        <b>Manual:</b> Mostra como funciona cada parte do site.<br />
        <br />
        <b>Criar Time:</b> Define um nome do time, e possibilita a criação do mesmo <br />
        sem líder neste momento.<br />
        <br />
        <b>Adicionar Membros:</b> Adiciona um novo membro, enviando dados como <br />(nome, email, telefone e time, 
        sendo possível defini-lo como líder deste <br />time caso o mesmo não seja liderado).<br />
        <br />
        <b>Gerenciar Times:</b> Lista todos os times sendo possível pesquisar pelo<br /> nome,
        dando opções de editar os dados do time ou excluí-lo (Deleta<br /> todos os seus membros). 
        É possível também definir um líder dentre<br /> todos os membros desse time.<br />
        <br />
        <b>Gerenciar Membros:</b> Lista todos os membros adicionados, tendo a opção<br /> de 
        pesquisar pelo nome do membro ou filtrar pelo time. É possível editar <br /> cada atributo
        (nome, email, telefone e time) do membro clicando no botão, <br />e também é possível excluí-lo 
        (se o mesmo não for o líder, caso seja você <br />deve designar um novo líder para só então excluir o antigo).<br />
      </p>
    </div>
  );
};

export default Manual;