#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const tailwind = require('tailwindcss');

async function buildCSS() {
    try {
        const inputCSS = fs.readFileSync('src/css/styles.css', 'utf8');
        
        // Custom loadStylesheet function for @import resolution
        const loadStylesheet = async (id, base) => {
            const resolvedPath = path.resolve(path.dirname(base || 'src/css/styles.css'), id);
            try {
                return fs.readFileSync(resolvedPath, 'utf8');
            } catch {
                // Return empty string if file not found
                return '';
            }
        };
        
        const result = await tailwind.compile(inputCSS, {
            loadStylesheet,
            base: path.resolve('src/css/styles.css')
        });
        
        // Ensure output directory exists
        const outputDir = path.dirname('src/css/output.css');
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }
        
        fs.writeFileSync('src/css/output.css', result.css);
        console.log('✅ CSS built successfully!');
        console.log(`📄 Output written to: src/css/output.css`);
    } catch (error) {
        console.error('❌ Error building CSS:', error);
        process.exit(1);
    }
}

buildCSS();