/**
 * @file
 * The main javascript functionality for the FPWP Drupal theme.
 */

(function ($, Drupal, window, document, undefined) {

/**
 * Hover animation related code for the main homepage blocks.
 *
 * Adds a class to the body when hovering over certain blocks so that
 * animations can be added via CSS.
 */
Drupal.behaviors.fpwpHomepageHover = {
  attach: function(context, settings) {
    // Hover class for the left block.
    $('.region-home-row-1 .region-inner > div:first .button').once('homepage-hover').hover(function() {
      $('body').addClass('hover-left');
      $('body').addClass('hover-left-activated');
      $('body').removeClass('hover-right-activated');
    },
    function() {
      $('body').removeClass('hover-left');
    });
    // Hover class for the right block.
    $('.region-home-row-1 .region-inner > div:last .button').once('homepage-hover').hover(function() {
      $('body').addClass('hover-right');
      $('body').addClass('hover-right-activated');
      $('body').removeClass('hover-left-activated');
    },
    function() {
      $('body').removeClass('hover-right');
    });
  }
};

/**
 * Collapsible section for browse topics on the home page.
 */
Drupal.behaviors.fpwpTopicCollapse = {
  attach: function(context, settings) {
    // Set up the medis querying only once.
    $('body').once('topic-collapse', function() {
      // Define the media query where we switch between normal and collapsible.
      // It will be collapsible when this media query is active.
      var mediaQuery = window.matchMedia('(max-width: 1555px)');
      // Process it at runtime.
      processMediaquery(mediaQuery);
      // Process on resize.
      mediaQuery.addListener(processMediaquery);
    });

    /**
     * matchMedia listener.
     */
    function processMediaquery(mq) {
      if (mq.matches) {
        enableCollapsible();
      }
      else {
        disableCollapsible();
      }
    }

    /**
     * Enable collapsible topic section.
     */
    function enableCollapsible() {
      var $title = $('#block-views-topics-block .block-title');
      if (!$title.parent('a.topic-expander').length) {
        var $link = $('<a href="#" class="topic-expander"></a>');
        var $topics = $('#block-views-topics-block .view-topics');
        var menuActive = false;
        $link.click(function(e) {
          e.preventDefault();
          $topics.toggleClass('view-topics--hide');
        });
        $link.blur(function(e) {
          if (!menuActive) {
            $topics.addClass('view-topics--hide');
          }
        });
        $('a', $topics).mousedown(function(e) {
          menuActive = true;
        });
        $link.keydown(function(e) {
          menuActive = true;
        });
        $topics.mouseleave(function(e) {
          menuActive = false;
        });
        $title.wrap($link);
        $('#block-views-topics-block .view-topics').addClass('view-topics--hide');
      }
    }

    /**
     * Disable collapsible topic section.
     */
    function disableCollapsible() {
      var $title = $('#block-views-topics-block .block-title');
      if ($title.parent('a.topic-expander').length) {
        $title.unwrap('a.topic-expander');
        $('#block-views-topics-block .view-topics').removeClass('view-topics--hide');
      }
    }
  }
};

/**
 * Apply classes for mobile menu open/close state on click of menu buttons.
 */
Drupal.behaviors.fpwpMobileMenu = {
  attach: function(context, settings) {

    // When the mobile menu open link is clicked add the active class
    // so CSS can display the menu.
    $('.toggle-mobile', context).once('toggle-mobile').bind('touchstart click', function(event) {
      event.preventDefault();

      if ($('body').hasClass('mobile-nav--show')) {
        closeMenu();
      }
      else {
        openMenu();
      }
    });

    function openMenu() {
      if (!$('body').hasClass('mobile-nav--show')) {
        $('body').addClass('mobile-nav--show');
        $('.region-mobile-nav').attr('aria-hidden', 'false');
        $('.toggle-mobile').attr('title', 'Close mobile menu');
        $('.toggle-mobile .toggle-text').text('Close mobile menu');
      }
    }

    function closeMenu() {
      if ($('body').hasClass('mobile-nav--show')) {
        $('body').removeClass('mobile-nav--show');
        $('.region-mobile-nav').attr('aria-hidden', 'true');
        $('.toggle-mobile').attr('title', 'Open mobile menu');
        $('.toggle-mobile .toggle-text').text('Open mobile menu');
      }
    }

    // When the escape key is pressed and the menu is open close the menu.
    $(document).keyup(function(e) {
      if (e.keyCode == 27) {
        if ($('body').hasClass('mobile-nav--show')) {
          closeMenu();
          $('#main-content').focus();
        }
      }
    });
  }
};

/**
 * Slideout menu toggling functionality.
 */
Drupal.behaviors.fpwpSlideoutMenu = {
  attach: function(context, settings) {

    // When the slideout menu link is clicked add the active class
    // so CSS can display the menu.
    $('.toggle-slideout-menu', context).once('toggle-slideout-menu').bind('touchstart click', function(event) {
      event.preventDefault();

      if ($('body').hasClass('slideout-menu--show')) {
        closeMenu();
      }
      else {
        openMenu();
      }
    });

    // Close the menu after an item is selected.
    $('#slideout-menu li a', context).once('slideout-menu-item').bind('click', function(event) {
      closeMenu();
    });
    // Don't follow links for the active item.
    $('#slideout-menu li a.active', context).once('slideout-menu-active-item').bind('touchstart click', function(event) {
      event.preventDefault();
      closeMenu();
    });

    function openMenu() {
      if (!$('body').hasClass('slideout-menu--show')) {
        $('body').addClass('slideout-menu--show');
        $('#slideout-menu').attr('aria-hidden', 'false');
        $('.toggle-slideout-menu span').text('Close');
        // The close and open menu link is the same element so when you click
        // the close button and it animates away from the mouse cursor but if
        // the mouse hasn't moved then the element will still have the hover
        // state, so force a mousemove event to trigger the change in hover
        // state on the link so CSS transitions fire.
        $('body').trigger('mousemove');
      }
    }

    function closeMenu() {
      if ($('body').hasClass('slideout-menu--show')) {
        $('body').removeClass('slideout-menu--show');
        $('#slideout-menu').attr('aria-hidden', 'true');
        $('.toggle-slideout-menu span').text('Contents');
        // The close and open menu link is the same element so when you click
        // the close button and it animates away from the mouse cursor but if
        // the mouse hasn't moved then the element will still have the hover
        // state, so force a mousemove event to trigger the change in hover
        // state on the link so CSS transitions fire.
        $('body').trigger('mousemove');
      }
    }
  }
};

/**
 * Search block toggling functionality.
 */
Drupal.behaviors.fpwpSearchBlock = {
  attach: function(context, settings) {
    var searchBlock = $('#navigation #block-search-api-page-default-search', context);

    searchBlock.once('fpwp-search-block').find('.toggle-button').click(function(e) {
      // Without javascript this will link to the search page.
      e.preventDefault();

      if ($('body').hasClass('search-block-form--show')) {
        $('body').removeClass('search-block-form--show');
        // Disable tabbing.
        searchBlock.find(':input').attr('tabindex', '-1');
      }
      else {
        $('body').addClass('search-block-form--show');
        // Enable tabbing.
        searchBlock.find(':input').removeAttr('tabindex');

        // Timeout to allow for fields to become available for focus.
        setTimeout(function() {
          searchBlock.find(':input:enabled:visible:first').focus();
        }, 100);
      }
    });
  }
};

/**
 * Set quick facts to the same height and heading size to fit the container.
 */
Drupal.behaviors.fpwpQuickFacts = {
  attach: function (context, settings) {
    // Keep scroll position while applying same height.
    $.fn.matchHeight._maintainScroll = true;

    // Elements which are the same height.
    $('.view-mode-fact_1, .view-mode-fact_2, .view-mode-fact_3').matchHeight();

    // Size down any quick fact stats that are wider than the container.
    $('.view-display-id-block_1 .fact__stat').once('fact-stat', function() {
      $(this).wrapInner('<span class="fact__stat-inner"></span>');
        var fontSize = parseInt($(this).css('font-size')),
        containerWidth = $(this).outerWidth(),
        innerWidth = $('.fact__stat-inner', this).outerWidth(),
        newfontSize = (containerWidth * fontSize) / innerWidth;

      if (newfontSize < fontSize) {
        $(this).css('font-size', newfontSize + 'px');
      }

      $('.fact__stat-inner', this).contents().unwrap();
    });
  }
};

/**
 * Selection sharing: share-this
 */
Drupal.behaviors.fpwpShareThis = {
  attach: function (context, settings) {
    $('#content-body').once('sharethis', function() {
      var shareThis = window.ShareThis;
      Drupal.selectionShare = shareThis({
        selector: '#content-body',
        sharers: [
          window.ShareThisViaTwitter,
          window.ShareThisViaFacebook,
          window.ShareThisViaLinkedIn,
          window.ShareThisViaEmail
        ]
      });
      Drupal.selectionShare.init();
    });
  }
};

/**
 * Chart sharing - update the URL and title for each chart.
 */
Drupal.behaviors.fpwpShareCharts = {
  attach: function (context, settings) {
    $('.field-name-field-paragraphs .chart').once('addthis-chart', function() {
      var addthisLink = $('.addthis_button_compact', this);
      if (addthisLink.length) {
        var text = $('.field-name-field-chart-title', this).text().trim();
        var shareUrl = $(addthisLink).data('share-url');
        addthis.button($(addthisLink)[0], {services_compact: 'facebook,twitter,linkedin,pinterest_share', services_exclude: 'print'}, {url: shareUrl, title: text});
      }
    });
  }
};

/**
 * Fact sharing - update the URL and title for each fact.
 */
Drupal.behaviors.fpwpShareFacts = {
  attach: function (context, settings) {
    $('#block-views-fact-block-1 .node-fact').once('addthis-fact', function() {
      var addthisLink = $('.addthis_button_compact', this);
      if (addthisLink.length) {
        var text = $('.field-name-fact-fact', this).text().trim();
        var shareUrl = $(addthisLink).data('share-url');
        addthis.button($(addthisLink)[0], {services_compact: 'facebook,twitter,linkedin,pinterest_share', services_exclude: 'print'}, {url: shareUrl, title: text});
      }
    });
  }
};

/**
 * Fact sharing - update the URL and title for each fact.
 */
Drupal.behaviors.fpwpShareRefresh = {
  attach: function (context, settings) {
    if (addthis && addthis.layers && addthis.layers.refresh) {
      addthis.layers.refresh();
    }
  }
};

/**
 * AddThis accessibility Mod - add ul/li structure to the share block.
 */
Drupal.behaviors.fpwpAddThisAccessibility = {
  attach: function (context, settings) {
    $('.addthis_inline_share_toolbox_wmxb').once('addthisMod', function() {
      var addthisInterval = setInterval(function(){
        var addthisBlock = $('.addthis_inline_share_toolbox_wmxb .at-share-btn-elements');
        if ($(addthisBlock).find('a').length) {
          $(addthisBlock).find('a').attr('tabindex', 0).wrapAll('<ul></ul>');
          $(addthisBlock).find('ul > a').wrap('<li></li>');
          clearInterval(addthisInterval);
        }
      }, 100);
    });
  }
};

/**
 * Embed youtube thumbnails without loading the whole video.
 */
Drupal.behaviors.fpwpYoutubeEmbed = {
  attach: function (context, settings) {
    $('div.youtube').once('youtube-embed', function() {
      var $thumbnail = $('<img>');
      var id = $(this).data('embed');
      // Load the thumbnail from youtube.
      $thumbnail
        .attr('src', 'https://img.youtube.com/vi/' + id + '/hqdefault.jpg')
        .attr('alt', 'Play video');

      $('a', this)
        // Insert in to existing link.
        .html($thumbnail)
        // Load full video on click.
        .one('click', function(e) {
          e.preventDefault();
          $(this).html('<iframe src="//www.youtube.com/embed/' + id + '?autoplay=1" frameborder="0" allowfullscreen></iframe>');
        });
    });
  }
};

/**
 * IE Fix for "jumpy" fixed background - @see http://brospars.github.io/snippets/ie-jumpy-bg
 */
 // if IE (no Edge)
if(navigator.userAgent.match(/Trident\/7\./)) {
  // Drupal.behaviors.fpwpJumpyIE = {
  //   attach: function (context, settings) {
      $(document).bind('mousewheel',function(event){
          event.preventDefault();
          var wheelDelta = event.wheelDelta;
          var currentScrollPosition = window.pageYOffset;
          window.scrollTo(0, currentScrollPosition - wheelDelta);
      });
  //   }
  // };
}

/**
 * Activate "keynav" mode, to better highlight tab focus, and to do not display outline on click (when off)
 */
$(document).bind('keydown',function(event){
  if(event.keyCode == 9 ) {
    $('body').addClass('keynav');
  }
});

})(jQuery, Drupal, this, this.document);