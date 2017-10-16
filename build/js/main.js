'use strict';

document.addEventListener('DOMContentLoaded', function () {

        // Init ScrollMagic
        var controller = new ScrollMagic.Controller({
                globalSceneOptions: {
                        triggerHook: 'onLeave'
                }
        });

        var wh = wh = window.innerHeight;
        var right_1 = _(".right:first-child");
        var right_2 = _(".right:nth-of-type(2)");
        var right_3 = _(".right:nth-of-type(3)");
        var inner_rt = _(".right > .inner");

        console.log(inner_rt);
        var left_1 = _(".left:nth-of-type(1)");
        var left_2 = _(".left:nth-of-type(2)");
        var left_3 = _(".left:nth-of-type(3)");
        var inner_left = _(".left > .inner");

        var trees = _(".trees");
        // var mediaE = _(".media:nth-child(even)");
        // var mediaO = _(".media:nth-child(odd)");

        _(".flex-container").forEach(function (el) {
                new ScrollMagic.Scene({
                        triggerElement: el
                }).setPin(el).addTo(controller);
        });

        var introTl = new TimelineMax();
        var secondTl = new TimelineMax();

        introTl.from(right_1, 1, {
                yPercent: 50,
                xPercent: 100,
                ease: Power4.easeOut
        }).from(inner_rt, 1, {
                opacity: 0,
                y: -205,
                scale: 0.98
        }, '1');

        // secondTl
        //     .from(left_2, 1, {
        //         x: -250,
        //         ease: Power4.easeOut
        //     })
        //     .from(right_2, 1, {
        //         yPercent: 100,
        //         xPercent: 50,
        //         ease: Power4.easeOut
        //     })


        new ScrollMagic.Scene({
                duration: '100%'
        }).setTween(introTl).triggerElement(_(".content")).addIndicators().addTo(controller);

        // new ScrollMagic.Scene({
        //         triggerElement: _(".right"),
        //         duration: '80%'
        //     })
        //     .setTween(secondTl)
        //     .addTo(controller);

        // var scene1 = new ScrollMagic.Scene({
        //     triggerElement: right_odd,
        // });

        // scene1.setTween(TweenMax.from(right_odd, 1, {
        //         y: '-105',
        //         autoAlpha: 0,
        //         ease: Power1.easein
        //     }))
        //     .addIndicators()
        //     .addTo(controller);


        // var tl = new TimelineLite();

        // tl
        //     .from(mediaO, 0.5, {
        //         x: 105,
        //         autoAlpha: 0,
        //         ease: Power1.easein
        //     })
        //     .from(mediaE, 0.5, {
        //         x: -105,
        //         autoAlpha: 0,
        //         ease: Power1.easein
        //     }, '-=0.4')
        //     .from(img, 0.5, {
        //         y: -105,
        //         autoAlpha: 0,
        //         ease: Power1.easein
        //     }, '-=0.25');

        /********* utils *******/
        function _(selector) {
                return document.querySelectorAll(selector);
        }
}, false);
// var ParallaxManager, ParallaxPart;

// ParallaxPart = (function() {
//   function ParallaxPart(el) {
//     this.el = el;
//     this.speed = parseFloat(this.el.getAttribute("data-parallax-speed"));
//     this.maxScroll = parseInt(this.el.getAttribute("data-max-scroll"));
//   }

//   ParallaxPart.prototype.update = function(scrollY) {
//     if (scrollY > this.maxScroll) {
//       return;
//     }
//     var offset = -(scrollY * this.speed);
//     this.setYTransform(offset);
//   };

//   ParallaxPart.prototype.setYTransform = function(val) {
//     this.el.style.webkitTransform = "translate3d(0, " + val + "px, 0)";
//     this.el.style.MozTransform = "translate3d(0, " + val + "px, 0)";
//     this.el.style.OTransform = "translate3d(0, " + val + "px, 0)";
//     this.el.style.transform = "translate3d(0, " + val + "px, 0)";
//     this.el.style.msTransform = "translateY(" + val + "px)";
//   };

//   return ParallaxPart;
// })();

// ParallaxManager = (function() {
//   ParallaxManager.prototype.parts = [];

//   function ParallaxManager(elements) {
//     if (Array.isArray(elements) && elements.length) {
//       this.elements = elements;
//     }

//     if (typeof elements === "object" && elements.item) {
//       this.elements = Array.prototype.slice.call(elements);
//     } else if (typeof elements === "string") {
//       this.elements = document.querySelectorAll(elements);
//       if (this.elements.length === 0) {
//         throw new Error("Parallax: No elements found");
//       }
//       this.elements = Array.prototype.slice.call(this.elements);
//     } else {
//       throw new Error(
//         "Parallax: Element variable is not a querySelector string, Array, or NodeList"
//       );
//     }
//     for (var i in this.elements) {
//       this.parts.push(new ParallaxPart(this.elements[i]));
//     }
//     window.addEventListener("scroll", this.onScroll.bind(this));
//   }

//   ParallaxManager.prototype.onScroll = function() {
//     window.requestAnimationFrame(this.scrollHandler.bind(this));
//   };

//   ParallaxManager.prototype.scrollHandler = function() {
//     var scrollY = Math.max(window.pageYOffset, 0);
//     for (var i in this.parts) {
//       this.parts[i].update(scrollY);
//     }
//   };

//   return ParallaxManager;
// })();

// new ParallaxManager(".parallax-layer");
"use strict";
'use strict';

/**
 * Stars.js
 * @author Adam Harpur  
 * 10/15/2017
 * inspired by https://codepen.io/mi2oon/pen/Egmbxj
 *             http://blog.lunarlogic.io/auroral/
 * @license MIT.
 */

var dblPI = 2 * Math.PI;

/**
 * Star Field Config
 * 
 */

var w = window.innerWidth;
console.log(w);
// Amount of stars relative to the screen size
var AMOUNT = 600;

//connections of stars
var dist_between_max = 66; // lower to make less connection, checked and recalibrated every resize
// span of connections
var CON_RADIUS = 100;
//rotation of star field
var ROTATION = 0.001;
var LINE_WIDTH = 0.6;

var canvas = document.getElementById('stars');

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

var ctx = canvas.getContext('2d');
ctx.lineWidth = LINE_WIDTH;

var boundry = {
    top: -10,
    left: -10,
    right: canvas.width + 10,
    bottom: canvas.height + 10
};

var centerCanvas = {
    x: Math.floor(canvas.width / 2),
    y: Math.floor(canvas.height / 2)
};

var connectArea = {
    destX: 0,
    destY: 0,
    x: centerCanvas.x,
    y: centerCanvas.y

    /**
     * Let's make some stars
     * 
     */

    // stars holder
};var stars = [];

// Star Config

//constructor
function Star() {
    var _this = this;

    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 1.2;

    this.update = function () {
        // make sure it's within bounds
        if (_this.y > boundry.bottom) _this.y = boundry.top;
        if (_this.y < boundry.top) _this.y = boundry.bottom;

        // http://stackoverflow.com/a/15109215/3137109
        _this.x = Math.cos(ROTATION) * (_this.x - centerCanvas.x) - Math.sin(ROTATION) * (_this.y - centerCanvas.y) + centerCanvas.x;
        _this.y = Math.sin(ROTATION) * (_this.x - centerCanvas.x) + Math.cos(ROTATION) * (_this.y - centerCanvas.y) + centerCanvas.y;
    };

    this.draw = function () {

        ctx.beginPath();
        ctx.fillStyle = "#fff";
        //void ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
        ctx.arc(_this.x, _this.y, _this.radius, 0, dblPI, false);
        ctx.fill();
    };
}

function resize() {

    //called on viewport resize

    // recalculate width and height
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // reset boundries
    boundry.right = canvas.width - 1;
    boundry.bottom = canvas.height - 1;

    centerCanvas = {
        x: Math.floor(canvas.width / 2),
        y: Math.floor(canvas.height / 2)

        // where to join
    };connectArea.destX = centerCanvas.x;
    connectArea.destY = centerCanvas.y * 0.1;

    stars.length = 0;

    var total = Math.floor(canvas.width * canvas.height / AMOUNT);
    var counter = 0;
    while (counter < AMOUNT) {
        stars.push(new Star());
        counter += 1;
    }

    w = window.innerWidth;
    w < 600 ? dist_between_max = dist_between_max / 3 : dist_between_max = 66;
}

resize();
animateStars();

/**
 * Utility functions
 * 
 */

function updateConnectArea() {
    var distX = connectArea.destX - connectArea.x;
    var distY = connectArea.destY - connectArea.y;

    if (distX > 5 || distX < 5) {
        connectArea.x += Math.floor(distX / 20);
        connectArea.y += Math.floor(distY / 20);
    }
}

function connectStars() {
    for (var i = 0, star1; star1 = stars[i]; i++) {
        for (var j = i + 1, star2; star2 = stars[j]; j++) {

            var xDiff = star1.x - star2.x,
                yDiff = star1.y - star2.y,


            // dist from centerCanvas
            xCoreDiff = star1.x - connectArea.x,
                yCoreDiff = star1.y - connectArea.y;

            if (xDiff < dist_between_max && xDiff > -dist_between_max && yDiff < dist_between_max && yDiff > -dist_between_max && xCoreDiff < CON_RADIUS && xCoreDiff > -CON_RADIUS && yCoreDiff < CON_RADIUS && yCoreDiff > -CON_RADIUS) {
                ctx.beginPath();
                ctx.strokeStyle = 'hsla(0,100%,100%,0.2)';
                ctx.moveTo(star1.x + 0.0, star1.y + 0.0);
                ctx.lineTo(star2.x + 0.0, star2.y + 0.0);
                ctx.stroke();
                ctx.closePath();
            }
        }
    }
}

function animateStars() {
    requestAnimationFrame(animateStars);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    updateConnectArea();
    for (var i = 0, star; star = stars[i]; i++) {
        star.update();
    }connectStars();
    for (var _i = 0, _star; _star = stars[_i]; _i++) {
        _star.draw();
    }
}

document.body.addEventListener('mousemove', function (e) {

    // e.touches --> https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent/touches
    // e.touches[0] --> https://developer.mozilla.org/en-US/docs/Web/API/Touch/pageX

    connectArea.destX = e.clientX || e.touches && e.touches[0].pageX;
    connectArea.destY = e.clientY || e.touches && e.touches[0].pageY;
});

document.body.addEventListener('mouseleave', function (e) {
    connectArea.destX = centerCanvas.x;
    connectArea.destY = centerCanvas.y;
});
window.addEventListener('resize', resize);