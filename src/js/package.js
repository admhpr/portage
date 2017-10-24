(function () {
    var canvas = document.getElementById("paths");
    if (canvas) {
        makeCanvas(canvas);
        window.addEventListener('resize', function (event) {
            makeCanvas(canvas);
        });

        var ctx = canvas.getContext("2d");


        var centerCanvas = {
            x: Math.floor(canvas.width /
                2),
            y: Math.floor(canvas.height / 2)
        };

        var colours = ['#b8c9ab', '#849e73', ' #4e5735', '#a88f79', '#6f4736', '#362421'];
        var paths = [];

        function Path() {
            var move = 10
            for (var i = 0; i < 20; i++) {
                var path = {
                    x: Math.floor(Math.random() * canvas.width + 50),
                    y: canvas.height + 50,
                    speed: Math.floor(Math.random() * 4),
                    choice: function () {
                        var choice = Math.floor(Math.random() * 5);
                        if (choice === 0) {
                            this.x += move
                        } else if (choice === 1) {
                            this.x -= move
                        } else if (choice === 3) {
                            this.y += move
                        } else {
                            this.y -= move
                        }
                    }
                };

                paths.push(path)
            }


            function render() {
                paths.forEach(function (b) {
                    ctx.fillStyle = colours[Math.floor(Math.random() * 5)];
                    ctx.beginPath()
                    ctx.arc(b.x, b.y, 4, 0, 2 * Math.PI)
                    ctx.fill()
                })

            }

            function draw() {
                // ctx.clearRect(0, 0, canvas.width, canvas.height);

                render()
                paths.forEach(function (b) {
                    b.y -= b.speed
                    b.choice()
                    if (b.y < -40) b.y = canvas.height + 50;
                })

                setTimeout(draw, 33)
            }

            draw();

        }

        Path()

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