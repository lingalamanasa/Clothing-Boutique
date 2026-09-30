/**
 * STACKLY — Haute Couture & Boutique (MESHKI Inspired)
 * Master Interactive Core: GSAP Animations, 3 Color Palettes, Cart, Wishlist, QuickView
 */

(function () {
  "use strict";

  // --- 1. Boutique Catalog Data ---
  const BOUTIQUE_CATALOG = [
    {
      id: "prod-1",
      name: "The Obsidian Silk Evening Gown",
      category: "dresses",
      categoryName: "Maxi Dresses",
      price: 2450,
      image: "./images/prod-1.webp",
      desc: "Floor-sweeping column gown fashioned in pure double-faced mulberry silk with hand-sculpted corsetry and trailing silk chiffon scarf.",
      fabric: "100% Grade 6A Mulberry Silk (Como, Italy)",
      colors: ["Obsidian Noir", "Champagne Gold", "Bordeaux"],
      sizes: ["XXS", "XS", "S", "M", "L", "XL"]
    },
    {
      id: "prod-2",
      name: "Double-Breasted Cashmere Blazer",
      category: "outerwear",
      categoryName: "Tailored Outerwear",
      price: 1850,
      image: "./images/prod-2.webp",
      desc: "Sculpted hourglass silhouette tailored from Mongolian organic cashmere with bespoke gilded brass buttons and peak lapels.",
      fabric: "100% Organic Mongolian Cashmere & Bemberg Cupro",
      colors: ["Midnight Navy", "Onyx Black", "Camel"],
      sizes: ["XS", "S", "M", "L"]
    },
    {
      id: "prod-3",
      name: "Champagne Pleated Chiffon Dress",
      category: "dresses",
      categoryName: "Cocktail Dresses",
      price: 2100,
      image: "./images/prod-3.webp",
      desc: "Sunray pleating with an asymmetric draped shoulder and metallic lurex threading woven delicately into sheer silk chiffon.",
      fabric: "Silk-Lurex Chiffon (Lyon, France)",
      colors: ["Champagne Pearl", "Rose Quartz"],
      sizes: ["XXS", "XS", "S", "M", "L"]
    },
    {
      id: "prod-4",
      name: "Midnight Bespoke Tuxedo Ensemble",
      category: "suiting",
      categoryName: "Tailored Suiting",
      price: 3200,
      image: "./images/prod-4.webp",
      desc: "Two-piece tuxedo hand-stitched from Super 160s Italian wool with grosgrain silk lapels and custom horn buttons.",
      fabric: "Italian Super 160s Wool & Silk Faille (Biella)",
      colors: ["Midnight Blue", "Obsidian Black"],
      sizes: ["38R", "40R", "42R", "44R"]
    },
    {
      id: "prod-5",
      name: "Hand-Embroidered Velvet Kimono",
      category: "lounge",
      categoryName: "Silk & Loungewear",
      price: 1650,
      image: "./images/prod-5.webp",
      desc: "Rich silk-velvet lounging coat featuring gilded floral botanical motifs hand-embroidered by atelier artisans over 40 hours.",
      fabric: "Silk-Rayon Velvet & Mulberry Lining (Kyoto)",
      colors: ["Emerald Grove", "Midnight", "Burgundy"],
      sizes: ["Petite (XS/S)", "Standard (M/L)"]
    },
    {
      id: "prod-6",
      name: "Ivory Structured Trench Coat",
      category: "outerwear",
      categoryName: "Tailored Outerwear",
      price: 1950,
      image: "./images/prod-6.webp",
      desc: "Architectural storm flaps, horn buckle closures, and weatherproof gabardine tailored for timeless transitions.",
      fabric: "Water-Repellent Mercerized Cotton",
      colors: ["Ivory Bone", "Classic Khaki", "Onyx"],
      sizes: ["XS", "S", "M", "L", "XL"]
    },
    {
      id: "prod-7",
      name: "Emerald Silk Satin Slip Gown",
      category: "dresses",
      categoryName: "Silk Slips",
      price: 1480,
      image: "./images/prod-7.webp",
      desc: "Bias-cut cowl neckline with criss-cross delicate rouleau back straps and liquid drape.",
      fabric: "100% Heavy Mulberry Silk Charmeuse",
      colors: ["Emerald Jewel", "Black Pearl", "Champagne"],
      sizes: ["XXS", "XS", "S", "M", "L"]
    },
    {
      id: "prod-8",
      name: "Architectural Boned Corset Bustier",
      category: "tops",
      categoryName: "Corsets & Tops",
      price: 1250,
      image: "./images/prod-8.webp",
      desc: "Internal spiral steel boning with hand-gathered French chantilly lace and sculpted sweetheart neckline.",
      fabric: "Silk Duchesse Satin & Chantilly Lace",
      colors: ["Noir", "Ivory Cream"],
      sizes: ["XS", "S", "M", "L"]
    }
  ];

  // Expose Catalog Globally
  window.BOUTIQUE_CATALOG = BOUTIQUE_CATALOG;

  // --- 2. State & Storage ---
  let cart = JSON.parse(localStorage.getItem("stackly_cart") || "[]");
  let wishlist = JSON.parse(localStorage.getItem("stackly_wishlist") || "[]");

  // --- 3. 3 Color Palettes Engine ---
  window.switchPalette = function (themeName) {
    if (!["meshki", "royal", "rose"].includes(themeName)) {
      themeName = "meshki";
    }
    document.documentElement.setAttribute("data-theme", themeName);
    localStorage.setItem("stackly_theme_palette", themeName);

    // Update active state on palette switcher buttons
    document.querySelectorAll(".palette-btn").forEach((btn) => {
      if (btn.getAttribute("data-palette") === themeName) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    // Update Nav & Footer Logos based on active palette
    document.querySelectorAll(".nav-logo-img, .preloader-logo-img").forEach((img) => {
      if (themeName === "rose") {
        img.src = "./images/logo-pink.webp";
      } else if (themeName === "royal") {
        img.src = "./images/logo-purple.webp";
      } else {
        img.src = "./images/logo-header-yellow.webp";
      }
    });

    document.querySelectorAll(".footer-logo-img").forEach((img) => {
      if (themeName === "rose") {
        img.src = "./images/logo-footer-pink.webp";
      } else if (themeName === "royal") {
        img.src = "./images/logo-footer-purple.webp";
      } else {
        img.src = "./images/logo-footer-white.webp";
      }
    });

    const themeTitles = {
      meshki: "MESHKI Sunlit Gold & Noir",
      royal: "Royal Amethyst & Indigo",
      rose: "Rose Quartz & Champagne Blush"
    };
    window.showToast(`Color Palette Switched: ${themeTitles[themeName]}`, "🎨");
  };

  // Toast Notification
  window.showToast = function (msg, icon = "✓") {
    let container = document.getElementById("toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "toast-container";
      container.className = "toast-box";
      document.body.appendChild(container);
    }
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `<span style="color:var(--accent);font-weight:bold">${icon}</span><span>${msg}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(10px)";
      toast.style.transition = "all 0.3s ease";
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  };

  // --- 4. Cart & Wishlist Operations ---
  window.selectCardSize = function (btn) {
    if (!btn) return;
    const parent = btn.parentElement;
    if (parent) {
      parent.querySelectorAll(".size-pill").forEach((b) => b.classList.remove("active"));
    }
    btn.classList.add("active");
    const sizeName = btn.textContent.trim();
    window.showToast(`Selected size: ${sizeName}`, "✓");
  };

  window.filterShowcase = function (category) {
    const buttons = document.querySelectorAll("#showcase-filters [data-cat-filter]");
    buttons.forEach((btn) => {
      if (btn.getAttribute("data-cat-filter") === category) {
        btn.classList.add("active");
        btn.classList.remove("btn--ghost");
      } else {
        btn.classList.remove("active");
        btn.classList.add("btn--ghost");
      }
    });

    const cards = document.querySelectorAll("#main-product-grid .prod-card");
    cards.forEach((card) => {
      const cardCats = (card.getAttribute("data-category") || "").split(" ");
      if (category === "all" || cardCats.includes(category)) {
        card.style.display = "flex";
        card.style.opacity = "1";
      } else {
        card.style.display = "none";
      }
    });

    const showcase = document.getElementById("showcase");
    if (showcase) {
      showcase.scrollIntoView({ behavior: "smooth" });
    }
  };

  window.addToCart = function (id, qty = 1, size = null, color = null) {
    const item = BOUTIQUE_CATALOG.find((p) => p.id === id);
    if (!item) return;

    let chosenSize = size;
    if (!chosenSize) {
      const card = document.querySelector(`[data-prod-id="${id}"]`) || document.querySelector(`[data-wish-btn="${id}"]`)?.closest(".prod-card");
      const activePill = card?.querySelector(".size-pill.active");
      chosenSize = activePill ? activePill.textContent.trim() : (item.sizes ? item.sizes[0] : "Standard");
    }

    const chosenColor = color || item.colors[0];
    const existing = cart.find(
      (c) => c.id === id && c.size === chosenSize && c.color === chosenColor
    );

    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        size: chosenSize,
        color: chosenColor,
        qty: qty
      });
    }

    localStorage.setItem("stackly_cart", JSON.stringify(cart));
    updateCartUI();
    window.showToast(`Added "${item.name}" (${chosenSize}) to your bag.`, "🛍️");
    openCart();
  };

  window.removeFromCart = function (index) {
    cart.splice(index, 1);
    localStorage.setItem("stackly_cart", JSON.stringify(cart));
    updateCartUI();
  };

  window.updateCartQty = function (index, delta) {
    if (!cart[index]) return;
    cart[index].qty += delta;
    if (cart[index].qty <= 0) {
      cart.splice(index, 1);
    }
    localStorage.setItem("stackly_cart", JSON.stringify(cart));
    updateCartUI();
  };

  window.toggleWishlist = function (id) {
    window.location.href = './404.html';
  };

  function updateWishlistUI() {
    const countElems = document.querySelectorAll("[data-wishlist-count]");
    countElems.forEach((el) => {
      el.textContent = wishlist.length;
      el.style.display = wishlist.length > 0 ? "flex" : "none";
    });

    document.querySelectorAll("[data-wish-btn]").forEach((btn) => {
      const id = btn.getAttribute("data-wish-btn");
      if (wishlist.includes(id)) {
        btn.classList.add("active");
        btn.style.color = "#E52D27";
      } else {
        btn.classList.remove("active");
        btn.style.color = "#111114";
      }
    });
  }

  function updateCartUI() {
    const countElems = document.querySelectorAll("[data-cart-count]");
    const totalQty = cart.reduce((acc, c) => acc + c.qty, 0);
    countElems.forEach((el) => {
      el.textContent = totalQty;
      el.style.display = totalQty > 0 ? "flex" : "none";
    });

    const itemsContainer = document.getElementById("cart-items-list");
    const subtotalEl = document.getElementById("cart-subtotal-val");
    if (!itemsContainer) return;

    if (cart.length === 0) {
      itemsContainer.innerHTML = `
        <div style="text-align:center;padding:50px 20px;color:var(--text-muted)">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" style="margin:0 auto 16px;color:var(--accent)">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          <p style="font-family:var(--font-serif);font-size:1.15rem;color:var(--text);margin-bottom:6px">Your shopping bag is empty</p>
          <p style="font-size:0.85rem">Explore our new MESHKI-inspired collection and reserve your bespoke garments.</p>
        </div>
      `;
      if (subtotalEl) subtotalEl.textContent = "$0";
      return;
    }

    let subtotal = 0;
    itemsContainer.innerHTML = cart
      .map((item, index) => {
        const itemTotal = item.price * item.qty;
        subtotal += itemTotal;
        return `
          <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" />
            <div>
              <div style="font-weight:600;font-size:0.92rem;color:var(--text)">${item.name}</div>
              <div style="font-size:0.78rem;color:var(--text-muted);margin-top:2px">${item.size} • ${item.color}</div>
              <div style="font-weight:700;color:var(--text);margin-top:4px">$${item.price.toLocaleString()}</div>
              <div style="display:flex;align-items:center;gap:8px;border:1px solid #DCDCE2;border-radius:999px;padding:2px 8px;margin-top:6px;width:fit-content">
                <button type="button" onclick="window.updateCartQty(${index}, -1)">−</button>
                <span style="font-size:0.85rem;font-weight:600">${item.qty}</span>
                <button type="button" onclick="window.updateCartQty(${index}, 1)">+</button>
              </div>
            </div>
            <button class="icon-btn" style="width:30px;height:30px;border:none" onclick="window.removeFromCart(${index})">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>
        `;
      })
      .join("");

    if (subtotalEl) {
      subtotalEl.textContent = "$" + subtotal.toLocaleString();
    }
  }

  function openCart() {
    const drawer = document.getElementById("cart-drawer");
    const overlay = document.getElementById("overlay");
    if (drawer) {
      drawer.classList.add("open");
      if (overlay) overlay.classList.add("open");
      document.body.classList.add("no-scroll");
    }
  }

  // Checkout simulation — used by pages that call window.checkoutAlert()
  window.checkoutAlert = function () {
    const cart = JSON.parse(localStorage.getItem("stackly_cart") || "[]");
    if (cart.length === 0) {
      window.showToast("Your shopping bag is empty.", "!");
      return;
    }
    window.showToast("Initiating VIP Checkout...", "🔒");
    setTimeout(() => {
      window.location.href = "./dashboard.html?role=user&tab=orders";
    }, 1200);
  };

  function closeAllDrawers() {
    document.querySelectorAll(".drawer, .cart-drawer, .search-panel, .modal-wrap").forEach((el) => {
      el.classList.remove("open");
    });
    const overlay = document.getElementById("overlay");
    if (overlay) overlay.classList.remove("open");
    document.body.classList.remove("no-scroll");
  }

  // --- 5. Quick View Modal Handler ---
  window.openQuickView = function (id) {
    const item = BOUTIQUE_CATALOG.find((p) => p.id === id);
    if (!item) return;

    let modal = document.getElementById("quickview-modal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "quickview-modal";
      modal.className = "modal-wrap";
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="modal-content">
        <button class="icon-btn modal-close" onclick="window.closeQuickView()" aria-label="Close dialog">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(320px, 1fr));gap:32px;padding:36px">
          <div>
            <img src="${item.image}" alt="${item.name}" style="width:100%;border-radius:14px;box-shadow:var(--card-shadow)" />
          </div>
          <div style="display:flex;flex-direction:column">
            <span class="eyebrow">${item.categoryName}</span>
            <h2 style="font-size:2rem;margin-top:8px">${item.name}</h2>
            <div style="font-size:1.6rem;color:var(--text);font-weight:700;margin-top:8px">$${item.price.toLocaleString()}</div>
            <p style="margin-top:14px;line-height:1.7">${item.desc}</p>
            
            <div style="margin-top:20px;padding:12px 16px;background:var(--paper-2);border-left:3px solid var(--accent);border-radius:6px">
              <span style="font-size:0.75rem;text-transform:uppercase;letter-spacing:0.1em;color:var(--accent);font-weight:700">Fabric & Origin</span>
              <p style="font-size:0.85rem;color:var(--text);margin-top:2px">${item.fabric}</p>
            </div>

            <div style="margin-top:24px">
              <label style="display:block;font-size:0.8rem;text-transform:uppercase;letter-spacing:0.1em;color:var(--text-muted);margin-bottom:8px">Select Size</label>
              <div style="display:flex;gap:8px;flex-wrap:wrap">
                ${item.sizes.map((s, i) => `
                  <button type="button" class="size-pill ${i === 0 ? "active" : ""}" onclick="selectVariant(this)">${s}</button>
                `).join("")}
              </div>
            </div>

            <div style="display:flex;gap:12px;margin-top:32px;flex-wrap:wrap">
              <button class="btn btn--block" style="flex:1" onclick="window.addToCart('${item.id}');window.closeQuickView();">
                <span>Add to Shopping Bag</span>
              </button>
              <a href="./product-details.html?id=${item.id}" class="btn btn--ghost" style="padding:10px 16px;white-space:nowrap;display:inline-flex;align-items:center;justify-content:center" onclick="window.closeQuickView();">
                View Full Details
              </a>
              <button class="icon-btn" style="width:48px;height:48px" onclick="window.toggleWishlist('${item.id}')" aria-label="Add to wishlist">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    modal.classList.add("open");
    document.body.classList.add("no-scroll");
  };

  window.selectVariant = function (btn) {
    const parent = btn.parentElement;
    parent.querySelectorAll(".size-pill").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  };

  window.closeQuickView = function () {
    const modal = document.getElementById("quickview-modal");
    if (modal) modal.classList.remove("open");
    document.body.classList.remove("no-scroll");
  };

  // --- 6. GSAP Typography & Text Animations Engine ---
  function splitElementIntoWords(el) {
    if (!el || el.dataset.gsapSplit === "true") return el ? el.querySelectorAll(".gsap-word") : [];
    const text = el.textContent.trim();
    if (!text) return [];
    
    // Set accessibility aria-label to preserve original reading
    if (!el.getAttribute("aria-label")) {
      el.setAttribute("aria-label", text);
    }
    
    const words = text.split(/\s+/);
    el.innerHTML = words.map(function(word) {
      return '<span class="gsap-text-masked"><span class="gsap-word">' + word + '</span></span>';
    }).join(" ");
    
    el.dataset.gsapSplit = "true";
    return el.querySelectorAll(".gsap-word");
  }

  function initGSAPAnimations() {
    // 1. Baseline visibility safety guarantee
    document.querySelectorAll(".cat-card, .prod-card, .hero-content > *, .section-head, h1, h2, .eyebrow, .lead").forEach(function(el) {
      el.style.opacity = "1";
      el.style.visibility = "visible";
    });

    if (typeof gsap === "undefined") return;

    try {
      if (typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
      }

      // --- A. Cinematic Hero Typography Reveal ---
      var heroTitle = document.querySelector(".hero-title, .hero h1, main > section:first-of-type h1");
      if (heroTitle) {
        var words = splitElementIntoWords(heroTitle);
        var heroPill = document.querySelector(".hero-pill-tag");
        var heroLead = document.querySelector(".hero-content p.lead, .hero p");
        var heroCtas = document.querySelectorAll(".hero-content .btn, .hero-content .btn--ghost");

        var heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });

        if (heroPill) {
          heroTl.fromTo(
            heroPill,
            { opacity: 0, y: -16, scale: 0.9 },
            { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.6)" }
          );
        }

        if (words.length > 0) {
          heroTl.fromTo(
            words,
            { yPercent: 120, opacity: 0, rotate: 2 },
            { yPercent: 0, opacity: 1, rotate: 0, duration: 0.85, stagger: 0.05, clearProps: "transform" },
            "-=0.3"
          );
        }

        if (heroLead) {
          heroTl.fromTo(
            heroLead,
            { opacity: 0, y: 22 },
            { opacity: 1, y: 0, duration: 0.7 },
            "-=0.4"
          );
        }

        if (heroCtas.length > 0) {
          heroTl.fromTo(
            heroCtas,
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
            "-=0.4"
          );
        }
      }

      // --- B. Eyebrows Dynamic Stretched Letter-Spacing Reveal ---
      var eyebrows = document.querySelectorAll(".eyebrow");
      eyebrows.forEach(function(eyebrow) {
        if (typeof ScrollTrigger !== "undefined") {
          gsap.fromTo(
            eyebrow,
            { opacity: 0, letterSpacing: "0.04em", y: 14 },
            {
              opacity: 1,
              letterSpacing: "0.2em",
              y: 0,
              duration: 0.85,
              ease: "power2.out",
              scrollTrigger: {
                trigger: eyebrow,
                start: "top 92%",
                toggleActions: "play none none none"
              }
            }
          );
        }
      });

      // --- C. Section Headings (H2) Staggered Word Reveal ---
      var sectionHeadings = document.querySelectorAll(".section-head h2, .section h2, .wrap h2");
      sectionHeadings.forEach(function(h2) {
        if (h2.closest(".hero") || h2.closest("#luxury-preloader")) return;
        var words = splitElementIntoWords(h2);
        var subP = h2.nextElementSibling && (h2.nextElementSibling.tagName === "P" || h2.nextElementSibling.classList.contains("lead")) ? h2.nextElementSibling : null;

        if (typeof ScrollTrigger !== "undefined") {
          var tl = gsap.timeline({
            scrollTrigger: {
              trigger: h2,
              start: "top 88%",
              toggleActions: "play none none none"
            }
          });

          if (words.length > 0) {
            tl.fromTo(
              words,
              { yPercent: 110, opacity: 0 },
              { yPercent: 0, opacity: 1, duration: 0.75, stagger: 0.04, ease: "power3.out", clearProps: "transform" }
            );
          } else {
            tl.fromTo(h2, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" });
          }

          if (subP) {
            tl.fromTo(
              subP,
              { opacity: 0, y: 16 },
              { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
              "-=0.3"
            );
          }
        }
      });

      // --- D. Milestone / Statistics Counter Number Animations ---
      var statContainers = document.querySelectorAll(".section [style*='grid-template-columns'] > div");
      statContainers.forEach(function(card) {
        var numEl = Array.from(card.children).find(function(el) {
          var txt = el.textContent.trim();
          return /^[0-9]+[%Kk\+]?$/.test(txt) && parseInt(txt, 10) > 0;
        });
        if (!numEl) return;

        var rawText = numEl.textContent.trim();
        var match = rawText.match(/^([0-9]+)(.*)$/);
        if (match) {
          var targetNum = parseInt(match[1], 10);
          var suffix = match[2] || "";
          numEl.classList.add("stat-counter-val");

          if (typeof ScrollTrigger !== "undefined") {
            var counterObj = { val: 0 };
            gsap.to(counterObj, {
              val: targetNum,
              duration: 1.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
                toggleActions: "play none none none"
              },
              onUpdate: function () {
                numEl.textContent = Math.floor(counterObj.val) + suffix;
              }
            });
          }
        }
      });

      // --- E. Category Grid & Product Grid Card Reveals ---
      document.querySelectorAll(".category-grid").forEach(function(grid) {
        var cards = grid.querySelectorAll(".cat-card");
        if (cards.length > 0 && typeof ScrollTrigger !== "undefined") {
          gsap.fromTo(
            cards,
            { opacity: 0, y: 35, scale: 0.97 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.75,
              stagger: 0.1,
              ease: "power2.out",
              clearProps: "all",
              scrollTrigger: {
                trigger: grid,
                start: "top 85%",
                toggleActions: "play none none none"
              }
            }
          );
        }
      });

      document.querySelectorAll(".product-grid").forEach(function(grid) {
        var cards = grid.querySelectorAll(".prod-card");
        if (cards.length > 0 && typeof ScrollTrigger !== "undefined") {
          gsap.fromTo(
            cards,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.08,
              ease: "power2.out",
              clearProps: "all",
              scrollTrigger: {
                trigger: grid,
                start: "top 85%",
                toggleActions: "play none none none"
              }
            }
          );
        }
      });

      // --- F. Announcement Marquee Continuous Smooth Flow ---
      var marquee = document.querySelector(".announcement-bar .marquee-content, .topbar .topbar-inner");
      if (marquee) {
        gsap.fromTo(
          marquee,
          { opacity: 0, y: -8 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
        );
      }

    } catch (err) {
      console.warn("GSAP animation init non-critical notice:", err);
      // Guarantee fallback visibility
      document.querySelectorAll(".cat-card, .prod-card, .hero-content > *, .section-head, h1, h2, .eyebrow, .lead").forEach(function(el) {
        el.style.opacity = "1";
        el.style.visibility = "visible";
      });
    }
  }

  // --- 6. Luxury Preloader Engine (Stackly Logo Only) ---
  function initPreloader() {
    const preloader = document.getElementById("luxury-preloader");
    if (!preloader) {
      document.body.classList.remove("preloader-locked");
      initGSAPAnimations();
      return;
    }

    const logoImg = preloader.querySelector(".preloader-logo-img");
    const barFill = preloader.querySelector(".preloader-bar-fill");
    const content = preloader.querySelector(".preloader-content");

    // Sync logo color with theme palette if needed
    const currentTheme = document.documentElement.getAttribute("data-theme") || localStorage.getItem("stackly_theme_palette");
    if (logoImg) {
      if (currentTheme === "rose") {
        logoImg.src = "./images/logo-pink.webp";
      } else if (currentTheme === "royal") {
        logoImg.src = "./images/logo-purple.webp";
      } else {
        logoImg.src = "./images/logo-header-yellow.webp";
      }
    }

    const unlockBodyAndReveal = () => {
      document.body.classList.remove("preloader-locked");
      initGSAPAnimations();
      setTimeout(() => {
        if (preloader) {
          preloader.style.pointerEvents = "none";
          preloader.style.display = "none";
        }
      }, 500);
    };

    if (typeof gsap !== "undefined") {
      const tl = gsap.timeline({
        onComplete: unlockBodyAndReveal
      });

      if (logoImg) {
        tl.fromTo(logoImg, 
          { scale: 0.85, opacity: 0, y: 10 }, 
          { scale: 1, opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }
        );
      }

      if (barFill) {
        tl.fromTo(barFill,
          { width: "0%" },
          { width: "100%", duration: 0.65, ease: "power2.inOut" },
          "-=0.15"
        );
      }

      if (content) {
        tl.to(content, {
          y: -15,
          opacity: 0,
          duration: 0.25,
          ease: "power2.in"
        }, "+=0.06");
      }

      tl.to(preloader, {
        yPercent: -100,
        duration: 0.5,
        ease: "power3.inOut"
      }, "-=0.08");

    } else {
      setTimeout(() => {
        if (barFill) barFill.style.width = "100%";
        setTimeout(() => {
          preloader.style.transition = "transform 0.5s cubic-bezier(0.77, 0, 0.175, 1)";
          preloader.style.transform = "translateY(-100%)";
          setTimeout(unlockBodyAndReveal, 500);
        }, 350);
      }, 500);
    }
  }

  // --- 7. DOM Ready Initialization ---
  document.addEventListener("DOMContentLoaded", function () {
    // 0. Luxury Preloader Sequence
    initPreloader();

    // 1. Restore Color Palette
    const savedPalette = localStorage.getItem("stackly_theme_palette") || "meshki";
    window.switchPalette(savedPalette);

    // 2. Setup Cart & Wishlist
    updateCartUI();
    updateWishlistUI();

    // 4. SpringBoard Mobile Menu
    const burgerBtn = document.querySelector(".nav-burger");
    const mobileDrawer = document.getElementById("mobile-menu");
    const overlay = document.getElementById("overlay");

    function openMobileMenu() {
      if (!mobileDrawer) return;
      mobileDrawer.classList.remove("closing");
      mobileDrawer.classList.add("open");
      if (overlay) overlay.classList.add("open");
      document.body.classList.add("no-scroll");
      if (burgerBtn) burgerBtn.classList.add("menu-open");
      burgerBtn && burgerBtn.setAttribute("aria-expanded", "true");
    }

    function closeMobileMenu() {
      if (!mobileDrawer) return;
      mobileDrawer.classList.remove("open");
      mobileDrawer.classList.add("closing");
      if (overlay) overlay.classList.remove("open");
      if (burgerBtn) burgerBtn.classList.remove("menu-open");
      burgerBtn && burgerBtn.setAttribute("aria-expanded", "false");
      // Remove closing class after animation completes
      setTimeout(() => {
        mobileDrawer.classList.remove("closing");
        document.body.classList.remove("no-scroll");
      }, 380);
    }

    if (burgerBtn && mobileDrawer) {
      burgerBtn.addEventListener("click", () => {
        if (mobileDrawer.classList.contains("open")) {
          closeMobileMenu();
        } else {
          openMobileMenu();
        }
      });
    }

    // Drawer close button (X)
    document.querySelectorAll(".drawer-close").forEach((btn) => {
      btn.addEventListener("click", () => {
        closeMobileMenu();
        closeAllDrawers();
      });
    });

    if (overlay) {
      overlay.addEventListener("click", () => {
        closeMobileMenu();
        closeAllDrawers();
      });
    }

    // 5. Cart Drawer Toggles — handle both [data-cart-close] attribute and .cart-close class
    const cartOpenBtn = document.querySelector("[data-cart-open]");
    document.querySelectorAll("[data-cart-close], .cart-close").forEach((btn) => {
      btn.addEventListener("click", closeAllDrawers);
    });
    if (cartOpenBtn) {
      cartOpenBtn.addEventListener("click", openCart);
    }

    // 6. Checkout Simulation — #checkout-btn uses the centralized checkoutAlert
    const checkoutBtn = document.getElementById("checkout-btn");
    if (checkoutBtn) {
      checkoutBtn.addEventListener("click", window.checkoutAlert);
    }

    // 7. Promo code
    const promoBtn = document.getElementById("apply-promo");
    if (promoBtn) {
      promoBtn.addEventListener("click", () => {
        const inp = document.getElementById("promo-code-input");
        if (inp && inp.value.trim().toUpperCase() === "STACKLYVIP") {
          window.showToast("20% VIP Courtesy Applied!", "★");
        } else {
          window.showToast("Code: STACKLYVIP", "i");
        }
      });
    }

    // 8. Newsletter Forms
    document.querySelectorAll(".newsletter-form").forEach((form) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const inp = form.querySelector("input[type='email']");
        if (inp && inp.value) {
          window.showToast("Welcome to STACKLY VIP Circle!", "✦");
          inp.value = "";
        }
      });
    });

    // 9. Escape key listener
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeMobileMenu();
        closeAllDrawers();
      }
    });

    // 10. Wobble Card IntersectionObserver — fires on scroll into view
    (function initWobbleCards() {
      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      if (!("IntersectionObserver" in window)) return;

      // Target card selectors
      const CARD_SELECTORS = [
        ".prod-card",
        ".cat-card",
        ".blog-card",
        ".service-card-item",
        ".feature-card"
      ].join(", ");

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !entry.target.dataset.wobbled) {
              entry.target.dataset.wobbled = "1";
              // Add wobble class — CSS handles the animation
              entry.target.classList.add("wobble-enter");
              // Clean up class after animation
              entry.target.addEventListener("animationend", () => {
                entry.target.classList.remove("wobble-enter");
              }, { once: true });
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -40px 0px"
        }
      );

      // Observe all existing cards
      document.querySelectorAll(CARD_SELECTORS).forEach((card) => {
        observer.observe(card);
      });

      // Re-observe dynamically generated cards (e.g., shop page filters)
      const mutObs = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType !== 1) return;
            if (node.matches && node.matches(CARD_SELECTORS)) {
              observer.observe(node);
            }
            // Also check children
            node.querySelectorAll && node.querySelectorAll(CARD_SELECTORS).forEach((child) => {
              observer.observe(child);
            });
          });
        });
      });

      mutObs.observe(document.body, { childList: true, subtree: true });
    })();
  });
})();
