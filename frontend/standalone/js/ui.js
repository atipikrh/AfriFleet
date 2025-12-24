// Génération d'éléments UI

import { vehicles, checklistItems } from './data.js';
import { showScreen } from './navigation.js';

/**
 * Génère la liste des véhicules
 */
export function generateVehicleList() {
    const vehicleList = document.getElementById("vehicle-list");
    if (!vehicleList) return;
    
    vehicleList.innerHTML = "";
    
    vehicles.forEach(vehicle => {
        let statusColor = "bg-success";
        let statusText = "En service";
        let statusTextColor = "text-green-600";
        
        if (vehicle.status === "maintenance") {
            statusColor = "bg-warning";
            statusText = "Maintenance";
            statusTextColor = "text-amber-600";
        } else if (vehicle.status === "inactive") {
            statusColor = "bg-danger";
            statusText = "Hors service";
            statusTextColor = "text-red-600";
        }
        
        const vehicleCard = document.createElement("div");
        vehicleCard.className = "vehicle-card rounded-xl sm:rounded-2xl p-4 sm:p-5";
        vehicleCard.innerHTML = `
            <div class="flex justify-between items-start mb-3 sm:mb-4">
                <div class="flex-1">
                    <div class="flex items-center mb-2">
                        <span class="status-dot ${statusColor}"></span>
                        <h4 class="font-semibold text-gray-800 text-sm sm:text-base">${vehicle.name}</h4>
                    </div>
                    <div class="text-xs sm:text-sm text-gray-600">${vehicle.id} • ${vehicle.driver}</div>
                </div>
                <span class="text-xs ${statusTextColor} font-medium px-2 py-1 rounded-full bg-white/80 backdrop-blur-sm">
                    ${statusText}
                </span>
            </div>
            <div class="mb-3">
                <img src="${vehicle.image}" alt="${vehicle.name}" class="w-full h-32 sm:h-40 object-cover rounded-lg vehicle-image" loading="lazy">
            </div>
            <div class="flex flex-col sm:flex-row justify-between gap-2 sm:gap-4 text-xs sm:text-sm">
                <div>
                    <div class="text-gray-500">Kilométrage</div>
                    <div class="font-medium text-gray-800">${vehicle.mileage}</div>
                </div>
                <div>
                    <div class="text-gray-500">Dernier contrôle</div>
                    <div class="font-medium text-gray-800">${vehicle.lastCheck}</div>
                </div>
                <button class="view-detail text-indigo-600 font-medium hover:text-indigo-700 transition-colors mt-2 sm:mt-0 text-left sm:text-right">
                    Détails <i class="fas fa-chevron-right ml-1"></i>
                </button>
            </div>
        `;
        vehicleList.appendChild(vehicleCard);
    });
    
    // Ajouter les événements pour les boutons de détails
    document.querySelectorAll(".view-detail").forEach(btn => {
        btn.addEventListener("click", function() {
            showScreen("vehicle-detail");
        });
    });
}

/**
 * Génère la checklist
 */
export function generateChecklist() {
    const checklistContainer = document.getElementById("checklist-items");
    if (!checklistContainer) return;
    
    checklistContainer.innerHTML = "";
    
    checklistItems.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.className = `checklist-item glass-card p-3 sm:p-4 rounded-lg ${item.checked ? "checked" : ""}`;
        itemDiv.innerHTML = `
            <div class="flex justify-between items-center">
                <span class="font-medium text-sm sm:text-base">${item.text}</span>
                <button class="check-btn w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 transition-all ${item.checked ? "gradient-secondary border-green-500 text-white shadow-lg" : "border-gray-300 text-gray-400 hover:border-indigo-400"}" data-id="${item.id}">
                    <i class="fas fa-check text-xs sm:text-sm"></i>
                </button>
            </div>
        `;
        checklistContainer.appendChild(itemDiv);
    });
    
    // Ajouter les événements pour les cases à cocher
    document.querySelectorAll(".check-btn").forEach(btn => {
        btn.addEventListener("click", function() {
            const itemId = parseInt(this.dataset.id);
            const item = checklistItems.find(i => i.id === itemId);
            if (item) {
                item.checked = !item.checked;
                generateChecklist();
            }
        });
    });
}

