document.addEventListener('DOMContentLoaded', function () {

        // Init ScrollMagic
        var controller = new ScrollMagic.Controller({
            globalSceneOptions: {
                triggerHook: 'onLeave'
            }
        });

        var wh = wh = window.innerHeight;
        var right_1 = _(".right:first-child")
        var right_2 = _(".right:nth-of-type(2)")
        var right_3 = _(".right:nth-of-type(3)")
        var inner_rt = _(".right > .inner")

        console.log(inner_rt)
        var left_1 = _(".left:nth-of-type(1)")
        var left_2 = _(".left:nth-of-type(2)")
        var left_3 = _(".left:nth-of-type(3)")
        var inner_left = _(".left > .inner")

        var trees = _(".trees")
        // var mediaE = _(".media:nth-child(even)");
        // var mediaO = _(".media:nth-child(odd)");

        _(".flex-container").forEach(function (el) {
            new ScrollMagic.Scene({
                    triggerElement: el,
                })
                .setPin(el)
                .addTo(controller)
        })


        var introTl = new TimelineMax();
        var secondTl = new TimelineMax();

        introTl
            .from(right_1, 1, {
                yPercent: 50,
                xPercent: 100,
                ease: Power4.easeOut
            })
            .from(inner_rt, 1, {
                opacity: 0,
                y: -205,
                scale: 0.98
            }, '1')

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
            })
            .setTween(introTl)
            .triggerElement(_(".content"))
            .addIndicators()
            .addTo(controller)

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
    },
    false);