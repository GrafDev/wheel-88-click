import { gsap } from 'gsap';

export class ArrowAnimations {
    static arrowClickAnimation(arrowElement, wheelElement, spinCount) {
        if (spinCount === 0) {
            return gsap.timeline();
        }

        gsap.set(arrowElement, {
            transformOrigin: "center 15%"
        });

        const checkpointAngles = [
            22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5, 382.5
        ];
        let lastTriggeredAngle = null;

        const clickArrow = () => {
            gsap.timeline()
                .to(arrowElement, {
                    rotation: -30,
                    duration: 0.25,
                    ease: "power2.out"
                })
                .to(arrowElement, {
                    rotation: 0,
                    duration: 0.3,
                    ease: "elastic.out(1, 0.5)"
                });
        };

        const tl = gsap.timeline();

        tl.to({}, {
            duration: 3,
            onUpdate: function () {
                const currentRotation = gsap.getProperty(wheelElement, "rotation") || 0;
                const normalizedRotation = (currentRotation % 360 + 360) % 360;

                for (let i = 0; i < checkpointAngles.length; i++) {
                    const angle = checkpointAngles[i];
                    if (Math.abs(normalizedRotation - angle) < 5) {
                        if (lastTriggeredAngle !== angle) {
                            lastTriggeredAngle = angle;
                            clickArrow();
                            break;
                        }
                    } else if (lastTriggeredAngle === angle) {
                        lastTriggeredAngle = null;
                    }
                }
            }
        });

        return tl;
    }

    static createArrowVibrationAnimation(arrowElement) {
        const animation = gsap.timeline();

        animation
            .to(arrowElement, {
                rotation: -25,
                duration: 0.35,
                ease: "power3.out"
            })
            .to(arrowElement, {
                rotation: 18,
                duration: 0.15,
                ease: "power1.out"
            })
            .to(arrowElement, {
                rotation: -12,
                duration: 0.15,
                ease: "power2.inOut"
            })
            .to(arrowElement, {
                rotation: 8,
                duration: 0.08,
                ease: "power2.inOut"
            })
            .to(arrowElement, {
                rotation: -4,
                duration: 0.08,
                ease: "power2.inOut"
            })
            .to(arrowElement, {
                rotation: 0,
                duration: 0.15,
                ease: "elastic.out(1.2, 0.2)"
            });

        return animation;
    }
}
