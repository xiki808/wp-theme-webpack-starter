<?php

namespace WTWS;

class Enqueue
{
    public function admin_enqueue()
    {
        if (file_exists(get_template_directory().'/assets/src/runtime.js')) {
            wp_enqueue_script('wts_back_runtime', get_stylesheet_directory_uri().'/assets/src/runtime.js', [], $this->versioning('src/runtime.js'), true);
        }

        if (file_exists(get_template_directory().'/assets/src/vendor.js')) {
            wp_enqueue_script('wts_back_vendor', get_stylesheet_directory_uri().'/assets/src/vendor.js', [], $this->versioning('src/vendor.js'), true);
        }

        wp_enqueue_script('wts_back_header_script', get_stylesheet_directory_uri().'/assets/src/js/back/header.js', [], $this->versioning('src/js/back/header.js'));
        wp_enqueue_script('wts_back_footer_script', get_stylesheet_directory_uri().'/assets/src/js/back/footer.js', [], $this->versioning('src/js/back/footer.js'), true);

        wp_enqueue_style('wts_back_style', get_stylesheet_directory_uri().'/assets/src/css/back/style.css', [], $this->versioning('src/css/back/style.css'));
    }

    public function front_enqueue()
    {
        if (file_exists(get_template_directory().'/assets/src/runtime.js')) {
            wp_enqueue_script('wts_front_runtime', get_stylesheet_directory_uri().'/assets/src/runtime.js', [], $this->versioning('src/runtime.js'), true);
        }

        if (file_exists(get_template_directory().'/assets/src/vendor.js')) {
            wp_enqueue_script('wts_front_vendor', get_stylesheet_directory_uri().'/assets/src/vendor.js', [], $this->versioning('src/vendor.js'), true);
        }

        wp_enqueue_script('wts_front_header_script', get_stylesheet_directory_uri().'/assets/src/js/front/header.js', [], $this->versioning('src/js/front/header.js'));
        wp_enqueue_script('wts_front_footer_script', get_stylesheet_directory_uri().'/assets/src/js/front/footer.js', [], $this->versioning('src/js/front/footer.js'), true);

        wp_enqueue_style('wts_front_style', get_stylesheet_directory_uri().'/assets/src/css/front/style.css', [], $this->versioning('src/css/front/style.css'));
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
