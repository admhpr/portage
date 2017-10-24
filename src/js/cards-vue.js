if (_("#app").length > 0) {
    class Post {
        constructor(title, link, price, img) {
            this.title = title;
            this.link = link;
            this.price = price;
            this.img = img;
        }
    }
    const app = new Vue({
        el: "#app",
        data: {
            keyword: "",
            postList: [
                new Post(
                    "Camp Stove",
                    "https://vuejs.org/",
                    "20.00",
                    "../img/gear/stove.jpg"
                ),
                new Post(
                    "Water Filter",
                    "https://facebook.github.io/react/",
                    "5.00",
                    "../img/gear/filter.jpg"
                ),
                new Post(
                    "Hatchet",
                    "https://angularjs.org/",
                    "10.00",
                    "../img/gear/hatchet.jpg"
                ),
                new Post(
                    "Saw",
                    "http://emberjs.com/",
                    "10.00",
                    "../img/gear/saw.jpg"
                ),
                new Post(
                    "Tent",
                    "https://www.meteor.com/",
                    "15.00",
                    "../img/gear/tent.jpg"
                ),
                new Post(
                    "Compass",
                    "http://aurelia.io/",
                    "1.00",
                    "../img/gear/hatchet.jpg"
                ),
                new Post(
                    "Sleeping Bag",
                    "https://nodejs.org/en/",
                    "40.00",
                    "../img/gear/sleeping.jpg"
                ),
                new Post(
                    "Flashlight",
                    "https://pusher.com/",
                    "5.00",
                    "../img/gear/flashlight.jpg"
                ),
                new Post(
                    "Kevlar Canoe",
                    "http://feathersjs.com/",
                    "200.00",
                    "../img/gear/canoe.jpg"
                )
            ]
        },
        computed: {
            filteredList() {
                return this.postList.filter((post) => {
                    return post.title.toLowerCase().includes(this.keyword);
                });
            }
        }
    });

}