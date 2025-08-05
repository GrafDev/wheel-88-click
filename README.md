# 88 Fortunes Wheel Game

Web-based fortune wheel game with multiple configurations for different countries and game modes.

## 🎮 Game Modes

- **Button Mode**: Click to spin the wheel (2 spins)
- **Auto Mode**: Automatic spin after delay (1 spin)

## 🌍 Country Configurations

- **Standard**: Default configuration
- **Canada**: Adjusted prizes and settings

## ⚙️ Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables

Copy the example files and configure them with your Firebase settings:

```bash
# For Standard Button mode
cp .env.button.example .env.button

# For Standard Auto mode  
cp .env.auto.example .env.auto

# For Canada Button mode
cp .env.button-canada.example .env.button-canada

# For Canada Auto mode
cp .env.auto-canada.example .env.auto-canada
```

### 3. Update Firebase Configuration

Edit the copied `.env.*` files and replace the Firebase placeholders with your actual Firebase project settings:

```env
VITE_FIREBASE_API_KEY=your_actual_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## 🛠️ Development Commands

### Local Development
```bash
# Standard modes
npm run dev:button          # Standard Button mode
npm run dev:auto            # Standard Auto mode

# Canada modes  
npm run dev:button-canada   # Canada Button mode
npm run dev:auto-canada     # Canada Auto mode
```

### Build Commands
```bash
# Individual builds
npm run build:button         # → dist-button/
npm run build:auto          # → dist-auto/
npm run build:button-canada # → dist-button-canada/
npm run build:auto-canada   # → dist-auto-canada/

# Batch builds
npm run build:all           # Standard modes
npm run build:all-canada    # Canada modes
```

### Firebase Deployment
```bash
# Deploy individual modes (requires Firebase CLI setup)
npm run deploy:button       # Deploy button mode
npm run deploy:auto         # Deploy auto mode
npm run deploy:all          # Deploy both standard modes
```

## 📁 Project Structure

```
src/
├── assets/
│   ├── js/
│   │   ├── config.js       # Game configuration for all modes
│   │   ├── game1.js        # Main game logic
│   │   └── main.js         # Application entry point
│   ├── css/                # Stylesheets
│   └── images/             # Game assets
└── index.html              # Main HTML file
```

## 🎯 Game Configuration

All game settings are centralized in `src/assets/js/config.js`:

- Prize texts for each spin
- Auto-spin delays
- Wheel text images
- Country-specific settings

## 🔒 Security Note

- `.env.*` files contain sensitive Firebase credentials and are ignored by git
- Only `.env.*.example` files are tracked in the repository
- Always use your own Firebase project credentials

## 📦 Distribution

When sharing the project:
1. The archive will include `.env.*.example` files
2. Recipients need to create their own `.env.*` files  
3. Recipients need to configure their own Firebase project
4. All game configurations are public and included