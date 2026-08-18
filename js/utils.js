/**
 * utils.js
 * 
 * Create js/ui.js with a global UI object containing:
 * 
 * UTILITY METHODS:
 * 
 * formatNumber: function(number, decimals) {
 *   // Use toFixed() for decimals
 *   // Add thousand separators using regex or toLocaleString('pt-BR')
 *   // Return formatted string
 * }
 * 
 * formatCurrency: function(value) {
 *   // Format as Brazilian Real (R$)
 *   // Use toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
 *   // Return formatted string
 * }
 * 
 * showNotification: function(message, type) {
 *   // Create notification element
 *   // Add appropriate class based on type ('success', 'error', 'warning', 'info')
 *   // Append to body
 *   // Auto-remove after 3-5 seconds
 *   // Add fade-in/fade-out animations
 * }
 * 
 * scrollToElement: function(elementId, offset) {
 *   // Find element by ID
 *   // Calculate scroll position with offset
 *   // Use smooth scroll behavior
 * }
 * 
 * validateForm: function(formId) {
 *   // Get form element
 *   // Check all required fields
 *   // Validate field formats (numbers, text, etc.)
 *   // Return boolean and array of error messages
 * }
 * 
 * toggleLoading: function(show, message) {
 *   // Show/hide loading overlay
 *   // Display optional loading message
 * }
 * 
 * animateNumber: function(element, start, end, duration) {
 *   // Animate number from start to end
 *   // Use requestAnimationFrame for smooth animation
 *   // Update element's textContent
 * }
 */

const UI = {
    /**
     * Formata número com separadores de milhares e decimais
     * @param {number} number - Número a ser formatado
     * @param {number} decimals - Quantidade de casas decimais (padrão: 2)
     * @returns {string} Número formatado
     */
    formatNumber: function(number, decimals = 2) {
        if (isNaN(number)) return '0';
        return parseFloat(number).toLocaleString('pt-BR', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        });
    },

    /**
     * Formata valor como moeda brasileira (Real)
     * @param {number} value - Valor a ser formatado
     * @returns {string} Valor formatado como R$
     */
    formatCurrency: function(value) {
        if (isNaN(value)) return 'R$ 0,00';
        return parseFloat(value).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    },

    /**
     * Exibe notificação na tela
     * @param {string} message - Mensagem a ser exibida
     * @param {string} type - Tipo da notificação ('success', 'error', 'warning', 'info')
     */
    showNotification: function(message, type = 'info') {
        // Remover notificações existentes
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notif => notif.remove());

        // Criar elemento de notificação
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        // Estilizar notificação
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '1rem 1.5rem',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: '10000',
            maxWidth: '400px',
            fontWeight: '500',
            animation: 'slideInRight 0.3s ease-out',
            backgroundColor: this._getNotificationColor(type),
            color: '#fff'
        });

        // Adicionar ao body
        document.body.appendChild(notification);

        // Remover após 4 segundos com fade out
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    },

    /**
     * Retorna cor da notificação baseada no tipo
     * @private
     */
    _getNotificationColor: function(type) {
        const colors = {
            success: '#27ae60',
            error: '#e74c3c',
            warning: '#f39c12',
            info: '#3498db'
        };
        return colors[type] || colors.info;
    },

    /**
     * Rola suavemente até um elemento
     * @param {string} elementId - ID do elemento
     * @param {number} offset - Offset em pixels (padrão: 0)
     */
    scrollToElement: function(elementId, offset = 0) {
        const element = document.getElementById(elementId);
        if (!element) return;

        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    },

    /**
     * Valida formulário
     * @param {string} formId - ID do formulário
     * @returns {Object} {isValid: boolean, errors: Array}
     */
    validateForm: function(formId) {
        const form = document.getElementById(formId);
        if (!form) return { isValid: false, errors: ['Formulário não encontrado'] };

        const errors = [];
        const requiredFields = form.querySelectorAll('[required]');

        requiredFields.forEach(field => {
            const value = field.value.trim();
            const fieldName = field.name || field.id;

            if (!value) {
                errors.push(`O campo "${fieldName}" é obrigatório`);
            } else if (field.type === 'number') {
                const numValue = parseFloat(value);
                if (isNaN(numValue) || numValue <= 0) {
                    errors.push(`O campo "${fieldName}" deve ser um número válido maior que zero`);
                }
            }
        });

        return {
            isValid: errors.length === 0,
            errors: errors
        };
    },

    /**
     * Exibe/oculta overlay de loading
     * @param {boolean} show - Se deve mostrar ou esconder
     * @param {string} message - Mensagem opcional do loading
     */
    toggleLoading: function(show, message = 'Carregando...') {
        let overlay = document.getElementById('loading-overlay');

        if (show) {
            if (!overlay) {
                overlay = document.createElement('div');
                overlay.id = 'loading-overlay';
                overlay.innerHTML = `
                    <div class="loading-spinner"></div>
                    <p class="loading-message">${message}</p>
                `;

                Object.assign(overlay.style, {
                    position: 'fixed',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: '9999',
                    color: '#fff'
                });

                document.body.appendChild(overlay);
            }
        } else {
            if (overlay) {
                overlay.remove();
            }
        }
    },

    /**
     * Anima número de start até end
     * @param {HTMLElement} element - Elemento onde exibir o número
     * @param {number} start - Valor inicial
     * @param {number} end - Valor final
     * @param {number} duration - Duração em ms (padrão: 1000)
     */
    animateNumber: function(element, start, end, duration = 1000) {
        if (!element) return;

        const startTime = performance.now();
        const difference = end - start;

        const updateNumber = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function (ease-out)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = start + (difference * easeOut);

            element.textContent = this.formatNumber(current, 2);

            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            } else {
                element.textContent = this.formatNumber(end, 2);
            }
        };

        requestAnimationFrame(updateNumber);
    },

    /**
     * Alterna classe 'hidden' de um elemento
     * @param {string} elementId - ID do elemento
     */
    toggleElement: function(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.classList.toggle('hidden');
        }
    },

    /**
     * Mostra elemento removendo classe 'hidden'
     * @param {string|HTMLElement} element - ID do elemento ou elemento HTML
     */
    showElement: function(element) {
        const el = typeof element === 'string' ? document.getElementById(element) : element;
        if (el) {
            el.classList.remove('hidden');
        }
    },

    /**
     * Esconde elemento adicionando classe 'hidden'
     * @param {string|HTMLElement} element - ID do elemento ou elemento HTML
     */
    hideElement: function(element) {
        const el = typeof element === 'string' ? document.getElementById(element) : element;
        if (el) {
            el.classList.add('hidden');
        }
    },

    /**
     * Gerencia estado de loading de um botão
     * @param {HTMLElement} buttonElement - Elemento do botão
     * @param {boolean} loading - Se está em loading
     */
    toggleButtonLoading: function(buttonElement, loading) {
        if (!buttonElement) return;

        if (loading) {
            // Salvar texto original
            buttonElement.dataset.originalText = buttonElement.textContent;
            buttonElement.disabled = true;
            buttonElement.innerHTML = '<span class="spinner"></span> Processando...';
            buttonElement.style.opacity = '0.7';
            buttonElement.style.cursor = 'not-allowed';
        } else {
            // Restaurar texto original
            buttonElement.disabled = false;
            buttonElement.textContent = buttonElement.dataset.originalText || 'Calcular Emissão';
            buttonElement.style.opacity = '1';
            buttonElement.style.cursor = 'pointer';
        }
    },

    /**
     * Renderiza card de resultado com rota, distância, emissão, modo de transporte e economia
     * @param {Object} data - Dados do cálculo
     * @returns {string} HTML do card de resultado
     */
    renderResults: function(data) {
        const { origin, destination, distance, emission, transportMode, isRoundTrip, savings } = data;
        const mode = CONFIG.TRANSPORT_MODES[transportMode];
        const tripType = isRoundTrip ? 'Ida e Volta' : 'Ida';

        return `
            <div class="result-card">
                <div class="result-header">
                    <h3>📍 Rota</h3>
                    <p><strong>${origin}</strong> → <strong>${destination}</strong></p>
                    <p class="trip-type">${tripType} • ${this.formatNumber(distance)} km</p>
                </div>
                
                <div class="result-body">
                    <div class="transport-info">
                        <span class="transport-icon" style="font-size: 2rem;">${mode.icon}</span>
                        <span class="transport-name">${mode.label}</span>
                    </div>
                    
                    <div class="emission-value" id="emission-animated">
                        <span class="emission-number">${this.formatNumber(emission)}</span>
                        <span class="emission-unit">kg CO₂</span>
                    </div>
                    
                    ${savings ? `
                        <div class="savings-info">
                            <p style="color: var(--primary-color); font-weight: 600;">
                                ✅ Economia de ${this.formatNumber(savings)} kg CO₂ comparado ao carro!
                            </p>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    },

    /**
     * Renderiza comparação entre modos de transporte com barras de progresso
     * @param {Object} comparisons - Objeto com emissões por modo
     * @param {string} currentMode - Modo selecionado
     * @returns {string} HTML da comparação
     */
    renderComparison: function(comparisons, currentMode) {
        const maxEmission = Math.max(...Object.values(comparisons));
        let html = '<div class="comparison-grid">';

        Object.keys(comparisons).forEach(modeKey => {
            const mode = CONFIG.TRANSPORT_MODES[modeKey];
            const emission = comparisons[modeKey];
            const percentage = maxEmission > 0 ? (emission / maxEmission) * 100 : 0;
            const isCurrent = modeKey === currentMode;

            html += `
                <div class="comparison-card ${isCurrent ? 'selected' : ''}" style="border-color: ${mode.color}">
                    <div class="comparison-header">
                        <span class="mode-icon">${mode.icon}</span>
                        <span class="mode-name">${mode.label}</span>
                        ${isCurrent ? '<span class="badge-selected">Selecionado</span>' : ''}
                    </div>
                    
                    <div class="emission-display">
                        <strong>${this.formatNumber(emission)}</strong> kg CO₂
                    </div>
                    
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${percentage}%; background: ${mode.color};"></div>
                    </div>
                    
                    ${emission === 0 ? '<span class="zero-emission">🌱 Zero Emissão!</span>' : ''}
                </div>
            `;
        });

        html += '</div>';
        return html;
    },

    /**
     * Renderiza informações de créditos de carbono com preço, árvores e compensação
     * @param {Object} data - Dados de créditos de carbono
     * @returns {string} HTML dos créditos
     */
    renderCarbonCredits: function(data) {
        const { emission, treesPerYear, monthsOfOneTree, creditsNeeded, minPrice, maxPrice } = data;

        return `
            <div class="credits-container">
                <div class="credits-section">
                    <div class="credits-icon">🌳</div>
                    <h3>Compensação com Árvores</h3>
                    <div class="credits-content">
                        <div class="credit-item">
                            <span class="credit-label">Árvores necessárias (1 ano):</span>
                            <span class="credit-value">${treesPerYear} árvore(s)</span>
                        </div>
                        <div class="credit-item">
                            <span class="credit-label">Tempo com 1 árvore:</span>
                            <span class="credit-value">${monthsOfOneTree} meses</span>
                        </div>
                    </div>
                </div>

                <div class="credits-section">
                    <div class="credits-icon">💰</div>
                    <h3>Créditos de Carbono</h3>
                    <div class="credits-content">
                        <div class="credit-item">
                            <span class="credit-label">Créditos necessários:</span>
                            <span class="credit-value">${this.formatNumber(creditsNeeded, 4)} t CO₂</span>
                        </div>
                        <div class="credit-item">
                            <span class="credit-label">Custo estimado:</span>
                            <span class="credit-value">${this.formatCurrency(minPrice)} - ${this.formatCurrency(maxPrice)}</span>
                        </div>
                    </div>
                    <p class="credits-note">* Valores baseados no mercado brasileiro</p>
                </div>

                <div class="compensation-button">
                    <button class="btn-compensation" onclick="window.open('https://www.iniciativaverde.org.br/calculadora', '_blank')">
                        🌱 Compensar Emissões
                    </button>
                </div>
            </div>
        `;
    },

    /**
     * Mostra loading e esconde loading
     * @param {HTMLElement} button - Botão de submit
     */
    showLoading: function(button) {
        this.toggleButtonLoading(button, true);
    },

    /**
     * Esconde loading
     * @param {HTMLElement} button - Botão de submit
     */
    hideLoading: function(button) {
        this.toggleButtonLoading(button, false);
    },

    /**
     * Injeta estilos adicionais para os novos componentes
     */
    injectAdditionalStyles: function() {
        if (document.getElementById('ui-additional-styles')) return;

        const style = document.createElement('style');
        style.id = 'ui-additional-styles';
        style.textContent = `
            .result-card {
                background: white;
                border-radius: 12px;
                padding: 1.5rem;
                margin-bottom: 1.5rem;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            }

            .result-header h3 {
                margin: 0 0 0.5rem 0;
                color: var(--dark-color);
            }

            .trip-type {
                color: #7f8c8d;
                font-size: 0.9rem;
                margin-top: 0.25rem;
            }

            .transport-info {
                display: flex;
                align-items: center;
                gap: 1rem;
                margin: 1rem 0;
            }

            .transport-name {
                font-size: 1.2rem;
                font-weight: 600;
            }

            .emission-value {
                text-align: center;
                padding: 1.5rem;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                border-radius: 10px;
                color: white;
                margin: 1rem 0;
            }

            .emission-number {
                font-size: 2.5rem;
                font-weight: bold;
                display: block;
            }

            .emission-unit {
                font-size: 1rem;
                opacity: 0.9;
            }

            .comparison-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 1rem;
                margin-top: 1rem;
            }

            .comparison-card {
                background: white;
                border: 2px solid #ddd;
                border-radius: 10px;
                padding: 1rem;
                transition: all 0.3s;
            }

            .comparison-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            }

            .comparison-card.selected {
                background: #e8f8f5;
                border-width: 3px;
            }

            .comparison-header {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                margin-bottom: 0.75rem;
            }

            .mode-icon {
                font-size: 1.5rem;
            }

            .mode-name {
                font-weight: 600;
                flex: 1;
            }

            .badge-selected {
                background: var(--primary-color);
                color: white;
                padding: 0.25rem 0.5rem;
                border-radius: 4px;
                font-size: 0.75rem;
                font-weight: 600;
            }

            .emission-display {
                text-align: center;
                font-size: 1.1rem;
                margin-bottom: 0.5rem;
            }

            .progress-bar {
                width: 100%;
                height: 8px;
                background: #ecf0f1;
                border-radius: 4px;
                overflow: hidden;
                margin-top: 0.5rem;
            }

            .progress-fill {
                height: 100%;
                transition: width 0.6s ease-out;
            }

            .zero-emission {
                display: block;
                margin-top: 0.5rem;
                color: var(--primary-color);
                font-weight: 600;
                font-size: 0.9rem;
            }

            .credits-container {
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }

            .credits-section {
                background: white;
                border-radius: 10px;
                padding: 1.5rem;
                border-left: 4px solid var(--primary-color);
            }

            .credits-icon {
                font-size: 2rem;
                margin-bottom: 0.5rem;
            }

            .credits-section h3 {
                margin: 0 0 1rem 0;
                color: var(--dark-color);
            }

            .credits-content {
                display: flex;
                flex-direction: column;
                gap: 0.75rem;
            }

            .credit-item {
                display: flex;
                justify-content: space-between;
                padding: 0.5rem;
                background: var(--light-bg);
                border-radius: 6px;
            }

            .credit-label {
                color: #7f8c8d;
            }

            .credit-value {
                font-weight: 600;
                color: var(--dark-color);
            }

            .credits-note {
                margin-top: 0.5rem;
                font-size: 0.85rem;
                color: #7f8c8d;
                font-style: italic;
            }

            .compensation-button {
                text-align: center;
                margin-top: 1rem;
            }

            .btn-compensation {
                background: var(--primary-color);
                color: white;
                border: none;
                padding: 1rem 2rem;
                border-radius: 8px;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s;
                width: 100%;
            }

            .btn-compensation:hover {
                background: var(--secondary-color);
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            }

            .spinner {
                display: inline-block;
                width: 14px;
                height: 14px;
                border: 2px solid rgba(255,255,255,0.3);
                border-top-color: white;
                border-radius: 50%;
                animation: spin 0.8s linear infinite;
            }

            @media (max-width: 768px) {
                .comparison-grid {
                    grid-template-columns: 1fr;
                }

                .emission-number {
                    font-size: 2rem;
                }
            }
        `;
        document.head.appendChild(style);
    },

    /**
     * Copia texto para a área de transferência
     * @param {string} text - Texto a ser copiado
     * @returns {Promise<boolean>} Sucesso da operação
     */
    copyToClipboard: async function(text) {
        try {
            await navigator.clipboard.writeText(text);
            this.showNotification('Copiado para a área de transferência!', 'success');
            return true;
        } catch (err) {
            this.showNotification('Erro ao copiar texto', 'error');
            return false;
        }
    },

    /**
     * Cria botão de compartilhamento
     * @param {Object} data - Dados para compartilhar {title, text, url}
     * @returns {HTMLElement} Elemento do botão
     */
    createShareButton: function(data) {
        const button = document.createElement('button');
        button.className = 'btn-share';
        button.innerHTML = '🔗 Compartilhar';
        
        button.addEventListener('click', async () => {
            if (navigator.share) {
                try {
                    await navigator.share(data);
                    this.showNotification('Compartilhado com sucesso!', 'success');
                } catch (err) {
                    if (err.name !== 'AbortError') {
                        this.showNotification('Erro ao compartilhar', 'error');
                    }
                }
            } else {
                // Fallback: copiar link
                await this.copyToClipboard(data.url || window.location.href);
            }
        });

        return button;
    },

    /**
     * Adiciona animações CSS necessárias
     */
    injectAnimations: function() {
        if (document.getElementById('ui-animations')) return;

        const style = document.createElement('style');
        style.id = 'ui-animations';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }

            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }

            .loading-spinner {
                width: 50px;
                height: 50px;
                border: 5px solid rgba(255, 255, 255, 0.3);
                border-top-color: #fff;
                border-radius: 50%;
                animation: spin 1s linear infinite;
            }

            @keyframes spin {
                to { transform: rotate(360deg); }
            }

            .loading-message {
                margin-top: 1rem;
                font-size: 1.1rem;
            }

            .btn-share {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border: none;
                padding: 0.75rem 1.5rem;
                border-radius: 8px;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
                transition: transform 0.2s, box-shadow 0.2s;
            }

            .btn-share:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            }
        `;
        document.head.appendChild(style);
    }
};

// Injetar animações quando o script carregar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        UI.injectAnimations();
        UI.injectAdditionalStyles();
    });
} else {
    UI.injectAnimations();
    UI.injectAdditionalStyles();
}
