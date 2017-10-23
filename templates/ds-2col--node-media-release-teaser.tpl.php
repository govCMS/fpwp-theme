<?php

/**
 * @file
 * Display Suite 2 column template.
 */
?>
<a class="term-wrapper-link" href="<?php print url("node/" . $nid) ?>">
  <<?php print $layout_wrapper; print $layout_attributes; ?> class="ds-2col <?php print $classes;?> clearfix">

    <<?php print $left_wrapper ?> class="group-left<?php print $left_classes; ?>">
      <?php print $left; ?>
    </<?php print $left_wrapper ?>>

    <<?php print $right_wrapper ?> class="group-right<?php print $right_classes; ?>">
      <?php print $right; ?>
    </<?php print $right_wrapper ?>>

  </<?php print $layout_wrapper ?>>
</a>
<?php if (!empty($drupal_render_children)): ?>
  <?php print $drupal_render_children ?>
<?php endif; ?>
