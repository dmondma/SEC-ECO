var rellax = new Rellax(".rellax", {
  //   speed: 4,
  //   center: false,
  //   wrapper: null,
  //   round: true,
  //   vertical: true,
  //   horizontal: false,
});

$(document).ready(function () {
  $(".more-serv-list-menu li").on("click", function () {
    if ($(this).hasClass("active")) return;

    const index = $(this).index();

    $(".more-serv-list-menu li").removeClass("active");
    $(this).addClass("active");

    const $tabs = $(".more-serv-descr .one-tab-serv");

    $tabs.stop(true, true).slideUp(0); // ховаємо всі

    // показуємо потрібну вкладку після затримки
    setTimeout(() => {
      $tabs.eq(index).stop(true, true).slideDown(400);
    }, 200);
  });

  $('.mob-tab-name').on('click', function () {
    const $tab = $(this).next('.one-tab-serv');
    const isOpen = $tab.is(':visible');

    // Закриваємо всі вкладки
    $('.one-tab-serv').slideUp();
    $('.mob-tab-name').removeClass('active');

    // Відкриваємо/закриваємо поточну
    if (!isOpen) {
      $tab.stop(true, true).slideDown();
      $(this).addClass('active');
    }
  });
});

$(document).ready(function () {
  const $svg = $(".map svg");
  let hideTimeout = null;
  let currentGroup = null;

  function positionBlock($g) {
    const id = $g.attr("id");
    const $dot = $g.find("path.dot");
    if ($dot.length === 0) return;

    const rect = $dot[0].getBoundingClientRect();
    const $map = $(".map");
    const mapRect = $map[0].getBoundingClientRect();

    const x = rect.left - mapRect.left + rect.width / 2;
    const y = rect.top - mapRect.top;

    const $block = $(`.hover-map-bl[data-obl="${id}"]`);
    if ($block.length) {
      const blockWidth = $block.outerWidth();
      const blockHeight = $block.outerHeight();

      $block.css({
        left: x - blockWidth / 2 + "px",
        top: y - blockHeight - 15 + "px",
        display: "block",
      });
    }
  }

  function showBlock($g) {
    clearTimeout(hideTimeout);

    const id = $g.attr("id");
    const $block = $(`.hover-map-bl[data-obl="${id}"]`);

    // Якщо вже показується потрібний блок — нічого не робимо
    if (currentGroup && currentGroup.attr("id") === id) return;

    // Запускаємо таймер на приховування попереднього блоку
    if (currentGroup) {
      const prevId = currentGroup.attr("id");
      const $prevBlock = $(`.hover-map-bl[data-obl="${prevId}"]`);
      $prevBlock.stop(true).fadeOut(200);
      $svg.find("g.active").removeClass("active");
    }

    currentGroup = $g;
    $g.addClass("active");
    positionBlock($g);
  }

  function scheduleHide() {
    clearTimeout(hideTimeout);
    hideTimeout = setTimeout(() => {
      $(".hover-map-bl").fadeOut(200);
      $svg.find("g.active").removeClass("active");
      currentGroup = null;
    }, 1000); // затримка на приховування при втраті фокусу
  }

  $svg.on("mouseenter", "g[id]", function () {
    clearTimeout(hideTimeout);
    showBlock($(this));
  });

  $svg.on("mouseleave", "g[id]", function () {
    scheduleHide();
  });

  $(".hover-map-bl").on("mouseenter", function () {
    clearTimeout(hideTimeout);
  });

  $(".hover-map-bl").on("mouseleave", function () {
    scheduleHide();
  });

  $(".hover-map-close").on("click", function () {
    $(this).closest(".hover-map-bl").fadeOut(200);
    $svg.find("g.active").removeClass("active");
    currentGroup = null;
  });

  $(window).on("resize", function () {
    if (currentGroup) {
      $(".hover-map-bl").hide();
      positionBlock(currentGroup);
    }
  });
});



$(document).ready(function () {
  // Відкрити меню
  $('.burger').on('click', function () {
    $('.group-menu').addClass('active');
    $('.bg-moadal-opened').fadeIn(200);
  });

  // Закрити меню
  $('.close-menu, .bg-moadal-opened').on('click', function () {
    $('.group-menu').removeClass('active');
    $('.bg-moadal-opened').fadeOut(200);
  });
});

if (window.innerWidth < 550 ) {
const swiper = new Swiper('.swiperMap', {
  // Optional parameters
  //direction: 'vertical',
  loop: true,
  slidesPerView: "auto",


});
}

AOS.init({
  //once: true, // Щоб один раз малювалось
});

function animateCounter(el, target, duration = 2000) {
  let startTime = null;

  function update(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const current = Math.floor(progress * target);
    el.textContent = current.toLocaleString();
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target.toLocaleString();
    }
  }

  requestAnimationFrame(update);
}

const counters = document.querySelectorAll('.counter');

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      if (!el.classList.contains('animated')) {
        el.classList.add('animated');
        const target = +el.getAttribute('data-target');
        animateCounter(el, target);
        observer.unobserve(el);
      }
    }
  });
}, { threshold: 0.6 });

counters.forEach(counter => observer.observe(counter));

var swiper = new Swiper(".mySwiperFeed", {
  loop: true,
  slidesPerView: "auto",
  pagination: {
    el: "#feed .pages_nav",
    type: "fraction",
  },
  navigation: {
    nextEl: "#feed .one-feed-arr.next",
    prevEl: "#feed .one-feed-arr.prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    769: {
      slidesPerView: "auto",
    }
  }
});

var swiper = new Swiper(".mySwiperTeam", {
  loop: true,
  slidesPerView: "auto",
  spaceBetween: 24,
  pagination: {
    el: "#team .pages_nav",
    type: "fraction",
  },
  navigation: {
    nextEl: "#team .one-feed-arr.next",
    prevEl: "#team .one-feed-arr.prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    769: {
      slidesPerView: "auto",
    }
  }
});

jQuery(document).ready(function($) {
  $('.faq-right-one-top').on('click', function() {
    const $current = $(this).parent();

    // Закриваємо всі відкриті
    $('.faq-right-one').not($current).removeClass('open').find('.faq-right-one-descr').slideUp(200);

    // Перемикаємо поточний
    $current.toggleClass('open');
    $current.find('.faq-right-one-descr').stop(true, true).slideToggle(200);
  });
});

$(".search-bt").on("click", function () {
  $('.search').show(0);
});
$(".search-close").on("click", function () {
  $('.search').hide(0);
});


$(document).ready(function() {
  $('.show-modal').on('click', function() {
    const modalId = $(this).data('modal');
    $('#' + modalId).addClass('show');
    $("body").addClass('showModal');
  });

  $('.modal').on('click', '.modal-close, .modal-overlay', function() {
    $(this).closest('.modal').removeClass('show');
    $("body").removeClass('showModal');
  });
});


$(document).ready(function () {
  const $menuItems = $('.serv-aside-list ul li');
  const offsetTop = 100;

  // Прокрутка при кліку
  $menuItems.click(function () {
    const target = $($(this).data('target'));

    if (target.length) {
      $('html, body').animate({
        scrollTop: target.offset().top - offsetTop
      }, 600);
    }

    $menuItems.removeClass('active');
    $(this).addClass('active');
  });

  // Активний пункт при скролі
  $(window).on('scroll', function () {
    let scrollPos = $(window).scrollTop() + offsetTop + 10;

    $('.one-serv-main').each(function (index) {
      const $section = $(this);
      const id = $section.attr('id');

      if ($section.offset().top <= scrollPos) {
        $menuItems.removeClass('active');
        $menuItems.filter(`[data-target="#${id}"]`).addClass('active');
      }
    });
  });
});

