(() => {
	const hamburger = document.querySelector(".hamburger");
	const nav = document.querySelector(".nav");

	if (hamburger && nav) {
		const closeMenu = () => {
			hamburger.classList.remove("active");
			nav.classList.remove("active");
			hamburger.setAttribute("aria-expanded", "false");
			hamburger.setAttribute("aria-label", "メニューを開く");
		};

		hamburger.addEventListener("click", () => {
			const isOpen = hamburger.classList.toggle("active");
			nav.classList.toggle("active", isOpen);
			hamburger.setAttribute("aria-expanded", String(isOpen));
			hamburger.setAttribute("aria-label", isOpen ? "メニューを閉じる" : "メニューを開く");
		});

		nav.querySelectorAll("a").forEach((link) => {
			link.addEventListener("click", closeMenu);
		});

		document.addEventListener("keydown", (event) => {
			if (event.key === "Escape") closeMenu();
		});
	}

	const dots = Array.from(document.querySelectorAll(".slider-dots .dot"));
	let sliderTimer;
	let activeSlider;
	let currentIndex = 0;

	const getActiveSlider = () => {
		return window.matchMedia("(max-width: 767px)").matches
			? document.querySelector(".sp-slider")
			: document.querySelector(".pc-slider");
	};

	const showSlide = (index) => {
		if (!activeSlider) return;
		const slides = Array.from(activeSlider.querySelectorAll(".hero-slide"));
		if (!slides.length) return;

		currentIndex = index % slides.length;
		slides.forEach((slide, slideIndex) => {
			slide.classList.toggle("is-active", slideIndex === currentIndex);
		});
		dots.forEach((dot, dotIndex) => {
			const isActive = dotIndex === currentIndex;
			dot.classList.toggle("active", isActive);
			dot.setAttribute("aria-current", String(isActive));
		});
	};

	const startSlider = () => {
		window.clearInterval(sliderTimer);
		activeSlider = getActiveSlider();
		currentIndex = 0;
		showSlide(currentIndex);

		const slides = activeSlider ? activeSlider.querySelectorAll(".hero-slide") : [];
		if (slides.length <= 1) return;

		sliderTimer = window.setInterval(() => {
			showSlide(currentIndex + 1);
		}, 5500);
	};

	dots.forEach((dot, index) => {
		dot.addEventListener("click", () => {
			showSlide(index);
			startSlider();
			showSlide(index);
		});
	});

	startSlider();
	window.addEventListener("resize", startSlider);

	document.querySelectorAll(".faq-question").forEach((button) => {
		button.addEventListener("click", () => {
			const item = button.closest(".faq-item");
			const isOpen = item.classList.toggle("is-open");
			button.setAttribute("aria-expanded", String(isOpen));
		});
	});

	const revealTargets = document.querySelectorAll(".reveal");
	const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	if (reduceMotion || !("IntersectionObserver" in window)) {
		revealTargets.forEach((target) => target.classList.add("is-visible"));
		return;
	}

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("is-visible");
					observer.unobserve(entry.target);
				}
			});
		},
		{ threshold: 0.12 }
	);

	revealTargets.forEach((target) => observer.observe(target));
})();
