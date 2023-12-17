var counter = document.querySelector('#line1-part1 h5');
var cursor = document.querySelector('#cursor');
var main = document.querySelector('#main');
var body = document.querySelector('body');
var tl = gsap.timeline();
var vidContainer = document.querySelector('#vid-container');
var playReel = document.querySelector('#play-reel');
// Define the 'loader' function
function loco() {
  gsap.registerPlugin(ScrollTrigger);
  const locoScroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true,
  });
  locoScroll.on('scroll', ScrollTrigger.update);
  ScrollTrigger.scrollerProxy('#main', {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    pinType: document.querySelector('#main').style.transform ? 'transform' : 'fixed',
  });
  ScrollTrigger.addEventListener('refresh', () => locoScroll.update());

  ScrollTrigger.refresh();
}
function loader() {
  // Define a variable called 'count' and set it to 0
  var count = 0;

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
  // Animate the elements with the class 'line h1'
  tl.from('.line h1', {
    y: 100, // Move the elements vertically by 100 pixels
    stagger: 0.1, // Apply a delay to each animation
    duration: 0.8, // Set the duration of the animation to 0.8 seconds
    delay: 0.4, // Set the delay of the animation to 0.4 seconds
    scrollTrigger: {
      scroller: '#main',
    },
  });

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
}
function cursorAnimation() {
  main.addEventListener('mousemove', function (dets) {
    gsap.to(cursor, {
      x: dets.x,
      y: dets.y,
    });
  });
  Shery.makeMagnet('nav h4');
}
loader();
loco();

cursorAnimation();
