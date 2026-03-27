$(function () {
	let sliderTimer = null;
	let currentSliderSelector = '';

	function getActiveSliderSelector() {
		return window.matchMedia('(max-width: 767px)').matches ? '.sp-slider' : '.pc-slider';
	}

	function updateDots($dots, index) {
		$dots.removeClass('active').attr('aria-current', 'false');
		$dots.eq(index).addClass('active').attr('aria-current', 'true');
	}

	function stopSlider() {
		if (sliderTimer) {
			clearInterval(sliderTimer);
			sliderTimer = null;
		}
	}

	function startSlider(target) {
		const $slider = $(target);
		const $slides = $slider.find('.main-slide');
		const $dots = $('.slider-dots .dot');
		const total = $slides.length;
		let current = 0;

		if (total <= 1) return;

		$('.main-slide').removeClass('is-active');
		$slides.eq(0).addClass('is-active');
		updateDots($dots, 0);

		function showSlide(index) {
			$slides.removeClass('is-active');
			$slides.eq(index).addClass('is-active');
			updateDots($dots, index);
			current = index;
		}

		function restartAutoSlide() {
			stopSlider();
			sliderTimer = setInterval(function () {
				const next = (current + 1) % total;
				showSlide(next);
			}, 5500);
		}

		$dots.off('click.slider').on('click.slider', function () {
			const index = $(this).index();
			showSlide(index);
			restartAutoSlide();
		});

		restartAutoSlide();
	}

	function initResponsiveSlider() {
		const nextSelector = getActiveSliderSelector();

		if (currentSliderSelector === nextSelector) return;

		currentSliderSelector = nextSelector;
		stopSlider();
		startSlider(currentSliderSelector);
	}

	initResponsiveSlider();

	let resizeTimer = null;
	$(window).on('resize', function () {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(function () {
			initResponsiveSlider();
		}, 200);
	});

	const hamburger = document.querySelector('.hamburger');
	const nav = document.querySelector('.nav');

	if (hamburger && nav) {
		hamburger.addEventListener('click', function () {
			hamburger.classList.toggle('active');
			nav.classList.toggle('active');

			const expanded = hamburger.classList.contains('active');
			hamburger.setAttribute('aria-expanded', expanded ? 'true' : 'false');
		});

		document.querySelectorAll('.nav a').forEach(function (link) {
			link.addEventListener('click', function () {
				hamburger.classList.remove('active');
				nav.classList.remove('active');
				hamburger.setAttribute('aria-expanded', 'false');
			});
		});
	}
});