var counter = document.querySelector('#line1-part1 h5');
var cursor = document.querySelector('#cursor');
var main = document.querySelector('#main');
var body = document.querySelector('body');
var tl = gsap.timeline();
var img = document.querySelector('#img');
var playReel = document.querySelector('#play-reel');
// Define the 'loader' function

function locomotive() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  console.log('1 done');
  const locoScroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on('scroll', ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy('#main', {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector('#main').style.transform ? 'transform' : 'fixed',
  });
  console.log('2 done');
  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener('refresh', () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
  console.log('3 done');
}
function loader() {
  // Define a variable called 'count' and set it to 0
  var count = 0;
  console.log('4 done');
  // Create a new setInterval function to update the 'counter' element's innerHTML every 40 milliseconds
  var start = setInterval(function () {
    count++; // Increment the 'count' variable by 1

    // Check if the 'count' variable is less than 100
    if (count < 100) {
      counter.innerHTML = count++; // Update the 'counter' element's innerHTML with the current 'count' value
    } else {
      counter.innerHTML = count - 1; // Update the 'counter' element's innerHTML with the last 'count' value before it reached 100
      clearInterval(start); // Clear the setInterval function
    }
  }, 55);

  console.log('5 done');
  // Animate the elements with the class 'line h1'
  tl.from('.line h1', {
    y: 100, // Move the elements vertically by 100 pixels
    stagger: 0.1, // Apply a delay to each animation
    duration: 0.8, // Set the duration of the animation to 0.8 seconds
    delay: 0.4, // Set the delay of the animation to 0.4 seconds
    opacity: 1,
  });

  console.log('6 done');
  // Animate the elements with the ids 'line1-part1' and '.line h2'
  tl.from('#line1-part1,.line h2', {
    opacity: 0, // Set the initial opacity of the elements to 0
  });

  // Animate the element with the id 'loader'
  tl.to('#loader', {
    opacity: 0, // Set the final opacity of the element to 0
    duration: 0.8, // Set the duration of the animation to 0.8 seconds
    delay: 1.5, // Set the delay of the animation to 1 seconds
    display: 'none',
  });
  tl.from('#page1', {
    y: 1200,
    delay: 0.05,
    duration: 1,

    // scrub: 1,
  });
  tl.from('nav', {
    opacity: 0,
  });
  tl.from('.hero h1', {
    y: 100,
    stagger: 0.2,
  });
  console.log('working');
}
function cursorAnimation() {
  Shery.mouseFollower({
    //Parameters are optional.
    skew: true,
    ease: 'cubic-bezier(0.23, 1, 0.320, 1)',
    duration: 1,
  });
  Shery.makeMagnet('nav h4');
  img.addEventListener('mouseenter', function () {
    img.addEventListener('mousemove', function (dets) {
      gsap.to(playReel, {
        left: dets.x - 570,
        y: dets.y - 300,
      });
    });
  });
}

function sheryAnimation() {
  Shery.imageEffect('.image-div', {
    style: 2,
    // debug: true,
    // gooey: true,
    config: {
      resolutionXY: { value: 100 },
      distortion: { value: true },
      mode: { value: -3 },
      mousemove: { value: 0 },
      modeA: { value: 1 },
      modeN: { value: 0 },
      speed: { value: 1, range: [-500, 500], rangep: [-10, 10] },
      frequency: { value: 50, range: [-800, 800], rangep: [-50, 50] },
      angle: { value: 0.5, range: [0, 3.141592653589793] },
      waveFactor: { value: 1.4, range: [-3, 3] },
      color: { value: 10212607 },
      pixelStrength: { value: 3, range: [-20, 100], rangep: [-20, 20] },
      quality: { value: 5, range: [0, 10] },
      contrast: { value: 1, range: [-25, 25] },
      brightness: { value: 1, range: [-1, 25] },
      colorExposer: { value: 0.18, range: [-5, 5] },
      strength: { value: 0.2, range: [-40, 40], rangep: [-5, 5] },
      exposer: { value: 8, range: [-100, 100] },
      zindex: { value: -9996999, range: [-9999999, 9999999] },
      aspect: { value: 0.7272515295014734 },
      ignoreShapeAspect: { value: true },
      shapePosition: { value: { x: 0, y: 0 } },
      shapeScale: { value: { x: 0.5, y: 0.5 } },
      shapeEdgeSoftness: { value: 0, range: [0, 0.5] },
      shapeRadius: { value: 0, range: [0, 2] },
      currentScroll: { value: 0 },
      scrollLerp: { value: 0.07 },
      gooey: { value: true },
      infiniteGooey: { value: true },
      growSize: { value: 4, range: [1, 15] },
      durationOut: { value: 1, range: [0.1, 5] },
      durationIn: { value: 1.5, range: [0.1, 5] },
      displaceAmount: { value: 0.5 },
      masker: { value: false },
      maskVal: { value: 1, range: [1, 5] },
      scrollType: { value: 0 },
      geoVertex: { range: [1, 64], value: 1 },
      noEffectGooey: { value: true },
      onMouse: { value: 0 },
      noise_speed: { value: 0.92, range: [0, 10] },
      metaball: { value: 0.4, range: [0, 2] },
      discard_threshold: { value: 0.6, range: [0, 1] },
      antialias_threshold: { value: 0, range: [0, 0.1] },
      noise_height: { value: 0.5, range: [0, 2] },
      noise_scale: { value: 10.69, range: [0, 100] },
    },
  });
}

function flagAnimation() {
  document.addEventListener('mousemove', function (dets) {
    gsap.to('#flag', {
      x: dets.x - 500,
      y: dets.y,
    });
  });
  document.querySelector('#hero3').addEventListener('mouseenter', function () {
    gsap.to('#flag', {
      opacity: 1,
    });
  });
  document.querySelector('#hero3').addEventListener('mouseleave', function () {
    gsap.to('#flag', {
      opacity: 0,
    });
  });
}
// document.querySelector('#hero3').addEventListener('mouseleave', function () {
//   document.querySelector('#flag').addEventListener('mousemove', function () {
//     gsap.to('#flag', {
//       opacity: 0,
//     });
//   });
// });

loader();
cursorAnimation();
locomotive();
sheryAnimation();
flagAnimation();
