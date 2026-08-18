/**
 * routes-data.js
 * 
 * Create js/routes-data.js with a global object named RoutesDB containing:
 * 
 * A property 'routes' as an array of route objects with structure:
 * - origin: string (city name with state, e.g., "São Paulo, SP")
 * - destination: string (city name with state)
 * - distanceKm: number (actual distance between cities)
 * 
 * Include 30-40 popular Brazilian routes:
 * - Capital to capital connections (São Paulo-Rio de Janeiro: 430km, São Paulo-Brasília: 1015km, Rio-Brasília: 1148km, etc.)
 * - Major regional routes (São Paulo-Campinas: 95km, Rio-Niterói: 13km, Belo Horizonte-Ouro Preto: 100km, etc.)
 * - Cover different regions of Brazil
 */

const RoutesDB = {
    routes: [
        // Sul - Sudeste
        { origin: "São Paulo, SP", destination: "Rio de Janeiro, RJ", distanceKm: 430 },
        { origin: "São Paulo, SP", destination: "Belo Horizonte, MG", distanceKm: 586 },
        { origin: "São Paulo, SP", destination: "Curitiba, PR", distanceKm: 408 },
        { origin: "Rio de Janeiro, RJ", destination: "Belo Horizonte, MG", distanceKm: 434 },
        { origin: "Curitiba, PR", destination: "Florianópolis, SC", distanceKm: 300 },
        { origin: "Florianópolis, SC", destination: "Porto Alegre, RS", distanceKm: 476 },
        
        // Sudeste - Centro-Oeste
        { origin: "São Paulo, SP", destination: "Brasília, DF", distanceKm: 1015 },
        { origin: "Rio de Janeiro, RJ", destination: "Brasília, DF", distanceKm: 1148 },
        { origin: "Belo Horizonte, MG", destination: "Brasília, DF", distanceKm: 716 },
        { origin: "Brasília, DF", destination: "Goiânia, GO", distanceKm: 209 },
        { origin: "São Paulo, SP", destination: "Campo Grande, MS", distanceKm: 1014 },
        
        // Nordeste
        { origin: "Salvador, BA", destination: "Recife, PE", distanceKm: 839 },
        { origin: "Recife, PE", destination: "Fortaleza, CE", distanceKm: 800 },
        { origin: "Fortaleza, CE", destination: "Natal, RN", distanceKm: 537 },
        { origin: "Salvador, BA", destination: "Fortaleza, CE", distanceKm: 1389 },
        { origin: "Recife, PE", destination: "João Pessoa, PB", distanceKm: 120 },
        { origin: "Fortaleza, CE", destination: "Teresina, PI", distanceKm: 634 },
        { origin: "Salvador, BA", destination: "Aracaju, SE", distanceKm: 356 },
        { origin: "Recife, PE", destination: "Maceió, AL", distanceKm: 285 },
        
        // Norte
        { origin: "Brasília, DF", destination: "Palmas, TO", distanceKm: 973 },
        { origin: "Belém, PA", destination: "São Luís, MA", distanceKm: 806 },
        { origin: "Manaus, AM", destination: "Boa Vista, RR", distanceKm: 785 },
        { origin: "Belém, PA", destination: "Macapá, AP", distanceKm: 593 },
        { origin: "Porto Velho, RO", destination: "Rio Branco, AC", distanceKm: 544 },
        
        // Rotas regionais - São Paulo
        { origin: "São Paulo, SP", destination: "Campinas, SP", distanceKm: 95 },
        { origin: "São Paulo, SP", destination: "Santos, SP", distanceKm: 72 },
        { origin: "São Paulo, SP", destination: "Ribeirão Preto, SP", distanceKm: 313 },
        { origin: "São Paulo, SP", destination: "Sorocaba, SP", distanceKm: 87 },
        
        // Rotas regionais - Rio de Janeiro
        { origin: "Rio de Janeiro, RJ", destination: "Niterói, RJ", distanceKm: 13 },
        { origin: "Rio de Janeiro, RJ", destination: "Cabo Frio, RJ", distanceKm: 140 },
        { origin: "Rio de Janeiro, RJ", destination: "Petrópolis, RJ", distanceKm: 68 },
        
        // Rotas regionais - Minas Gerais
        { origin: "Belo Horizonte, MG", destination: "Ouro Preto, MG", distanceKm: 100 },
        { origin: "Belo Horizonte, MG", destination: "Uberlândia, MG", distanceKm: 543 },
        { origin: "Belo Horizonte, MG", destination: "Juiz de Fora, MG", distanceKm: 272 },
        
        // Sul
        { origin: "Porto Alegre, RS", destination: "Curitiba, PR", distanceKm: 711 },
        { origin: "Curitiba, PR", destination: "Foz do Iguaçu, PR", distanceKm: 637 },
        
        // Conexões longas
        { origin: "São Paulo, SP", destination: "Salvador, BA", distanceKm: 1962 },
        { origin: "São Paulo, SP", destination: "Recife, PE", distanceKm: 2660 },
        { origin: "São Paulo, SP", destination: "Fortaleza, CE", distanceKm: 3127 },
        { origin: "Rio de Janeiro, RJ", destination: "Porto Alegre, RS", distanceKm: 1553 }
    ]
};
