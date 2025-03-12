import { useState, useEffect } from "react";
import { fetchTeams, deleteTeam } from "../../services/teams/teamsServices";
import { useNavigate } from "react-router-dom";
import "./MgrTeam.css";

const MgrTeam = () => {
  const [teams, setTeams] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [leadersMap, setLeadersMap] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const teamsData = await fetchTeams();
        setTeams(teamsData);

        const leaderIds = teamsData.map(team => team.leaderId).filter(id => id);
        const uniqueLeaderIds = [...new Set(leaderIds)];

        const leadersResponse = await fetch(`http://localhost:5000/users?id=${uniqueLeaderIds.join(",")}`);
        const leadersData = await leadersResponse.json();
        const leaders = leadersData.reduce((acc, leader) => {
          acc[leader._id] = leader.name;
          return acc;
        }, {});
        setLeadersMap(leaders);
      } catch (err) {
        setError("Erro ao carregar times.");
      } finally {
        setLoading(false);
      }
    };

    loadTeams();
  }, []);

  const handleDelete = async (teamId) => {
    const confirmDelete = window.confirm("Tem certeza que deseja deletar este time?");
    
    if (confirmDelete) {
      try {
        await deleteTeam(teamId);
        alert("Time deletado com sucesso!");
        setTeams(teams.filter((team) => team._id !== teamId));
      } catch (error) {
        alert("Erro ao deletar time");
      }
    }
  };

  // Filtra times pelo nome
  const filteredTeams = teams.filter((team) =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="retangle-mgr-team">
      <h1>Gerenciar times</h1>

      {loading && <p>Carregando dados...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <>
          <div className="search-container">
            <input
              type="text"
              placeholder="Pesquisar por nome..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <table>
            <thead>
              <tr>
                <th>Nome do Time</th>
                <th>Líder</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredTeams.map((team) => (
                <tr key={team._id}>
                  <td>{team.name}</td>
                  <td>
                    {team.leaderId && leadersMap[team.leaderId] 
                      ? leadersMap[team.leaderId]
                      : "Sem líder"}
                  </td>
                  <td>
                    <button
                      className="btn-edit-menu"
                      onClick={() => navigate(`/editarTime/${team._id}`)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(team._id)}
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

export default MgrTeam;