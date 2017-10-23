<?php

/**
 * Custom Display Suite 1 column template that wraps the content in a link 
 */
?>
<<?php print $ds_content_wrapper; print $layout_attributes; ?> class="ds-1col <?php print $classes;?> clearfix">

  <?php if (isset($title_suffix['contextual_links'])): ?>
  <?php print render($title_suffix['contextual_links']); ?>
  <?php endif; ?>

  <a class="term-wrapper-link" href="<?php print url("taxonomy/term/" . $tid) ?>">
    <?php print $ds_content; ?>
  </a>
</<?php print $ds_content_wrapper ?>>

<?php if (!empty($drupal_render_children)): ?>
  <?php print $drupal_render_children ?>
<?php endif; ?>
