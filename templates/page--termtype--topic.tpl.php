<?php
/**
 * @file
 * Returns the HTML for a single Drupal page.
 *
 * Complete documentation for this file is available online.
 * @see https://drupal.org/node/1728148
 */
?>

<div id="page">
  <header class="header" id="header" role="banner">
    <div class="header-wrapper">
      <?php if ($logo): ?>
        <a href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>" rel="home" class="header__logo" id="logo"><img src="<?php print $logo; ?>" alt="<?php print t('Home'); ?>" class="header__logo-image" /></a>
      <?php endif; ?>

      <?php if ($site_name): ?>
        <div class="header__name-and-slogan" id="name-and-slogan">
          <h1 class="header__site-name" id="site-name">
            <a href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>" class="header__site-link" rel="home"><span><?php print $site_name; ?></span></a>
          </h1>
        </div>
      <?php endif; ?>
      <div id="navigation">
        <?php print render($page['navigation']); ?>
        <?php print render($page['mobile_nav']); ?>
      </div>

      <?php print render($page['header']); ?>
    </div>
  </header>

  <div id="main">
    <div id="content" class="column" role="main">
      <div id="content-header">
        <?php print render($taxonomy_term->content['field_image']); ?>
        <?php print render($page['highlighted']); ?>
        <?php print $breadcrumb; ?>
        <div id="content-header-fields">
          <a id="main-content"></a>
          <?php print render($title_prefix); ?>
          <?php if ($title): ?>
            <h1 class="page__title title" id="page-title"><?php print $title; ?>:&nbsp;</h1>
          <?php endif; ?>
          <?php print render($title_suffix); ?>
          <?php print render($taxonomy_term->content['field_subtitle']); ?>
          <?php print render($taxonomy_term->content['description']); ?>
        </div>
      </div>
      <div id="content-body">
        <?php print $messages; ?>
        <?php print render($tabs); ?>
        <?php print render($page['help']); ?>
        <?php if ($action_links): ?>
          <ul class="action-links"><?php print render($action_links); ?></ul>
        <?php endif; ?>
        <?php print render($page['content_top']); ?>
        <?php print render($page['content']); ?>
        <?php print render($page['content_bottom']); ?>
      </div>
    </div>
    <?php print render($page['tertiary_content']); ?>

    <?php
      // Render the sidebars to see if there's anything in them.
      $sidebar_first  = render($page['sidebar_first']);
      $sidebar_second = render($page['sidebar_second']);
    ?>

    <?php if ($sidebar_first || $sidebar_second): ?>
      <aside class="sidebars">
        <?php print $sidebar_first; ?>
        <?php print $sidebar_second; ?>
      </aside>
    <?php endif; ?>
  </div>

  <?php print render($page['footer']); ?>
</div>

<?php print render($page['bottom']); ?>
