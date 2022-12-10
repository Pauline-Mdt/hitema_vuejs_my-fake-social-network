import {defineStore} from 'pinia';
import {
    addUser,
    checkUserEmail,
    checkUserEmailAndPassword,
    checkUserPseudo,
    updateUser,
} from '../services/dbApi.js';

export const useUserStore = defineStore('userStore', {
    state: () => {
        return {
            user: {},
        }
    },
    actions: {
        register: async function (profil) {
            const pseudoUsed = await checkUserPseudo(profil.pseudo)
            const emailUsed = await checkUserEmail(profil.email)

            if (pseudoUsed.length !== 0) {
                return {
                    state: false,
                    message: 'Ce pseudo est déjà utilisé. Merci d\'en saisir un autre.',
                }
            } else if (emailUsed.length !== 0) {
                return {
                    state: false,
                    message: 'Cet email est déjà utilisé. Merci d\'en saisir un autre.',
                }
            } else {
                const newUser = await addUser(profil)
                if (Object.keys(newUser).length === 0) {
                    return {
                        state: false,
                        message: 'Un problème est survenu. Merci de contacter l\'administrateur du site.',
                    }
                }
                return {
                    state: true,
                }
            }
        },
        update: async function (profil) {
            const pseudoUsed = await checkUserPseudo(profil.pseudo)
            const emailUsed = await checkUserEmail(profil.email)

            if (pseudoUsed.length !== 0 && profil.pseudo !== this.user.pseudo) {
                return {
                    state: false,
                    message: 'Ce pseudo est déjà utilisé. Merci d\'en saisir un autre.',
                }
            } else if (emailUsed.length !== 0 && profil.email !== this.user.email) {
                return {
                    state: false,
                    message: 'Cet email est déjà utilisé. Merci d\'en saisir un autre.',
                }
            } else {
                profil.password === '' ? profil.password = this.user.password : null;
                const changeUser = await updateUser(this.user.id, profil)
                if (Object.keys(changeUser).length === 0) {
                    return {
                        state: false,
                        message: 'Un problème est survenu. Merci de contacter l\'administrateur du site.',
                    }
                }
                this.user = changeUser
                return {
                    state: true,
                }
            }
        },
        login: async function (identifiers) {
            const user = await checkUserEmailAndPassword(identifiers)
            if (user.length === 0) {
                return {
                    state: false,
                    message: 'Les identifiants fournis ne correspondent pas à nos enregistrements. Merci de vérifier votre saisie.',
                }
            } else {
                this.user = user[0]
                return {
                    state: true,
                }
            }
        },
        logout: function () {
            this.user = {};
        },
    }
})