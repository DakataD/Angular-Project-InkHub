import {
    trigger,
    transition,
    style,
    animate,
} from '@angular/animations'



export const fader = trigger('routeAnimations', [
  transition('* <=> *', [
    style({ opacity: 0.7 }), 
    animate('1.3s', style({ opacity: 1 })) 
  ])
]);