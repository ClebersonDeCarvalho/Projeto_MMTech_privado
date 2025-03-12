const API_URL = "http://localhost:5000/teams";

export const fetchTeams = async () => {
  try {
    const response = await fetch(`${API_URL}`);
    if (!response.ok) {
      throw new Error("Erro ao buscar times");
    }
    return await response.json();
  } catch (error) {
    return [];
  }
};

export const createTeam = async (teamData) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token de autenticação não encontrado. Faça login novamente.");
    }

    const response = await fetch(`${API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: teamData.name,
        leaderId: null, 
        members: [],
      }),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || "Erro ao criar time");
    }

    return await response.json();
  } catch (error) {
    return null;
  }
};

export const updateTeam = async (teamData) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token de autenticação não encontrado. Faça login novamente.");
    }

    const response = await fetch(`http://localhost:5000/teams/${teamData.teamId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: teamData.name,
        leaderId: teamData.leaderId,
        memberToRemove: teamData.memberToRemove,
        memberToAdd: teamData.memberToAdd 
      }),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || "Erro ao atualizar time");
    }

    return await response.json();
  } catch (error) {
    return null;
  }
};

export const fetchTeamById = async (teamId) => {
  try {
    const response = await fetch(`${API_URL}/${teamId}`);
    if (!response.ok) {
      throw new Error("Erro ao buscar dados do time");
    }
    return await response.json();
  } catch (error) {
    return null;
  }
};

export const fetchTeamAndLeaders = async (teamId) => {
  try {
  
    const teamResponse = await fetch(`${API_URL}/${teamId}`);
    const team = await teamResponse.json();
    const usersResponse = await fetch("http://localhost:5000/users?isLeader=null");
    const users = await usersResponse.json();

    return { team, users };
  } catch (error) {
    throw new Error("Erro ao carregar dados do time e líderes.");
  }
};

export const deleteTeam = async (teamId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token de autenticação não encontrado. Faça login novamente.");
    }

    const response = await fetch(`${API_URL}/${teamId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || "Erro ao deletar time");
    }
    return true; 

  } catch (error) {
    
    return false;
  }
};