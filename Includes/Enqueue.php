<?php

namespace WTS;

class Enqueue
{
    public function admin_enqueue()
    {
        wp_enqueue_script('wts_back_header_script', get_stylesheet_directory_uri().'/assets/src/back/header.js', [], $this->versioning('src/back/header.js'));
        wp_enqueue_script('wts_back_footer_script', get_stylesheet_directory_uri().'/assets/src/back/footer.js', [], $this->versioning('src/back/footer.js'), true);

        // wp_enqueue_style('wts_script', get_stylesheet_directory_uri().'/assets/src/admin.css', [], $this->cache_breaker('/assets/src/admin.bundle.css'));
    }

    public function front_enqueue()
    {
        wp_enqueue_script('wts_front_header_script', get_stylesheet_directory_uri().'/assets/src/front/header.js', [], $this->versioning('src/front/header.js'));
        wp_enqueue_script('wts_front_footer_script', get_stylesheet_directory_uri().'/assets/src/front/footer.js', [], $this->versioning('src/front/footer.js'), true);

        wp_enqueue_style('wts_front_style', get_stylesheet_directory_uri().'/assets/src/front/style.css', [], $this->versioning('src/front/style.css'));
    }

    protected function versioning($file_path)
    {
        $file_path = get_template_directory().'/assets/'.$file_path;

        if (file_exists($file_path)) {
            return filemtime($file_path);
        }

        return false;
    }
}
