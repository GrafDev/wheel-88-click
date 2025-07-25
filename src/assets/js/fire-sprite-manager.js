import { gsap } from 'gsap';

export class FireSpriteManager {
    constructor() {
        this.spriteElement = document.querySelector('.fire-sprite-animation');
        this.currentFrame = 1;
        this.totalFrames = 29;
        this.timeline = null;
        this.flickerTimeline = null;
        this.flashTimeline = null;
        this.isActive = false;
    }

    initialize() {
        if (!this.spriteElement) return;

        this.spriteElement.classList.remove('active');
        this.clearFrameClasses();

        gsap.set(this.spriteElement, {
            opacity: 0.7
        });
    }

    clearFrameClasses() {
        for (let i = 1; i <= this.totalFrames; i++) {
            this.spriteElement.classList.remove(`sprite-fire${String(i).padStart(2, '0')}`);
        }
    }

    setFrame(frameNumber) {
        if (!this.spriteElement) return;

        this.clearFrameClasses();
        this.spriteElement.classList.add(`sprite-fire${String(frameNumber).padStart(2, '0')}`);
    }

    startFlickering() {
        if (this.flickerTimeline) {
            this.flickerTimeline.kill();
        }

        this.flickerTimeline = gsap.timeline({
            repeat: -1,
            yoyo: true,
        });

        this.flickerTimeline.to(this.spriteElement, {
            duration: gsap.utils.random(0.3, 0.6),
            opacity: () => gsap.utils.random(0.4, 0.8),
            ease: "none",
            repeat: 1,
            yoyo: true
        });
    }

    stopFlickering() {
        if (this.flickerTimeline) {
            this.flickerTimeline.kill();
            this.flickerTimeline = null;
        }
    }

    flash() {
        if (!this.spriteElement || this.flashTimeline?.isActive()) return;

        const currentOpacity = gsap.getProperty(this.spriteElement, "opacity");

        this.flashTimeline = gsap.timeline()
            .to(this.spriteElement, {
                duration: 0.2,
                opacity: 1,
                filter: 'brightness(4) contrast(1.5) saturate(1.5)',
                scale: 1.2,
                ease: "power2.out"
            })
            .to(this.spriteElement, {
                duration: 0.2,
                filter: 'brightness(5) contrast(1.8) saturate(2)',
                scale: 1.4,
                ease: "power4.out"
            })
            .to(this.spriteElement, {
                duration: 0.3,
                filter: 'brightness(4.5) contrast(1.6) saturate(1.8)',
                scale: 1.3,
                ease: "power2.inOut"
            })
            .to(this.spriteElement, {
                duration: 0.4,
                filter: 'brightness(3) contrast(1.3) saturate(1.4)',
                scale: 1.2,
                ease: "power1.inOut"
            })
            .to(this.spriteElement, {
                duration: 0.3,
                filter: 'brightness(2) contrast(1.2) saturate(1.2)',
                scale: 1.1,
                ease: "power1.inOut"
            })
            .to(this.spriteElement, {
                duration: 0.6,
                opacity: currentOpacity,
                filter: 'brightness(1) contrast(1) saturate(1)',
                scale: 1,
                ease: "power2.inOut"
            });

        this.flashTimeline.to(this.spriteElement, {
            boxShadow: '0 0 50px rgba(255, 165, 0, 0.8), 0 0 100px rgba(255, 69, 0, 0.6)',
            duration: 0.4,
            ease: "power2.out"
        }, 0)
            .to(this.spriteElement, {
                boxShadow: 'none',
                duration: 0.8,
                ease: "power2.in"
            }, ">-0.3");

        return this.flashTimeline;
    }

    play(duration = 1, repeat = -1) {
        if (!this.spriteElement) return;

        if (this.timeline) {
            this.timeline.kill();
        }

        this.spriteElement.classList.add('active');
        this.isActive = true;
        this.startFlickering();

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

    pause() {
        if (this.timeline) {
            this.timeline.pause();
        }
        this.stopFlickering();
    }

    resume() {
        if (this.timeline) {
            this.timeline.resume();
        }
        if (this.isActive) {
            this.startFlickering();
        }
    }

    stop() {
        if (!this.spriteElement || !this.timeline) return;

        this.timeline.kill();
        this.stopFlickering();
        this.spriteElement.classList.remove('active');
        this.isActive = false;
    }

    setOpacity(value) {
        if (!this.spriteElement) return;
        gsap.set(this.spriteElement, {
            opacity: value
        });
    }

    reset() {
        if (!this.spriteElement) return;

        if (this.timeline) {
            this.timeline.kill();
        }
        this.stopFlickering();

        this.spriteElement.classList.remove('active');
        this.clearFrameClasses();
        this.currentFrame = 1;
        this.isActive = false;
    }
}
