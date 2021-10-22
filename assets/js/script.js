function Slide(index, title, background, link) {
    this.title = title;
    this.background = background;
    this.link = link;
    this.id = "slide-" + index;
}

const Slider = {
    current: 0,
    isVisible: true,
    slides: [],
    initSlider: function (slides) {
        let index = 0;
        for (let slide of slides) {
            this.slides.push(new Slide(index, slide.title, slide.background, slide.link));
            index++;
        }
        this.buildSlider();
    },
    buildSlider: function () {
        let sliderHTML = "";
        for (let slide of this.slides) {
            sliderHTML +=
                `<div id='${slide.id}' class='singleSlide'
            style='background-image:url(${slide.background});'>
            <div class='slideOverlay'>
            <h2>${slide.title}</h2>
            <a class='link' href='${slide.link}' target='_blank'>Open</a></div></div>`;
        }
        for (let i = 0; i < this.slides.length; i++) {
            let btn = document.createElement('button');
            btn.className = 'btn';
            btn.id = 'button-' + this.id;
            btn.innerHTML = i;
            document.querySelector(".slider-indexes").appendChild(btn);
            btn.addEventListener("click", (event) => {
                index = Number(event.target.innerHTML);
                while (this.current !== index) {
                    this.nextSlide();
                };
            });
        }
        document.getElementById("slider").innerHTML = sliderHTML;
        document.getElementById("slide-" + this.current).style.left = 0;
    },
    prevSlide: function () {
        console.log("I'm not running");
        let next;
        if (this.current === 0) {
            next = this.slides.length - 1;
        } else {
            next = this.current - 1;
        }

        document.getElementById("slide-" + next).style.left = "-100%";
        document.getElementById("slide-" + this.current).style.left = 0;

        document.getElementById("slide-" + next).setAttribute("class", "singleSlide slideInLeft");
        document.getElementById("slide-" + this.current).setAttribute("class", "singleSlide slideOutRight");

        this.current = next;
    },
    nextSlide: function () {
        console.log("I'm running");
        let next;
        if (this.current === (this.slides.length - 1)) {
            next = 0;
        } else {
            next = this.current + 1;
        }

        document.getElementById("slide-" + next).style.left = "100%";
        document.getElementById("slide-" + this.current).style.left = 0;

        document.getElementById("slide-" + next).setAttribute("class", "singleSlide slideInRight");
        document.getElementById("slide-" + this.current).setAttribute("class", "singleSlide slideOutLeft");

        this.current = next;
    }
}

const nextBtn = document.querySelector(".nextBtn");
const prevBtn = document.querySelector(".prevBtn");

nextBtn.addEventListener("click", function () {
    Slider.nextSlide();
});
prevBtn.addEventListener("click", function () {
    Slider.prevSlide();
});
