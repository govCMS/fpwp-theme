/**
 * @file
 * Page transitions (animations) for specific pages.
 */

(function ($, Drupal, window, document, undefined) {

/**
 * Ignore certain links from page transitions.
 */
Drupal.behaviors.fpwpIgnoreLinks = {
  attach: function(context, settings) {
    // Ignore Drupal tabs when logged in.
    $('.tabs-primary a, #navbar-administration a, ' +
      // Ignore contextual links.
      '.contextual-links-wrapper a, ' +
      // Ignore slideout menu.
      'a.toggle-slideout-menu, ' +
      // Ignore download links on policy landing page.
      '.node-46 a, ' +
      // Ignore other links on homepage.
      '.front .region-home-row-2 a, .front .region-home-row-3 a, ' +
      // Ignore case landing page (in case you get here via dynamic links).
      '.page-foreign-policy-in-action a, ' +
      // Blanket rule to ignore header and footer.
      'header a, footer a, ' +
      // Ignore the home link in the breadcrumb.
      '.breadcrumb li a ', context).once('ignore-barba').each(function() {
      $(this).addClass('no-barba');
    });
  }
};

/**
 * Initialise charts on first load.
 */
Drupal.behaviors.fpwpCharts = {
  attach: function(context, settings) {
    // Search the content for the chart class.
    var charts = $('.chart__chart', context);
    charts.once('charts').each(function() {
      // The chart Id is stored in the data attribute.
      var chartId = $(this).data('chart-id');
      // Ship if there is no matching chart.
      if (typeof Highcharts.chartData[chartId] != 'undefined') {
        // Render the chart.
        // Note: Maps use a different method.
        if (Highcharts.chartData[chartId].type == 'map') {
          // Map.
          Highcharts.mapChart(this, Highcharts.chartData[chartId].getOptions());
        }
        else {
          // All other charts.
          Highcharts.chart(this, Highcharts.chartData[chartId].getOptions());
        }
      }
    });
  }
};

// Get info from the last clicked link inorder to effect the transition.
var linkClicked = false;
var transitionClass = false;
Barba.Dispatcher.on('linkClicked', function(elem, mouseEvent) {
  linkClicked = elem;
  transitionClass = $(elem).data('transition') || false;
});

/**
 * Transition.
 */
var contentTransition = Barba.BaseTransition.extend({
  start: function() {
    var _this = this;

    Promise
      .all([this.newContainerLoading, this.transitionLoad()])
      .then(function() {
        return Promise.all([_this.transitionOut(), _this.transitionIn()]);
      })
      .then(this.transitionFinish.bind(this));
  },
  transitionComplete: function(el) {
    return new Promise(function(resolve, reject) {
      $(el).one('animationend webkitAnimationEnd otransitionend oAnimationEnd msAnimationEnd webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(event) {
        resolve();
      });
    });
  },
  transitionLoad: function() {
    $(this.oldContainer).addClass('transition-load');
    if (transitionClass) {
      $(this.oldContainer).addClass('transition-' + transitionClass);
    }
    return this.transitionComplete(this.oldContainer);
  },
  transitionIn: function() {
    $(this.newContainer).css({
      visibility : 'visible'
    });
    $(this.newContainer).addClass('transition-in');
    if (transitionClass) {
      $(this.newContainer).addClass('transition-' + transitionClass);
    }
    return this.transitionComplete(this.newContainer);
  },
  transitionOut: function() {
    $(this.oldContainer).addClass('transition-out');
    return this.transitionComplete(this.oldContainer);
  },
  transitionFinish: function() {
    $(this.newContainer).removeClass('transition-in');
    $(this.newContainer).removeClass('transition-' + transitionClass);
    transitionClass = false;
    this.done();
  }
});

// Prefetch next/previous links.
function prefetch(links) {
  $(links).each(function() {
    var url = $(this).attr('href');
    if (url.indexOf('/') === 0) {
      url = window.location.protocol + '//' + window.location.host + url;
    }
    if (!Barba.Pjax.Cache.get(url)) {
      var xhr = Barba.Utils.xhr(url);
      Barba.Pjax.Cache.set(url, xhr);
    }
  });
}

// Body classes that get added/removed after transitions.
var bodyClasses = {
  'policy-landing': 'not-front section-foreign-policy-white-paper page-node page-views page-node-46',
  'policy-content': 'not-front section-foreign-policy-white-paper page-node node-type-policy',
  'front':          'front page-home page-panels',
  'case-landing':   'not-front section-foreign-policy-in-action page-foreign-policy-in-action page-views'
};

// View for the policy landing page.
var policyLandingView = Barba.BaseView.extend({
  namespace: 'policy-landing',
  // The new Container is ready and attached to the DOM.
  onEnter: function() {
    $(window).scrollTop(0);
  },
  // The Transition has just finished.
  onEnterCompleted: function() {
    // Remove and add classes used to style the landing page.
    $('body').removeClass(bodyClasses['front'] + ' ' + bodyClasses['policy-content'] + ' ' + bodyClasses['case-landing']);
    $('body').removeClass(function(index, className) {
      return (className.match(/page\-node\-[0-9]*/g) || []).join(' ');
    });
    $('body').addClass(bodyClasses[this['namespace']]);
    // Attach Drupal behaviours.
    Drupal.attachBehaviors();
  }
});

// View for the policy content.
var policyContentView = Barba.BaseView.extend({
  namespace: 'policy-content',
  // The new Container is ready and attached to the DOM.
  onEnter: function() {
    $(window).scrollTop(0);
    prefetch($('a.page-previous, a.page-next'));
    // Prevents animation jumping when clicking the link more than once
    $('a.page-previous, a.page-next').bind('click.policy', function() {
      if ($('.page-container.transition-out, .page-container.transition-load, .page-container.transition-in').length > 0) return false;
    });
  },
  // The Transition has just finished.
  onEnterCompleted: function() {
    // Remove and add classes used to style the landing page.
    $('body').removeClass(bodyClasses['policy-landing']);
    $('body').removeClass(function(index, className) {
      return (className.match(/page\-node\-[0-9]*/g) || []).join(' ');
    });
    $('body').addClass(bodyClasses[this['namespace']]);
    // Attach Drupal behaviours.
    Drupal.attachBehaviors();
  }
});

// View for the front page.
var frontView = Barba.BaseView.extend({
  namespace: 'front',
  // The new Container is ready and attached to the DOM.
  onEnter: function() {
    $(window).scrollTop(0);
  },
  // The Transition has just finished.
  onEnterCompleted: function() {
    // Remove and add classes used to style the front page.
    $('body').removeClass(bodyClasses['policy-landing'] + ' ' + bodyClasses['policy-content'] + ' ' + bodyClasses['case-landing']);
    $('body').removeClass(function(index, className) {
      return (className.match(/page\-node\-[0-9]*/g) || []).join(' ');
    });
    $('body').addClass(bodyClasses[this['namespace']]);
    // Attach Drupal behaviours.
    Drupal.attachBehaviors();
  }
});

// View for the case study landing page.
var caseLandingView = Barba.BaseView.extend({
  namespace: 'case-landing',
  // The new Container is ready and attached to the DOM.
  onEnter: function() {
    $(window).scrollTop(0);
  },
  // The Transition has just finished.
  onEnterCompleted: function() {
    // Remove and add classes used to style the front page.
    $('body').removeClass(bodyClasses['front'] + ' ' + bodyClasses['policy-content']);
    $('body').removeClass(function(index, className) {
      return (className.match(/page\-node\-[0-9]*/g) || []).join(' ');
    });
    $('body').addClass(bodyClasses[this['namespace']]);
    // Attach Drupal behaviours.
    Drupal.attachBehaviors();
  }
});

// Using the page wrapper as not all content was within the main content area.
Barba.Pjax.Dom.wrapperId = 'page';
Barba.Pjax.Dom.containerClass = 'page-container';

Barba.Pjax.getTransition = function() {
  return contentTransition;
};

// Disable Barba for screen widths below 888px.
if (window.matchMedia('(min-width: 888px)').matches) {
  // Initialise views.
  policyLandingView.init();
  policyContentView.init();
  frontView.init();
  caseLandingView.init();

  // When jQuery is ready initilise Pjax.
  $(function() {
    Barba.Pjax.start();
  });
}

})(jQuery, Drupal, this, this.document);
