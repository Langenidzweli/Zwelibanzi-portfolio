/*==================================================
                ARTICLE.JS
    Zwelibanzi Portfolio
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    initializeReadingProgress();
    initializeTableOfContents();
    initializeShareButtons();
    initializeNewsletter();
    initializeRevealAnimations();

});

/*==================================================
                READING PROGRESS BAR
==================================================*/

function initializeReadingProgress() {

    const progress = document.createElement("div");
    progress.className = "reading-progress";

    document.body.appendChild(progress);

    window.addEventListener("scroll", () => {

        const scrollTop = window.scrollY;

        const documentHeight =
            document.documentElement.scrollHeight - window.innerHeight;

        const progressWidth = (scrollTop / documentHeight) * 100;

        progress.style.width = `${progressWidth}%`;

    });

}

/*==================================================
                TABLE OF CONTENTS
==================================================*/

function initializeTableOfContents() {

    const links = document.querySelectorAll(".toc a");

    if (!links.length) return;

    /* Smooth Scroll */

    links.forEach(link => {

        link.addEventListener("click", e => {

            e.preventDefault();

            const target = document.querySelector(
                link.getAttribute("href")
            );

            if (!target) return;

            target.scrollIntoView({

                behavior: "smooth",
                block: "start"

            });

        });

    });

    /* Active Section */

    const sections = document.querySelectorAll(".article-body h2");

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            links.forEach(link => {

                link.classList.remove("active");

                if (
                    link.getAttribute("href") ===
                    "#" + entry.target.id
                ) {

                    link.classList.add("active");

                }

            });

        });

    }, {

        rootMargin: "-40% 0px -45% 0px"

    });

    sections.forEach(section => observer.observe(section));

}

/*==================================================
                SHARE BUTTONS
==================================================*/

function initializeShareButtons() {

    const pageURL = encodeURIComponent(window.location.href);

    const pageTitle = encodeURIComponent(document.title);

    /* LinkedIn */

    const linkedin = document.getElementById("linkedin-share");

    if (linkedin) {

        linkedin.addEventListener("click", e => {

            e.preventDefault();

            window.open(

                `https://www.linkedin.com/sharing/share-offsite/?url=${pageURL}`,

                "_blank",

                "width=600,height=600"

            );

        });

    }

    /* X */

    const x = document.getElementById("x-share");

    if (x) {

        x.addEventListener("click", e => {

            e.preventDefault();

            window.open(

                `https://twitter.com/intent/tweet?url=${pageURL}&text=${pageTitle}`,

                "_blank",

                "width=600,height=500"

            );

        });

    }

    /* Copy */

    const copy = document.getElementById("copy-link");

    if (copy) {

        copy.addEventListener("click", async e => {

            e.preventDefault();

            try {

                await navigator.clipboard.writeText(window.location.href);

                const original = copy.textContent;

                copy.textContent = "Copied!";

                copy.classList.add("copied");

                setTimeout(() => {

                    copy.textContent = original;

                    copy.classList.remove("copied");

                }, 2000);

            }

            catch {

                alert("Unable to copy link.");

            }

        });

    }

}

/*==================================================
                NEWSLETTER
==================================================*/

function initializeNewsletter() {

    const form = document.getElementById("newsletter-form");

    if (!form) return;

    const email = document.getElementById("newsletter-email");

    form.addEventListener("submit", e => {

        e.preventDefault();

        const value = email.value.trim();

        email.classList.remove("success");
        email.classList.remove("error");

        if (!isValidEmail(value)) {

            email.classList.add("error");

            email.focus();

            return;

        }

        email.classList.add("success");

        alert("Thank you for subscribing!");

        form.reset();

        setTimeout(() => {

            email.classList.remove("success");

        }, 1500);

    });

}

function isValidEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

}

/*==================================================
                REVEAL ANIMATIONS
==================================================*/

function initializeRevealAnimations() {

    const elements = document.querySelectorAll(

        ".article-body > *, .related-card, .newsletter-box"

    );

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

            }

        });

    }, {

        threshold: .15

    });

    elements.forEach(element => {

        element.classList.add("reveal");

        observer.observe(element);

    });

}

/*==================================================
                OPTIONAL
                UPDATE COPYRIGHT YEAR
==================================================*/

const year = document.getElementById("year");

if (year) {

    year.textContent = new Date().getFullYear();

}