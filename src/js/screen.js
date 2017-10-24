(function () {

    'use strict';
    if (document.querySelector('.wolf')) {
        var element, string, length;

        element = document.querySelector('.wolf');
        element.addEventListener("mouseover", () => {
            if (typeof tracker == "undefined") {
                var tracker = 0;
            }

            if (tracker === 0) {
                string = element.innerText;
                length = string.length;

                function timer(delay, repetitions) {
                    var n, i;

                    n = 0;
                    i = window.setInterval(function () {
                        element.innerText = string.substring(0, n);
                        if (n++ === repetitions) {
                            window.clearInterval(i);
                        }
                    }, delay);
                }
                timer(50, length);
            }

            tracker += 1;
        })
    }

})();