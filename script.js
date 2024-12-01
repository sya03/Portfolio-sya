const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

function mobileNavToggle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('fa-bars');
    mobileNavToggleBtn.classList.toggle('fa-xmark');
}

if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToggle);
}

/**
 * Hide mobile nav on same-page/hash links
 */
document.querySelectorAll('.dropdown a').forEach(navLink => {
    navLink.addEventListener('click', () => {
        if (document.querySelector('body').classList.contains('mobile-nav-active')) {
            mobileNavToggle();
        }
    });
});


function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    fetch('send_email.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert(data); 
        event.target.reset();
    })
    .catch(error => {
        alert('There was an error sending your email. Please try again later.');
        console.error('Error:', error);
    });
}


let slideIndex = 1;

function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
    showSlides(slideIndex, modalId);
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function plusSlides(n, modalId) {
    showSlides(slideIndex += n, modalId);
}

function showSlides(n, modalId) {
    let i;
    let modal = document.getElementById(modalId);
    let slides = modal.getElementsByClassName("slides")[0].getElementsByTagName("img");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex-1].style.display = "block";
}

document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.per');
    const speed = 200; 

    const animateCount = (counter) => {
        const updateCount = () => {
            const target = parseInt(counter.getAttribute('data-target')); 
            const count = +counter.innerText;
            const increment = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target + '%'; 
            }
        };
        updateCount();
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                counter.setAttribute('data-target', counter.innerText.replace('%', ''));
                counter.innerText = '0';
                animateCount(counter);
                observer.unobserve(counter);
            }
        });
    }, { threshold: 1.0 });

    counters.forEach(counter => {
        observer.observe(counter);
    });
});


// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("scrollToTopBtn").style.display = "block";
    } else {
        document.getElementById("scrollToTopBtn").style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function scrollToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}