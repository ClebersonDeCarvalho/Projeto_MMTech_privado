const API_URL = 'http://localhost:5000/users';

export const createUser = async (userData) => {
  try {
      const response = await fetch(`${API_URL}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData),
      });

      if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || 'Erro ao adicionar membro');
      }

      return await response.json();
  } catch (error) {
      throw error; 
  }
};

export const updateUser = async (id, userData) => {
  try {
    const updatedData = { ...userData };

    if (userData.teamId) {
      updatedData.newTeamId = userData.teamId;
    }

    updatedData.isLeader = userData.isLeader ? userData.teamId : null;

    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.error);
    }

    return responseData;
  } catch (error) {
    throw error;
  }
};

export const fetchUsers = async () => {
  try {
    const response = await fetch(`${API_URL}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao buscar usuários");
    }
    return await response.json();
  } catch (error) {
    return [];
  }
};

export const fetchUserById = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/${userId}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao buscar usuário");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/${userId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao deletar usuário");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};