#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Read .env.public file
const envPath = path.join(__dirname, '../.env.public')
const envContent = fs.readFileSync(envPath, 'utf8')

// Parse env variables
const envVars = {}
envContent.split('\n').forEach(line => {
    if (line.startsWith('VITE_') && line.includes('=')) {
        const [key, value] = line.split('=')
        envVars[key] = value
    }
})

const modes = envVars.VITE_GAME_MODES?.split(',') || ['button', 'auto']
const countries = envVars.VITE_COUNTRIES?.split(',') || ['standard', 'canada']

// Read current package.json
const packagePath = path.join(__dirname, '../package.json')
const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'))

// Generate minimal essential scripts
const newScripts = {
    dev: 'vite',
    build: 'vite build',
    preview: 'vite preview',
    'build:all': countries.flatMap(country => 
        modes.map(mode => country === 'standard' ? `npm run build:${mode}` : `npm run build:${mode}-${country}`)
    ).join(' && '),
    'deploy:all': 'npm run build:all && firebase deploy'
}

// Generate only individual build scripts (dev can use vite --mode directly)
countries.forEach(country => {
    modes.forEach(mode => {
        const suffix = country === 'standard' ? mode : `${mode}-${country}`
        newScripts[`build:${suffix}`] = `vite build --mode ${suffix}`
    })
})

// Update package.json
packageJson.scripts = newScripts

// Write updated package.json
fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + '\n')

console.log('✅ Scripts generated successfully!')
console.log(`📦 Generated ${Object.keys(newScripts).length} scripts for ${modes.length} modes × ${countries.length} countries`)