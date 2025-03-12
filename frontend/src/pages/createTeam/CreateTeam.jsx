import { useState } from "react";
import { createTeam } from "../../services/teams/teamsServices";
import { validateName } from "../../validations/Validator";
import "./CreateTeam.css";

const CreateTeam = () => {
  const [formData, setFormData] = useState({
    name: "",
  });

  const [errors, setErrors] = useState({});
  const [placeholders, setPlaceholders] = useState({
    name: "Digite o nome do Time",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });

    if (errors[id]) {
      setErrors({ ...errors, [id]: "" });
      setPlaceholders({
        ...placeholders,
        [id]: "Digite o nome do Time",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name } = formData;

    const validationError = validateName(name);

    if (validationError) {
      setFormData({ name: "" });
      setErrors({ name: validationError });
      setPlaceholders({
        ...placeholders,
        name: validationError,
      });
      return;
    }

    try {
      const newTeam = await createTeam({
        name,
        leaderId: null,
        members: [],
      });

      if (newTeam) {
        alert("Time criado com sucesso!");
        setFormData({ name: "" });
        setErrors({});
        setPlaceholders({ name: "Digite o nome do Time" });
      } else {
        alert("Erro ao criar time.");
      }
    } catch (error) {
      alert("Erro ao criar time.");
    }
  };

  return (
    <div>
      <div className="retangle-create-team">
        <form onSubmit={handleSubmit}>
          <div className="form-create-team">
            <span>Nome do time</span>
            <label htmlFor="name" className="form-create-team-label" />
            <input
              type="text"
              className={`form-control ${errors.name ? "error-placeholder" : ""}`} 
              id="name"
              placeholder={placeholders.name} 
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn-create-team">
            Criar Time
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTeam;