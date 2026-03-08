$(document).ready(function () {

    /* 1. SCROLL PROGRESS BAR (top of page) */
    $("body").prepend('<div id="scroll-progress"></div>');

    $(window).on("scroll", function () {
        const scrollTop  = $(this).scrollTop();
        const docHeight  = $(document).height() - $(this).height();
        const progress   = (scrollTop / docHeight) * 100;
        $("#scroll-progress").css("width", progress + "%");
    });

    /* 2. NAVBAR — color change on scroll */
    $(window).on("scroll", function () {
        if ($(this).scrollTop() > 60) {
            $(".navbar").addClass("navbar-scrolled");
        } else {
            $(".navbar").removeClass("navbar-scrolled");
        }
    });

    /* 3. BACK TO TOP BUTTON */
    $("body").append('<button id="back-to-top" title="Back to top">▲</button>');

    $(window).on("scroll", function () {
        if ($(this).scrollTop() > 400) {
            $("#back-to-top").fadeIn(300);
        } else {
            $("#back-to-top").fadeOut(300);
        }
    });

    $("#back-to-top").on("click", function () {
        $("html, body").animate({ scrollTop: 0 }, 600, "swing");
    });


    /* 4. HERO BADGE — dynamically added next to title */
    $(".home-title").append(' <span id="hero-badge">✦ Cloud First</span>');

    /* 5. HERO TEXT ANIMATION on page load */
    $(".home-title").hide().fadeIn(1000);
    $(".introduction p").hide().delay(400).fadeIn(900);
    $(".btn-primary").hide().delay(700).fadeIn(800);

    /* 6. SECTIONS FADE IN on scroll (viewport entry) */
    const $sections = $("section, .event-card, .proj-card");

    function revealOnScroll() {
        const windowBottom = $(window).scrollTop() + $(window).height();
        $sections.each(function () {
            const elemTop = $(this).offset().top;
            if (windowBottom > elemTop + 60) {
                $(this).addClass("section-visible");
            }
        });
    }

    // Add base hidden state via JS (not CSS, so no-JS users still see content)
    $sections.addClass("section-hidden");
    $(window).on("scroll", revealOnScroll);
    revealOnScroll(); // run once on load for items already in view

    /* 7. CARDS — bounce on hover */
    $(document).on("mouseenter", ".event-card, .proj-card, .pcard", function () {
        $(this).stop(true).animate({ marginTop: "-6px" }, 180);
    }).on("mouseleave", ".event-card, .proj-card, .pcard", function () {
        $(this).stop(true).animate({ marginTop: "0px" }, 180);
    });

    /* 8. CARDS — double click to enlarge / restor */
    $(document).on("dblclick", ".event-card, .proj-card", function () {
        if ($(this).hasClass("enlarged")) {
            $(this).removeClass("enlarged")
                   .animate({ transform: "scale(1)" }, 300);
        } else {
            $(".event-card, .proj-card").removeClass("enlarged");
            $(this).addClass("enlarged");
        }
    });

    /* 9. SOCIAL ICONS TOOLTIP on hover */
    $("body").append('<div id="jq-tooltip"></div>');

    const tooltipLabels = {
        "LinkedIn":  "Follow us on LinkedIn",
        "GitHub":    "Star us on GitHub",
        "Instagram": "See our Instagram",
        "Discord":   "Join our Discord"
    };

    $(document).on("mouseenter", ".social-btn", function (e) {
        const label = tooltipLabels[$(this).attr("title")] || $(this).attr("title");
        $("#jq-tooltip").text(label).fadeIn(200);
    }).on("mousemove", ".social-btn", function (e) {
        $("#jq-tooltip").css({
            top:  e.pageY - 44 + "px",
            left: e.pageX + 14 + "px"
        });
    }).on("mouseleave", ".social-btn", function () {
        $("#jq-tooltip").fadeOut(150);
    });

    /* 10. SLIDING ANNOUNCEMENT BANNER */
    const $banner = $(`
        <div id="announce-banner">
            <span>🚀 &nbsp;AWS Workshop — March 14 at INPT Amphithéâtre B &nbsp;|&nbsp;
                  Register now and level up your cloud skills! &nbsp;☁</span>
            <button id="close-banner">✕</button>
        </div>
    `);

    $("body").prepend($banner);
    $banner.hide().slideDown(600);

    // Push page content down to make room
    $("body").css("padding-top", $banner.outerHeight() + "px");

    $("#close-banner").on("click", function () {
        $banner.slideUp(400, function () {
            $("body").animate({ paddingTop: "0px" }, 300);
        });
    });

    /* 11. PROGRESS BAR — section titles color with
        one jQuery selector (Traversing requirement) */
    // Unify all section eyebrow labels to pulse on first view
    $(".events-eyebrow, .projects-eyebrow, .home-title").each(function () {
        $(this).css("opacity", 0).delay(200).animate({ opacity: 1 }, 700);
    });

    /* 12. KEYBOARD EVENT — press "D" to toggle
        a dark-overlay atmosphere effect */
    let darkMode = false;
    $(document).on("keydown", function (e) {
        if (e.key === "d" || e.key === "D") {
            darkMode = !darkMode;
            if (darkMode) {
                $("body").addClass("dark-atmosphere");
                // Show brief message
                showToast("🌑 Dark atmosphere ON — press D to toggle");
            } else {
                $("body").removeClass("dark-atmosphere");
                showToast("☀️ Normal mode restored");
            }
        }
    });


    /* 13. MODAL POPUP — appears after 10 seconds */
    setTimeout(function () {
        $("body").append(`
            <div id="jq-modal-overlay">
                <div id="jq-modal">
                    <button id="jq-modal-close">✕</button>
                    <p class="modal-eyebrow">DON'T MISS OUT</p>
                    <h3 class="modal-title">Join I-LOUD Today ☁</h3>
                    <p class="modal-body">Be part of a community of cloud engineers at INPT. Get access to workshops, projects, mentoring and industry certifications.</p>
                    <a href="joinUs.html" class="modal-cta">Join the Club →</a>
                </div>
            </div>
        `);
        $("#jq-modal-overlay").hide().fadeIn(500);

        $("#jq-modal-close, #jq-modal-overlay").on("click", function (e) {
            if ($(e.target).is("#jq-modal-overlay") || $(e.target).is("#jq-modal-close")) {
                $("#jq-modal-overlay").fadeOut(400, function () { $(this).remove(); });
            }
        });
    }, 10000);

    /* HELPER — toast notification */
    function showToast(msg) {
        $("#jq-toast").remove();
        $("body").append(`<div id="jq-toast">${msg}</div>`);
        $("#jq-toast").fadeIn(300).delay(2200).fadeOut(400, function () {
            $(this).remove();
        });
    }

});