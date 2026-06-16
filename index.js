#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function loadRules() {
    try {
        const rulesPath = path.join(__dirname, 'rules.json');
        const rulesData = fs.readFileSync(rulesPath, 'utf8');
        return JSON.parse(rulesData);
    } catch (error) {
        return null;
    }
}

function generateSteeringPrompt(userPrompt) {
    const rules = loadRules();
    if (!rules) return userPrompt;

    let injectedPrompt = `You are governed by ${rules.agent_name} v${rules.version}. Follow these rules strictly:\n`;
    rules.core_directives.forEach((rule, index) => {
        injectedPrompt += `${index + 1}. ${rule}\n`;
    });
    
    injectedPrompt += `\nUser Request: ${userPrompt}\n`;
    return injectedPrompt;
}

const args = process.argv.slice(2);
if (args.length > 0) {
    console.log(generateSteeringPrompt(args.join(' ')));
}
