const hero = document.querySelector('.hero');
const slider = document.querySelector('.slider');
const menu = document.querySelector('.menu');
const headline = document.querySelector('.headline');

const timeline = new TimelineMax();

timeline.fromTo(hero, 1, {height: "0%"}, {height: "80%", ease: Power2.easeInOut })
        .fromTo(hero, 1.2, {width: '100%'}, {width: '80%', ease: Power2.easeInOut })
        .fromTo(slider, 1.2, {x: '-100%'}, {x: '0%', ease: Power2.easeInOut }, '-=1.2' )
        .fromTo(logo, .5, {opacity: 0, x: 30}, {opacity: 1, x:0}, '-=.5')
        .fromTo(menu, .5, {opacity: 0, x: 30}, {opacity: 1, x:0}, '-=.5')
        .fromTo(headline, .5, {opacity: 0, x: 30}, {opacity: 1, x:0}, '-=.5')