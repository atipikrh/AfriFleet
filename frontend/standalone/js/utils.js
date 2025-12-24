// Fonctions utilitaires

/**
 * Formate un nombre avec des séparateurs de milliers
 * @param {number} num - Nombre à formater
 * @returns {string} Nombre formaté
 */
export function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * Formate une date au format français
 * @param {Date|string} date - Date à formater
 * @returns {string} Date formatée
 */
export function formatDate(date) {
    if (typeof date === 'string') {
        return date;
    }
    const d = new Date(date);
    return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
}

/**
 * Simule le changement de statut en ligne/hors ligne
 * @param {boolean} isOnline - Statut en ligne
 */
export function updateOnlineStatus(isOnline) {
    const offlineIndicator = document.querySelector(".offline-indicator");
    const statusText = document.querySelector(".offline-indicator + span");
    
    if (offlineIndicator) {
        if (isOnline) {
            offlineIndicator.classList.remove("bg-success");
            offlineIndicator.classList.add("bg-gray-400");
        } else {
            offlineIndicator.classList.remove("bg-gray-400");
            offlineIndicator.classList.add("bg-success");
        }
    }
    
    if (statusText) {
        statusText.textContent = isOnline ? "En ligne" : "Hors ligne";
    }
}

