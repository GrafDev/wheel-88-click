import {game1} from "@js/game1.js";

export const gameState = {
    currentSpin: 0,
    totalWin: 0,
    spinsCompleted: false,
    spinCount: 0,
    isSpinning: false,
    buttonBlocked: false
};

export const resetState = () => {
    gameState.currentSpin = 0;
    gameState.totalWin = 0;
    gameState.spinsCompleted = false;
    gameState.spinCount = 0;
    gameState.isSpinning = false;
    gameState.buttonBlocked = false;

    if (game1 && typeof game1.updateCounterText === 'function') {
        game1.updateCounterText();
    }
};
