(function () {
    var canvas = document.getElementById("snow");
    if (canvas) {
        makeCanvas(canvas);
        window.addEventListener('resize', function (event) {
            makeCanvas(canvas);
        });

        var ctx = canvas.getContext("2d");

        var embers = [];

        function Ember() {
            for (var i = 0; i < 80; i++) {
                var ember = {
                    x: Math.floor(Math.random() * canvas.width + 50),
                    y: 0,
                    speed: Math.floor(Math.random() * 11)
                };

                embers.push(ember)
            }


            function render() {
                embers.forEach(function (b) {
                    ctx.fillStyle = '#F4F4F4';;
                    ctx.beginPath()
                    ctx.arc(b.x, b.y, 4, 0, 2 * Math.PI)
                    ctx.fill()
                })
            }

            function draw() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                render()
                embers.forEach(function (b) {
                    b.y += b.speed
                    if (b.y > canvas.height) b.y = 0;
                })

                setTimeout(draw, 23)
            }

            draw();

        }

        Ember()

        function getRandomColor() {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() *
                    16)];
            }
            return color;
        }

        function makeCanvas(canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            canvas.style.zIndex = "-1";
        }

        function getRandomColor() {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() *
                    16)];
            }
            return color;
        }


        // animations
        var img = _(".img");
        var mediaE = _(".media:nth-child(even)");
        var mediaO = _(".media:nth-child(odd)");
        var tl = new TimelineLite();

        tl
            .from(mediaO, 1, {
                x: 105,
                autoAlpha: 0,
                ease: Power1.easein
            })
            .from(mediaE, 0.5, {
                x: -105,
                autoAlpha: 0,
                ease: Power1.easein
            }, '-=0.4')
            .from(img, 0.5, {
                y: -105,
                autoAlpha: 0,
                ease: Power1.easein
            }, '-=0.25');
    }
})();