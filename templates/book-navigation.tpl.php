<?php

/**
 * @file
 * Default theme implementation to navigate books.
 *
 * Presented under nodes that are a part of book outlines.
 *
 * Available variables:
 * - $tree: The immediate children of the current node rendered as an unordered
 *   list.
 * - $current_depth: Depth of the current node within the book outline. Provided
 *   for context.
 * - $prev_url: URL to the previous node.
 * - $prev_title: Title of the previous node.
 * - $parent_url: URL to the parent node.
 * - $parent_title: Title of the parent node. Not printed by default. Provided
 *   as an option.
 * - $next_url: URL to the next node.
 * - $next_title: Title of the next node.
 * - $has_links: Flags TRUE whenever the previous, parent or next data has a
 *   value.
 * - $book_id: The book ID of the current outline being viewed. Same as the node
 *   ID containing the entire outline. Provided for context.
 * - $book_url: The book/node URL of the current outline being viewed. Provided
 *   as an option. Not used by default.
 * - $book_title: The book/node title of the current outline being viewed.
 *   Provided as an option. Not used by default.
 *
 * @see template_preprocess_book_navigation()
 *
 * @ingroup themeable
 */

 /**
  * Additional variables:
  * - $prev_image: Image URL to the previous node image.
  * - $next_image: Image URL to the next node image.
  *
  * @see fpwp_preprocess_book_navigation()
  *
  */
?>

<div id="book-navigation-<?php print $book_id; ?>" class="book-navigation">
  <h2 class="element-invisible">White paper navigation</h2>
  <div class="page-links clearfix">
    <?php if ($prev_url): ?>
      <a href="<?php print $prev_url; ?>" class="page-previous" title="<?php print t('Go to previous page'); ?>" data-transition="previous">
        <?php print $prev_title; ?>
      </a>
    <?php endif; ?>
    <a href="<?php print url('node/46'); ?>" class="page-menu toggle-button toggle-slideout-menu"><span class="toggle-text"><?php print t('Contents'); ?></span></a>
    <?php if ($next_url): ?>
      <a href="<?php print $next_url; ?>" class="page-next" title="<?php print t('Go to next page'); ?>" data-transition="next">
        <?php print $next_title; ?>
      </a>
    <?php endif; ?>
  </div>
</div>
