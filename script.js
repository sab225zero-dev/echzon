/*=========================================================
ECHZON
Landing Page
Version 1.0
=========================================================*/

"use strict";

const preloader = document.querySelector(".preloader");
const header = document.querySelector(".header");

const menuButton = document.querySelector(".menu-btn");



const navigation = document.querySelector(".navbar");

const faqItems = document.querySelectorAll(".faq-item");

const revealElements = document.querySelectorAll(".reveal");

const timelineItems = document.querySelectorAll(".timeline-item");
window.addEventListener("scroll",()=>{

if(window.scrollY>40){

header.classList.add("scrolled");

}else{

header.classList.remove("scrolled");

}

});

menuButton?.addEventListener("click", () => {

    console.log("CLICK");

    navigation.classList.toggle("active");

    console.log(navigation.classList.contains("active"));

    menuButton.classList.toggle("active");

});


faqItems.forEach(item=>{

const question=item.querySelector(".faq-question");

const answer=item.querySelector(".faq-answer");

question.addEventListener("click",()=>{

faqItems.forEach(card=>{

if(card!==item){

card.classList.remove("active");

card.querySelector(".faq-answer").style.maxHeight=null;

}

});

item.classList.toggle("active");

if(item.classList.contains("active")){

answer.style.maxHeight=answer.scrollHeight+"px";

}else{

answer.style.maxHeight=null;

}

});

});
if (window.innerWidth <= 768) {
    document.querySelectorAll(
        ".reveal, .reveal-item, .story-section, .timeline-item"
    ).forEach(el => {
        el.classList.add("active");
        el.classList.add("visible");
    });
}
const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("active");

}

});

},{

threshold:.15

});

revealElements.forEach(el=>observer.observe(el));

timelineItems.forEach(el=>observer.observe(el));




window.addEventListener("load",()=>{

document.body.classList.add("loaded");

});

const numbers=document.querySelectorAll(".stat-card h2");

const counterObserver=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(!entry.isIntersecting) return;

const element=entry.target;

const target=parseInt(element.dataset.target);

let current=0;

const step=Math.ceil(target/80);

const timer=setInterval(()=>{

current+=step;

if(current>=target){

current=target;

clearInterval(timer);

}

element.textContent=current+"+";

},20);

counterObserver.unobserve(element);

});

});

numbers.forEach(item=>{

counterObserver.observe(item);});

const progress = document.createElement("div");

progress.className = "scroll-progress";

document.body.appendChild(progress);

window.addEventListener("scroll", () => {

    const height =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const value = (window.scrollY / height) * 100;

    progress.style.width = value + "%";

});
const floating = document.querySelectorAll(".floating-card");

setInterval(()=>{

floating.forEach(card=>{

card.style.animationDuration=

4+Math.random()*2+"s";

});

},6000);




window.addEventListener("load",()=>{

setTimeout(()=>{

preloader.classList.add("hide");

},1800);

});



/*=========================================
MAGNETIC BUTTONS
=========================================*/

document.querySelectorAll(
".main-btn,.secondary-btn"
).forEach(button=>{

button.addEventListener("mousemove",(e)=>{

const rect=button.getBoundingClientRect();

const x=e.clientX-rect.left-rect.width/2;

const y=e.clientY-rect.top-rect.height/2;

button.style.transform=

`translate(${x*.18}px,${y*.18}px)`;

});

button.addEventListener("mouseleave",()=>{

button.style.transform="translate(0,0)";

});

});

/*=========================================
BUTTON RIPPLE
=========================================*/

document.querySelectorAll(
".main-btn,.secondary-btn"
).forEach(button=>{

button.addEventListener("click",(e)=>{

const ripple = document.createElement("span");

const rect=button.getBoundingClientRect();

const size=Math.max(rect.width,rect.height);

ripple.style.width=size+"px";

ripple.style.height=size+"px";

ripple.style.left=

e.clientX-rect.left-size/2+"px";

ripple.style.top=

e.clientY-rect.top-size/2+"px";

ripple.className="ripple";

button.appendChild(ripple);

setTimeout(()=>{

ripple.remove();

},600);

});

});

/*=========================================
SPOTLIGHT
=========================================*/




/*=========================================
SCROLL STORY
=========================================*/

const storySections = document.querySelectorAll(".story-section");

const storyObserver=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("active");

}

});

},{
threshold:.25
});

storySections.forEach(section=>{

storyObserver.observe(section);

});

/*=========================================
 PARTICLES
=========================================*/
const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resize();

window.addEventListener("resize",resize);

const particles=[];

const PARTICLE_COUNT=70;

class Particle{

constructor(){

this.reset();

this.y = Math.random() * canvas.height;

}

reset(){

this.x = Math.random() * canvas.width;

this.y = canvas.height + Math.random() * 100;

this.size=Math.random()*2+1;

this.speed=Math.random()*0.5+0.2;

this.vx=(Math.random()-.5)*0.3;

}

update(){

this.y-=this.speed;

this.x+=this.vx;

if(this.y<-20){

this.reset();

}

}

draw(){

ctx.beginPath();

ctx.arc(

this.x,

this.y,

this.size,

0,

Math.PI*2

);

ctx.fillStyle="rgba(47,214,255,.6)";

ctx.fill();

}

}

for(let i=0;i<PARTICLE_COUNT;i++){

particles.push(new Particle());

}

function connectParticles(){

for(let a=0;a<particles.length;a++){

for(let b=a+1;b<particles.length;b++){

const dx=particles[a].x-particles[b].x;

const dy=particles[a].y-particles[b].y;

const distance=Math.sqrt(dx*dx+dy*dy);

if(distance<130){

ctx.beginPath();

ctx.moveTo(

particles[a].x,

particles[a].y

);

ctx.lineTo(

particles[b].x,

particles[b].y

);

ctx.strokeStyle=

`rgba(47,214,255,${
1-distance/130
})`;

ctx.lineWidth=.4;

ctx.stroke();

}

}

}

}

function animate(){

ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
);

particles.forEach(p=>{

p.update();

p.draw();

});

connectParticles();

requestAnimationFrame(

animate

);

}

animate();

/*=========================================
STAGGER REVEAL
=========================================*/

const revealItems = document.querySelectorAll(".reveal-item");

const revealObserver=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

const items=entry.target.parentElement.querySelectorAll(".reveal-item");

items.forEach((item,index)=>{

setTimeout(()=>{

item.classList.add("visible");

},index*120);

});

}

});

},{
threshold:.2
});

revealItems.forEach(item=>{

revealObserver.observe(item);

});

/*=========================================
SMART CTA
=========================================*/

let scrollTimer;

const cta = document.querySelector(".cta-button");

window.addEventListener("scroll",()=>{

cta.classList.remove("pulse");

clearTimeout(scrollTimer);

scrollTimer=setTimeout(()=>{

cta.classList.add("pulse");

},2000);

});
// --- تفعيل مشغلات الصوت المخصصة ---
document.querySelectorAll('.custom-player').forEach(player => {
    const playBtn = player.querySelector('.play-pause-btn');
    const icon = playBtn.querySelector('i');
    const statusText = player.querySelector('.player-status');
    const progressBar = player.querySelector('.progress-bar');
    const progressContainer = player.querySelector('.progress-bar-container');
    const audio = player.parentElement.querySelector('.audio-element');

    playBtn.addEventListener('click', () => {
        // إيقاف أي صوت آخر يعمل حالياً
        document.querySelectorAll('.audio-element').forEach(otherAudio => {
            if (otherAudio !== audio) {
                otherAudio.pause();
                const otherPlayer = otherAudio.parentElement.querySelector('.custom-player');
                otherPlayer.querySelector('.play-pause-btn i').className = 'fas fa-play';
                otherPlayer.querySelector('.player-status').textContent = 'تشغيل العينة';
            }
        });

        if (audio.paused) {
            audio.play();
            icon.className = 'fas fa-pause';
            statusText.textContent = 'جاري الاستماع...';
        } else {
            audio.pause();
            icon.className = 'fas fa-play';
            statusText.textContent = 'إيقاف مؤقت';
        }
    });

    // تحديث شريط التقدم أثناء التشغيل
    audio.addEventListener('timeupdate', () => {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = `${progressPercent}%`;
    });

    // إعادة الزر لوضعه الطبيعي عند انتهاء الصوت
    audio.addEventListener('ended', () => {
        icon.className = 'fas fa-play';
        statusText.textContent = 'تشغيل العينة';
        progressBar.style.width = '0%';
    });

    // الضغط على شريط التقدم للانتقال في الصوت
    progressContainer.addEventListener('click', (e) => {
        const width = progressContainer.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;
        audio.currentTime = (clickX / width) * duration;
    });
});
