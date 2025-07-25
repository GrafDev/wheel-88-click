import { gsap } from 'gsap';

export class SpriteManager {
    constructor() {
        this.spriteElement = document.querySelector('.wheel-sprite-animation');
        this.currentFrame = 1;
        this.totalFrames = 20;
        this.timeline = null;
    }

    initialize() {
        if (!this.spriteElement) return;

        this.spriteElement.classList.remove('active');
        this.clearFrameClasses();
    }

    clearFrameClasses() {
        for (let i = 1; i <= this.totalFrames; i++) {
            this.spriteElement.classList.remove(`sprite-wl${String(i).padStart(2, '0')}`);
        }
    }

    setFrame(frameNumber) {
        if (!this.spriteElement) return;

        this.clearFrameClasses();
        this.spriteElement.classList.add(`sprite-wl${String(frameNumber).padStart(2, '0')}`);
    }

    play(duration = 1, repeat = -1) {
        if (!this.spriteElement) return;

        if (this.timeline) {
            this.timeline.kill();
        }

        this.spriteElement.classList.add('active');

        this.timeline = gsap.timeline({
            repeat: repeat,
            onUpdate: () => {
                const progress = this.timeline.progress();
                const frame = Math.ceil(progress * this.totalFrames) || this.totalFrames;
                if (frame !== this.currentFrame) {
                    this.currentFrame = frame;
                    this.setFrame(this.currentFrame);
                }
            }
        });

        this.timeline.to({}, {
            duration: duration,
            ease: "none"
        });

        return this.timeline;
    }

    stop() {
        if (!this.spriteElement || !this.timeline) return;

        this.timeline.kill();
        this.setFrame(this.totalFrames);
    }

    reset() {
        if (!this.spriteElement) return;

        if (this.timeline) {
            this.timeline.kill();
        }

        this.spriteElement.classList.remove('active');
        this.clearFrameClasses();
        this.currentFrame = 1;
    }
}
