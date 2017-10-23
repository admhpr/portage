"use strict";

/**
 * The DOMContentLoaded event is fired when the initial HTML 
 * document has been completely loaded and parsed, without waiting for stylesheets, images, 
 * and subframes to finish loading.
 * 
 * Ideal for Animation
 */

document.addEventListener("DOMContentLoaded", function () {
  // check if mobile, this is a helper function
  if (!isMobile.any()) {
    if (typeof ScrollMagic != "undefined") {
      // Init ScrollMagic
      var controller = new ScrollMagic.Controller({
        globalSceneOptions: {
          triggerHook: "onLeave"
        }
      });
      var right_1 = _(".right:first-child");
      var right_2 = _(".right:nth-of-type(2)");
      var right_3 = _(".right:nth-of-type(3)");
      var inner_rt = _(".right > .inner");
      var left_1 = _(".left:nth-of-type(1)");
      var left_2 = _(".left:nth-of-type(2)");
      var left_3 = _(".left:nth-of-type(3)");
      var inner_left = _(".left > .inner");
      var trees = _(".trees");
      _(".flex-container").forEach(function (el) {
        new ScrollMagic.Scene({
          triggerElement: el
        }).setPin(el).addTo(controller);
      });
      var introTl = new TimelineMax();
      var secondTl = new TimelineMax();
      var scramble = new TimelineMax();
      introTl.from(right_1, 3, {
        yPercent: 50,
        xPercent: 100,
        ease: Power4.easeOut
      }).from(inner_rt, 1, {
        opacity: 0,
        y: -205,
        scale: 0.98
      }, "1");
      new ScrollMagic.Scene({
        duration: "100%"
      }).setTween(introTl).triggerElement(_(".content")).addIndicators().addTo(controller);
    }
  }
}, false);

// a little module to animate the text
// inspired by https://codepen.io/rachsmith/pen/BNKJme/

var animatedText = function () {
  // NodeList of el with class of word
  var words = _(".word");
  // eventually a 2d array with arrays of letters
  var wordArr = [];
  var curWord = 0;

  //makes the first word visible
  if (typeof words !== "undefined" && words.length > 0) {
    var changeWord = function changeWord() {

      var cw = wordArr[curWord];
      var nw = curWord == words.length - 1 ? wordArr[0] : wordArr[curWord + 1];

      for (var i = 0; i < cw.length; i++) {
        animateLetterOut(cw, i);
      }

      for (var _i = 0; _i < nw.length; _i++) {
        nw[_i].className = "letter behind";
        nw[0].parentElement.style.opacity = 1;
        animateLetterIn(nw, _i);
      }

      curWord = curWord == wordArr.length - 1 ? 0 : curWord + 1;
    };

    // nice flowy effect


    var animateLetterOut = function animateLetterOut(cw, i) {
      setTimeout(function () {
        cw[i].className = "letter out";
      }, i * 80);
    };

    var animateLetterIn = function animateLetterIn(nw, i) {
      setTimeout(function () {
        nw[i].className = "letter in";
      }, 340 + i * 80);
    };

    var splitLetters = function splitLetters(word) {
      // stores the complete word
      var content = word.innerHTML;

      word.innerHTML = "";
      var letters = [];
      // makes an array of the letters
      for (var i = 0; i < content.length; i++) {
        var letter = document.createElement("span");
        letter.className = "letter";
        letter.innerHTML = content.charAt(i);
        word.appendChild(letter);
        letters.push(letter);
      }

      wordArr.push(letters);
    };

    words[curWord].style.opacity = 1;

    // call split letters on each word
    words.forEach(function (word) {
      splitLetters(word);
    });

    changeWord();
    setInterval(changeWord, 4000);
  }
}();
"use strict";

/********* utils and helpers*******/

var isMobile = {
  Android: function Android() {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function BlackBerry() {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function iOS() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function Opera() {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function Windows() {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function any() {
    for (var prop in this) {
      if (this[prop]()) {
        return true;
      }
      return false;
    }
  }
};

function _(selector) {
  return document.querySelectorAll(selector);
}

function openNav() {
  document.getElementById("sideNav").style.width = "250px";
}

function closeNav() {
  document.getElementById("sideNav").style.width = "0";
}
"use strict";

window.addEventListener("load", function () {

    /* Set the width of the side navigation to 250px */
    function openNav() {
        document.getElementById("mySidenav").style.width = "250px";
    }

    /* Set the width of the side navigation to 0 */
    function closeNav() {
        document.getElementById("mySidenav").style.width = "0";
    }
});
"use strict";

var package_page = function () {
    var canvas = document.getElementById("paths");
    if (canvas) {
        var Path = function Path() {
            var move = 10;
            for (var i = 0; i < 20; i++) {
                var path = {
                    x: Math.floor(Math.random() * canvas.width + 50),
                    y: canvas.height + 50,
                    speed: Math.floor(Math.random() * 4),
                    choice: function choice() {
                        var choice = Math.floor(Math.random() * 5);
                        if (choice === 0) {
                            this.x += move;
                        } else if (choice === 1) {
                            this.x -= move;
                        } else if (choice === 3) {
                            this.y += move;
                        } else {
                            this.y -= move;
                        }
                    }
                };

                paths.push(path);
            }

            function render() {
                paths.forEach(function (b) {
                    ctx.fillStyle = colours[Math.floor(Math.random() * 5)];
                    ctx.beginPath();
                    ctx.arc(b.x, b.y, 4, 0, 2 * Math.PI);
                    ctx.fill();
                });
            }

            function draw() {
                // ctx.clearRect(0, 0, canvas.width, canvas.height);

                render();
                paths.forEach(function (b) {
                    b.y -= b.speed;
                    b.choice();
                    if (b.y < -40) b.y = canvas.height + 50;
                });

                setTimeout(draw, 33);
            }

            draw();
        };

        var makeCanvas = function makeCanvas(canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            canvas.style.zIndex = "-1";
        };

        var getRandomColor = function getRandomColor() {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        };

        // animations


        makeCanvas(canvas);
        window.addEventListener('resize', function (event) {
            makeCanvas(canvas);
        });

        var ctx = canvas.getContext("2d");

        var centerCanvas = {
            x: Math.floor(canvas.width / 2),
            y: Math.floor(canvas.height / 2)
        };

        var colours = ['#b8c9ab', '#849e73', ' #4e5735', '#a88f79', '#6f4736', '#362421'];
        var paths = [];

        Path();

        var img = _(".img");
        var mediaE = _(".media:nth-child(even)");
        var mediaO = _(".media:nth-child(odd)");
        var tl = new TimelineLite();

        tl.from(mediaO, 1, {
            x: 105,
            autoAlpha: 0,
            ease: Power1.easein
        }).from(mediaE, 0.5, {
            x: -105,
            autoAlpha: 0,
            ease: Power1.easein
        }, '-=0.4').from(img, 0.5, {
            y: -105,
            autoAlpha: 0,
            ease: Power1.easein
        }, '-=0.25');
    }
}();
"use strict";

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

// Amount of stars relative to the screen size
var AMOUNT = 500;

//connections of stars
var dist_between_max = 45; // lower to make less connection, checked and recalibrated every resize
// span of connections
var CON_RADIUS = 90;
//rotation of star field
var ROTATION = 0.001;
var LINE_WIDTH = 0.6;

var canvas = document.getElementById("stars");

if (canvas) {

  // Star Config

  //constructor
  var Star = function Star() {
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
  };

  var resize = function resize() {
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
    };

    // where to join
    connectArea.destX = centerCanvas.x;
    connectArea.destY = centerCanvas.y * 0.1;

    stars.length = 0;

    var total = Math.floor(canvas.width * canvas.height / AMOUNT);
    var counter = 0;
    while (counter < AMOUNT) {
      stars.push(new Star());
      counter += 1;
    }

    var w = window.innerWidth;
    w < 800 ? dist_between_max = dist_between_max / 2.5 : dist_between_max = 50;
  };

  /**
   * Utility functions
   * 
   */

  var updateConnectArea = function updateConnectArea() {
    var distX = connectArea.destX - connectArea.x;
    var distY = connectArea.destY - connectArea.y;

    if (distX > 5 || distX < 5) {
      connectArea.x += Math.floor(distX / 20);
      connectArea.y += Math.floor(distY / 20);
    }
  };

  var connectStars = function connectStars() {
    for (var i = 0, star1; star1 = stars[i]; i++) {
      for (var j = i + 1, star2; star2 = stars[j]; j++) {
        var xDiff = star1.x - star2.x,
            yDiff = star1.y - star2.y,

        // dist from centerCanvas
        xCoreDiff = star1.x - connectArea.x,
            yCoreDiff = star1.y - connectArea.y;

        if (xDiff < dist_between_max && xDiff > -dist_between_max && yDiff < dist_between_max && yDiff > -dist_between_max && xCoreDiff < CON_RADIUS && xCoreDiff > -CON_RADIUS && yCoreDiff < CON_RADIUS && yCoreDiff > -CON_RADIUS) {
          ctx.beginPath();
          ctx.strokeStyle = "hsla(0,100%,100%,0.2)";
          ctx.moveTo(star1.x + 0.0, star1.y + 0.0);
          ctx.lineTo(star2.x + 0.0, star2.y + 0.0);
          ctx.stroke();
          ctx.closePath();
        }
      }
    }
  };

  var animateStars = function animateStars() {
    requestAnimationFrame(animateStars);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    updateConnectArea();
    for (var i = 0, star; star = stars[i]; i++) {
      star.update();
    }connectStars();
    for (var _i = 0, _star; _star = stars[_i]; _i++) {
      _star.draw();
    }
  };

  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  var ctx = canvas.getContext("2d");
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
  };

  /**
   * Let's make some stars
   * 
   */

  // stars holder
  var stars = [];

  resize();
  animateStars();

  document.body.addEventListener("mousemove", function (e) {
    // e.touches --> https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent/touches
    // e.touches[0] --> https://developer.mozilla.org/en-US/docs/Web/API/Touch/pageX

    connectArea.destX = e.clientX || e.touches && e.touches[0].pageX;
    connectArea.destY = e.clientY || e.touches && e.touches[0].pageY;
  });

  document.body.addEventListener("mouseleave", function (e) {
    connectArea.destX = centerCanvas.x;
    connectArea.destY = centerCanvas.y;
  });
  window.addEventListener("resize", resize);
}