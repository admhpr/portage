/**
 * The DOMContentLoaded event is fired when the initial HTML 
 * document has been completely loaded and parsed, without waiting for stylesheets, images, 
 * and subframes to finish loading.
 * 
 * Ideal for Animation
 */

document.addEventListener(
  "DOMContentLoaded",
  () => {
    // check if mobile, this is a helper function
    if (!isMobile.any()) {
      if (typeof ScrollMagic != "undefined") {
        // Init ScrollMagic
        const controller = new ScrollMagic.Controller({
          globalSceneOptions: {
            triggerHook: "onLeave"
          }
        });
        const right_1 = _(".right:first-child");
        const right_2 = _(".right:nth-of-type(2)");
        const right_3 = _(".right:nth-of-type(3)");
        const inner_rt = _(".right > .inner");
        const left_1 = _(".left:nth-of-type(1)");
        const left_2 = _(".left:nth-of-type(2)");
        const left_3 = _(".left:nth-of-type(3)");
        const inner_left = _(".left > .inner");
        const trees = _(".trees");
        _(".flex-container").forEach(el => {
          new ScrollMagic.Scene({
              triggerElement: el
            })
            .setPin(el)
            .addTo(controller);
        });
        var introTl = new TimelineMax();
        var secondTl = new TimelineMax();
        var scramble = new TimelineMax();
        introTl
          .from(right_1, 3, {
            yPercent: 50,
            xPercent: 100,
            ease: Power4.easeOut
          })
          .from(inner_rt, 1, {
            opacity: 0,
            y: -205,
            scale: 0.98
          }, "1");
        new ScrollMagic.Scene({
            duration: "100%"
          })
          .setTween(introTl)
          .triggerElement(_(".content"))
          .addIndicators()
          .addTo(controller);
      }
    }
  },
  false
);

// a little module to animate the text
// inspired by https://codepen.io/rachsmith/pen/BNKJme/

var animatedText = (function () {
  // NodeList of el with class of word
  const words = _(".word");
  // eventually a 2d array with arrays of letters
  const wordArr = [];
  let curWord = 0;

  //makes the first word visible
  if (typeof words !== "undefined" && words.length > 0) {

    words[curWord].style.opacity = 1;



    // call split letters on each word
    words.forEach(word => {
      splitLetters(word);
    });


    function changeWord() {

      let cw = wordArr[curWord];
      let nw = curWord == words.length - 1 ? wordArr[0] : wordArr[curWord + 1];

      for (let i = 0; i < cw.length; i++) {
        animateLetterOut(cw, i);
      }

      for (let i = 0; i < nw.length; i++) {
        nw[i].className = "letter behind";
        nw[0].parentElement.style.opacity = 1;
        animateLetterIn(nw, i);
      }

      curWord = curWord == wordArr.length - 1 ? 0 : curWord + 1;
    }

    // nice flowy effect
    function animateLetterOut(cw, i) {
      setTimeout(function () {
        cw[i].className = "letter out";
      }, i * 80);
    }

    function animateLetterIn(nw, i) {
      setTimeout(function () {
        nw[i].className = "letter in";
      }, 340 + i * 80);
    }

    function splitLetters(word) {
      // stores the complete word
      let content = word.innerHTML;

      word.innerHTML = "";
      const letters = [];
      // makes an array of the letters
      for (var i = 0; i < content.length; i++) {
        var letter = document.createElement("span");
        letter.className = "letter";
        letter.innerHTML = content.charAt(i);
        word.appendChild(letter);
        letters.push(letter);
      }

      wordArr.push(letters);
    }

    changeWord();
    setInterval(changeWord, 4000);
  }

})();