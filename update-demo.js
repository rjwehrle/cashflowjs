#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Script to update the demo HTML file with the latest CashFlowJS functions
 * from the source code
 */

const SOURCE_FILE = path.join(__dirname, 'src', 'index.js');
const DEMO_FILE = path.join(__dirname, 'demo', 'index.html');

function readSourceFunctions() {
    try {
        const sourceCode = fs.readFileSync(SOURCE_FILE, 'utf8');
        console.log('✓ Read source file:', SOURCE_FILE);
        return sourceCode;
    } catch (error) {
        console.error('✗ Error reading source file:', error.message);
        process.exit(1);
    }
}

function convertToESModule(sourceCode) {
    // Parse the functions from the source code
    const lines = sourceCode.split('\n');
    const functions = [];
    let currentFunction = '';
    let inFunction = false;
    let braceCount = 0;
    
    for (const line of lines) {
        // Skip comments
        if (line.trim().startsWith('/**') || line.trim().startsWith('*') || line.trim() === '') {
            continue;
        }
        
        // Check for function start
        if (line.includes('exports.') && line.includes('=') && line.includes('=>')) {
            inFunction = true;
            currentFunction = line;
            braceCount = 0;
            
            // Count braces in the first line
            for (const char of line) {
                if (char === '{') braceCount++;
                if (char === '}') braceCount--;
            }
            
            // If braces are balanced on first line, it's a single-line function
            if (braceCount === 0) {
                // Convert exports.funcName = (params) => { to funcName(params) {
                currentFunction = currentFunction.replace(/exports\.(\w+)\s*=\s*\(([^)]*)\)\s*=>\s*\{?/, '$1($2) {');
                currentFunction = currentFunction.replace(/;$/, '');
                if (!currentFunction.includes('{')) {
                    currentFunction += ' {';
                }
                if (!currentFunction.endsWith('}')) {
                    currentFunction += '}';
                }
                functions.push(currentFunction);
                currentFunction = '';
                inFunction = false;
            }
        } else if (inFunction) {
            currentFunction += '\n' + line;
            
            // Count braces
            for (const char of line) {
                if (char === '{') braceCount++;
                if (char === '}') braceCount--;
            }
            
            // If braces are balanced, function is complete
            if (braceCount === 0) {
                // Convert the multi-line function
                currentFunction = currentFunction.replace(/exports\.(\w+)\s*=\s*\(([^)]*)\)\s*=>\s*\{/, '$1($2) {');
                // Fix internal references to other exports
                currentFunction = currentFunction.replace(/exports\.(\w+)/g, 'cashflow.$1');
                // Remove trailing semicolon and ensure proper closing
                currentFunction = currentFunction.replace(/;\s*$/, '');
                
                functions.push(currentFunction);
                currentFunction = '';
                inFunction = false;
            }
        }
    }
    
    // Join all functions
    const functionsCode = functions.join(',\n\n            ');
    
    return `        // CashFlowJS Functions (from src/index.js)
        const cashflow = {
            ${functionsCode}
        };

        // Make it available globally for compatibility
        window.cashflow = cashflow;`;
}

function updateDemoFile(newScriptContent) {
    try {
        let htmlContent = fs.readFileSync(DEMO_FILE, 'utf8');
        console.log('✓ Read demo file:', DEMO_FILE);
        
        // Find the CashFlowJS script section
        const scriptStartPattern = /<!-- CashFlowJS Functions - Direct Import from Source -->\s*<script>/;
        const scriptEndPattern = /<\/script>/;
        
        const startMatch = htmlContent.match(scriptStartPattern);
        if (!startMatch) {
            console.error('✗ Could not find CashFlowJS script section in demo file');
            process.exit(1);
        }
        
        const startIndex = startMatch.index;
        const beforeScript = htmlContent.substring(0, startIndex);
        
        const afterStartTag = htmlContent.substring(startIndex + startMatch[0].length);
        const endMatch = afterStartTag.match(scriptEndPattern);
        
        if (!endMatch) {
            console.error('✗ Could not find end of script section');
            process.exit(1);
        }
        
        const afterScript = afterStartTag.substring(endMatch.index + endMatch[0].length);
        
        // Reconstruct the file with new script content
        const newHtmlContent = beforeScript + 
            `<!-- CashFlowJS Functions - Direct Import from Source -->
    <script>
${newScriptContent}
    </script>` + 
            afterScript;
        
        // Write the updated file
        fs.writeFileSync(DEMO_FILE, newHtmlContent, 'utf8');
        console.log('✓ Updated demo file with latest functions');
        
    } catch (error) {
        console.error('✗ Error updating demo file:', error.message);
        process.exit(1);
    }
}

function main() {
    console.log('🚀 Updating CashFlowJS demo with latest functions...\n');
    
    // Step 1: Read source functions
    const sourceCode = readSourceFunctions();
    
    // Step 2: Convert to browser-compatible format
    const browserScript = convertToESModule(sourceCode);
    
    // Step 3: Update the demo file
    updateDemoFile(browserScript);
    
    console.log('\n✅ Demo update complete!');
    console.log('🎯 The index.html file now contains the latest CashFlowJS functions from src/index.js');
}

// Run the script
if (require.main === module) {
    main();
}

module.exports = { main, convertToESModule, readSourceFunctions, updateDemoFile };