<?php

/*
  Plugin Name: Fledged HTML Editor
  Version: 1.0
  Author: Alex Tirim
*/

if( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

class FledgedHTMLEditor  {
  function __construct() {
    add_action('init', array($this, 'onInit'));
  }

  function onInit() {
    wp_register_script('html-editor-js', plugin_dir_url(__FILE__) . 'build/index.js', array('wp-blocks', 'wp-element', 'wp-editor'));
    wp_register_style('html-editor-css', plugin_dir_url(__FILE__) . 'build/index.css');
    wp_register_style('html-editor-custom-css', plugin_dir_url(__FILE__) . 'code-editor.css');
    
    register_block_type('fully-fledged/fully-fledged-html-editor', array(
      'render_callback' => array($this, 'renderCallback'),
      'editor_script' => 'html-editor-js',
      'editor_style' => ['html-editor-css', 'html-editor-custom-css'],
    ));
  }

  function renderCallback($attributes) {
    if (!is_admin()) {
      wp_enqueue_script('html-editor-frontend-js', plugin_dir_url(__FILE__) . 'build/frontend.js', array('wp-element'));
      wp_enqueue_style('html-editor-frontend-css', plugin_dir_url(__FILE__) . 'build/index.css');
      wp_enqueue_style('html-editor-custom-css', plugin_dir_url(__FILE__) . 'code-editor.css');
    }

    $attributes["snippet"] = array_map(function($item) {
      $item = str_replace('"', "'", $item);
      $item = htmlspecialchars($item);
      return $item;
    }, $attributes["snippet"]);

    ob_start(); ?>
    <div class="code-editor-attributes fully-fledged-code-editor"><pre style="display: none;"><?php echo json_encode($attributes) ?></pre></div>
    <?php 
    $var = ob_get_clean();
    return $var;
    
  }

  function renderCallbackBasic($attributes) {
    return '<div>HGelloo</div>';
  }
}

$code_editor = new FledgedHTMLEditor();