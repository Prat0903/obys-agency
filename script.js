var tl = gsap.timeline();

tl.from('.line h1', {
    y: 120,
    stagger: 0.25,
    duration: 0.4,
    delay: 0.5,
});

tl.from('#line1-part1', {
    opacity: 0,
    onStart: function () {
        var h5Timer = document.querySelector('#line1-part1 h5');
        var grow = 0;

        setInterval(function () {
            if (grow < 100) {
                h5Timer.innerHTML = grow++;
            } else {
                h5Timer.innerHTML = grow;
            }
        }, 28)
    }
});

tl.to('.line h2', {
    animationName: 'h2text',
    opacity: 1,
})

tl.to('#loader', {
    opacity: 0,
    duration: 0.3,
    delay: 3,
    display: 'none'
})

tl.from('#page1', {
    y: 1500,
    duration: 0.7,
    opacity: 0,
    ease: 'power3.out',
})

