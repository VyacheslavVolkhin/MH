//fancybox
Fancybox.bind("[data-fancybox]", {
	//settings
});


//js popup wrap
const togglePopupButtons = document.querySelectorAll('.js-btn-popup-toggle')
const closePopupButtons = document.querySelectorAll('.js-btn-popup-close')
const popupElements = document.querySelectorAll('.js-popup-wrap')
const wrapWidth = document.querySelector('.wrap').offsetWidth
const bodyElem = document.querySelector('body')
function popupElementsClear() {
	document.body.classList.remove('menu-show')
	document.body.classList.remove('filter-show')
	document.body.classList.remove('search-show')
	popupElements.forEach(element => element.classList.remove('popup-right'))
}
function popupElementsClose() {
	togglePopupButtons.forEach(element => {
		if (!element.closest('.no-close')) {
			element.classList.remove('active')
		}
	})
}
function popupElementsContentPositionClass() {
	popupElements.forEach(element => {
		let pLeft = element.offsetLeft
		let pWidth = element.querySelector('.js-popup-block').offsetWidth
		let pMax = pLeft + pWidth;
		if (pMax > wrapWidth) {
			element.classList.add('popup-right')
		} else {
			element.classList.remove('popup-right')
		}
	})
}
for (i = 0; i < togglePopupButtons.length; i++) {
	togglePopupButtons[i].addEventListener('click', function (e) {
		popupElementsClear()
		if (this.classList.contains('active')) {
			this.classList.remove('active')
		} else {
			popupElementsClose()
			this.classList.add('active')
			if (this.closest('.popup-menu-wrap')) {
				document.body.classList.add('menu-show')
			}
			if (this.closest('.popup-search-wrap')) {
				document.body.classList.add('search-show')
			}
			if (this.closest('.popup-filter-wrap')) {
				document.body.classList.add('filter-show')
			}
			popupElementsContentPositionClass()
		}
		e.preventDefault()
		e.stopPropagation()
		return false
	})
}
for (i = 0; i < closePopupButtons.length; i++) {
	closePopupButtons[i].addEventListener('click', function (e) {
		popupElementsClear()
		popupElementsClose()
		e.preventDefault()
		e.stopPropagation()
		return false;
	})
}
document.onclick = function (event) {
	if (!event.target.closest('.js-popup-block')) {
		popupElementsClear()
		popupElementsClose()
	}
}
popupElements.forEach(element => {
	if (element.classList.contains('js-popup-select')) {
		let popupElementSelectItem = element.querySelectorAll('.js-popup-block li a')
		if (element.querySelector('.js-popup-block .active')) {
			element.classList.add('select-active')
			let popupElementActive = element.querySelector('.js-popup-block .active').innerHTML
			let popupElementButton = element.querySelector('.js-btn-popup-toggle')
			popupElementButton.innerHTML = ''
			popupElementButton.insertAdjacentHTML('beforeend', popupElementActive)
		} else {
			element.classList.remove('select-active')
		}
		for (i = 0; i < popupElementSelectItem.length; i++) {
			popupElementSelectItem[i].addEventListener('click', function (e) {
				this.closest('.js-popup-wrap').classList.add('select-active')
				if (this.closest('.js-popup-wrap').querySelector('.js-popup-block .active')) {
					this.closest('.js-popup-wrap').querySelector('.js-popup-block .active').classList.remove('active')
				}
				this.classList.add('active')
				let popupElementActive = element.querySelector('.js-popup-block .active').innerHTML
				let popupElementButton = element.querySelector('.js-btn-popup-toggle')
				popupElementButton.innerHTML = ''
				popupElementButton.insertAdjacentHTML('beforeend', popupElementActive)
				popupElementsClear()
				popupElementsClose()
				if (!this.closest('.js-tabs-nav')) {
					e.preventDefault()
					e.stopPropagation()
					return false
				}
			})
		}
	}
})


//js tabs
const tabsNav = document.querySelectorAll('.js-tabs-nav')
const tabsBlocks = document.querySelectorAll('.js-tab-block')
const tabsButtonTitle = document.querySelectorAll('.js-tab-title')
const tabsButtonContent = document.querySelectorAll('.js-tab-content')
function tabsActiveStart() {
	for (iTab = 0; iTab < tabsBlocks.length; iTab++) {
		if (tabsBlocks[iTab].classList.contains('active')) {
			tabsBlocks[iTab].classList.remove('active')
		}
	}
	for (i = 0; i < tabsNav.length; i++) {
		let tabsNavElements = tabsNav[i].querySelectorAll('[data-tab]')
		for (iElements = 0; iElements < tabsNavElements.length; iElements++) {
			if (tabsNavElements[iElements].classList.contains('active')) {
				let tabsNavElementActive = tabsNavElements[iElements].dataset.tab
				for (j = 0; j < tabsBlocks.length; j++) {
					if (tabsBlocks[j].dataset.tab.toString().indexOf(tabsNavElementActive) > -1) {
						tabsBlocks[j].classList.add('active')
					}
				}
			}
		}
	}
	
}
for (i = 0; i < tabsButtonTitle.length; i++) {
	tabsButtonTitle[i].addEventListener('click', function (e) {
		this.classList.toggle('active')
		e.preventDefault()
		e.stopPropagation()
		return false
	})
}
for (i = 0; i < tabsNav.length; i++) {
	tabsNav[i].addEventListener('click', function (e) {
		if (e.target.closest('.js-tab-button[data-tab]')) {
			let tabsNavElements = this.querySelector('.js-tab-button[data-tab].active')
			tabsNavElements ? tabsNavElements.classList.remove('active') : false
			e.target.closest('.js-tab-button[data-tab]').classList.add('active')
			tabsActiveStart()
			e.preventDefault()
			e.stopPropagation()
			return false
		}
	})
}
tabsActiveStart()

// Popups
let popupCurrent;
let popupsList = document.querySelectorAll('.popup-outer-box')

document.querySelectorAll(".js-popup-open").forEach(function (element) {
  element.addEventListener("click", function (e) {
	document.querySelector(".popup-outer-box").classList.remove("active");
	document.body.classList.add("popup-open");

	popupCurrent = this.getAttribute("data-popup");
	document
	  .querySelector(
		`.popup-outer-box[id="${popupCurrent}"
		]`
	  )
	  .classList.add("active");

	e.preventDefault();
	e.stopPropagation();
	return false;
	});
});
document.querySelectorAll(".js-popup-close").forEach(function (element) {
  element.addEventListener("click", function (event) {
	document.body.classList.remove("popup-open");
	for (i=0;i<popupsList.length;i++) {
		popupsList[i
			].classList.remove("active");
		}
	event.preventDefault();
	event.stopPropagation();
	});
});
document.querySelectorAll(".popup-outer-box").forEach(function (element) {
  element.addEventListener("click", function (event) {
	if (!event.target.closest(".popup-box")) {
	  document.body.classList.remove("popup-open");
	  document.body.classList.remove("popup-open-scroll");
	  document.querySelectorAll(".popup-outer-box").forEach(function (e) {
		e.classList.remove("active");
			});
	  return false;
		}
	});
});


//slider tabs thumbs preview
const swiperTabsPreview = new Swiper(".slider-tabs-thumbs .swiper", {
  loop: false,
  slidesPerView: 1,
  spaceBetween: 0,
  threshold: 5,
  watchSlidesVisibility: true,
  watchSlidesProgress: true,
  freeMode: false,
  navigation: {
    nextEl: ".button-slider-tabs-thumbs-next",
    prevEl: ".button-slider-tabs-thumbs-prev",
  },

  breakpoints: {
    1024: {
      slidesPerView: 4,
    },
  },
  on: {
    slideChange: function(swiper) {
		swiperTabsMain.slideTo(swiper.activeIndex, 1000)
	}
  },
});
//slider tabs thumbs main
const swiperTabsMain = new Swiper(".slider-tabs-main .swiper", {
  loop: false,
  slidesPerView: 1,
  spaceBetween: 0,
  autoHeight: true,
  speed: 400,
  threshold: 5,
  freeMode: false,
  watchSlidesProgress: true,
  navigation: {
    nextEl: ".button-slider-tabs-main-next",
    prevEl: ".button-slider-tabs-main-prev",
  },

  pagination: {
    el: ".slider-tabs-pagination",
    clickable: true,
  },
  thumbs: {
    swiper: swiperTabsPreview,
  },
});




//slider tiles
const swiperSliderTiles = new Swiper(".slider-tiles .swiper", {
  loop: false,
  slidesPerView: 1,
  spaceBetween: 0,
  autoHeight: true,
  speed: 400,
  initialSlide: 3,
  pagination: {
    el: ".slider-tiles-pagination",
    clickable: true,
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".btn-action-ico.ico-arrow.ico-arrow-next.button-slider-tiles-next",
    prevEl: ".btn-action-ico.ico-arrow.ico-arrow-prev.button-slider-tiles-prev",
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
    },
    1400: {
      slidesPerView: 3,
    },
  },
});
let sliderTileAction = document.querySelectorAll(".item-tile-info-step");
for (i=0;i<sliderTileAction.length;i++) {
	sliderTileAction[i].addEventListener('click', function() {
		swiperSliderTiles.slideTo(this.dataset.index, 1000)
	})
}



//video
var player = videojs('my-player');
var options = {};

var player = videojs('my-player', options, function onPlayerReady() {
  videojs.log('Your player is ready!');

  // In this context, `this` is the player that was created by Video.js.
  this.play();

  // How about an event listener?
  this.on('ended', function() {
    videojs.log('Awww...over so soon?!');
  });
});