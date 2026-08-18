/**
 * app.js
 * 
 * Arquivo principal da aplicação - coordena eventos e inicialização
 * 
 * Create an Immediately Invoked Function Expression (IIFE) or
 * use DOMContentLoaded event:
 * 
 * INITIALIZATION (when DOM is ready):
 * 1. Call CONFIG.setupDistanceAutofill() to enable auto-
 * 2. Call CONFIG.setupDistanceAutofill() to enable auto-complete
 * 3. Get form element by id 'calculator-form'
 * 4. Add event listener to form
 * 5. Call initializeApp()
 * 
 * Add comments explaining each step
 * Use descriptive variable names
 * Keep code clean and readable
 */

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar a aplicação
    initializeApp();
});

/**
 * Inicializa a aplicação
 * - Popula o datalist com as cidades
 * - Configura o autofill de distância
 * - Adiciona event listener ao formulário
 */
function initializeApp() {
    // Popula o datalist com as cidades disponíveis
    RoutesDB.populateDatalist();
    
    // Configura o autofill de distância
    setupDistanceAutofill();
    
    // Adiciona event listener ao formulário
    const form = document.getElementById('calculator-form');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    } else {
        console.error('Formulário não encontrado');
    }
}

/**
 * setupDistanceAutofill: function() {
 *   // Get origin and destination input elements
 *   // Get distance input and manual checkbox
 *   // Add 'change' event listeners to both origin and destination inputs
 *   
 *   // On change:
 *   - Get trimmed values from both inputs
 *   - If both are filled, call RoutesDB.findDistance()
 *   - If distance found:
 *     * Fill distance input with value
 *     * Make it readonly
 *     * Show success message (change helper text color to green)
 *   - If not found:
 *     * Clear distance input
 *     * Change helper text to suggest manual input
 *   
 *   // Add 'change' listener to manual checkbox:
 *   - When checked: remove readonly from distance, allow manual entry
 *   - When unchecked: try to find route again
 * 
 *   Everything should be in one global CONFIG object
 * }
 */
function setupDistanceAutofill() {
    const originInput = document.getElementById('origin');
    const destinationInput = document.getElementById('destination');
    const distanceInput = document.getElementById('distance');
    const manualCheckbox = document.getElementById('round-trip');
    const helperText = distanceInput.nextElementSibling;
    
    // Função para atualizar distância
    const updateDistance = () => {
        // Get trimmed values from both inputs
        const origin = originInput.value.trim();
        const destination = destinationInput.value.trim();
        
        // If both are filled, call RoutesDB.findDistance()
        if (origin && destination) {
            const distance = RoutesDB.findDistance(origin, destination);
            
            // If distance found
            if (distance !== null) {
                // Fill distance input with value
                distanceInput.value = distance;
                // Make it readonly
                distanceInput.readOnly = true;
                // Show success message (change helper text color to green)
                if (helperText) {
                    helperText.textContent = 'Distância encontrada automaticamente!';
                    helperText.style.color = '#27ae60';
                }
            } else {
                // If not found:
                // Clear distance input
                distanceInput.value = '';
                distanceInput.readOnly = false;
                // Change helper text to suggest manual input
                if (helperText) {
                    helperText.textContent = 'Rota não encontrada. Digite a distância manualmente.';
                    helperText.style.color = '#e74c3c';
                }
            }
        } else {
            distanceInput.value = '';
            distanceInput.readOnly = true;
            if (helperText) {
                helperText.textContent = 'A distância será preenchida automaticamente';
                helperText.style.color = '#7f8c8d';
            }
        }
    };
    
    // Add 'change' event listeners to both origin and destination inputs
    originInput.addEventListener('change', updateDistance);
    destinationInput.addEventListener('change', updateDistance);
}

/**
 * Manipula o envio do formulário
 * FORM SUBMIT HANDLER:
 * When form submits:
 * 1. Prevent default form submission (e.preventDefault())
 * 2. Get all form values:
 *    - origin value (trim whitespace)
 *    - destination value (trim whitespace)
 *    - distance value (parse as float)
 *    - transport mode (get checked radio button value)
 * 3. Validate inputs:
 *    - Check if origin, destination, distance are filled
 *    - Check if origin and destination are different
 *    - If validation fails: show alert with error message and return
 * 4. Get submit button element
 * 5. Call UI.showLoading(button) to show loading state
 * 6. Hide previous results sections using UI.hideElement()
 * 7. Use setTimeout with 1500ms delay to simulate processing
 * 
 * Inside timeout:
 * - Try-catch block for error handling:
 *   * Calculate emission for selected mode using Calculator
 *   * Calculate car emission as baseline
 *   * Calculate savings compared to car
 *   * Calculate all modes comparison
 *   * Calculate carbon credits and price estimate
 *   * Build data objects for rendering
 *   * Call UI.renderResults() and set innerHTML of results-content
 *   * Call UI.renderComparison() and set innerHTML of comparison-content
 *   * Call UI.renderCarbonCredits() and set innerHTML of carbon-credits-content
 *   * Show all three sections using UI.showElement()
 *   * Scroll to results section using UI.scrollToElement()
 *   * Call UI.hideLoading(button)
 * - Catch any errors:
 *   * Log error to console
 *   * Show user-friendly alert
 *   * Call UI.hideLoading(button)
 * 
 * @param {Event} event - Evento de submit
 */
function handleFormSubmit(event) {
    // 1. Prevent default form submission
    event.preventDefault();
    
    // 2. Get all form values
    const origin = document.getElementById('origin').value.trim();
    const destination = document.getElementById('destination').value.trim();
    const distance = parseFloat(document.getElementById('distance').value);
    const isRoundTrip = document.getElementById('round-trip').checked;
    const transportMode = document.querySelector('input[name="transport"]:checked').value;
    
    // 3. Validate inputs
    if (!origin || !destination) {
        showError('Por favor, selecione origem e destino.');
        return;
    }
    
    if (!distance || distance <= 0) {
        showError('Distância inválida. Por favor, selecione cidades válidas.');
        return;
    }
    
    if (origin.toLowerCase() === destination.toLowerCase()) {
        showError('Origem e destino devem ser diferentes.');
        return;
    }
    
    // 4. Get submit button element
    const submitButton = document.querySelector('.btn-calculate');
    
    // 5. Show loading state
    UI.showLoading(submitButton);
    
    // 6. Hide previous results sections
    UI.hideElement('results');
    UI.hideElement('comparison');
    UI.hideElement('carbon-credits');
    
    // 7. Simulate processing with setTimeout (1500ms delay)
    setTimeout(() => {
        try {
            // Calculate emission for selected mode
            const emission = calculateEmission(distance, transportMode, isRoundTrip);
            
            // Calculate car emission as baseline
            const carEmission = calculateEmission(distance, 'car', isRoundTrip);
            
            // Calculate savings compared to car
            const savings = transportMode !== 'car' ? carEmission - emission : 0;
            
            // Calculate all modes comparison
            const comparisons = calculateComparisons(distance, isRoundTrip);
            
            // Calculate carbon credits and price estimate
            const carbonCreditsNeeded = emission / CONFIG.CARBON_CREDIT.KG_PER_CREDIT;
            const minPrice = carbonCreditsNeeded * CONFIG.CARBON_CREDIT.PRICE_MIN_BRL;
            const maxPrice = carbonCreditsNeeded * CONFIG.CARBON_CREDIT.PRICE_MAX_BRL;
            const credits = calculateCarbonCredits(emission);
            
            // Build data objects for rendering
            const resultsData = {
                origin,
                destination,
                distance,
                emission,
                transportMode,
                isRoundTrip,
                savings: savings > 0 ? savings : null
            };
            
            const creditsData = {
                emission,
                treesPerYear: credits.treesPerYear,
                monthsOfOneTree: credits.monthsOfOneTree,
                creditsNeeded: carbonCreditsNeeded,
                minPrice,
                maxPrice
            };
            
            // Render results
            const resultsContent = document.querySelector('#results div');
            resultsContent.innerHTML = UI.renderResults(resultsData);
            
            // Render comparison
            const comparisonContent = document.querySelector('#comparison div');
            comparisonContent.innerHTML = '<h2>📊 Comparação entre Transportes</h2>' + 
                                         UI.renderComparison(comparisons, transportMode);
            
            // Render carbon credits
            const creditsContent = document.querySelector('#carbon-credits div');
            creditsContent.innerHTML = '<h2>🌳 Compensação Ambiental</h2>' + 
                                      UI.renderCarbonCredits(creditsData);
            
            // Show all three sections
            UI.showElement('results');
            UI.showElement('comparison');
            UI.showElement('carbon-credits');
            
            // Add share button
            addShareButton(resultsData);
            
            // Scroll to results section
            UI.scrollToElement('results', 80);
            
            // Hide loading
            UI.hideLoading(submitButton);
            
            // Show success notification
            showSuccess('Cálculo realizado com sucesso!');
            
        } catch (error) {
            // Log error to console
            console.error('Erro ao calcular emissões:', error);
            
            // Show user-friendly alert
            showError('Ocorreu um erro ao calcular as emissões. Por favor, tente novamente.');
            
            // Hide loading
            UI.hideLoading(submitButton);
        }
    }, 1500);
}
