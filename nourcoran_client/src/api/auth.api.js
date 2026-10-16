import api from './axios';

/**
 * Envoie les données d'inscription au backend
 * @param {Object} userData - { nom, prenom, email, mdp }
 * @returns {Promise} - Réponse du serveur
 */

export const registreUser = async (userData)=> {
    try{
        const response = await api.post('/auth/inscription', userData);
        return response.data;

    }catch(error){
        throw  error.response ? error.response.data: {message: "Erreur de connexion au serveur"};

    }
};

export const login = async (credential) => {
    try{
        const response = await api.post('/auth/inscription', credential)

    }catch(error){
        throw error.response ? error.response.data: {message: "Erreur de connexion au serveur"};

    }


}