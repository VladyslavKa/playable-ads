import gsap from 'gsap';

export const fadeIn = (sprite, delay = -1, duration = 1) => {
    // delay in seconds
    return gsap.delayedCall(delay, () => {
        gsap.to(sprite, duration, { alpha: 1 });
    });
};

export const fadeOut = (sprite, delay = -1, duration = 1) => {
    // delay in seconds
    return gsap.delayedCall(delay, () => {
        gsap.to(sprite, duration, { alpha: 0 });
    });
};

export const pulse = (sprite, duration = 1, config = {}) => {
    return gsap.to(sprite, duration, {
        alpha: 0.5,
        repeat: -1,
        yoyo: true,
        ...config,
    });
};

export const dropIn = (sprite, duration = -1, config = {}) => {
    return gsap.to(sprite, duration, {
        alpha: 1,
        ...config,
    });
};

export const bounce = (sprite, duration, config) => {
    return gsap.to(sprite, {
        duration,
        ease: "bounce.out",
        ...config,
    });
};