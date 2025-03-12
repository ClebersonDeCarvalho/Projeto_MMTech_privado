import { useState, useEffect } from "react";
import { fetchUserById, updateUser } from "../../services/user/usersServices";
import { useParams, useNavigate } from "react-router-dom";
import { fetchTeams } from "../../services/teams/teamsServices";
import { validateForm } from "../../validations/Validator";
import './EditMember.css';

const EditMembers = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    teamId: "",
    isLeader: false,
  });

  const [originalTeamId, setOriginalTeamId] = useState(""); 
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [placeholders, setPlaceholders] = useState({
    name: "Digite o nome do usuário",
    email: "Digite o email do usuário",
    phone: "Digite o telefone do usuário",
  });

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await fetchUserById(id);
        const userTeamId = userData.teamId || "";

        setFormData({
          name: userData.name,
          email: userData.email,
          phone: userData.phone || "",
          teamId: userTeamId,
          isLeader: userData.isLeader || false,
        });

        setOriginalTeamId(userTeamId);

        const teamsData = await fetchTeams();
        setTeams(teamsData);
      } catch (err) {
        setError("Erro ao carregar dados do usuário.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setErrors({ ...errors, [e.target.id]: "" });
    setPlaceholders({ ...placeholders, [e.target.id]: `Digite o ${e.target.id === "phone" ? "telefone" : e.target.id} do usuário` });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setPlaceholders({ ...placeholders, ...validationErrors });
      setFormData({
        ...formData,
        name: validationErrors.name ? "" : formData.name,
        email: validationErrors.email ? "" : formData.email,
        phone: validationErrors.phone ? "" : formData.phone,
      });
      
      return;
    }
  
    try {
      const updatedUser = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        teamId: formData.teamId,
        originalTeamId: originalTeamId,
      };
  
      if (formData.teamId !== originalTeamId) {
        updatedUser.newTeamId = formData.teamId;
      }
  
      await updateUser(id, updatedUser);
      alert("Usuário atualizado com sucesso!");
      navigate("/gerenciarMembros");
  
    } catch (error) {
      const errorMessage = error.message || "Erro ao atualizar usuário";
  
      setErrors({ email: errorMessage });
      setPlaceholders({ ...placeholders, email: errorMessage });
      setFormData({ ...formData, email: "" });
    }
  };   

  if (loading) return <p>Carregando...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div>
      <div className="retangle-edit-member">
        <form onSubmit={handleSubmit}>
          <div className="form-edit-member">
            <span>Nome</span>
            <input
              type="text"
              className={`form-control ${errors.name ? "error-placeholder" : ""}`}
              id="name"
              placeholder={placeholders.name}
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-edit-member">
            <span>Email</span>
            <input
              type="email"
              className={`form-control ${errors.email ? "error-placeholder" : ""}`}
              id="email"
              placeholder={placeholders.email}
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-edit-member">
            <span>Telefone</span>
            <input
              type="text"
              className={`form-control ${errors.phone ? "error-placeholder" : ""}`}
              id="phone"
              placeholder={placeholders.phone}
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-edit-member-user">
            <span>Time</span>
            <select
              className="form-control"
              id="teamId"
              value={formData.teamId}
              onChange={handleChange}
            >
              <option value="">Selecione um time</option>
              {teams.map((team) => (
                <option key={team._id} value={team._id}>
                  {team.name}
                </option>
              ))}
            </select>
            {formData.isLeader && <p>Líder do time acima 👑</p>}
          </div>
        </form>
      </div>
      <button type="submit" className="btn-edit" onClick={handleSubmit}>Editar Membro</button>
      <button type="button" className="btn-exit" onClick={() => navigate("/gerenciarMembros")}>Cancelar</button>
    </div>
  );
};

export default EditMembers;