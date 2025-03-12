const API_URL = 'http://localhost:5000/adm';

export const registerAdm = async (userData) => {
    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });

        const text = await response.text();

        try {
            const data = JSON.parse(text);
            
            if (!response.ok) {
                throw new Error(data.message || 'Erro ao cadastrar usuário');
            }

            return data;
        } catch (jsonError) {
            throw new Error(text);
        }
    } catch (error) {
        throw error;
    }
};

export const loginAdm = async (userData) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao fazer login');
        }

        const data = await response.json();

        if (data.token) {
            localStorage.setItem('token', data.token);
        }

        return data;
    } catch (error) {
        throw error;
    }
};
