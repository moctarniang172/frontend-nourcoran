import React, { useState } from 'react';
import { registreUser } from '../api/auth.api.js';

export default function RegisterPage() {
    // 1. Déclaration des états (states) pour stocker les champs du formulaire
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        mdp: ''
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    // 2. Gestion de la saisie dans les inputs
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // 3. Soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault(); // Empêche le rechargement de la page par défaut
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            // Appel de notre fonction API
            const response = await registerUser(formData);
            setSuccess("Inscription réussie ! Vous pouvez vous connecter.");
            // Optionnel : vider le formulaire
            setFormData({ nom: '', prenom: '', email: '', mdp: '' });
        } catch (err) {
            // Si le backend renvoie une erreur, on l'affiche
            setError(err.message || "Une erreur est survenue lors de l'inscription.");
        } finally {
            setLoading(false); // Fin du chargement
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Créer un compte - NourCoran
                </h2>

                {/* Affichage des messages d'erreur ou de succès */}
                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm">
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                        <input
                            type="text"
                            name="nom"
                            value={formData.nom}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                            placeholder="Votre nom"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                        <input
                            type="text"
                            name="prenom"
                            value={formData.prenom}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                            placeholder="Votre prénom"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                            placeholder="exemple@email.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
                        <input
                            type="password"
                            name="mdp"
                            value={formData.mdp}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition duration-200 disabled:bg-emerald-300"
                    >
                        {loading ? "Inscription en cours..." : "S'inscrire"}
                    </button>
                </form>
            </div>
        </div>
    );
}