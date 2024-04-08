import {
    trigger,
    transition,
    style,
    query,
    animateChild,
    animate,
    keyframes,
    group
} from '@angular/animations'



export const fader = trigger('routeAnimations', [
    transition('* <=> *', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            bottom: 0,
            width: '100%'
          })
        ], { optional: true }),
        query(':enter', [
          style({ right: '-100%' })
        ], { optional: true }),
        query(':leave', animateChild(), { optional: true }),
        group([
          query(':leave', [
            animate('1200ms ease-in-out', style({ right: '100%', opacity: 0 }))
          ], { optional: true }),
          query(':enter', [
            animate('1300ms ease-in-out', style({ right: '0%' }))
          ], { optional: true }),
          query('@*', animateChild(), { optional: true })
        ]),
      ])
    ]);