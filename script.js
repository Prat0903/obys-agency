function locoScroll() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

}

function loaderAnimation() {

    var tl = gsap.timeline();

    tl.from('.line h1, .timer-text', {
        y: 120,
        opacity: 0,
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
            }, 25)
        }
    });

    tl.to('.line h2', {
        animationName: 'h2text',
        opacity: 1,
    });

    tl.to('#loader', {
        opacity: 0,
        duration: 0.3,
        delay: 2.5,
        display: 'none'
    });

    tl.from('#nav', {
        y: -10,
        opacity: 0,
    });

    tl.from('#page1', {
        y: 1500,
        duration: 0.7,
        opacity: 0,
        ease: 'power3.out',
    });

    tl.from('#hero1 h1, #hero2 h1, #hero3 h2, #hero4 h1', {
        y: 140,
        stagger: 0.2,
    });

    tl.from('#hero1, #page2', {
        opacity: 0,
    }, '-=1.2');
}

// function cursorAnimation() {
//     Shery.mouseFollower({
//         //Parameters are optional.
//         skew: true,
//         ease: "cubic-bezier(0.23, 1, 0.320, 1)",
//         duration: 1,
//     });

//     Shery.makeMagnet("#nav-part2 h4, #svg-container .menu-opener__square");


//     var videoContainer = document.querySelector('#video-container');
//     var video = document.querySelector('#video-container video');

//     videoContainer.addEventListener('mouseenter', function () {
//         videoContainer.addEventListener('mousemove', function (dets) {
//             gsap.to('.mousefollower', {
//                 opacity: 0,
//             });
//             gsap.to('#video-cursor', {
//                 x: dets.x - 1200,
//                 y: dets.y - 200,
//             });
//         });
//     });

//     videoContainer.addEventListener('mouseleave', function () {
//         gsap.to('.mousefollower', {
//             opacity: 1,
//         });
//         gsap.to('#video-cursor', {
//             x: '70%',
//             y: '12%',
//         })
//     });

//     var flag = 0;
//     videoContainer.addEventListener('click', function () {
//         if (flag == 0) {
//             video.play();
//             video.style.opacity = 1;
//             document.querySelector('#video-cursor').innerHTML = `<i class="ri-pause-line"></i>`;

//             gsap.to('#video-cursor', {
//                 scale: 0.5,
//             });
//             flag = 1;
//         } else {
//             video.pause();
//             video.style.opacity = 0;
//             document.querySelector('#video-cursor').innerHTML = `<i class="ri-play-fill"></i>`;

//             gsap.to('#video-cursor', {
//                 scale: 1,
//             });
//             flag = 0;
//         }
//     });

// }

// function imageAnimation() {
//     Shery.imageEffect('.image-div', {
//         style: 2,
//         debug: true,
//         gooey: true,
//     });
// }

function flagAnimation() {
    document.addEventListener('mousemove', function (dets) {
        gsap.to('#flag', {
            x: dets.x,
            y: dets.y,
        });
    });

    var hero3 = document.querySelector('#hero3');

    hero3.addEventListener('mouseenter', function () {
        gsap.to('#flag', {
            opacity: 1,
        });
    });

    hero3.addEventListener('mouseleave', function () {
        gsap.to('#flag', {
            opacity: 0,
        });
    });
}

function footerAnimation() {

    var clutter = ""
    var clutter2 = ""
    document.querySelector("#footer h1").textContent.split("").forEach(function (elem) {
        clutter += `<span>${elem}</span>`
    })
    document.querySelector("#footer h1").innerHTML = clutter
    document.querySelector("#footer h2").textContent.split("").forEach(function (elem) {
        clutter2 += `<span>${elem}</span>`
    })
    document.querySelector("#footer h2").innerHTML = clutter2


    document.querySelector("#footer-text").addEventListener("mouseenter", function () {
        gsap.to("#footer h1 span", {
            opacity: 0,
            stagger: 0.05,
        })
        gsap.to("#footer h2 span", {
            delay: 0.2,
            opacity: 1,
            stagger: 0.1,
        })
    })
    document.querySelector("#footer-text").addEventListener("mouseleave", function () {
        gsap.to("#footer h1 span", {
            opacity: 1,
            stagger: 0.1,
            delay: 0.2,

        })
        gsap.to("#footer h2 span", {
            opacity: 0,
            stagger: 0.05
        })
    })
}

locoScroll();
loaderAnimation();
// cursorAnimation();
// imageAnimation();
flagAnimation();
footerAnimation();



var sheryScript; // Declare sheryScript globally to track its state

function loadScript(src, id, onLoadCallback) {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = src;
  script.id = id;
  script.async = true; // Load script asynchronously
  script.onload = onLoadCallback; // Set the onload callback
  document.body.appendChild(script);
}

function loadShery() {
  if (!sheryScript) {
    sheryScript = document.createElement('script');
    sheryScript.type = 'text/javascript';
    sheryScript.src = 'https://unpkg.com/sheryjs/dist/Shery.js';
    sheryScript.id = 'shery';
    sheryScript.async = true;
    sheryScript.onload = initSheryFeatures;
    document.body.appendChild(sheryScript);
  }
}

function unloadShery() {
  if (sheryScript) {
    sheryScript.parentNode.removeChild(sheryScript);
    sheryScript = null;
  }
}

function checkViewport() {
  if (window.matchMedia('(min-width: 600px)').matches) {
    loadShery();
  } else {
    unloadShery();
  }
}

// Initial check
checkViewport();

// Check on resize
window.addEventListener('resize', checkViewport);

function initSheryFeatures() {
  // Your code to use Shery.js features goes here
 cursorAnimation();
 imageAnimation();
}

function cursorAnimation() {
    Shery.mouseFollower({
        //Parameters are optional.
        skew: true,
        ease: "cubic-bezier(0.23, 1, 0.320, 1)",
        duration: 1,
    });

    Shery.makeMagnet("#nav-part2 h4, #svg-container .menu-opener__square");


    var videoContainer = document.querySelector('#video-container');
    var video = document.querySelector('#video-container video');

    videoContainer.addEventListener('mouseenter', function () {
        videoContainer.addEventListener('mousemove', function (dets) {
            gsap.to('.mousefollower', {
                opacity: 0,
            });
            gsap.to('#video-cursor', {
                x: dets.x - 1200,
                y: dets.y - 200,
            });
        });
    });

    videoContainer.addEventListener('mouseleave', function () {
        gsap.to('.mousefollower', {
            opacity: 1,
        });
        gsap.to('#video-cursor', {
            x: '70%',
            y: '12%',
        })
    });

    var flag = 0;
    videoContainer.addEventListener('click', function () {
        if (flag == 0) {
            video.play();
            video.style.opacity = 1;
            document.querySelector('#video-cursor').innerHTML = `<i class="ri-pause-line"></i>`;

            gsap.to('#video-cursor', {
                scale: 0.5,
            });
            flag = 1;
        } else {
            video.pause();
            video.style.opacity = 0;
            document.querySelector('#video-cursor').innerHTML = `<i class="ri-play-fill"></i>`;

            gsap.to('#video-cursor', {
                scale: 1,
            });
            flag = 0;
        }
    });

}

function imageAnimation() {
    Shery.imageEffect('.image-div', {
        style: 3,
        // debug: true,
        gooey: true,
    });
}