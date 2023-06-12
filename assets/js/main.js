let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');


window.onscroll = () => {
    console.log(window.scrollY);
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            })
        }
    })

    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
}


let circularProgressList = document.querySelectorAll('.circular-progress');

let progressEndValueList = [95, 80, 65, 65, 55, 50, 65, 65, 70, 65, 70, 55, 50];

let speed = 25;

function animateProgress() {
    circularProgressList.forEach((circularProgress, index) => {
        let progressEndValue = progressEndValueList[index];
        let progressStartValue = 0;

        let progressAnimation = setInterval(() => {
            progressStartValue++;
            console.log(progressStartValue);
            circularProgress.style.background = `conic-gradient(var(--main-color) ${progressStartValue * 3.6}deg, #fff 0deg)`;
            if (progressStartValue === progressEndValue) {
                clearInterval(progressAnimation);
            }
        }, speed);
    });
}

const skillsSection = document.querySelector('#techno');

// Créer une instance de l'Intersection Observer
const observerSkills = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Si la section des compétences est visible dans la fenêtre visible, déclencher l'animation avec un delai d'1.2sec
            setTimeout(() => {
                animateProgress();
            }, 700);
            // Réobserver la section des compétences pour relancer l'animation à chaque retour
            observerSkills.observe(entry.target);
        }
    });
});

// Observer la section des compétences
observerSkills.observe(skillsSection);


let button = document.querySelector("#btn-read-more");
let container = document.querySelector('.read-more');
button.addEventListener("click", () => {
    container.classList.toggle('read-more');
    button.innerHTML = (button.innerHTML == "Lire la suite") ? "Afficher moins" : "Lire la suite";
});
