<?php
/**
 * @file
 * Returns HTML for a region.
 *
 * Complete documentation for this file is available online.
 * @see https://drupal.org/node/1728112
 */
?>
<?php if ($content): ?>
  <div class="<?php print $classes; ?>">
    <?php if ($innered_region): ?>
      <div class="region-inner">
    <?php endif; ?>

    <div class="toggle-wrapper">
      <a class="toggle-button toggle-mobile" href="#" title="Open menu"><span class="toggle-text">Open mobile menu</span></a>
    </div>

    <div class="content-wrapper">
      <?php print $content; ?>
    </div>

    <?php if ($innered_region): ?>
      </div>
    <?php endif; ?>
  </div>
<?php endif; ?>
