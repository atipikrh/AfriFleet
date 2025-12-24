// Gestion de la navigation entre écrans

// Fonction pour afficher un écran spécifique
export function showScreen(screenId) {
    // Références aux écrans (récupérées dynamiquement)
    const screens = [
        document.getElementById("login-screen"),
        document.getElementById("manager-dashboard"),
        document.getElementById("vehicle-detail"),
        document.getElementById("safety-checklist"),
        document.getElementById("fuel-entry"),
        document.getElementById("ai-reports")
    ];
    
    // Cacher tous les écrans
    screens.forEach(screen => {
        if (screen) {
            screen.classList.add("hidden");
        }
    });
    
    // Afficher l'écran demandé
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.remove("hidden");
    }
    
    // Mettre à jour la navigation mobile
    const navButtons = document.querySelectorAll(".nav-btn");
    navButtons.forEach(btn => {
        if (btn.dataset.screen === screenId) {
            btn.classList.remove("text-gray-500");
            btn.classList.add("text-indigo-600", "active");
        } else {
            btn.classList.remove("text-indigo-600", "active");
            btn.classList.add("text-gray-500");
        }
    });

    // Mettre à jour la navigation sidebar
    const sidebarNavButtons = document.querySelectorAll(".sidebar-nav-btn");
    sidebarNavButtons.forEach(btn => {
        if (btn.dataset.screen === screenId) {
            btn.classList.remove("text-gray-700");
            btn.classList.add("bg-indigo-50", "text-indigo-600", "active");
        } else {
            btn.classList.remove("bg-indigo-50", "text-indigo-600", "active");
            btn.classList.add("text-gray-700");
        }
    });
}

