
document.addEventListener("DOMContentLoaded", function () {
    const loader = document.getElementById("pageLoader");
    const header = document.getElementById("siteHeader");
    const video = document.getElementById("heroVideo");
    const navigation = document.getElementById("mainNavigation");
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

    const loaderStart = Date.now();
    const minimumLoaderTime = 2000;
    let loaderHidden = false;

    function hideLoader() {
        if (!loader || loaderHidden) return;

        loaderHidden = true;

        const elapsed = Date.now() - loaderStart;
        const remaining = Math.max(0, minimumLoaderTime - elapsed);

        setTimeout(function () {
            loader.classList.add("loaded");

            setTimeout(function () {
                loader.remove();
            }, 700);
        }, remaining);
    }

    window.addEventListener("load", hideLoader, { once: true });

    setTimeout(hideLoader, 20000);

    function updateHeader() {
        if (!header) return;

        header.classList.toggle("scrolled", window.scrollY > 40);
    }

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });

    updateHeader();

    if (video) {
        video.muted = true;

        function playVideo() {
            const playPromise = video.play();

            if (playPromise && typeof playPromise.catch === "function") {
                playPromise.catch(function () {});
            }
        }

        playVideo();

        document.addEventListener("visibilitychange", function () {
            if (!document.hidden && video.paused) {
                playVideo();
            }
        });
    }

    navLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            navLinks.forEach(function (item) {
                item.classList.remove("active");
            });

            link.classList.add("active");

            if (
                navigation &&
                navigation.classList.contains("show") &&
                window.bootstrap
            ) {
                bootstrap.Collapse
                    .getOrCreateInstance(navigation)
                    .hide();
            }
        });
    });

    const sections = document.querySelectorAll(
        "#home, #about, #services, #why-us, #contact"
    );

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;

                navLinks.forEach(function (link) {
                    const isActive =
                        link.getAttribute("href") === "#" + entry.target.id;

                    link.classList.toggle("active", isActive);
                });
            });
        }, {
            rootMargin: "-25% 0px -60% 0px",
            threshold: 0
        });

        sections.forEach(function (section) {
            observer.observe(section);
        });
    }
    
const aboutSection = document.querySelector(".about-section");

if (aboutSection && "IntersectionObserver" in window) {
    const counters = aboutSection.querySelectorAll(".counter-number");
    let countersStarted = false;

    const counterObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting || countersStarted) return;

            countersStarted = true;

            counters.forEach(function (counter) {
                const target = Number(counter.dataset.target) || 0;
                const duration = 1400;
                const startTime = performance.now();

                function updateCounter(currentTime) {
                    const progress = Math.min(
                        (currentTime - startTime) / duration,
                        1
                    );

                    const easedProgress = 1 - Math.pow(1 - progress, 3);

                    counter.textContent = Math.floor(
                        target * easedProgress
                    );

                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                }

                requestAnimationFrame(updateCounter);
            });

            counterObserver.disconnect();
        });
    }, {
        threshold: 0.3
    });

    counterObserver.observe(aboutSection);
}
    const serviceCards = document.querySelectorAll(".hvac-service-card");

    if ("IntersectionObserver" in window) {
        const serviceObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    serviceObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12
        });

        serviceCards.forEach(function (card, index) {
            card.style.transitionDelay = (index % 3) * 100 + "ms";
            card.classList.add("hvac-reveal");
            serviceObserver.observe(card);
        });
    } else {
        serviceCards.forEach(function (card) {
            card.classList.add("is-visible");
        });
    }
    const section = document.querySelector(".etqan-why-section,.hvac-expertise-section");

    if (!section) return;

    const elements = section.querySelectorAll(
        ".etqan-heading-row, .etqan-feature-banner, .etqan-info-card, .etqan-image-card, .etqan-value-card, .etqan-values-heading"
    );

    if (!("IntersectionObserver" in window)) {
        elements.forEach(function (element) {
            element.classList.add("etqan-visible");
        });
        return;
    }

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;

            entry.target.classList.add("etqan-visible");
            observer.unobserve(entry.target);
        });
    }, {
        threshold: 0.12
    });

    elements.forEach(function (element, index) {
        element.classList.add("etqan-reveal");
        element.style.transitionDelay = (index % 3) * 90 + "ms";
        observer.observe(element);
    });
    const contactForm = document.getElementById("etqanContactForm");

    if (!contactForm) return;

    const whatsappNumber = "966535184059";

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!contactForm.reportValidity()) return;

        const formData = new FormData(contactForm);

        const name = formData.get("name").trim();
        const phone = formData.get("phone").trim();
        const service = formData.get("service");
        const city = formData.get("city").trim();
        const message = formData.get("message").trim();

        const whatsappMessage = [
            "السلام عليكم، أريد الاستفسار عن خدمات إتقان مكة للتكييف والتبريد.",
            "",
            "الاسم: " + name,
            "رقم الجوال: " + phone,
            "نوع الخدمة: " + service,
            "المدينة أو الحي: " + city,
            "تفاصيل الطلب: " + (message || "لم يتم إضافة تفاصيل إضافية."),
            "",
            "أرجو التواصل معي لمعرفة التفاصيل. شكرًا لكم."
        ].join("\n");

        const whatsappURL =
            "https://wa.me/" +
            whatsappNumber +
            "?text=" +
            encodeURIComponent(whatsappMessage);

        const whatsappWindow = window.open(whatsappURL, "_blank");

        if (whatsappWindow) {
            whatsappWindow.opener = null;
        } else {
            window.location.href = whatsappURL;
        }

        contactForm.reset();
    });
});

