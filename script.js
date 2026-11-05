/* =============================================
   GLOW & GO TRAVEL — Website JavaScript (upgraded)
   Images live at the repository root, no "assets/" prefix.
   ============================================= */

(() => {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const beckyEmail = "becky@glowandgotravel.co.uk";

  /* ===========================================
     PAGE NAVIGATION
     =========================================== */

  const routes = new Set([
    "home", "about", "why-book", "destinations", "journal",
    "stories", "reviews", "book", "contact", "privacy"
  ]);

  const nav = $("#site-nav");
  const menu = $(".menu-toggle");
  const sticky = $(".sticky-cta");
  let currentRoute = null;

  function setMenu(open) {
    nav.classList.toggle("open", open);
    menu.textContent = open ? "×" : "☰";
    menu.setAttribute("aria-expanded", String(open));
    menu.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  }

  function pageTitle(route) {
    if (route === "home") return "Escape Ordinary. Embrace Freedom.";
    if (route === "journal") return "Becky's Journal";
    if (route === "why-book") return "Why Book With Becky?";
    if (route === "destinations") return "Gallery";
    return route.split("-").map(w => w[0].toUpperCase() + w.slice(1)).join(" ");
  }

  function showPage() {
    const requested = location.hash.startsWith("#/")
      ? location.hash.slice(2).split("/")[0]
      : "home";
    const route = routes.has(requested) ? requested : "home";
    const changed = route !== currentRoute;

    $$("[data-page]").forEach(page => {
      page.hidden = page.dataset.page !== route;
    });

    $$(".nav a").forEach(link => {
      if (link.getAttribute("href") === `#/${route}`) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });

    document.title = `${pageTitle(route)} | glow & go travel`;
    document.body.dataset.route = route;
    setMenu(false);
    updateSticky();

    if (changed) {
      window.scrollTo(0, 0);

      // Move keyboard and screen-reader focus to the new page heading.
      const heading = $(`[data-page="${route}"] h1`);
      if (heading && currentRoute !== null) {
        heading.setAttribute("tabindex", "-1");
        heading.focus({ preventScroll: true });
      }
    }

    currentRoute = route;
  }

  menu.addEventListener("click", () => setMenu(!nav.classList.contains("open")));

  document.addEventListener("click", event => {
    if (nav.classList.contains("open") && !nav.contains(event.target) && !menu.contains(event.target)) {
      setMenu(false);
    }
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && nav.classList.contains("open")) {
      setMenu(false);
      menu.focus();
    }
  });

  window.addEventListener("hashchange", showPage);

  $("#year").textContent = new Date().getFullYear();

  /* ===========================================
     STICKY BOOKING BUTTON
     Hidden on the booking and contact pages,
     where the form is already on screen.
     =========================================== */

  function updateSticky() {
    const onFormPage = currentRoute === "book" || currentRoute === "contact";
    sticky.classList.toggle("visible", window.scrollY > 450 && !onFormPage);
  }

  window.addEventListener("scroll", updateSticky, { passive: true });

  /* ===========================================
     HOME REVIEW CAROUSEL
     Auto-advances, pauses on hover or focus,
     and stays still for reduced-motion users.
     =========================================== */

  const reviews = [
    { text: "“Becky was an absolute superstar!”", by: "Gemma · Canada" },
    { text: "“We had a fabulous time and everything went according to plan.”", by: "Julie · Norwegian fjords" },
    { text: "“Oh Becky you did good!!!!!!!”", by: "Nicola · Gran Canaria" },
    { text: "“Great communication throughout and easy booking.”", by: "Sarah · Egypt" },
    { text: "“Five stars all the way!”", by: "Catherine · Canada" },
    { text: "“Becky helped me every step of the way!”", by: "Rachel · Mediterranean cruise" }
  ];

  const quoteEl = $("#slider-quote");
  const byEl = $("#slider-by");
  const slider = $(".quote-slider");
  let activeReview = 0;
  let paused = false;

  function showReview(index) {
    activeReview = (index + reviews.length) % reviews.length;
    quoteEl.textContent = reviews[activeReview].text;
    byEl.textContent = `— ${reviews[activeReview].by}`;
  }

  $("#review-prev").addEventListener("click", () => showReview(activeReview - 1));
  $("#review-next").addEventListener("click", () => showReview(activeReview + 1));

  if (!reduceMotion) {
    slider.addEventListener("mouseenter", () => (paused = true));
    slider.addEventListener("mouseleave", () => (paused = false));
    slider.addEventListener("focusin", () => (paused = true));
    slider.addEventListener("focusout", () => (paused = false));

    setInterval(() => {
      if (!paused && !document.hidden && currentRoute === "home") {
        showReview(activeReview + 1);
      }
    }, 7000);
  }

  /* ===========================================
     PHOTO ALBUM DATA
     =========================================== */

  const albums = [
    {
      id: "albums-crete",
      group: "becky",
      title: "Crete, Greece",
      place: "Becky's travels",
      cover: "becky-crete-pool-sunset.jpg",
      images: [
        "becky-crete-camel.jpg",
        "becky-crete-beach.jpg",
        "becky-crete-pool-sunset.jpg",
        "becky-crete-night-view.jpg",
        "becky-crete-lobby.jpg",
        "becky-crete-poolside.jpg",
        "becky-crete-harbour.jpg",
        "becky-crete-holiday-selfie.jpg",
        "becky-crete-room.jpg"
      ]
    },
    {
      id: "albums-sardinia",
      group: "becky",
      title: "Sardinia, Italy",
      place: "Becky's travels",
      cover: "becky-sardinia-resort-view.jpg",
      images: [
        "becky-sardinia-night-harbour.jpg",
        "becky-sardinia-resort-view.jpg",
        "becky-sardinia-bedroom.jpg",
        "becky-sardinia-cabana.jpg",
        "becky-sardinia-pool.jpg",
        "becky-sardinia-lake.jpg",
        "becky-sardinia-sea-view.jpg",
        "becky-sardinia-spa.jpg",
        "becky-sardinia-sunset-arch.jpg"
      ]
    },
    {
      id: "albums-egypt",
      group: "becky",
      title: "Sharm El Sheikh, Egypt",
      place: "Becky's travels",
      cover: "becky-egypt-seaside-swing.jpg",
      images: [
        "becky-egypt-seaside-swing.jpg",
        "becky-egypt-mosque.jpg",
        "becky-egypt-desert-selfie.jpg",
        "becky-egypt-boat-photo.jpg",
        "becky-egypt-quad-bike.jpg",
        "becky-egypt-evening.jpg",
        "becky-egypt-reef.jpg"
      ]
    },
    {
      id: "albums-msc",
      group: "becky",
      title: "MSC Virtuosa Cruise",
      place: "Becky's travels",
      cover: "becky-msc-staircase.jpg",
      images: [
        "becky-msc-drinks.jpg",
        "becky-msc-port-sunset.jpg",
        "becky-msc-staircase.jpg",
        "becky-msc-theatre.jpg",
        "becky-msc-gallery.jpg",
        "becky-msc-sunset.jpg",
        "becky-msc-pool-deck.jpg"
      ]
    },
    {
      id: "albums-rachel",
      group: "client",
      title: "Rachel's Photo Album",
      place: "Mediterranean",
      cover: "rachel-historic-library.jpg",
      images: [
        "rachel-sea-rocks.jpg",
        "rachel-ancient-arch.jpg",
        "rachel-archaeology-site.jpg",
        "rachel-city-ruins.jpg",
        "rachel-sea-sunset.jpg",
        "rachel-ancient-site.jpg",
        "rachel-acropolis.jpg",
        "rachel-beach.jpg",
        "rachel-lighthouse.jpg",
        "rachel-orange-sunset.jpg",
        "rachel-historic-library.jpg"
      ]
    },
    {
      id: "albums-karen",
      group: "client",
      title: "Karen's Photo Album",
      place: "Montenegro",
      cover: "karen-sunset-drinks.jpg",
      images: [
        "karen-sunset-drinks.jpg",
        "karen-sea-cave-boat.jpg",
        "karen-cable-car-station.jpg",
        "karen-turquoise-sea-cave.jpg",
        "karen-sunny-selfie.jpg",
        "karen-golden-sunset.jpg",
        "karen-twilight-bay.jpg",
        "karen-kotor-bay-view.jpg",
        "karen-boat-trip.jpg"
      ]
    },
    {
      id: "albums-julie",
      group: "client",
      title: "Julie's Photo Album",
      place: "Norwegian fjords",
      cover: "julie-fjord-cabin.jpg",
      images: [
        "julie-fjord-cabin.jpg",
        "julie-mountain-lake.jpg",
        "julie-sunlit-fjord.jpg",
        "julie-fjord-village.jpg",
        "julie-forest-rapids.jpg",
        "julie-turquoise-lake.jpg"
      ]
    }
  ];

  /* ===========================================
     GENERATE PHOTO ALBUM CARDS
     =========================================== */

  const escapeHtml = value =>
    String(value).replace(/[&<>"']/g, c => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[c]);

  const makePhotoLabel = filename =>
    filename
      .replace(/^becky-(crete|sardinia|egypt|msc)-|^(rachel|karen|julie)-/, "")
      .replace(/\.jpg$/i, "")
      .replace(/-/g, " ");

  function createAlbum(album) {
    const grid = document.getElementById(
      album.group === "becky" ? "becky-album-grid" : "client-album-grid"
    );
    if (!grid) return;

    const photos = album.images.map(filename => {
      const caption = `${album.title} — ${makePhotoLabel(filename)}`;
      return `
        <button type="button" class="gallery-card"
                data-image="${escapeHtml(filename)}"
                data-caption="${escapeHtml(caption)}">
          <img src="${escapeHtml(filename)}" alt="${escapeHtml(caption)}" loading="lazy">
          <span>View photo &nearr;</span>
        </button>`;
    }).join("");

    grid.insertAdjacentHTML("beforeend", `
      <div id="${album.id}">
        <details class="photo-album">
          <summary>
            <img src="${escapeHtml(album.cover)}" alt="${escapeHtml(album.title)} cover" loading="lazy">
            <span class="album-cover-text">
              <strong>${escapeHtml(album.title)}</strong>
              <small>${album.images.length} photos · ${escapeHtml(album.place)}</small>
              <span>Open album &nearr;</span>
            </span>
          </summary>
          <div class="album-inner">
            <div class="album-toolbar">
              <h3>${escapeHtml(album.title)}</h3>
              <span>${album.images.length} photographs</span>
            </div>
            <div class="album-photo-grid">${photos}</div>
          </div>
        </details>
      </div>`);
  }

  albums.forEach(createAlbum);

  // Swap the summary label when an album is open or closed.
  $$(".photo-album").forEach(details => {
    const label = $(".album-cover-text > span", details);
    details.addEventListener("toggle", () => {
      label.innerHTML = details.open ? "Close album &times;" : "Open album &nearr;";
    });
  });

  /* ===========================================
     JOURNAL "PHOTO ALBUM" LINKS
     =========================================== */

  $$("[data-album-link]").forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      const section = document.getElementById(link.dataset.albumLink);
      if (!section) return;

      const details = $("details", section);
      if (details) details.open = true;

      section.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    });
  });

  /* ===========================================
     MAIN GALLERY FILTERS
     =========================================== */

  $$("[data-filter]").forEach(button => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      $$("[data-filter]").forEach(other =>
        other.setAttribute("aria-pressed", String(other === button))
      );

      $$(".gallery-grid .gallery-card").forEach(card => {
        card.hidden = filter !== "all" && card.dataset.category !== filter;
      });
    });
  });

  /* ===========================================
     IMAGE LIGHTBOX
     Previous / next buttons, arrow keys and
     swipe move through the photos in the same
     album or gallery.
     =========================================== */

  const dialog = $("#image-dialog");
  const dialogImage = $("img", dialog);
  const dialogCaption = $(".lightbox-caption", dialog);
  const lightboxBody = $(".lightbox-body", dialog);

  const navButtons = ["prev", "next"].map(dir => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `lightbox-nav lightbox-${dir}`;
    btn.setAttribute("aria-label", dir === "prev" ? "Previous photo" : "Next photo");
    btn.innerHTML = dir === "prev" ? "&larr;" : "&rarr;";
    lightboxBody.appendChild(btn);
    return btn;
  });

  let lightboxSet = [];
  let lightboxIndex = 0;

  function showPhoto(index) {
    if (!lightboxSet.length) return;
    lightboxIndex = (index + lightboxSet.length) % lightboxSet.length;
    const item = lightboxSet[lightboxIndex];
    const caption = item.dataset.caption || "Holiday photograph";

    dialogImage.src = item.dataset.image;
    dialogImage.alt = caption;
    dialogCaption.textContent = caption;

    const single = lightboxSet.length < 2;
    navButtons.forEach(btn => (btn.hidden = single));
  }

  function openPhoto(button) {
    const scope =
      button.closest(".album-photo-grid") ||
      button.closest(".gallery-grid") ||
      button.closest(".mosaic") ||
      button.parentElement;

    lightboxSet = $$("[data-image]", scope).filter(el => !el.hidden);
    showPhoto(lightboxSet.indexOf(button));

    if (typeof dialog.showModal === "function" && !dialog.open) {
      dialog.showModal();
    }
  }

  document.addEventListener("click", event => {
    const button = event.target.closest("[data-image]");
    if (button && !dialog.contains(button)) openPhoto(button);
  });

  navButtons[0].addEventListener("click", () => showPhoto(lightboxIndex - 1));
  navButtons[1].addEventListener("click", () => showPhoto(lightboxIndex + 1));

  dialog.addEventListener("keydown", event => {
    if (event.key === "ArrowLeft") showPhoto(lightboxIndex - 1);
    if (event.key === "ArrowRight") showPhoto(lightboxIndex + 1);
  });

  let touchStartX = 0;
  dialog.addEventListener("touchstart", e => (touchStartX = e.changedTouches[0].clientX), { passive: true });
  dialog.addEventListener("touchend", e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) showPhoto(lightboxIndex + (dx < 0 ? 1 : -1));
  }, { passive: true });

  $(".lightbox-close", dialog).addEventListener("click", () => dialog.close());

  dialog.addEventListener("click", event => {
    if (event.target === dialog) dialog.close();
  });

  dialog.addEventListener("close", () => dialogImage.removeAttribute("src"));

  /* ===========================================
     EMAIL FORMS (enquiry and review)
     The visitor's email app opens with the
     message ready; they press Send themselves.
     =========================================== */

  const clean = value => String(value || "").trim().slice(0, 2000);

  function openEmail(subject, body, form) {
    const status = $(".form-status", form);
    status.textContent =
      "Your email app should open now. Please press Send to finish. " +
      "If nothing opens, email Becky using the link in the footer.";
    status.classList.add("visible");

    window.location.href =
      `mailto:${beckyEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  function handleEmailForm(selector, buildEmail) {
    $$(selector).forEach(form => {
      form.addEventListener("submit", event => {
        event.preventDefault();
        if (!form.reportValidity()) return;

        const data = new FormData(form);
        const get = name => clean(data.get(name));
        const { subject, body } = buildEmail(get);
        openEmail(subject, body, form);
      });
    });
  }

  handleEmailForm(".enquiry-form", get => ({
    subject: `glow & go holiday enquiry, ${get("name")}`,
    body: [
      "Hi Becky",
      "",
      "I would love help planning a holiday.",
      "Here are my details:",
      "",
      `Name: ${get("name")}`,
      `Email: ${get("email")}`,
      `Destination: ${get("destination")}`,
      `Dates: ${get("dates") || "Flexible / not sure"}`,
      `Travellers: ${get("travellers") || "To discuss"}`,
      `Approx. spend per person: ${get("spend") || "To discuss"}`,
      `Preferred board basis: ${get("board") || "Not sure yet"}`,
      `Special assistance: ${get("assistance") || "None specified"}`,
      `Other details: ${get("message") || "None yet"}`,
      "",
      "Please get in touch when you can.",
      "Thank you!"
    ].join("\n")
  }));

  handleEmailForm(".review-form", get => ({
    subject: `glow & go review, ${get("name")}`,
    body: [
      "Hi Becky",
      "",
      "I would like to submit a review:",
      "",
      `First name: ${get("name")}`,
      `Contact email (do not publish): ${get("email")}`,
      `Destination: ${get("destination") || "Not given"}`,
      `Rating: ${get("rating")} / 5`,
      "",
      get("message"),
      "",
      "I agree to be contacted about whether this review can be published."
    ].join("\n")
  }));

  /* ===========================================
     NEWSLETTER SIGN-UP REQUEST
     Uses FormSubmit to forward a request to Becky.
     It does not create an automatic subscription.
     =========================================== */

  $$(".newsletter-form").forEach(form => {
    form.addEventListener("submit", async event => {
      event.preventDefault();
      if (!form.reportValidity()) return;

      const status = $(".form-status", form);
      const submit = $('[type="submit"]', form);

      submit.disabled = true;
      status.textContent = "Sending your request…";
      status.classList.add("visible");

      try {
        const response = await fetch(`https://formsubmit.co/ajax/${beckyEmail}`, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: new FormData(form)
        });

        const result = await response.json();

        if (!response.ok || String(result.success).toLowerCase() === "false") {
          throw new Error("Delivery failed");
        }

        status.textContent =
          "Request submitted. Becky will add you to her mailing list manually.";
        form.reset();
      } catch (error) {
        status.innerHTML =
          `Could not confirm delivery. Please <a href="mailto:${beckyEmail}` +
          `?subject=Mailing%20list%20request">email Becky directly</a> to join.`;
      } finally {
        submit.disabled = false;
      }
    });
  });

  /* ===========================================
     START
     =========================================== */

  showPage();
  showReview(0);
})();
