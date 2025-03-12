import { useState, useEffect } from "react";
import { createUser } from "../../services/user/usersServices";
import { fetchTeams } from "../../services/teams/teamsServices";
import { validateName, validateEmail, validatePhone } from "../../validations/Validator";
import "./AddMember.css";

const AddMember = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    teamId: "",  
    isLeader: false,
  });

  const [errors, setErrors] = useState({});
  const [teams, setTeams] = useState([]); 
  const [isLeaderDisabled, setIsLeaderDisabled] = useState(false); 
  const [leaderMessage, setLeaderMessage] = useState("");

  const loadTeams = async () => {
    try {
      const data = await fetchTeams();
      setTeams(data);
    } catch (error) {
      console.error("Erro ao buscar times:", error);
    }
  };

  useEffect(() => {
    loadTeams();
  }, []);

  useEffect(() => {
    if (formData.teamId) {
      const team = teams.find((team) => team._id === formData.teamId);
      if (team && team.leaderId) {
        setIsLeaderDisabled(true);
        setLeaderMessage("Este time já tem um líder");
      } else {
        setIsLeaderDisabled(false);
        setLeaderMessage("");
      }
    }
  }, [formData.teamId, teams]);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [id]: checked });
    } else {
      setFormData({ ...formData, [id]: value });
    }

    if (errors[id]) {
      setErrors({ ...errors, [id]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};

    const nameValidation = validateName(formData.name);
    if (nameValidation) {
      validationErrors.name = nameValidation;
    }

    const emailValidation = validateEmail(formData.email);
    if (!emailValidation) {
      validationErrors.email = "Digite um email válido.";
    }

    const phoneValidation = validatePhone(formData.phone);
    if (!phoneValidation) {
      validationErrors.phone = "Telefone deve conter DDD e 11 dígitos (somente numeros).";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setFormData({
        name: validationErrors.name ? "" : formData.name,
        email: validationErrors.email ? "" : formData.email,
        phone: validationErrors.phone ? "" : formData.phone,
        teamId: formData.teamId,
        isLeader: formData.isLeader
      });
      return;
    }

    try {
      await createUser(formData);
      alert("Membro adicionado com sucesso!");
      setFormData({ name: "", email: "", phone: "", teamId: "", isLeader: false });
      loadTeams();  
    } catch (error) {
      alert(error.message || "Erro ao adicionar membro");
    }
  };

  return (
    <div>
      <div className="retangle-add-member">
        <form onSubmit={handleSubmit}>
          <div className="form-add-member">
            <span>Nome</span>
            <label htmlFor="name" className="form-add-member-label" />
            <input
              type="text"
              className={`form-add-member-control ${errors.name ? "error-placeholder" : ""}`}
              id="name"
              placeholder={errors.name || "Digite seu Nome"}
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-add-member">
            <span>Email</span>
            <label htmlFor="email" className="form-add-member-label" />
            <input
              type="email"
              className={`form-add-member-control ${errors.email ? "error-placeholder" : ""}`}
              id="email"
              placeholder={errors.email || "Digite seu Email"}
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-add-member">
            <span>Telefone</span>
            <label htmlFor="phone" className="form-add-member-label" />
            <input
              type="text"
              className={`form-add-member-control ${errors.phone ? "error-placeholder" : ""}`}
              id="phone"
              placeholder={errors.phone || "Digite seu Telefone"}
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="form-add-member">
            <span>Time</span>
            <label htmlFor="team" className="form-add-member-label" />
            <select
              className="form-add-member-control"
              id="teamId"
              value={formData.teamId}
              onChange={handleChange}
            >
              <option value="">Selecione um Time</option>
              {teams.map((team) => (
                <option key={team._id} value={team._id}>
                  {team.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-add-member-leader">
            <label>
              <input
                type="checkbox"
                id="isLeader"
                checked={formData.isLeader}
                onChange={handleChange}
                disabled={isLeaderDisabled}
              />
              {isLeaderDisabled ? "Este time já tem um líder" : "Líder"}
            </label>
          </div>

          <button type="submit" className="btn-add-member">Adicionar membro</button>
        </form>
      </div>
    </div>
  );
};

export default AddMember;