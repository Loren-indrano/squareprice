/**
 * Fonction backend appelée par l'automation.
 * @param {Object} data - Les données passées depuis l'automation.
 * @returns {String} - Le résultat du traitement ou un message de succès.
 */
import { getAutomationResult } from 'backend/automations.jsw';
export async function triggerAutomation(data) {
    try {
        // Appelle une fonction dans ton Web Module si tu en as besoin
        const result = await getAutomationResult(data);
        
        console.log("Résultat de l’automation :", result);
        
        // Effectue un autre traitement ici si nécessaire, comme enregistrer dans une base de données
        
        return result; // Retourne le résultat ou un message pour l'automation
    } catch (error) {
        console.error("Erreur dans triggerAutomation :", error);
        throw new Error("Erreur lors de l'exécution de l'automation.");
    }
}