"use strict";

/*====================================================
                    APP
====================================================*/

class PortfolioApp {

    constructor() {

        this.selectors = {
            reveal: ".reveal",
            audio: "audio",
            hamburger: "#hamburger",
            navMenu: "#navMenu",
            navLinks: "#navMenu a",
        };

        this.init();

    }

    init() {

        this.initReveal();
        this.initAudioManager();
        this.initHamburger();

    }

  /*====================================================
                HAMBURGER MENU
====================================================*/

initHamburger() {

    this.hamburger = document.querySelector(this.selectors.hamburger);
    this.navMenu = document.querySelector(this.selectors.navMenu);

    if (!this.hamburger || !this.navMenu) return;

    this.navLinks = document.querySelectorAll(this.selectors.navLinks);

    // Toggle Menu
    this.hamburger.addEventListener("click", (e) => {

        e.stopPropagation();

        const isOpen = this.navMenu.classList.toggle("active");

        this.hamburger.classList.toggle("active", isOpen);

        document.body.style.overflow = isOpen ? "hidden" : "";

    });

    // Klik Link
    this.navLinks.forEach(link => {

        link.addEventListener("click", () => {

            this.closeMenu();

        });

    });

    // Klik di luar navbar
    document.addEventListener("click", (e) => {

        if (!e.target.closest("nav")) {

            this.closeMenu();

        }

    });

    // Tombol ESC
    document.addEventListener("keydown", (e) => {

        if (e.key === "Escape") {

            this.closeMenu();

        }

    });

    // Resize Desktop
    window.addEventListener("resize", () => {

        if (window.innerWidth > 768) {

            this.closeMenu();

        }

    });

}

/*====================================================
                    CLOSE MENU
====================================================*/

closeMenu() {

    if (!this.hamburger || !this.navMenu) return;

    this.hamburger.classList.remove("active");

    this.navMenu.classList.remove("active");

    document.body.style.overflow = "";

}

    /*====================================================
                        REVEAL
    ====================================================*/

    initReveal() {
        const elements = document.querySelectorAll(this.selectors.reveal);

        if (!elements.length) return;

        const observer = new IntersectionObserver(
            this.handleReveal.bind(this),
            {
                root: null,
                threshold: 0.15,
                rootMargin: "0px 0px -80px 0px",
            }
        );

        elements.forEach(element => observer.observe(element));
    }

    handleReveal(entries, observer) {
        for (const entry of entries) {
            if (!entry.isIntersecting) continue;

            entry.target.classList.add("active");

            // Reveal sekali saja
            observer.unobserve(entry.target);
        }
    }

    /*====================================================
                    AUDIO MANAGER
    ====================================================*/

    initAudioManager() {
        this.audios = [...document.querySelectorAll(this.selectors.audio)];

        if (!this.audios.length) return;

        this.audios.forEach(audio => {

            audio.preload = "metadata";

            audio.addEventListener("play", () => {
                this.pauseOthers(audio);
            });

            audio.addEventListener("ended", () => {
                audio.currentTime = 0;
            });

        });
    }

    pauseOthers(current) {

        for (const audio of this.audios) {

            if (audio === current) continue;

            if (!audio.paused) {
                audio.pause();
                audio.currentTime = 0;
            }

        }

    }

}

document.addEventListener("DOMContentLoaded", () => {
    new PortfolioApp();
});

document.addEventListener("DOMContentLoaded", () => {

    const puzzleCard = document.querySelector(".puzzle-card");

    if (puzzleCard) {
        puzzleCard.style.gridColumn = "span 3";
    }

});

