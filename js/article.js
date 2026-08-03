/*==================================================
                ARTICLE.JS
        Zwelibanzi Langeni Portfolio
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    calculateReadingTime();
    initializeTableOfContents();
    initializeCodeBlocks();
    initializeNewsletter();
    initializeImageZoom();
    initializeRevealAnimations();

});

/*==================================================
                READING TIME
==================================================*/

function calculateReadingTime() {

    const article =
        document.querySelector(".article-body");

    if (!article) return;

    const text =
        article.innerText.trim();

    const words =
        text.split(/\s+/).length;

    const minutes =
        Math.max(
            1,
            Math.ceil(words / 220)
        );

    const element =
        document.querySelector(".read-time");

    if (element) {

        element.textContent =
            `${minutes} min read`;

    }

}

/*==================================================
                TABLE OF CONTENTS
==================================================*/

function initializeTableOfContents() {

    const links =
        document.querySelectorAll(".toc a");

    if (!links.length) return;

    const toc =
        document.querySelector(".toc");

    const sidebar =
        document.querySelector(".article-sidebar");

    const articleMain =
        document.querySelector(".article-main");

    if (!toc || !sidebar || !articleMain) return;

    const offsetTop = 96;

    function updateTocState() {

        const scrollY = window.scrollY;
        const viewportHeight = window.innerHeight;
        const articleTop = articleMain.offsetTop;
        const articleBottom = articleMain.offsetTop + articleMain.offsetHeight;
        const sidebarRect = sidebar.getBoundingClientRect();
        const shouldPin =
            scrollY > articleTop + 90 &&
            scrollY + viewportHeight < articleBottom - 120;

        if (window.innerWidth <= 992) {

            toc.classList.remove("is-pinned");
            toc.style.width = "";
            toc.style.left = "";
            return;

        }

        if (shouldPin) {

            toc.classList.add("is-pinned");
            toc.style.width = `${sidebarRect.width}px`;
            toc.style.left = `${sidebarRect.left}px`;

        } else {

            toc.classList.remove("is-pinned");
            toc.style.width = "";
            toc.style.left = "";

        }

    }

    links.forEach(link => {

        link.addEventListener("click", event => {

            event.preventDefault();

            const target =
                document.querySelector(
                    link.getAttribute("href")
                );

            if (!target) return;

            const position =
                target.getBoundingClientRect().top +
                window.pageYOffset -
                offsetTop;

            window.scrollTo({

                top: position,

                behavior: "smooth"

            });

        });

    });

    const sections =
        document.querySelectorAll(
            ".article-body h2"
        );

    const observer =
        new IntersectionObserver(entries => {

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

            rootMargin:
                "-20% 0px -60% 0px",

            threshold: 0

        });

    sections.forEach(section => {

        observer.observe(section);

    });

    updateTocState();
    window.addEventListener("scroll", updateTocState, { passive: true });
    window.addEventListener("resize", updateTocState);

}
/*==================================================
                CODE BLOCKS
==================================================*/

function initializeCodeBlocks() {

    const blocks =
        document.querySelectorAll("pre");

    if (!blocks.length) return;

    blocks.forEach(block => {

        const code =
            block.querySelector("code");

        if (!code) return;

        const button =
            document.createElement("button");

        button.className = "copy-code";

        button.type = "button";

        button.textContent = "Copy";

        block.appendChild(button);

        button.addEventListener("click", async () => {

            try {

                await navigator.clipboard.writeText(
                    code.innerText
                );

                button.textContent = "Copied!";

                button.classList.add("copied");

                setTimeout(() => {

                    button.textContent = "Copy";

                    button.classList.remove("copied");

                }, 2000);

            }

            catch {

                button.textContent = "Failed";

                setTimeout(() => {

                    button.textContent = "Copy";

                }, 2000);

            }

        });

    });

}

/*==================================================
                NEWSLETTER
==================================================*/

function initializeNewsletter() {

    const form =
        document.getElementById(
            "newsletter-form"
        );

    if (!form) return;

    const email =
        document.getElementById(
            "newsletter-email"
        );

    const status =
        document.getElementById(
            "newsletter-status"
        );

    if (!email) return;

    form.addEventListener("submit", event => {

        event.preventDefault();

        const value =
            email.value.trim();

        email.classList.remove(
            "success",
            "error"
        );

        if (!isValidEmail(value)) {

            email.classList.add("error");

            email.setAttribute(
                "aria-invalid",
                "true"
            );

            if (status) {

                status.textContent =
                    "Please enter a valid email address.";

            }

            email.focus();

            return;

        }

        email.classList.add("success");

        email.setAttribute(
            "aria-invalid",
            "false"
        );

        if (status) {

            status.textContent =
                "Thank you for subscribing.";

        }

        form.reset();

        setTimeout(() => {

            email.classList.remove("success");

            if (status) {

                status.textContent = "";

            }

        }, 2000);

    });

}

function isValidEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

}

/*==================================================
                IMAGE ZOOM
==================================================*/

function initializeImageZoom() {

    const images =
        document.querySelectorAll(
            ".article-body img"
        );

    if (!images.length) return;

    images.forEach(image => {

        image.style.cursor = "zoom-in";

        image.addEventListener("click", () => {

            window.open(
                image.src,
                "_blank"
            );

        });

    });

}

/*==================================================
                REVEAL ANIMATIONS
==================================================*/

function initializeRevealAnimations() {

    const elements =
        document.querySelectorAll(

            ".article-body > *, .related-card, .toc, .newsletter-box, .popular-posts, .categories"

        );

    if (!elements.length) return;

    const observer =
        new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            });

        }, {

            threshold: 0.15

        });

    elements.forEach(element => {

        element.classList.add("reveal");

        observer.observe(element);

    });

}

/*==================================================
                UTILITIES
==================================================*/

function debounce(callback, delay = 100) {

    let timeout;

    return (...args) => {

        clearTimeout(timeout);

        timeout = setTimeout(() => {

            callback(...args);

        }, delay);

    };

}

/*==================================================
            OPTIONAL COPYRIGHT YEAR
==================================================*/

const year =
    document.getElementById("year");

if (year) {

    year.textContent =
        new Date().getFullYear();

}