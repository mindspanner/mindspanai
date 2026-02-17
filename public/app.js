// MindspanAI v3.2.0 - ChatGPT-Style Interface

const CONFIG = {
    version: '3.2.0',
    build: '20260216-1400',
    apiEndpoint: '/api/chat'
};

const EMERGENCY_KEYWORDS = [
    'suicide', 'suicidal', 'kill myself', 'end my life', 'want to die',
    'self harm', 'self-harm', 'cutting', 'overdose',
    'crisis', 'emergency', 'cant go on', "can't go on",
    'hearing voices', 'seeing things', 'hurt myself', 'hurt someone'
];

// DOM Elements
const input = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const messagesContainer = document.getElementById('messagesContainer');
const welcomeScreen = document.getElementById('welcomeScreen');
const chatArea = document.getElementById('chatArea');
const emergencyBanner = document.getElementById('emergencyBanner');

// Enable/disable send button based on input
input.addEventListener('input', () => {
    sendBtn.disabled = !input.value.trim();
});

// Auto-resize textarea
function adjustTextareaHeight(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
}

// Handle enter key
function handleKeyPress(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        if (input.value.trim()) {
            sendMessage();
        }
    }
}

// Send quick message from sidebar or quick actions
function sendQuickMessage(text) {
    input.value = text;
    sendBtn.disabled = false;
    sendMessage();
}

// Send message
async function sendMessage() {
    const message = input.value.trim();
    if (!message) return;

    // Hide welcome, show messages
    if (welcomeScreen.style.display !== 'none') {
        welcomeScreen.style.display = 'none';
        messagesContainer.style.display = 'flex';
    }

    // Add user message
    addMessage('user', message);

    // Clear input
    input.value = '';
    input.style.height = 'auto';
    sendBtn.disabled = true;

    // Check for emergency keywords
    checkEmergency(message);

    // Show typing indicator
    const typingId = 'typing-' + Date.now();
    addTypingIndicator(typingId);

    // Call API
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message })
        });

        const data = await response.json();

        // Remove typing indicator
        removeTypingIndicator(typingId);

        // Add AI response
        if (data.reply) {
            addMessage('assistant', data.reply);
        }

        // Store in localStorage for analytics
        logMessage({ role: 'user', content: message, timestamp: Date.now() });
        logMessage({ role: 'assistant', content: data.reply, timestamp: Date.now() });

    } catch (error) {
        console.error('Chat error:', error);
        removeTypingIndicator(typingId);
        addMessage('assistant', 'Sorry, I encountered an error. Please try again or visit <a href="https://www.mindspan.com.au" target="_blank">mindspan.com.au</a> for direct contact.');
    }
}

// Add message to chat
function addMessage(role, content) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}`;

    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = role === 'user' ? 'Y' : 'AI';

    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    messageContent.innerHTML = formatMessage(content);

    messageDiv.appendChild(avatar);
    messageDiv.appendChild(messageContent);

    messagesContainer.appendChild(messageDiv);

    // Scroll to bottom smoothly
    chatArea.scrollTo({
        top: chatArea.scrollHeight,
        behavior: 'smooth'
    });
}

// Format message content
function formatMessage(content) {
    // Convert URLs to links
    let formatted = content.replace(
        /(https?:\/\/[^\s]+)/g,
        '<a href="$1" target="_blank">$1</a>'
    );

    // Convert line breaks to <br>
    formatted = formatted.replace(/\n/g, '<br>');

    return formatted;
}

// Add typing indicator
function addTypingIndicator(id) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message assistant';
    messageDiv.id = id;

    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = 'AI';

    const typingDiv = document.createElement('div');
    typingDiv.className = 'typing-indicator';
    typingDiv.innerHTML = `
        <div class="typing-dots">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `;

    messageDiv.appendChild(avatar);
    messageDiv.appendChild(typingDiv);

    messagesContainer.appendChild(messageDiv);

    // Scroll to bottom
    chatArea.scrollTo({
        top: chatArea.scrollHeight,
        behavior: 'smooth'
    });
}

// Remove typing indicator
function removeTypingIndicator(id) {
    const element = document.getElementById(id);
    if (element) {
        element.remove();
    }
}

// Check for emergency keywords
function checkEmergency(message) {
    const lowerMessage = message.toLowerCase();
    const isEmergency = EMERGENCY_KEYWORDS.some(keyword => lowerMessage.includes(keyword));

    if (isEmergency) {
        emergencyBanner.classList.add('show');
        // Scroll to top to show banner
        chatArea.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// Log message to localStorage
function logMessage(messageData) {
    try {
        const logs = JSON.parse(localStorage.getItem('mindspanai_logs') || '[]');
        logs.push(messageData);

        // Keep only last 100 messages
        if (logs.length > 100) {
            logs.splice(0, logs.length - 100);
        }

        localStorage.setItem('mindspanai_logs', JSON.stringify(logs));
    } catch (error) {
        console.error('Logging error:', error);
    }
}

// Focus input on load
window.addEventListener('load', () => {
    input.focus();
});

// Log page view
try {
    const viewData = {
        type: 'page_view',
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        version: CONFIG.version
    };

    const views = JSON.parse(localStorage.getItem('mindspanai_views') || '[]');
    views.push(viewData);
    localStorage.setItem('mindspanai_views', JSON.stringify(views));
} catch (error) {
    console.error('Analytics error:', error);
}

console.log(`%cMindspanAI v${CONFIG.version}`, 'color: #667eea; font-size: 16px; font-weight: bold;');
console.log('Built with ❤️ for Mindspan Psychology');
