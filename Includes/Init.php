<?php

namespace WTS;

class Init
{
    /**
     * Constructor.
     */
    public function __construct()
    {
        $this->define_hooks();
        $this->define_settings();
        $this->define_shortcodes();
    }

    /**
     * All the WordPress hooks and filters go here, with a callback to another class method.
     */
    private function define_hooks()
    {
        add_action('wp_enqueue_scripts', array(new Enqueue(), 'front_enqueue'));
        add_action('admin_enqueue_scripts', array(new Enqueue(), 'admin_enqueue'));
    }

    /**
     * All settings needed go here.
     */
    private function define_settings()
    {
        // Example: add_theme_support('post-thumbnails');
    }

    /**
     * Add any shortcodes definition here, with a callback to another class method.
     */
    private function define_shortcodes()
    {
        // Example: add_shortcode('toolbar', array(new Shortcodes(), 'toolbar'));
    }
}
