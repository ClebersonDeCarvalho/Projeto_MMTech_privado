import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { loginAdm } from '../../services/adm/admServices';
import { validateLogin } from '../../validations/Validator';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [placeholders, setPlaceholders] = useState({
    email: "Digite seu Email",
    password: "Digite sua Senha",
  });

  const navigate = useNavigate();

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
    const validationErrors = validateLogin(formData.email, formData.password);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setFormData({ email: "", password: "" });

      setPlaceholders({
        email: validationErrors.email || "Digite seu Email",
        password: validationErrors.password || "Digite sua Senha",
      });
      return;
    }

    try {
      const data = await loginAdm(formData);

      if (data.token) {
        alert('Login realizado com sucesso!');
        localStorage.setItem('token', data.token);
        navigate('/manual');

        setFormData({ email: '', password: '' });
        setErrors({});
        setPlaceholders({
          email: "Digite seu Email",
          password: "Digite sua Senha",
        });
      }
    } catch (error) {
   
      if (error.message === 'Senha incorreta') {
        setErrors({
          password: error.message,
        });
        setPlaceholders({
          password: error.message,
        });
        setFormData({ ...formData, password: '' });
      }
    
      else if (error.message === 'Usuário não encontrado' || error.message === 'Email inválido') {
        setErrors({
          email: error.message,
        });
        setPlaceholders({
          email: error.message,
        });
        setFormData({ ...formData, email: '' });
      } else {
      
        setErrors({
          email: error.message,
          password: error.message,
        });

        setPlaceholders({
          email: error.message,
          password: error.message,
        });
      }
    }
  };

  return (
    <div>
      <div className="retangle-login">
        <form onSubmit={handleSubmit}>
          <div className="form-login">
            <span>Email</span>
            <input
              type="email"
              className={`form-control ${errors.email ? 'error-placeholder' : ''}`}
              id="email"
              placeholder={placeholders.email}
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-login">
            <span>Senha</span>
            <input
              type="password"
              className={`form-control ${errors.password ? 'error-placeholder' : ''}`}
              id="password"
              placeholder={placeholders.password}
              value={formData.password}
              onChange={handleChange}
            />
          </div>
        </form>
      </div>
      <button type="submit" className="btn-login" onClick={handleSubmit}>
        Entrar
      </button>
    </div>
  );
};

export default Login;