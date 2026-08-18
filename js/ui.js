/**
 * ui.js
 * 
 * Funções para manipulação da interface do usuário
 */

/**
 * Exibe os resultados da emissão de CO2
 * @param {number} emission - Emissão em kg de CO2
 * @param {number} distance - Distância em km
 * @param {string} transportMode - Modo de transporte
 * @param {boolean} isRoundTrip - Se é ida e volta
 */
function displayResults(emission, distance, transportMode, isRoundTrip) {
    const resultsSection = document.getElementById('results');
    const resultsDiv = resultsSection.querySelector('div');
    
    const tripType = isRoundTrip ? 'ida e volta' : 'ida';
    const mode = CONFIG.TRANSPORT_MODES[transportMode];
    
    resultsDiv.innerHTML = `
        <h2>🌍 Resultado da Emissão</h2>
        <p><strong>Distância:</strong> ${UI.formatNumber(distance)} km (${tripType})</p>
        <p><strong>Modo de transporte:</strong> ${mode.icon} ${mode.label}</p>
        <div class="result-value" id="emission-value">0 kg CO₂</div>
        ${emission === 0 ? '<p style="color: var(--primary-color); font-weight: bold;">🎉 Parabéns! Este meio de transporte não emite CO₂!</p>' : ''}
    `;
    
    resultsSection.classList.remove('hidden');
    
    // Animar o valor de emissão
    const emissionElement = document.getElementById('emission-value');
    if (emissionElement && emission > 0) {
        UI.animateNumber(emissionElement, 0, emission, 1500);
        emissionElement.textContent = UI.formatNumber(emission) + ' kg CO₂';
    }
}

/**
 * Exibe comparações com outros meios de transporte
 * @param {number} distance - Distância em km
 * @param {string} currentMode - Modo de transporte atual
 * @param {boolean} isRoundTrip - Se é ida e volta
 */
function displayTransportComparisons(distance, currentMode, isRoundTrip) {
    const comparisonSection = document.getElementById('comparison');
    const comparisonDiv = comparisonSection.querySelector('div');
    
    const comparisons = calculateComparisons(distance, isRoundTrip);
    
    let html = '<h2>📊 Comparação entre Transportes</h2>';
    html += '<p>Veja como seria a emissão com outros meios de transporte:</p>';
    
    Object.keys(comparisons).forEach(modeKey => {
        const isCurrent = modeKey === currentMode;
        const emission = comparisons[modeKey];
        const mode = CONFIG.TRANSPORT_MODES[modeKey];
        const className = isCurrent ? 'comparison-item current' : 'comparison-item';
        const style = `border-left: 4px solid ${mode.color}`;
        
        html += `
            <div class="${className}" style="${style}">
                <strong>${mode.icon} ${mode.label}${isCurrent ? ' (Selecionado)' : ''}</strong>: 
                ${UI.formatNumber(emission)} kg CO₂
                ${emission === 0 ? ' ✅ Emissão zero!' : ''}
            </div>
        `;
    });
    
    // Adicionar comparações do cotidiano
    const currentEmission = comparisons[currentMode];
    if (currentEmission > 0) {
        const dailyComparisons = generateComparisons(currentEmission);
        
        html += '<h3 style="margin-top: 1.5rem;">🔍 Comparações do Cotidiano</h3>';
        dailyComparisons.forEach(comp => {
            html += `
                <div class="comparison-item">
                    <span style="font-size: 1.5rem; margin-right: 0.5rem;">${comp.icon}</span>
                    ${comp.text}
                </div>
            `;
        });
    }
    
    comparisonDiv.innerHTML = html;
    comparisonSection.classList.remove('hidden');
}

/**
 * Exibe informações sobre créditos de carbono
 * @param {number} emission - Emissão em kg de CO2
 */
function displayCarbonCredits(emission) {
    const creditsSection = document.getElementById('carbon-credits');
    const creditsDiv = creditsSection.querySelector('div');
    
    if (emission === 0) {
        creditsSection.classList.add('hidden');
        return;
    }
    
    const credits = calculateCarbonCredits(emission);
    
    // Calcular créditos de carbono necessários e preços
    const carbonCreditsNeeded = emission / CONFIG.CARBON_CREDIT.KG_PER_CREDIT;
    const minPrice = carbonCreditsNeeded * CONFIG.CARBON_CREDIT.PRICE_MIN_BRL;
    const maxPrice = carbonCreditsNeeded * CONFIG.CARBON_CREDIT.PRICE_MAX_BRL;
    
    creditsDiv.innerHTML = `
        <h2>🌳 Compensação Ambiental</h2>
        <div class="credits-info">
            <h3>Plantio de Árvores</h3>
            <p><strong>Para compensar esta emissão, você precisaria de:</strong></p>
            <ul style="margin-left: 1.5rem; margin-top: 1rem;">
                <li><strong>${credits.treesPerYear} árvore(s)</strong> absorvendo CO₂ por um ano completo</li>
                <li>Ou <strong>1 árvore</strong> absorvendo CO₂ por <strong>${credits.monthsOfOneTree} meses</strong></li>
            </ul>
        </div>
        
        <div class="credits-info" style="margin-top: 1rem;">
            <h3>💰 Créditos de Carbono</h3>
            <p><strong>Créditos necessários:</strong> ${UI.formatNumber(carbonCreditsNeeded, 4)} toneladas de CO₂</p>
            <p><strong>Custo estimado:</strong> ${UI.formatCurrency(minPrice)} a ${UI.formatCurrency(maxPrice)}</p>
            <p style="font-size: 0.9rem; color: #7f8c8d; margin-top: 0.5rem;">
                * Valores baseados no mercado brasileiro de créditos de carbono
            </p>
        </div>
        
        <div style="margin-top: 1rem; padding: 1rem; background: #e8f8f5; border-radius: 8px;">
            <p style="color: var(--primary-color); font-weight: bold;">
                💡 Dica: Considere plantar árvores ou apoiar projetos de reflorestamento!
            </p>
        </div>
    `;
    
    creditsSection.classList.remove('hidden');
}

/**
 * Oculta todas as seções de resultados
 */
function hideAllResults() {
    document.getElementById('results').classList.add('hidden');
    document.getElementById('comparison').classList.add('hidden');
    document.getElementById('carbon-credits').classList.add('hidden');
}

/**
 * Exibe mensagem de erro
 * @param {string} message - Mensagem de erro
 */
function showError(message) {
    UI.showNotification(message, 'error');
}

/**
 * Exibe mensagem de sucesso
 * @param {string} message - Mensagem de sucesso
 */
function showSuccess(message) {
    UI.showNotification(message, 'success');
}

/**
 * Gera relatório em texto para compartilhamento
 * @param {Object} data - Dados do cálculo
 * @returns {string} Relatório formatado
 */
function generateReport(data) {
    const { origin, destination, distance, transportMode, isRoundTrip, emission } = data;
    const mode = CONFIG.TRANSPORT_MODES[transportMode];
    const tripType = isRoundTrip ? 'ida e volta' : 'ida';
    
    return `🌍 Calculadora de Emissão de CO₂

📍 Origem: ${origin}
📍 Destino: ${destination}
📏 Distância: ${UI.formatNumber(distance)} km (${tripType})
🚗 Transporte: ${mode.label}
💨 Emissão de CO₂: ${UI.formatNumber(emission)} kg

Calcule a sua emissão em: ${window.location.href}`;
}

/**
 * Adiciona botão de compartilhamento aos resultados
 * @param {Object} data - Dados do cálculo
 */
function addShareButton(data) {
    const resultsSection = document.getElementById('results');
    const existingButton = resultsSection.querySelector('.btn-share');
    
    // Remover botão existente se houver
    if (existingButton) existingButton.remove();
    
    const shareData = {
        title: 'Calculadora de CO₂',
        text: generateReport(data),
        url: window.location.href
    };
    
    const shareButton = UI.createShareButton(shareData);
    shareButton.style.marginTop = '1rem';
    shareButton.style.width = '100%';
    
    resultsSection.querySelector('div').appendChild(shareButton);
}
