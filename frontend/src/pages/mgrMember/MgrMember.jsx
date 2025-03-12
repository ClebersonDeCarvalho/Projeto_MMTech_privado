import { useState, useEffect } from "react";
import { fetchTeams } from "../../services/teams/teamsServices";
import { deleteUser, fetchUsers } from "../../services/user/usersServices";
import { useNavigate } from "react-router-dom";
import "./MgrMember.css";

const EditMember = () => {
  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [usersData, teamsData] = await Promise.all([fetchUsers(), fetchTeams()]);
        setUsers(usersData);
        setTeams(teamsData);
      } catch (err) {
        setError("Erro ao carregar dados.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm("Tem certeza que deseja deletar este usuário?");
    
    if (confirmDelete) {
      try {
        await deleteUser(userId);
        alert("Usuário deletado com sucesso!");
        setUsers(users.filter((user) => user._id !== userId));
      } catch (error) {
        alert("Erro ao deletar usuário");
      }
    }
  };

  const filteredUsersByName = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUsers = selectedTeam
    ? filteredUsersByName.filter((user) => user.teamId === selectedTeam)
    : filteredUsersByName;

  const getTeamName = (teamId) => {
    const team = teams.find((team) => team._id === teamId);
    return team ? team.name : "Sem time";
  };

  return (
    <div className="retangle-mgr-member">
      <h1>Gerenciar membro</h1>

      {loading && <p>Carregando dados...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <>
          <div className="search-mgr-container">
            <input
              type="text"
              placeholder="Pesquisar por nome..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-mgr-input"
            />
            <select
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value)}
              className="team-mgr-filter"
            >
              <option value="">Todos os Times</option>
              {teams.map((team) => (
                <option key={team._id} value={team._id}>
                  {team.name}
                </option>
              ))}
            </select>
          </div>

          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Telefone</th>
                <th>Time</th>
                <th>Função</th>
                <th className="th-action">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{getTeamName(user.teamId)}</td>
                  <td>{user.isLeader ? "Líder" : "Membro"}</td>
                  <td>
                    <button
                      className="btn-edit-menu"
                      onClick={() => navigate(`/editarMembro/${user._id}`)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(user._id)}
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default EditMember;