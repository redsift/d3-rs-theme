import BezierEasing from 'bezier-easing';

export const duration = 400;

export function easing() {
    return BezierEasing(0.175, 0.885, 0.335, 1.155);
}

