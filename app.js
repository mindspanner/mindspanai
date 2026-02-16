// MindspanAI v3.0.0 - Client Application Logic

const CONFIG = {
    version: '3.0.0',
    build: '20250216-1200',
    apiEndpoint: '/api/chat',
    analyticsEndpoint: '/api/analytics'
};

const EMERGENCY_KEYWORDS = [
    'suicide', 'suicidal', 'kill myself', 'end my life', 'want to die',
    'self harm', 'self-harm', 'cutting', 'overdose',
    'crisis', 'emergency', 'cant go on', "can't go on",
    'hearing voices', 'seeing things', 'hurt myself', 'hurt someone'
];

let clickedCardsCount = 0;
const totalCards = 4;

// Auto-resize textarea
const input = document.getElementById('userInput');
input.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
});

// Send on Enter (Shift+Enter for new line)
input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

// Check for emergency
function checkEmergency(text) {
    return EMERGENCY_KEYWORDS.some(kw => text.toLowerCase().includes(kw));
}

// Display message
function displayMessage(role, content) {
    const container = document.getElementById('messagesContainer');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}`;
    
    let html = '';
    
    if (role !== 'system') {
        const avatarText = role === 'user' ? 'You' : 'AI';
        html += `<div class="message-avatar">${avatarText[0]}</div>`;
    }
    
    html += `<div class="message-content">${content}</div>`;
    
    messageDiv.innerHTML = html;
    container.appendChild(messageDiv);
    container.scrollTop = container.scrollHeight;
}

// Show/hide typing indicator
function showTyping() {
    const container = document.getElementById('messagesContainer');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message assistant';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = `
        <div class="message-avatar">AI</div>
        <div class="typing-indicator">
            <div class="typing-dots">
                <span></span><span></span><span></span>
            </div>
        </div>
    `;
    container.appendChild(typingDiv);
    container.scrollTop = container.scrollHeight;
}

function hideTyping() {
    const typing = document.getElementById('typingIndicator');
    if (typing) typing.remove();
}

// Send quick action with card dismiss animation
function sendQuickAction(text, cardElement) {
    // Add clicked class for animation
    if (cardElement && !cardElement.classList.contains('clicked')) {
        cardElement.classList.add('clicked');
        clickedCardsCount++;

        // Minimize entire quick actions container and show corner orb after all cards clicked
        if (clickedCardsCount >= totalCards) {
            setTimeout(() => {
                document.getElementById('quickActionsContainer').classList.add('minimized');
                // Show corner orb menu
                const cornerOrb = document.getElementById('cornerOrbMenu');
                if (cornerOrb) {
                    setTimeout(() => {
                        cornerOrb.classList.add('visible');
                    }, 200);
                }
            }, 600);
        }
    }

    // Small delay to show animation before sending
    setTimeout(() => {
        input.value = text;
        sendMessage();
    }, 100);
}

// Main send function
async function sendMessage() {
    const message = input.value.trim();
    if (!message) return;
    
    const sendBtn = document.getElementById('sendBtn');
    sendBtn.disabled = true;
    
    // Check emergency
    if (checkEmergency(message)) {
        document.getElementById('emergencyBanner').classList.add('active');
        displayMessage('user', message);
        displayMessage('system', 
            '<strong>🚨 This is not a crisis service.</strong><br>' +
            'If you\'re in immediate danger, contact emergency services above.'
        );
        logInteraction(message, 'emergency', true);
        input.value = '';
        input.style.height = 'auto';
        sendBtn.disabled = false;
        return;
    }
    
    // Display user message
    displayMessage('user', message);
    input.value = '';
    input.style.height = 'auto';
    
    // Show typing
    showTyping();
    
    try {
        // Call API
        const response = await fetch(CONFIG.apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                message,
                sessionId: getSessionId()
            })
        });
        
        hideTyping();
        
        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }
        
        const data = await response.json();
        displayMessage('assistant', data.response);
        
        // Log interaction
        logInteraction(message, data.response, false);
        
    } catch (error) {
        hideTyping();
        displayMessage('system', 
            '❌ Connection error. Please try again or contact us:<br>' +
            '📧 <a href="mailto:info@mindspan.com.au">info@mindspan.com.au</a> | ' +
            '📞 <a href="tel:0451614155">0451 614 155</a>'
        );
        console.error('Error:', error);
    }
    
    sendBtn.disabled = false;
}

// Analytics
function logInteraction(userMsg, assistantMsg, isEmergency) {
    const log = {
        timestamp: new Date().toISOString(),
        userMessage: userMsg.substring(0, 200),
        responsePreview: typeof assistantMsg === 'string' ? assistantMsg.substring(0, 100) : 'API',
        isEmergency: isEmergency,
        sessionId: getSessionId()
    };
    
    // Local storage
    let logs = JSON.parse(localStorage.getItem('mindspanai_logs') || '[]');
    logs.push(log);
    if (logs.length > 100) logs = logs.slice(-100);
    localStorage.setItem('mindspanai_logs', JSON.stringify(logs));
    
    // Backend analytics (fire-and-forget)
    fetch(CONFIG.analyticsEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(log)
    }).catch(() => {}); // Silent fail OK
}

function getSessionId() {
    let sid = sessionStorage.getItem('mindspanai_session');
    if (!sid) {
        sid = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        sessionStorage.setItem('mindspanai_session', sid);
    }
    return sid;
}

// Initialize
console.log(`MindspanAI ${CONFIG.version} (Build ${CONFIG.build})`);
console.log(`Session: ${getSessionId()}`);
