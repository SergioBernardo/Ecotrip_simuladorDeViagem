/**
 * config.js
 * 
 * Create js/config.js that defines a global CONFIG object with:
 * 
 * EMISSION_FACTORS object (kg CO2 per km):
 * - bicycle: 0
 * - car: 0.12
 * - bus: 0.089
 * - truck: 0.96
 * 
 * TRANSPORT_MODES object with metadata:
 * For each mode (bicycle, car, bus, truck):
 * - label: Portuguese name (Bicicleta, Carro, Ônibus, Caminhão)
 * - icon: emoji (🚴, 🚗, 🚌, 🚚)
 * - color: hex color code for UI
 * 
 * CARBON_CREDIT object:
 * - KG_PER_CREDIT: 1000
 * - PRICE_MIN_BRL: 60
 * - PRICE_MAX_BRL: 150
 * 
 * Add these methods to RoutesDB object:
 * 
 * getAllCities: function() {
 *   // Return unique sorted array of all city names from routes
 *   // Extract from both origin and destination
 *   // Remove duplicates and sort alphabetically
 * }
 * 
 * findDistance: function(origin, destination) {
 *   // Find route distance between two cities
 *   // Search in both directions (origin-destination and destination-origin)
 *   // Normalize input: trim whitespace and convert to lowercase for comparison
 *   // Return distance in km if found, null if not found
 * }
 */

/**
 * Objeto de configuração global
 */
const CONFIG = {
    // Fatores de emissão de CO2 por modo de transporte (kg CO2 por km)
    EMISSION_FACTORS: {
        bicycle: 0,
        car: 0.12,
        bus: 0.089,
        truck: 0.96
    },
    
    // Metadados dos modos de transporte
    TRANSPORT_MODES: {
        bicycle: {
            label: 'Bicicleta',
            icon: '🚴',
            color: '#27ae60'
        },
        car: {
            label: 'Carro',
            icon: '🚗',
            color: '#3498db'
        },
        bus: {
            label: 'Ônibus',
            icon: '🚌',
            color: '#f39c12'
        },
        truck: {
            label: 'Caminhão',
            icon: '🚚',
            color: '#e74c3c'
        }
    },
    
    // Configurações de crédito de carbono
    CARBON_CREDIT: {
        KG_PER_CREDIT: 1000,
        PRICE_MIN_BRL: 60,
        PRICE_MAX_BRL: 150
    }
};

/**
 * Retorna array único e ordenado de todas as cidades das rotas
 * @returns {string[]} Array com nomes das cidades
 */
RoutesDB.getAllCities = function() {
    const cities = new Set();
    
    // Extrair cidades de origem e destino
    this.routes.forEach(route => {
        cities.add(route.origin);
        cities.add(route.destination);
    });
    
    // Converter para array, ordenar alfabeticamente
    return Array.from(cities).sort();
};

/**
 * Encontra a distância entre duas cidades
 * @param {string} origin - Cidade de origem
 * @param {string} destination - Cidade de destino
 * @returns {number|null} Distância em km ou null se não encontrado
 */
RoutesDB.findDistance = function(origin, destination) {
    // Normalizar entrada: remover espaços extras e converter para minúsculas
    const normalizedOrigin = origin.trim().toLowerCase();
    const normalizedDestination = destination.trim().toLowerCase();
    
    // Buscar em ambas as direções
    const route = this.routes.find(r => {
        const routeOrigin = r.origin.toLowerCase();
        const routeDestination = r.destination.toLowerCase();
        
        return (
            (routeOrigin === normalizedOrigin && routeDestination === normalizedDestination) ||
            (routeOrigin === normalizedDestination && routeDestination === normalizedOrigin)
        );
    });
    
    return route ? route.distanceKm : null;
};

/**
 * Popula o datalist com as cidades disponíveis
 * @returns {void}
 */
RoutesDB.populateDatalist = function() {
    // Get cities list from RoutesDB.getAllCities()
    const cities = this.getAllCities();
    
    // Get datalist element by id 'cities-list'
    const datalist = document.getElementById('routes');
    
    if (!datalist) return;
    
    // Create option elements for each city
    datalist.innerHTML = '';
    cities.forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        datalist.appendChild(option);
    });
};
