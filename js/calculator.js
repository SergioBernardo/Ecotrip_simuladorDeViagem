/**
 * calculator.js
 * 
 * Funções para cálculo de emissões de CO2
 */

/**
 * Calcula a emissão de CO2 para uma viagem
 * @param {number} distance - Distância em km
 * @param {string} transportMode - Modo de transporte
 * @param {boolean} isRoundTrip - Se é ida e volta
 * @returns {number} Emissão em kg de CO2
 */
function calculateEmission(distance, transportMode, isRoundTrip = false) {
    const factor = CONFIG.EMISSION_FACTORS[transportMode] || 0;
    const totalDistance = isRoundTrip ? distance * 2 : distance;
    return totalDistance * factor;
}

/**
 * Calcula comparações com outros meios de transporte
 * @param {number} distance - Distância em km
 * @param {boolean} isRoundTrip - Se é ida e volta
 * @returns {Object} Objeto com emissões por modo de transporte
 */
function calculateComparisons(distance, isRoundTrip = false) {
    const comparisons = {};
    
    Object.keys(CONFIG.EMISSION_FACTORS).forEach(mode => {
        comparisons[mode] = calculateEmission(distance, mode, isRoundTrip);
    });
    
    return comparisons;
}

/**
 * Calcula quantas árvores seriam necessárias para compensar a emissão
 * Uma árvore adulta absorve em média 22kg de CO2 por ano
 * @param {number} emission - Emissão em kg de CO2
 * @returns {Object} Informações sobre compensação
 */
function calculateCarbonCredits(emission) {
    const CO2_PER_TREE_YEAR = 22; // kg de CO2 por árvore por ano
    const treesNeeded = emission / CO2_PER_TREE_YEAR;
    const monthsOfAbsorption = (emission / CO2_PER_TREE_YEAR) * 12;
    
    return {
        treesPerYear: Math.ceil(treesNeeded),
        monthsOfOneTree: monthsOfAbsorption.toFixed(1),
        totalEmission: emission
    };
}

/**
 * Gera comparações interessantes com objetos do cotidiano
 * @param {number} emission - Emissão em kg de CO2
 * @returns {Array} Array de comparações
 */
function generateComparisons(emission) {
    const comparisons = [];
    
    // Smartphones carregados (0.008 kg CO2 por carga)
    const smartphones = Math.round(emission / 0.008);
    if (smartphones > 0) {
        comparisons.push({
            icon: "📱",
            text: `Equivale a carregar ${smartphones.toLocaleString('pt-BR')} smartphones`
        });
    }
    
    // Horas de TV (0.088 kg CO2 por hora)
    const tvHours = Math.round(emission / 0.088);
    if (tvHours > 0) {
        comparisons.push({
            icon: "📺",
            text: `Equivale a ${tvHours.toLocaleString('pt-BR')} horas de TV ligada`
        });
    }
    
    // Refeições (2.5 kg CO2 por refeição média)
    const meals = Math.round(emission / 2.5);
    if (meals > 0) {
        comparisons.push({
            icon: "🍽️",
            text: `Equivale a produzir ${meals.toLocaleString('pt-BR')} refeições`
        });
    }
    
    // Garrafas PET (0.082 kg CO2 por garrafa)
    const bottles = Math.round(emission / 0.082);
    if (bottles > 0) {
        comparisons.push({
            icon: "🥤",
            text: `Equivale a produzir ${bottles.toLocaleString('pt-BR')} garrafas PET`
        });
    }
    
    return comparisons;
}
