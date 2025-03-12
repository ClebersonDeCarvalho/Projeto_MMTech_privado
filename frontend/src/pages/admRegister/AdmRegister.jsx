import { useState } from "react";
import { registerAdm } from "../../services/adm/admServices";
import { validateForm } from "../../validations/Validator";
import "./AdmRegister.css";

const AdmRegister = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [placeholders, setPlaceholders] = useState({
        name: "Digite seu Nome",
        email: "Digite seu Email",
        phone: "Digite seu Telefone",
        password: "Digite sua Senha",
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });

        if (errors[id]) {
            setErrors({ ...errors, [id]: null });
            setPlaceholders({
                ...placeholders,
                [id]: `Digite seu ${id.charAt(0).toUpperCase() + id.slice(1)}`,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm(formData);
    
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setFormData((prevData) => {
                const newData = { ...prevData };
                Object.keys(validationErrors).forEach((field) => {
                    newData[field] = ""; 
                });
                return newData;
            });
            setPlaceholders((prevPlaceholders) => {
                const newPlaceholders = { ...prevPlaceholders };
                Object.keys(validationErrors).forEach((field) => {
                    newPlaceholders[field] = validationErrors[field];
                });
                return newPlaceholders;
            });
            return;
        }
    
        try {
            await registerAdm(formData);
            alert("Cadastro realizado com sucesso!");
            setFormData({ name: "", email: "", phone: "", password: "" });
            setErrors({});
            setPlaceholders({
                name: "Digite seu Nome",
                email: "Digite seu Email",
                phone: "Digite seu Telefone",
                password: "Digite sua Senha",
            });
        } catch (error) {
            alert(error.message || "Erro ao cadastrar usuário");
        }
    };
    
    return (
        <div>
            <div className="retangle-register">
                <form onSubmit={handleSubmit}>
                <div className="form-register">
                    <span>Nome</span>
                    <label htmlFor="name" className="form-register-label" />
                    <input
                    type="text"
                    className={`form-register-control ${errors.name ? "error-placeholder" : ""}`}
                    id="name"
                    placeholder={errors.name || "Digite seu Nome"}
                    value={formData.name}
                    onChange={handleChange}
                    />
                </div>

                <div className="form-register">
                    <span>Email</span>
                    <label htmlFor="email" className="form-register-label" />
                    <input
                    type="email"
                    className={`form-register-control ${errors.email ? "error-placeholder" : ""}`}
                    id="email"
                    placeholder={errors.email || "Digite seu Email"}
                    value={formData.email}
                    onChange={handleChange}
                    />
                </div>

                <div className="form-register">
                    <span>Telefone</span>
                    <label htmlFor="phone" className="form-register-label" />
                    <input
                    type="text"
                    className={`form-register-control ${errors.phone ? "error-placeholder" : ""}`}
                    id="phone"
                    placeholder={errors.phone || "Digite seu Telefone"}
                    value={formData.phone}
                    onChange={handleChange}
                    />
                </div>

                <div className="form-register">
                    <span>Senha</span>
                    <label htmlFor="password" className="form-register-label" />
                    <input
                    type="password"
                    className={`form-register-control ${errors.password ? "error-placeholder" : ""}`}
                    id="password"
                    placeholder={errors.password || "Digite sua Senha"}
                    value={formData.password}
                    onChange={handleChange}
                    />
                </div>
                </form>
            </div>
            <button type="button" className="btn-register" onClick={handleSubmit}>Cadastrar</button>
        </div>
    );
};

export default AdmRegister; 