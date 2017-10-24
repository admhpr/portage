(function () {
    if (_(".slider-next")) {
        const nextBtn = _('.slider-next');
        const prevBtn = _('.slider-previous');
        const slides = _('.slider-slides');
        const slidesNum = slides.children.length;

        let tracker = 0;

        const update = () => {
            const slideWidth = slides.clientWidth;
            const offset = -tracker * slideWidth;
            slides.setAttribute('style', `transform: translate(${offset}px)`)
        }


        nextBtn.addEventListener('click', () => {
            --tracker
            if (tracker < 0) tracker = slidesNum - 1;

            update()
        })

        prevBtn.addEventListener('click', () => {
            ++tracker
            if (tracker >= slidesNum) tracker = 0;
            update()
        })
    }


    // utils
    function _(selector) {
        return document.querySelector(selector)
    }
})();