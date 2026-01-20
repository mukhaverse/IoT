
gsap.registerPlugin(ScrollTrigger)

document.addEventListener('DOMContentLoaded', function(){

const wrapper = document.querySelector('.wrapper-bts');

const cards = [
    { id: "#card-1", endTranslateX: -2000, rotate: 45},
    { id: "#card-2", endTranslateX: -1000, rotate: -30},
    { id: "#card-3", endTranslateX: -2000, rotate: 45},
    { id: "#card-4", endTranslateX: -1500, rotate: -30},
]

const wrapperWidth = wrapper.scrollWidth;
const viewportWidth = window.innerWidth;
const scrollDistance = wrapperWidth - viewportWidth;


ScrollTrigger.create({

    trigger: ".container",
    start: "top top",
    end: () => `+=${scrollDistance * 3 + 1500}`,
    scrub: 1,
    pin: true,
     animation: gsap.to(".wrapper-bts", {
            x: () => -scrollDistance,
            ease: "none"
            })
})



})