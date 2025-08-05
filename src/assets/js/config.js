export const gameConfig = {
    standard: {
        button: {
            spins: {
                first: {
                    winText: "100FS"
                },
                second: {
                    winText: "300%"
                }
            },
            wheelText: "text_wheel.png"
        },
        
        auto: {
            spins: {
                first: {
                    winText: '<span class="big-text">1500$</span>\n<span class="plus-text">+</span>\n<span class="small-text">100FS</span>'
                }
            },
            wheelText: "text_wheel.png",
            autoSpinDelay: 1800 // milliseconds
        }
    },
    
    canada: {
        button: {
            spins: {
                first: {
                    winText: "50FS"
                },
                second: {
                    winText: "200%"
                }
            },
            wheelText: "text_wheel.png"
        },
        
        auto: {
            spins: {
                first: {
                    winText: '<span class="big-text">1000$</span>\n<span class="plus-text">+</span>\n<span class="small-text">50FS</span>'
                }
            },
            wheelText: "text_wheel.png",
            autoSpinDelay: 2000 // milliseconds
        }
    },
    
    // Common settings for all countries
    common: {
        modalWinAmount: "Your Prize!"
    }
};