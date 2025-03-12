import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchTeamAndLeaders, updateTeam } from "../../services/teams/teamsServices";
import { validateName } from "../../validations/Validator";
import './EditTeam.css';

const EditTeam = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [teamName, setTeamName] = useState("");
  const [leaderId, setLeaderId] = useState("");
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [oldLeaderId, setOldLeaderId] = useState("");
  const [nameError, setNameError] = useState("");

  useEffect(() => {
    const loadTeamData = async () => {
      try {
        const { team, users } = await fetchTeamAndLeaders(id);

        setTeamName(team.name);
        setLeaderId(team.leaderId || "");
        setOldLeaderId(team.leaderId || ""); 
        setMembers(team.members.map(memberId => {
          const user = users.find(user => user._id === memberId);
          return user ? { ...user } : null;
        }).filter(Boolean));
      } catch (err) {
        setError("Erro ao carregar dados do time.");
      } finally {
        setLoading(false);
      }
    };

    loadTeamData();
  }, [id]);

  const handleSave = async () => {
    const nameValidation = validateName(teamName);
    if (nameValidation) {
      setNameError(nameValidation);
      setTeamName("");
      return;
    }

    try {
      const updateData = { teamId: id, leaderId };

      if (teamName !== "") {
        updateData.name = teamName;
      }
      await updateTeam(updateData);
  
      alert("Time atualizado com sucesso!");
      navigate("/gerenciarTimes");
    } catch (error) {
      alert("Erro ao atualizar time");
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <>
      <div className="retangle-edit-team">
        <form>
          <div className="form-edit-team">
            <h1>Nome do Time:</h1>
            <input
              type="text"
              value={teamName}
              onChange={(e) => {
                setTeamName(e.target.value);
                setNameError("");
              }}
              placeholder={nameError || "Digite o nome do time"}
              className={nameError ? "error-placeholder" : ""}
            />
          </div>
          <div className="form-edit-team">
            <h1>Líder do Time</h1>
            <select value={leaderId} onChange={(e) => setLeaderId(e.target.value)}>
              <option value="">Sem líder</option>
              {members.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
        </form>
      </div>
      <button className="btn-edit" onClick={handleSave}>Editar</button>
      <button className="btn-exit" onClick={() => navigate("/gerenciarTimes")}>Cancelar</button>
    </>
  );
};

export default EditTeam;