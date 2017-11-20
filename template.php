<?php
/**
 * @file
 * Contains the theme's functions to manipulate Drupal's default markup.
 *
 * Complete documentation for this file is available online.
 * @see https://drupal.org/node/1728096
 */

/**
 * Override or insert variables into the html templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("html" in this case).
 */
function fpwp_preprocess_html(&$variables, $hook) {
  $variables['add_this_init_code'] = '<script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-59b8c68ee102f011"></script>';
}

/**
 * Override or insert variables into the page templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("page" in this case).
 */
function fpwp_preprocess_page(&$variables, $hook) {
  if (isset($variables['node'])) {
    $node = $variables['node'];

    // Node type page template suggestions.
    // For example, if the node type is "case_study" the template suggestion
    // will be "page--nodetype--case-study.tpl.php".
    $variables['theme_hook_suggestions'][] = 'page__nodetype__' . $node->type;

    if ($node->type == 'case_study') {
      // Build content so we can print fields in the template.
      node_build_content($variables['node'], 'full');
    }
    if ($node->type == 'policy') {
      // Build content so we can print fields in the template.
      node_build_content($variables['node'], 'full');
      // If there is no image we want to try to find one on a parent book page
      // and then load that image.
      fpwp_build_policy_node_image($variables['node'], $variables['node']->content);
    }

    if ($node->type == 'policy') {
      // Don't display the chapter number if we're on a chapter level page.
      $variables['chapter_number'] = '';
      if ($node->book['depth'] != 2) {
        $menu_trail = menu_get_active_trail();
        // We assume only 3 levels of book, including the top level page, which
        // isn't used in the book, so level 2 are chapters and level 3 are
        // sections.
        $chapter_number = explode(':', $menu_trail[2]['link_title']);
        $variables['chapter_number'] = $chapter_number[0];
      }
    }
  }

  // Add page transition javascript for the front, policy landing and child
  // pages. For case study landing: views_get_page_view()->name == 'topics'
  if (drupal_is_front_page() || (arg(0) == 'node' && arg(1) == 46) || (isset($variables['node']) && $variables['node']->type == 'policy')) {
    // Add page transitions.
    drupal_add_js(drupal_get_path('theme', 'fpwp') . '/js/barba.min.js');
    drupal_add_js(drupal_get_path('theme', 'fpwp') . '/js/transitions-policy.js');
  }

  // Taxonomy term page.
  if (arg(0) == 'taxonomy' && arg(1) == 'term' && is_numeric(arg(2))) {
    if ($term = taxonomy_term_load(arg(2))) {
      // Node type page template suggestions.
      // For example, if the node type is "topic" the template suggestion will
      // be "page--termtype--topic.tpl.php".
      $variables['theme_hook_suggestions'][] = 'page__termtype__' . $term->vocabulary_machine_name;

      taxonomy_term_build_content($term);
      $variables['taxonomy_term'] = $term;
    }
  }
}

/**
 * Override or insert variables into the node templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("node" in this case).
 */
function fpwp_preprocess_node(&$variables, $hook) {
  $node = $variables['node'];
  if ($node->type == 'policy') {
    if ($node->book['depth'] == 1) {
      hide($variables['content']['book_navigation']);
    }
  }

  $variables['add_this_share_code'] = '';
  if ($node->type == 'case_study') {
    $variables['add_this_share_code'] = '<div class="addthis_inline_share_toolbox_wmxb"></div>';
  }
}

/**
 * Override or insert variables into the region templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("region" in this case).
 */
function fpwp_preprocess_region(&$variables, $hook) {
  // Set flag for region with inner div.
  $innered_regions = array(
    'home_row_1',
    'home_row_2',
    'home_row_3',
    'home_row_4',
    'tertiary_content',
  );
  $variables['innered_region'] = in_array($variables['region'], $innered_regions);
}

/**
 * Override or insert variables into the block templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("block" in this case).
 */
function fpwp_preprocess_block(&$variables, $hook) {
  if ($variables['block']->module == 'views') {
    // Views blocks use a hash if the delta is going to be too long.
    // View & display - case_studies:featured_stories.
    if ($variables['block']->delta == 'case_studies-featured_stories') {
      $variables['title_attributes_array']['class'][] = 'element-invisible';
    }
  }
}

/**
 * Override or insert variables into the views-view-list templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered.
 */
function fpwp_preprocess_views_view_list(&$variables, $hook) {
  $view = $variables['view'];

  if ($view->name == 'fpwp_book_menu') {
    $variables['row_count'] = count($variables['rows']);
    // We assume only 3 levels of book, including the top level page, which
    // isn't used in the book, so level 2 are chapters and level 3 are sections.
    // Create a structure of chapters and sections for themeing nested lists.
    $variables['chapters'] = array();
    foreach ($view->result as $result) {
      if ($result->book_menu_links_depth == 2 && !isset($variables['chapters'][$result->nid])) {
        $variables['chapters'][$result->nid] = array();
      }
      if ($result->book_menu_links_depth == 3) {
        $variables['chapters'][$result->node_book_parent_nid][] = $result->nid;
      }
    }
  }
}

/**
 * Override or insert variables into the entity templates.
 *
 * @param array $variables
 *   An array of variables to pass to the theme template.
 * @param string $hook
 *   The name of the template being rendered ("block" in this case.)
 */
function fpwp_preprocess_entity(&$variables, $hook) {
  // For chart paragraph bundles add field_chart_type as a class
  if ($variables['entity_type'] == 'paragraphs_item') {
    $chart_type = field_get_items('paragraphs_item', $variables['paragraphs_item'], 'field_chart_type');
    if (!empty($chart_type)) {
      $variables['classes_array'][] = 'chart';
      $variables['classes_array'][] = 'chart__type-' . drupal_html_class($chart_type[0]['value']);
    }
  }
}

/**
 * Override or insert variables into the field templates.
 *
 * @param array $variables
 *   An array of variables to pass to the theme template.
 * @param string $hook
 *   The name of the template being rendered ("block" in this case.)
 */
function fpwp_preprocess_field(&$variables, $hook) {
  $element = $variables['element'];
  if ($element['#field_name'] == 'body' && ($element['#formatter'] == 'text_summary_or_trimmed' || $element['#formatter'] == 'text_trimmed')) {
    // Strip markup when trimmed.
    // This is primarily to stop a tags printing out in linked card displays
    // however for trimmed we rarely want fancy markup anyway.
    foreach ($variables['items'] as &$item) {
      $item['#markup'] = filter_xss($item['#markup'], array('p', 'br'));
    }
  }

  // Add tables below charts for screen readers.
  if ($element['#field_name'] == 'field_chart_id') {
    if ($chart_id = $variables['items'][0]['#markup']) {
      include_once drupal_get_path('theme', 'fpwp') . '/includes/chart-tables.php';

      $chart_id_key = 'chart-' . $chart_id;
      $variables['chart_table'] = '';
      if (!empty($chart_tables[$chart_id_key])) {
        $variables['chart_table'] = $chart_tables[$chart_id_key];
      }
    }
  }

  // Add an anchor to chart titles.
  if ($element['#field_name'] == 'field_chart_title') {
    $variables['chart_title_id'] = '';
    if ($items = field_get_items('paragraphs_item', $element['#object'], 'field_chart_id')) {
      $variables['chart_title_id'] = 'chart-title-' . str_replace('.', '-', $items[0]['value']);
      // Set heading level for specific charts
      // Default to H4
      $variables['chart_title_level'] = 'h4';
      switch ($items[0]['value']) {
        case '4.4a':
        case '4.4b':
          $variables['chart_title_level'] = 'h5';
          break;
      }
    }
  }
}

/**
 * Override or insert variables into the search-api-page-result templates.
 *
 * @param array $variables
 *   An array of variables to pass to the theme template.
 * @param string $hook
 *   The name of the template being rendered ("block" in this case.)
 */
function fpwp_preprocess_search_api_page_result(&$variables, $hook) {
  switch ($variables['item']->type) {
    case 'policy':
      $variables['result_type'] = t('White Paper');
      break;
    case 'case_study':
      $variables['result_type'] = t('Foreign Policy in Action');
      break;
    default:
      $variables['result_type'] = '';
      break;
  }
}

/**
 * Implements hook_form_alter().
 */
function fpwp_form_alter(&$form, &$form_state, $form_id) {
  if ($form_id == 'search_api_page_search_form') {
    $form['form']['keys_1']['#attributes']['placeholder'] = t('Search');
  }
  if ($form_id == 'search_api_page_search_form_default_search') {
    $form['keys_1']['#attributes']['placeholder'] = t('Search');
  }
}

/**
 * Implements hook_node_view_alter().
 */
function fpwp_node_view_alter(&$build) {
  $node = $build['#node'];
  if ($node->type == 'policy') {
    // If there is no image we want to try to find one on a parent book page and
    // then load that image.
    fpwp_build_policy_node_image($node, $build);
  }
}

/**
 * Set the image on a policy node page.
 *
 * In the case that a policy node doesn't have an image it will try to get one
 * from the book parent.
 *
 * @param object $node
 *   The node to load the image for.
 * @param array $build
 *   The node content build array.
 */
function fpwp_build_policy_node_image($node, &$build) {
  if (empty($node->field_image)) {
    if ($parent_node = fpwp_get_parent_book_node($node)) {
      node_build_content($parent_node);
      if (!empty($parent_node->content['field_image'])) {
        $build['field_image'] = $parent_node->content['field_image'];
      }
    }
  }
}

/**
 * Get the parent book node for a given node if there is one.
 *
 * @param object $node
 *   The node to get the parent of.
 *
 * @return object
 *   The parent node.
 */
function fpwp_get_parent_book_node($node) {
  $parent_node = NULL;
  $book_link = $node->book;

  if ($book_link['plid'] && $parent_link = book_link_load($book_link['plid'])) {
    $parent_node = menu_get_object('node', 1, $parent_link['link_path']);
  }

  return $parent_node;
}

/**
 * Return a themed breadcrumb trail.
 *
 * @param $variables
 *   - title: An optional string to be used as a navigational heading to give
 *     context for breadcrumb links to screen-reader users.
 *   - title_attributes_array: Array of HTML attributes for the title. It is
 *     flattened into a string within the theme function.
 *   - breadcrumb: An array containing the breadcrumb links.
 * @return
 *   A string containing the breadcrumb output.
 *
 * @see zen_theme_breadcrumb()
 */
function fpwp_breadcrumb($variables) {
  $breadcrumb = $variables['breadcrumb'];
  $output = '';

  // Don't show if it is just a home link.
  if (count($breadcrumb) < 2) {
    return $output;
  }

  // By default the crumbs module path plugin uses the menu item title however
  // we want to use the node title.
  $changed = FALSE;
  foreach ($variables['crumbs_breadcrumb_items'] as &$crumbs_breadcrumb_item) {
    if (count($crumbs_breadcrumb_item['fragments']) == 2) {
      if ($crumbs_breadcrumb_item['fragments'][0] == 'node' && is_numeric($crumbs_breadcrumb_item['fragments'][1])) {
        if ($node = node_load($crumbs_breadcrumb_item['fragments'][1])) {
          $crumbs_breadcrumb_item['title'] = $node->title;
          $crumbs_breadcrumb_item['title_callback'] = 'check_plain';
          $changed = TRUE;
        }
      }
    }
  }
  if ($changed) {
    // Regenerate the breadcrumbs.
    $breadcrumb = array();
    foreach ($variables['crumbs_breadcrumb_items'] as $item) {
      $breadcrumb[] = theme('crumbs_breadcrumb_link', $item);
    }
  }

  // Determine if we are to display the breadcrumb.
  $show_breadcrumb = theme_get_setting('zen_breadcrumb');
  if ($show_breadcrumb == 'yes' || $show_breadcrumb == 'admin' && arg(0) == 'admin') {

    // Optionally get rid of the homepage link.
    $show_breadcrumb_home = theme_get_setting('zen_breadcrumb_home');
    if (!$show_breadcrumb_home) {
      array_shift($breadcrumb);
    }

    // Return the breadcrumb with separators.
    if (!empty($breadcrumb)) {
      $breadcrumb_separator = filter_xss_admin(theme_get_setting('zen_breadcrumb_separator'));
      $trailing_separator = $title = '';
      if (theme_get_setting('zen_breadcrumb_title')) {
        $item = menu_get_item();
        if (!empty($item['tab_parent'])) {
          // If we are on a non-default tab, use the tab's title.
          $breadcrumb[] = check_plain($item['title']);
        }
        else {
          $breadcrumb[] = drupal_get_title();
        }
      }
      elseif (theme_get_setting('zen_breadcrumb_trailing')) {
        $trailing_separator = $breadcrumb_separator;
      }

      // Provide a navigational heading to give context for breadcrumb links to
      // screen-reader users.
      if (empty($variables['title'])) {
        $variables['title'] = t('You are here');
      }
      // Unless overridden by a preprocess function, make the heading invisible.
      if (!isset($variables['title_attributes_array']['class'])) {
        $variables['title_attributes_array']['class'][] = 'element-invisible';
      }

      // Build the breadcrumb trail.
      $output = '<nav class="breadcrumb" role="navigation">';
      $output .= '<h2' . drupal_attributes($variables['title_attributes_array']) . '>' . $variables['title'] . '</h2>';
      $output .= '<ol><li>' . implode($breadcrumb_separator . '</li><li>', $breadcrumb) . $trailing_separator . '</li></ol>';
      $output .= '</nav>';
    }
  }

  return $output;
}

/**
 * Function that outputs the <object> element.
 *
 * @ingroup themeable
 */
function fpwp_video_filter_flash($variables) {
  $output = '';

  $video = $variables['video'];
  $params = isset($variables['params']) ? $variables['params'] : array();

  $classes = video_filter_get_classes($video);

  $url = fpwp_generate_video_filter_youtube_url($video, 'flash');

  $attributes = '';
  if (!empty($video['attributes'])) {
    $attributes = drupal_attributes($video['attributes']);
  }

  $output .= '<div class="video-filter"><object class="' . implode(' ', $classes) . '" type="application/x-shockwave-flash" ';

  $output .= 'width="' . $video['width'] . '" height="' . $video['height'] . '" data="' . $url . '" ' . $attributes . '>' . "\n";

  $defaults = array(
    'movie' => $video['source'],
    'wmode' => 'transparent',
    'allowFullScreen' => 'true',
  );

  $params = array_merge($defaults, (is_array($params) && count($params)) ? $params : array());

  foreach ($params as $name => $value) {
    $output .= '  <param name="' . $name . '" value="' . $value . '" />' . "\n";
  }

  $output .= '</object></div>' . "\n";

  return $output;
}

/**
 * Function that outputs HTML5 compatible iFrame for codecs that support it.
 *
 * @ingroup themeable
 */
function fpwp_video_filter_iframe($variables) {
  $video = $variables['video'];
  $classes = video_filter_get_classes($video);

  $url = fpwp_generate_video_filter_youtube_url($video, 'iframe');

  $attributes = '';
  if (!empty($video['attributes'])) {
    $attributes = drupal_attributes($video['attributes']);
  }

  $output = '<div class="video-filter"><iframe src="' . $url . '" width="' . $video['width'] . '" height="' . $video['height'] . '" class="' . implode(' ', $classes) . '" frameborder="0" allowfullscreen="true"' . $attributes . '></iframe></div>';

  return $output;
}

/**
 * Generate a YouTube video URL with the params we want.
 * Unfortunately there isn't a way to hook into this so we're duplicating code
 * somewhat from the video filter module.
 *
 * @param  array $video
 *   A video array from the video filter module.
 * @param  string $type
 *   The type of rendering used. iframe or flash.
 */
function fpwp_generate_video_filter_youtube_url($video, $type) {
  $attributes = array(
    'modestbranding' => 1,
    'rel' => !empty($video['related']) ? 'rel=1' : 'rel=0',
    'autoplay' => !empty($video['autoplay']) ? 'autoplay=1' : 'autoplay=0',
    'loop' => !empty($video['loop']) ? 'loop=1' : 'loop=0',
    'controls' => !empty($video['controls']) ? 'controls=1' : (!isset($video['controls']) ? 'controls=1' : 'controls=0'),
    'autohide' => !empty($video['autohide']) ? 'autohide=1' : 'autohide=0',
    'showinfo' => 0,
    'theme' => !empty($video['theme']) ? 'theme=' . $video['theme'] : 'theme=dark',
    'color' => !empty($video['color']) ? 'color=' . $video['color'] : 'color=red',
    'enablejsapi' => !empty($video['enablejsapi']) ? 'enablejsapi=' . (int) $video['enablejsapi'] : 'enablejsapi=0',
  );

  if ($type == 'iframe') {
    $attributes['html5'] = 'html5=1';
    $attributes['wmode'] = 'wmode=opaque';
  }
  elseif ($type == 'flash') {
    $attributes['fs'] = 'fs=1';
  }

  if (!empty($video['loop'])) {
    $attributes['playlist'] = 'playlist=' . $video['codec']['matches'][1];
  }

  if (preg_match('/t=((\d+[m|s])?(\d+[s]?)?)/', $video['source'], $matches)) {
    $attributes['start'] = 'start=' . (preg_replace("/[^0-9]/", "", $matches[2]) * 60 + (preg_replace("/[^0-9]/", "", $matches[3])));
  }
  if (!empty($video['start'])) {
    if (preg_match('/((\d+[m|s])?(\d+[s]?)?)/', $video['start'], $matches)) {
      $attributes['start'] = 'start=' . (preg_replace("/[^0-9]/", "", $matches[2]) * 60 + (preg_replace("/[^0-9]/", "", $matches[3])));
    }
  }

  return '//www.youtube.com/embed/' . $video['codec']['matches'][1] . '?' . implode('&amp;', $attributes);
}

/**
 * Implements hook_metatag_metatags_view_alter().
 *
 * Override metatag token values just prior to caching to pull in the first
 * row of values from a view.
 */
function fpwp_metatag_metatags_view_alter(&$output, $instance, $options) {
  if (($instance == 'view:share_chart:page' || $instance == 'view:share_fact:page') && !empty($options['token data']['view']->result)) {
    $view = $options['token data']['view'];
    if (empty($view)) {
      return;
    }

    // Set values from the view.
    // Working on the assumption that all are required fields.
    if ($instance == 'view:share_chart:page') {
      $title = $view->result[0]->field_field_chart_title[0]['raw']['safe_value'];
      $description = $view->result[0]->field_field_chart_share_text[0]['raw']['safe_value'];
      $image = file_create_url($view->result[0]->field_field_chart_image[0]['raw']['uri']);
      $url = url('node/' . $view->result[0]->field_paragraphs_paragraphs_item_nid, array('absolute' => TRUE));
      $short_url = url('node/' . $view->result[0]->field_paragraphs_paragraphs_item_nid, array('absolute' => TRUE, 'alias' => TRUE));
    }
    elseif ($instance == 'view:share_fact:page') {
      $title = $view->result[0]->field_field_fact_stat[0]['raw']['value'] . ' ' . $view->result[0]->field_field_fact_desc[0]['raw']['value'];
      $description = 'Find out more about ' . $view->result[0]->taxonomy_term_data_field_data_field_fact_category_name . ' in the Foreign Policy White Paper.';
      $image = file_create_url($view->result[0]->field_field_fact_share_image[0]['raw']['uri']);
      $url = url('taxonomy/term/' . $view->result[0]->taxonomy_term_data_field_data_field_fact_category_tid, array('absolute' => TRUE));
      $short_url = url('taxonomy/term/' . $view->result[0]->taxonomy_term_data_field_data_field_fact_category_tid, array('absolute' => TRUE, 'alias' => TRUE));
    }

    // Twitter cards.
    if (isset($output['twitter:title']['#attached']['drupal_add_html_head'][0][0]['#value'])) {
      $output['twitter:title']['#attached']['drupal_add_html_head'][0][0]['#value'] = $title;
    }
    if (isset($output['twitter:url']['#attached']['drupal_add_html_head'][0][0]['#value'])) {
      $output['twitter:url']['#attached']['drupal_add_html_head'][0][0]['#value'] = $url;
    }
    if (isset($output['twitter:image']['#attached']['drupal_add_html_head'][0][0]['#value'])) {
      $output['twitter:image']['#attached']['drupal_add_html_head'][0][0]['#value'] = $image;
    }
    if (isset($output['twitter:description']['#attached']['drupal_add_html_head'][0][0]['#value'])) {
      $output['twitter:description']['#attached']['drupal_add_html_head'][0][0]['#value'] = $description;
    }

    // Open graph.
    if (isset($output['og:title']['#attached']['drupal_add_html_head'][0][0]['#value'])) {
      $output['og:title']['#attached']['drupal_add_html_head'][0][0]['#value'] = $title;
    }
    if (isset($output['og:url']['#attached']['drupal_add_html_head'][0][0]['#value'])) {
      $output['og:url']['#attached']['drupal_add_html_head'][0][0]['#value'] = $url;
    }
    if (isset($output['og:image']['#attached']['drupal_add_html_head'][0][0]['#value'])) {
      $output['og:image']['#attached']['drupal_add_html_head'][0][0]['#value'] = $image;
    }
    if (isset($output['og:description']['#attached']['drupal_add_html_head'][0][0]['#value'])) {
      $output['og:description']['#attached']['drupal_add_html_head'][0][0]['#value'] = $description;
    }

    // DC terms.
    if (isset($output['dcterms.title']['#attached']['drupal_add_html_head'][0][0]['#value'])) {
      $output['dcterms.title']['#attached']['drupal_add_html_head'][0][0]['#value'] = $title;
    }
    if (isset($output['dcterms.identifier']['#attached']['drupal_add_html_head'][0][0]['#value'])) {
      $output['dcterms.identifier']['#attached']['drupal_add_html_head'][0][0]['#value'] = $url;
    }

    // Generic.
    if (isset($output['image_src']['#attached']['drupal_add_html_head'][0][0]['#value'])) {
      $output['image_src']['#attached']['drupal_add_html_head'][0][0]['#value'] = $image;
    }
    if (isset($output['description']['#attached']['drupal_add_html_head'][0][0]['#value'])) {
      $output['description']['#attached']['drupal_add_html_head'][0][0]['#value'] = $description;
    }
    if (isset($output['title']['#attached']['metatag_set_preprocess_variable'][0][2])) {
      $output['title']['#attached']['metatag_set_preprocess_variable'][0][2] = $title;
    }
    if (isset($output['canonical']['#attached']['drupal_add_html_head'][0][0]['#value'])) {
      $output['canonical']['#attached']['drupal_add_html_head'][0][0]['#value'] = $url;
    }
    if (isset($output['shortlink']['#attached']['drupal_add_html_head'][0][0]['#value'])) {
      $output['shortlink']['#attached']['drupal_add_html_head'][0][0]['#value'] = $short_url;
    }
  }
}

/**
 * Implements hook_page_alter().
 */
function fpwp_page_alter(&$page) {
  // Deny access to fact and submission node pages for people who don't have
  // edit access.
  // Ideally this wouldn't be done in the theme layer however we have to work
  // with what GovCMS allows us to change.
  if (($node = menu_get_object()) && !arg(2)) {
    $restricted_types = array(
      'consultation_submission',
      'fact',
    );
    // If in our restricted list of node types.
    if (in_array($node->type, $restricted_types)) {
      // If the user doesn't have edit access, return page not found.
      if (!node_access('update', $node)) {
        drupal_not_found();
        drupal_exit();
      }
    }
  }
}
