import {gsap} from 'gsap';
import {SpriteManager} from './sprite-manager.js';
import {gameState} from "@js/state.js";
import {DragonAnimations} from './dragon-animations.js';
import {ArrowAnimations} from './arrow-animations.js';

export class Animations1 {
    static spriteManager = new SpriteManager();

    static syncLogo02Positions() {
        const logo02Container = document.querySelector('.logo02-container');
        if (!logo02Container) return;

        gsap.set(logo02Container, {
            left: "50%",
            top: "50%",
            xPercent: -50,
            yPercent: -50
        });

        const logo02Elements = logo02Container.querySelectorAll('.logo02');
        logo02Elements.forEach(element => {
            gsap.set(element, {
                left: "50%",
                top: "50%",
                xPercent: -50,
                yPercent: -50,
                zIndex: element.classList.contains('dragons') ? 46 : 45
            });
        });
    }

    static initializeMans() {
        const man01 = document.querySelector('.man-01');
        const man02 = document.querySelector('.man-02');
        const man03 = document.querySelector('.man-03');

        if (!man01 || !man02) return;

        // Set initial 3D rotation state
        gsap.set(man01, {
            opacity: 0,
            rotationX: 90,
            transformOrigin: "center bottom"
        });

        gsap.set(man02, {
            opacity: 0,
            rotationX: 90,
            transformOrigin: "center bottom"
        });

        if (man03) {
            gsap.set(man03, {
                opacity: 0,
                rotationX: 90,
                transformOrigin: "center bottom"
            });
        }

        // 3D card lifting animation for man01
        const tl1 = gsap.timeline({ delay: 0.8 });
        tl1.to(man01, { 
            opacity: 1, 
            rotationX: 0, 
            duration: 0.5, 
            ease: "power2.out" 
        });

        // 3D card lifting animation for man02
        const tl2 = gsap.timeline({ delay: 1 });
        tl2.to(man02, { 
            opacity: 1, 
            rotationX: 0, 
            duration: 0.5, 
            ease: "power2.out" 
        });

        if (man03) {
            const tl3 = gsap.timeline({ delay: 1.2 });
            tl3.to(man03, { 
                opacity: 1, 
                rotationX: 0, 
                duration: 0.5, 
                ease: "power2.out" 
            });
        }
    }

    static initializePageElements() {
        this.syncLogo02Positions();
        const logo01Main = document.querySelector('.logo01:not(.letters-o)');
        if (logo01Main) {
            gsap.from(logo01Main, {
                x: 100,
                opacity: 0,
                duration: 1,
                ease: "power2.out"
            });
        }

        const logo01Letters = document.querySelector('.logo01.letters-o');
        if (logo01Letters) {
            gsap.from(logo01Letters, {
                x: -100,
                opacity: 0,
                duration: 1,
                delay: 0.2,
                ease: "power2.out"
            });
        }

        const logo02 = document.querySelector('.logo02');
        if (logo02) {
            gsap.from(logo02, {
                scale: 0,
                opacity: 0,
                duration: 1,
                delay: 0.2,
                ease: "back.out(1.7)"
            });
        }

        const wheel = document.querySelector('.wheel-image');
        const wheelText = document.querySelector('.wheel-text-image');
        if (wheel) wheel.classList.remove('wheel-spin');
        if (wheelText) wheelText.classList.remove('wheel-spin');

        if (wheel && wheelText) {
            gsap.set([wheel, wheelText], {
                scale: 0,
                opacity: 0,
                rotation: 0
            });
            gsap.to([wheel, wheelText], {
                scale: 1,
                opacity: 1,
                duration: 1,
                delay: 0.3,
                ease: "back.out(1.7)"
            });
        } else if (wheel) {
            gsap.from(wheel, {
                scale: 0,
                opacity: 0,
                duration: 1,
                delay: 0.3,
                ease: "back.out(1.7)"
            });
        }

        const arrow = document.querySelector('.wheel-arrow');
        if (arrow) {
            gsap.from(arrow, {
                y: -100,
                opacity: 0,
                duration: 0.7,
                delay: 0.5,
                ease: "bounce.out"
            });
        }

        const spinButton = document.querySelector('.spin-button-image');
        if (spinButton) {
            gsap.set(spinButton, {opacity: 0});
            gsap.to(spinButton, {
                opacity: 1,
                duration: 0.5,
                delay: 0.7
            });
        }

        const dragonsElement = document.querySelector('.logo02.dragons');
        if (dragonsElement) {
            dragonsElement.style.animation = 'none';
            DragonAnimations.startDragonsPulsation(dragonsElement);
        }

        this.initializeMans();
        this.spriteManager.initialize();
    }


    static createSettlingAnimation(element, fromAngle, targetAngle) {
        return new Promise((resolve) => {
            let angleDiff = targetAngle - fromAngle;

            const wheelTextImage = document.querySelector('.wheel-text-image');

            if (angleDiff < 0) {
                angleDiff += 360;
            }

            const tl = gsap.timeline({
                onComplete: resolve
            });

            const elements = [element];
            if (wheelTextImage) {
                elements.push(wheelTextImage);
            }

            tl
                .to(elements, {
                    rotation: "+=5",
                    duration: 0.5,
                    ease: "none"
                })
                .to(elements, {
                    rotation: `+=${angleDiff - 2}`,
                    duration: 0.1,
                    ease: "power1.inOut"
                })
                .to(elements, {
                    rotation: `-=3`,
                    duration: 0.15,
                    ease: "power1.out"
                })
                .to(elements, {
                    rotation: `+=5`,
                    duration: 0.2,
                    ease: "power1.out"
                })
                .to(elements, {
                    rotation: `-=3`,
                    duration: 0.3,
                    ease: "power2.out"
                });

            return tl;
        });
    }

    static handleFinalAnimation(element, spinCount, arrowElement, arrowAnimation, resolve) {
        const wheelTextImage = document.querySelector('.wheel-text-image');
        if (spinCount === 0) {
            resolve();
            return;
        }

        if (arrowAnimation) {
            arrowAnimation.kill();
        }

        const newArrowAnimation = ArrowAnimations.createArrowVibrationAnimation(arrowElement);
        let settlingAnim;

        if (spinCount === 1) {
            settlingAnim = this.createSettlingAnimation(element, -20, -2);
        } else if (spinCount === 2) {
            settlingAnim = this.createSettlingAnimation(element, 253, 268);
        }

        if (settlingAnim) {
            settlingAnim.then(resolve);
        } else {
            resolve();
        }
    }

    static createLogo2CenterAnimation(logo2Element, spinDuration = 2, settleDuration = 1) {
        if (!logo2Element) return null;
        gsap.killTweensOf(logo2Element);
        gsap.set(logo2Element, {
            transformOrigin: "center center",
            zIndex: 65
        });

        const totalDuration = spinDuration + settleDuration;
        const rotateTimeline = gsap.timeline();
        const segmentDuration = totalDuration / 3;

        rotateTimeline
            .to(logo2Element, {
                rotation: -10,
                duration: segmentDuration,
                ease: "sine.inOut"
            })
            .to(logo2Element, {
                rotation: 0,
                duration: segmentDuration,
                ease: "sine.inOut"
            })
            .to(logo2Element, {
                rotation: 0,
                duration: segmentDuration,
                ease: "sine.inOut",
                onComplete: () => {
                    logo2Element.style.transform = 'translate(-50%, -50%)';
                }
            });

        return rotateTimeline;
    }
    static fixLogoPositions() {
        const logo02Elements = document.querySelectorAll('.logo02');

        logo02Elements.forEach(element => {
            gsap.killTweensOf(element);
            element.style.transform = 'translate(-50%, -50%)';
            element.style.left = '50%';
            element.style.top = '50%';

            if (element._gsap) {
                const currentRotation = element._gsap.rotation || 0;
                gsap.set(element, {
                    clearProps: "x,y,xPercent,yPercent,left,top"
                });
                if (currentRotation !== 0) {
                    gsap.set(element, { rotation: currentRotation });
                }
            }
        });
    }
    static wheelSpin(element, currentRotation, spinCount) {
        return new Promise((resolve) => {
            const config = this.getSpinConfig(spinCount);
            const totalAngle = currentRotation + config.rotations + (360 - (currentRotation % 360)) + config.finalAngle;
            const wheelTextImage = document.querySelector('.wheel-text-image');
            if (wheelTextImage) {
                gsap.set(wheelTextImage, { rotation: currentRotation });
                gsap.set(wheelTextImage, { filter: 'blur(5px)' });
            }

            const spinDuration = config.duration;
            const settleDuration = spinCount > 0 ? 1 : 0;
            const arrowElement = document.querySelector('.wheel-arrow');
            const logo2CenterElement = document.querySelector('.logo02.circle-center');
            const dragonsElement = document.querySelector('.logo02.dragons');

            let arrowAnimation = null;

            if (dragonsElement && spinCount === 0) {
                DragonAnimations.startDragonsPulsation(dragonsElement);
            }

            const tl = gsap.timeline({
                onComplete: () => {
                    if (wheelTextImage) {
                        gsap.set(wheelTextImage, { filter: 'none' });
                    }
                    this.handleFinalAnimation(element, spinCount, arrowElement, arrowAnimation, resolve);
                }
            });

            tl.to([element, wheelTextImage], {
                rotation: totalAngle,
                duration: spinDuration,
                ease: "power7.inOut"
            });

            if (wheelTextImage) {
                const delay= 0.7;
                tl.to(wheelTextImage, {
                    filter: 'blur(0px)',
                    duration: delay,
                    ease: "power2.out",
                    startAt: { filter: 'blur(5px)' },
                }, spinDuration - delay);
            }

            if (logo2CenterElement && spinCount > 0) {
                this.createLogo2CenterAnimation(
                    logo2CenterElement,
                    spinDuration,
                    settleDuration
                );
            }

            if (dragonsElement && spinCount > 0) {
                gsap.killTweensOf(dragonsElement);
                dragonsElement._pulsationActive = false;
                DragonAnimations.createDragonsSwayAnimation(
                    dragonsElement,
                    spinDuration,
                    settleDuration
                );
            }

            if (arrowElement && spinCount > 0) {
                arrowAnimation = ArrowAnimations.arrowClickAnimation(arrowElement, element, spinCount);
            }
        });
    }

    static getSpinConfig(spinCount) {
        const fullRotations = 3 * 360;

        if (spinCount === 1) {
            return {
                finalAngle: -20,
                rotations: fullRotations,
                duration: 2
            };
        } else if (spinCount === 2) {
            return {
                finalAngle: 253,
                rotations: fullRotations,
                duration: 2
            };
        } else {
            return {
                finalAngle: Math.random() * 360,
                rotations: 360,
                duration: 1
            };
        }
    }

    static buttonGlow(button) {
        button.classList.add('glow');
        return gsap.to(button, {
            scale: 1.02,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
        });
    }

    static stopButtonGlow(button) {
        gsap.killTweensOf(button);
        button.classList.remove('glow');
        gsap.set(button, {
            scale: 1,
            filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))'
        });
    }

    static showModal(modal) {
        return new Promise((resolve) => {
            modal.classList.add('active');

            const createParticles = () => {
                const modalContent = modal.querySelector('.modal-content');
                let particlesContainer = modal.querySelector('.modal-particles');

                if (!particlesContainer) {
                    particlesContainer = document.createElement('div');
                    particlesContainer.className = 'modal-particles';
                    modal.appendChild(particlesContainer);
                } else {
                    particlesContainer.innerHTML = '';
                }

                const particleCount = 30;
                const rect = modalContent.getBoundingClientRect();
                for (let i = 0; i < particleCount; i++) {
                    const particle = document.createElement('div');
                    particle.className = 'particle';

                    const placeOnEdge = Math.random() > 0.5;
                    let x, y;

                    if (placeOnEdge) {
                        const side = Math.floor(Math.random() * 4);
                        if (side === 0) {
                            x = Math.random() * rect.width;
                            y = -10;
                        } else if (side === 1) {
                            x = rect.width + 10;
                            y = Math.random() * rect.height;
                        } else if (side === 2) {
                            x = Math.random() * rect.width;
                            y = rect.height + 10;
                        } else {
                            x = -10;
                            y = Math.random() * rect.height;
                        }
                    } else {
                        const angle = Math.random() * Math.PI * 2;
                        const distance = rect.width * 0.6 * Math.random();
                        x = Math.cos(angle) * distance + rect.width / 2;
                        y = Math.sin(angle) * distance + rect.height / 2;
                    }

                    x += rect.left - modal.getBoundingClientRect().left;
                    y += rect.top - modal.getBoundingClientRect().top;

                    particle.style.left = `${x}px`;
                    particle.style.top = `${y}px`;

                    const size = Math.random() * 6 + 4;
                    particle.style.width = `${size}px`;
                    particle.style.height = `${size}px`;

                    particle.style.animationDelay = `${Math.random() * 0.5}s`;

                    particlesContainer.appendChild(particle);
                }
            };

            gsap.timeline()
                .fromTo(modal,
                    {
                        opacity: 0
                    },
                    {
                        opacity: 1,
                        duration: 0.3,
                        ease: "power2.out"
                    }
                )
                .fromTo(modal.querySelector('.modal-content'),
                    {
                        y: 50,
                        opacity: 0,
                        scale: 0.3,
                        filter: 'brightness(0.5) drop-shadow(0 0 0px rgba(255, 215, 0, 0))'
                    },
                    {
                        duration: 0.2,
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        filter: 'brightness(1.1) drop-shadow(0 0 20px rgba(255, 215, 0, 0.6))',
                        ease: "back.out(1.7)",
                        onStart: createParticles,
                        onComplete: () => {
                            gsap.fromTo(modal.querySelector('.modal-content'),
                                {
                                    filter: 'brightness(1.5) drop-shadow(0 0 30px rgba(255, 215, 0, 0.9))'
                                },
                                {
                                    filter: 'brightness(1.1) drop-shadow(0 0 20px rgba(255, 215, 0, 0.6))',
                                    duration: 0.4,
                                    ease: "power2.out",
                                    onComplete: resolve
                                }
                            );
                        }
                    }
                );
        });
    }

    static hideModal(modal) {
        return gsap.timeline()
            .to(modal.querySelector('.modal-content'), {
                duration: 0.2,
                y: 30,
                opacity: 0,
                scale: 0.9,
                ease: "power2.in"
            })
            .to(modal, {
                duration: 0.1,
                onComplete: () => {
                    modal.classList.remove('active');
                }
            });
    }
}
