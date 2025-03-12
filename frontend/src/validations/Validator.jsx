export const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email) && email.length <= 50;
};

export const validatePassword = (password) => {
    if (!password || password.trim() === "") {
        return "A senha não pode ser vazia."; 
    }
    if (password.length < 8) {
        return "A senha deve ter no mínimo 8 caracteres.";
    }    
    return true; 
};

export const validateName = (name) => {
    const nameRegex = /^[A-Za-zÀ-ÿ\s]+$/; 
    if (!name || name.length === 0) {
        return "O nome não pode estar vazio.";
    }
    if (name.length > 50) {
        return "O nome não pode ser maior que 50 caracteres.";
    }
    if (!nameRegex.test(name)) {
        return "Nome inválido.";
    }
    return null; 
};

export const validatePhone = (phone) => {
    const phoneRegex = /^[1-9]{2}[0-9]{9}$/;
    return phoneRegex.test(phone);
};

export const validateLogin = (email, password) => {
    const errors = {};

    if (!email) {
        errors.email = "O email não pode estar vazio.";
    }

    if (!password) {
        errors.password = "A senha não pode estar vazia.";
    }

    return errors;
};

export const validateForm = (data) => {
    const errors = {};

    const nameValidation = validateName(data.name);
    if (nameValidation) {
        errors.name = nameValidation;
    }

    if (!validateEmail(data.email)) {
        errors.email = "Digite um email válido.";
    }

    if (data.password !== undefined) {
        const passwordValidation = validatePassword(data.password);
        if (passwordValidation !== true) {
            errors.password = passwordValidation;
        }
    }

    if (!validatePhone(data.phone)) {
        errors.phone = "Telefone deve conter DDD e 11 dígitos (somente numeros).";
    }

    return errors;
};

export const formatPhone = (phone) => {
    return phone.replace(/\D/g, '').slice(0, 11); 
};