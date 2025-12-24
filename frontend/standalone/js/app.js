// Point d'entrée principal de l'application

import { showScreen } from './navigation.js';
import { generateVehicleList, generateChecklist } from './ui.js';
import { updateOnlineStatus } from './utils.js';

/**
 * Initialise l'application
 */
export function initApp() {
    // Références aux éléments DOM
    const loginScreen = document.getElementById("login-screen");
    const roleTabs = document.querySelectorAll(".role-tab");
    const navButtons = document.querySelectorAll(".nav-btn");
    const sidebarNavButtons = document.querySelectorAll(".sidebar-nav-btn");
    const backButtons = document.querySelectorAll(".back-btn");
    const quickActions = document.querySelectorAll(".quick-action");
    
    // Simuler une connexion réussie
    const loginButton = loginScreen?.querySelector("button");
    if (loginButton) {
        loginButton.addEventListener("click", function() {
            showScreen("manager-dashboard");
        });
    }
    
    // Générer les listes
    generateVehicleList();
    generateChecklist();
    
    // Navigation par rôle
    roleTabs.forEach(tab => {
        tab.addEventListener("click", function() {
            roleTabs.forEach(t => {
                t.classList.remove("active", "bg-indigo-600", "text-white");
                t.classList.add("text-gray-600");
            });
            this.classList.remove("text-gray-600");
            this.classList.add("active");
            
            // Simuler le changement de rôle
            showScreen("manager-dashboard");
        });
    });
    
    // Navigation bas (mobile)
    navButtons.forEach(btn => {
        btn.addEventListener("click", function() {
            showScreen(this.dataset.screen);
        });
    });

    // Navigation sidebar (desktop)
    sidebarNavButtons.forEach(btn => {
        btn.addEventListener("click", function() {
            showScreen(this.dataset.screen);
        });
    });
    
    // Boutons retour
    backButtons.forEach(btn => {
        btn.addEventListener("click", function() {
            showScreen("manager-dashboard");
        });
    });
    
    // Actions rapides
    quickActions.forEach(action => {
        action.addEventListener("click", function() {
            const text = this.querySelector("span")?.textContent;
            if (text === "Checklist") {
                showScreen("safety-checklist");
            } else if (text === "Rapports") {
                showScreen("ai-reports");
            }
            // Les autres actions pourraient ouvrir des modals
        });
    });
    
    // Simuler le chargement hors ligne puis en ligne
    setTimeout(() => {
        updateOnlineStatus(true);
    }, 2000);
}

// Démarrer l'application quand le DOM est prêt
document.addEventListener("DOMContentLoaded", initApp);

