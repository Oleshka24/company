// Баннер - Кнопка

function mute(btn,elem){
    let video = document.getElementById(elem);
    if (video.muted){
      video.muted = false;
      $(btn).toggleClass('banner__button--active');
    } else{
      video.muted = true;
      $(btn).toggleClass('banner__button--active');
    }
  }

 mute($('banner__button'), 'banner__bg')

// Отзывы - Карусель
go();
window.addEventListener('resize', go);
function go() {	
	if($(window).width() > 768) {
		$('.reviews__list').trigger('destroy.owl.carousel');
		$('.reviews__item').removeClass('reviews__item--active');

		if($('.reviews__nav').length === 0) {
			$('.reviews__list').after(`
				<menu class="reviews__nav">
					<button class="reviews__dot"></button>
					<button class="reviews__dot"></button>
					<button class="reviews__dot"></button>
				</menu>
			`)
		}

		function Carousel(block, element) {
			const 	reviewCurrent = block + '__' + element + '--active',
					reviewPrev = block + '__' + element + '--left',
					reviewNext = block + '__' + element + '--right',
					reviewItem = $('.' + block + '__' + element),

					reviewDot = block + '__' + 'dot',
					reviewDotCurrent = block + '__' + 'dot' + '--active';

			reviewItem.addClass(reviewNext);

			$(reviewItem[0]).addClass(reviewPrev);
			$(reviewItem[0]).removeClass(reviewNext);

			$(reviewItem[1]).addClass(reviewCurrent);
			$(reviewItem[1]).removeClass(reviewNext);

			$($('.' + reviewDot)[1]).addClass(reviewDotCurrent);

			$('.' + reviewDot).click(function() {
				$('.' + reviewDot).removeClass(reviewDotCurrent);
				$(this).addClass(reviewDotCurrent);

				$(reviewItem[$(this).index()]).click();
			});

			reviewItem.click(function() {

				if ($(this).hasClass(reviewPrev)) {

					$('.' + reviewNext).addClass(reviewPrev);
					$('.' + reviewNext).removeClass(reviewNext);

					$('.' + reviewCurrent).addClass(reviewNext);
					$('.' + reviewCurrent).removeClass(reviewCurrent);

					$(this).addClass(reviewCurrent);
					$(this).removeClass(reviewPrev);

				} else if ($(this).hasClass(reviewNext)) {

					$('.' + reviewPrev).addClass(reviewNext);
					$('.' + reviewPrev).removeClass(reviewPrev);

					$('.' + reviewCurrent).addClass(reviewPrev);
					$('.' + reviewCurrent).removeClass(reviewCurrent);
					
					$(this).addClass(reviewCurrent);
					$(this).removeClass(reviewNext);

				}

				let zIndex = $(this).css('z-index') - 1;
				$(this).css('z-index', zIndex);

				if($(this).index() < 3) {
					$($('.' + reviewDot)[$(this).index()]).click();
				}
			});
		};

		Carousel('reviews', 'item');
	} else {
		$('.reviews__item').addClass('reviews__item--active');
		$('.reviews__item').removeClass('reviews__item--left');
		$('.reviews__item').removeClass('reviews__item--right');
		$('.reviews__dot').removeClass('reviews__dot--active');

		$('.reviews__list').owlCarousel({
			items: 1,
			loop: true,
			nav: false,
			dots: true,
			dotClass: "reviews__dot",
			dotsContainer: $(".reviews__nav"),
		});

		// Owl Fix

		$('.owl-stage-outer').css('overflow', 'hidden');
		$('.owl-stage').css('display', 'flex');
		$('.disabled').remove();
	}
}

// Отзывы - Кнопка

const	reviewBtn = $('.reviews__item-btn'),
		reviewDescr = $('.reviews__item-description');

reviewBtn.click(function() {
	$(this).toggleClass('reviews__item-btn--active');
	if($(this).hasClass('reviews__item-btn--active')) {
		$(this).parents('.reviews__item').find(reviewDescr).addClass('reviews__item-description--active');
		$(this).text('свернуть');
	} else {
		$(this).parents('.reviews__item').find(reviewDescr).removeClass('reviews__item-description--active');
		$(this).text('читать еще');
	}
});

// Контакты - Текстовые Поля

const	contactInput = $('.contacts__input--current'),
		contactSubmit = $('.contacts__submit');

function validateForm() {
	for (let i = 0; contactInput.length > i; i++) {
		if ($(contactInput[i]).val() != '') {
			$(contactInput[i]).removeClass('contacts__input--error');
			valid - true;
		} else {
			$(contactInput[i]).addClass('contacts__input--error');
			valid = false;
			$(contactInput[i]).val('Поле обязательно для заполнения');
		}
	}

	return valid;
}