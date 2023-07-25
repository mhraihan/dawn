var announcementbar = {
  init: function () {
    var $tickerWrapper = $(".tickerwrapper");
    var $list = $tickerWrapper.find("ul.list");
    var $clonedList = $list.clone();
    var listWidth = 10;

    $list.find("li").each(function (i) {
      listWidth += $(this, i).outerWidth(true);
    });

    var endPos = $tickerWrapper.width() - listWidth;

    $list.add($clonedList).css({
      width: listWidth + "px",
    });

    $clonedList.addClass("cloned").appendTo($tickerWrapper);

    //TimelineMax
    var infinite = new TimelineMax({ repeat: -1, paused: true });
    var time = 200;

    infinite
      .fromTo(
        $list,
        time,
        { rotation: 0.01, x: 0 },
        { force3D: true, x: -listWidth, ease: Linear.easeNone },
        0
      )
      .fromTo(
        $clonedList,
        time,
        { rotation: 0.01, x: listWidth },
        { force3D: true, x: 0, ease: Linear.easeNone },
        0
      )
      .set($list, { force3D: true, rotation: 0.01, x: listWidth })
      .to(
        $clonedList,
        time,
        { force3D: true, rotation: 0.01, x: -listWidth, ease: Linear.easeNone },
        time
      )
      .to(
        $list,
        time,
        { force3D: true, rotation: 0.01, x: 0, ease: Linear.easeNone },
        time
      )
      .progress(1)
      .progress(0)
      .play();

    //Pause/Play
    // $tickerWrapper
    //   .on("mouseenter", function () {
    //     infinite.pause();
    //   })
    //   .on("mouseleave", function () {
    //     infinite.play();
    //   });
  },
};

setTimeout(() => {
  //   console.log("1000");
  $(".nav--mobile .grandparent > .nav__link").on("click", function (e) {
    // console.log("mobile");
    e.preventDefault();
    $(this)
      .closest(".nav--mobile .grandparent")
      .toggleClass("main-menu--expanded");
    $("body").toggleClass("mobile-menu-opened");
  });
}, 500);

$(function () {
  announcementbar.init();
  $(".image-slider").slick({
    centerMode: true,
    centerPadding: "28%",
    dots: true,
    infinite: true,
    slidesToShow: 1,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "0px",
          slidesToShow: 1,
        },
      },
    ],
  });

  $(".line-button").on("click", function (e) {
    e.preventDefault();
    $(this).toggleClass("active");
  });

  // $(".thumbnails.cc-carousel__scroll-area").slick({
  //   infinite: true,
  //   slidesToShow: 6,
  //   slidesToScroll: 1,
  //   arrows: false,
  //   dots: false,
  //   vertical: true,
  //   rows: 1,
  // });

  $(".mh-review").on("click", function () {
    $("html,body").animate(
      {
        scrollTop: $(".section-apps").offset().top,
      },
      1000
    );
  });

  $(".cross_sell_dropdown_pill_component").on("click", function (e) {
    e.preventDefault();
    $(this).toggleClass("active");
    $(".cross_sell_color_select_component").fadeToggle();
  });
  $(".cross_sell_color_select_component input.opt-btn").on(
    "change",
    function () {
      $(".cross_sell_dropdown_pill_component > span").text($(this).val());
    }
  );
  $(".product_description_link").on("click", function (e) {
    var btnText = $(this).find(".button_text");
    $(btnText).text(
      $(btnText).text() == "Read more" ? "Read less" : "Read more"
    );
    var clearSetTimeout;
    if ($(btnText).text() == "Read more") {
      $("html,body").animate(
        {
          scrollTop: $("body").offset().top,
        },
        300
      );
      clearSetTimeout = setTimeout(
        () => $(".short-description,.long-description").toggleClass("hidden"),
        300
      );
    } else {
      clearTimeout(clearSetTimeout);
      $(".short-description,.long-description").toggleClass("hidden");
    }
  });

  $(".btn-go-product-shop").on("click", function () {
    $("html,body").animate(
      {
        scrollTop:
          $("#product-shop").offset().top - $(".empty-heading").height() - 30,
      },
      1000
    );
  });

  // custom row videos
  if (document.body.classList.contains("template-product")) {
    setTimeout(() => {
      $(".mh-custom-row-video").each(function () {
        this.play();
      });
    }, 500);
  }
});
