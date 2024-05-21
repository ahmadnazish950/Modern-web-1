const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function firstpageanimation() {
    var tl = gsap.timeline();

    tl.from("#nav", {
        y: '-10',
        opacity: 0,
        duration: 2,
        ease: Expo.easeInOut
    })
    tl.to(".boundingelem", {
        y: 0,
        ease: Expo.easeInOut,
        duration: 2,
        delay: -1,
        stagger: .2
    })
    tl.from("#footer", {
        y: 10,
        opacity: 0,
        duration: 1.5,
        delay: -1,
        ease: Expo.easeInOut
    })
}

var timeout;

function circlegoingchapta() {

    // define default scale value


    /*
     (i)--> samjhne ke  liye jaise ki agar tumhara previous value N tha x ya y mein ,
    to agar hum usko postive x ke side move kre to hoga kya maan krke chalo ki previous 10 tha aur samne 40 hai , 10 ko mano A and B ko mano 40 
    jab positive side move kiya to B-A hojayega x ka difference nikalega ka ketna 40 -10 = 30 ye nikla mera difference phir jab vo rukega ik jaagah pr mouse to uska previous value vapas 10 hojayega 10 ko constant number  mano. 

    (ii)--> Extra agar tum usko bhut speed mein move kroge to difference bhut zyada hi niklega dono values mein chahe vo positive ho ya negative ...
    (thats it i hope i will understand myself)*/

    // Q, WHAT IS CLAMP() IN GSAP?
    // --> Clamp usko kehte hai jo two numbers ko arange kre Min aur Max value mein Ex;((100,200)) agar koi user 210 likhna chahta hai to vo clamp uska 200 hi kahega kyun min aur max limit 100 se 200 ke bich mein hai naki 200 se zyada or 100 se kaam.


    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;

    window.addEventListener("mousemove", function (dets) {
        clearTimeout(timeout);

        xscale = gsap.utils.clamp(.8, 1.2, dets.clientX - xprev);
        yscale = gsap.utils.clamp(.8, 1.2, dets.clientY - yprev);

        xprev = dets.clientX;
        yprev = dets.clientY;

        circlemoving(xscale, yscale);

        timeout = setTimeout(function () {
            document.querySelector("#smallcircle").style.transform = `translate(${dets.clientX}px , ${dets.clientY}px) scale(1 , 1) `;
        }, 100);

    });
}

function circlemoving(xscale, yscale) {
    window.addEventListener("mousemove", function (dets) {
        document.querySelector("#smallcircle").style.transform = `translate(${dets.clientX}px , ${dets.clientY}px) scale(${xscale} , ${yscale}) `;
    })

}

circlemoving();
firstpageanimation();
circlegoingchapta();

/* --> teeno element ko select karo , iske baad teeno par ek mousemove lagao , jab mousemove ho to ye pata karo ki mouse kaha par hai , jiska mtlb hai 
mouse ki x and y position pata karo , ab mouse ki x y position ke badle us img ko show karo and us image ko move karo , move karte waqt rotate karo ,
and jaise jaise tez chale waise waise rotation bhi tez ho jaye */



document.querySelectorAll(".elem").forEach(function (elem) {

    var rotate = 0;
    var diffrot = 0;

    elem.addEventListener("mouseleave", function (dets) {

        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: Power3,
        });
    });

    elem.addEventListener("mousemove", function (dets) {
        var diff = dets.clientY - elem.getBoundingClientRect().top;

        diffrot = dets.clientX - rotate;
        rotate = dets.clientX;
        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: Power3,
            top: diff,
            left: dets.clientX,
            rotate: gsap.utils.clamp(-20, 20, diffrot * 0.6)
        });
    });
});

