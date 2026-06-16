const fs = require('fs');

// Load Nova-Agent rules
function loadRules() {
    try {
        const rulesData = fs.readFileSync('./rules.json', 'utf8');
        return JSON.parse(rulesData);
    } catch (error) {
        console.error("Error loading rules:", error);
        return null;
    }
}

// Intercept and optimize the prompt
function generateSteeringPrompt(userPrompt) {
    const rules = loadRules();
    if (!rules) return userPrompt;

    console.log(`[Nova-Agent v${rules.version}] Injecting Elite Directives...\n`);
    
    let injectedPrompt = `You are governed by ${rules.agent_name}. Follow these rules strictly:\n`;
    rules.core_directives.forEach((rule, index) => {
        injectedPrompt += `${index + 1}. ${rule}\n`;
    });
    
    injectedPrompt += `\nUser Request: ${userPrompt}\n`;
    return injectedPrompt;
}

// Test Run
const sampleRequest = "Write a function to find the maximum number in an array.";
console.log(generateSteeringPrompt(sampleRequest));

