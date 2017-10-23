<?php

/**
 * @file
 * Default simple view template to display a list of rows.
 *
 * - $title : The title of this group of rows.  May be empty.
 * - $options['type'] will either be ul or ol.
 * @ingroup views_templates
 */
?>
<?php print $wrapper_prefix; ?>
  <?php if (!empty($title)) : ?>
    <h3><?php print $title; ?></h3>
  <?php endif; ?>
  <?php print $list_type_prefix; ?>
    <?php foreach ($rows as $id => $row): ?>
      <li class="<?php print $classes_array[$id]; ?>">
        <?php print $row; ?>
        <?php if ($view->result[$id]->book_menu_links_depth == 2 && !empty($chapters[$view->result[$id]->nid])): ?>
          <ul class="section-list">
        <?php else: ?>
      </li>
        <?php endif; ?>

      <?php if ($view->result[$id]->book_menu_links_depth == 3 && end($chapters[$view->result[$id]->node_book_parent_nid]) == $view->result[$id]->nid): ?>
        </ul>
      <?php endif; ?>
    <?php endforeach; ?>
  <?php print $list_type_suffix; ?>
<?php print $wrapper_suffix; ?>
