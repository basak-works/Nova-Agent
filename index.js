#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const ora = require('ora');

function loadRules() {
    try {
        const rulesPath = path.join(__dirname, 'rules.json');
        return JSON.parse(fs.readFileSync(rulesPath, 'utf8'));
    } catch (error) {
        console.log(chalk.red("Error: rules.json missing. The agent is blind."));
        return null;
    }
}

async function runAgent(userPrompt) {
    const rules = loadRules();
    if (!rules) return;

    console.log(); // Empty line for clean UI
    const spinner = ora({
        text: chalk.cyanBright('Waking up Nova-Agent...'),
        color: 'cyan',
        spinner: 'dots12'
    }).start();

    // Fake delay to make it feel like it's "thinking" deeply
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    spinner.succeed(chalk.greenBright(`[${rules.agent_name} v${rules.version}] Online.`));
    spinner.start(chalk.magentaBright('Injecting Elite Directives...'));
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    spinner.stop();

    console.log(chalk.dim('----------------------------------------'));
    console.log(chalk.yellowBright('⚠️  STRICT GOVERNANCE ENGAGED ⚠️\n'));
    
    rules.core_directives.forEach((rule, index) => {
        console.log(chalk.gray(`[Rule 0${index + 1}]`) + ` ${chalk.white(rule)}`);
    });
    
    console.log(chalk.dim('----------------------------------------'));
    console.log(chalk.cyanBright('🚀 OPTIMIZED PROMPT READY FOR AI:\n'));
    
    let finalPrompt = `Act as ${rules.agent_name}. Rules:\n${rules.core_directives.join(' ')}\n\nTask: ${userPrompt}`;
    console.log(chalk.bgBlack.greenBright(` ${finalPrompt} `));
    console.log();
}

const args = process.argv.slice(2);
if (args.length > 0) {
    runAgent(args.join(' '));
} else {
    console.log(chalk.red('\nNova-Agent requires a prompt. Example: nova-agent "write a python script"\n'));
}
