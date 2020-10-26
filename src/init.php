<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 *
 * Assets enqueued:
 * 1. blocks.style.build.css - Frontend + Backend.
 * 2. blocks.build.js - Backend.
 * 3. blocks.editor.build.css - Backend.
 *
 * @uses {wp-blocks} for block type registration & related functions.
 * @uses {wp-element} for WP Element abstraction — structure of blocks.
 * @uses {wp-i18n} to internationalize the block's text.
 * @uses {wp-editor} for WP editor styles.
 * @since 1.0.0
 */

 
 // Hook: Block assets.
add_action( 'init', 'made_block_assets' );

function made_block_assets() { // phpcs:ignore
	// Register block styles for both frontend + backend.
	wp_register_style(
		'made-style-css', // Handle.
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ), // Block style CSS.
		is_admin() ? array( 'wp-editor' ) : null, // Dependency to include the CSS after it.
		null // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.style.build.css' ) // Version: File modification time.
	);

	// Register block editor script for backend.
	wp_register_script(
		'made-block-js', // Handle.
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ), // Block.build.js: We register the block here. Built with Webpack.
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ), // Dependencies, defined above.
		null, // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ), // Version: filemtime — Gets file modification time.
		true // Enqueue the script in the footer.
	);

	// Register block editor styles for backend.
	wp_register_style(
		'made-block-editor-css', // Handle.
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ), // Block editor CSS.
		array( 'wp-edit-blocks' ), // Dependency to include the CSS after it.
		null // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.editor.build.css' ) // Version: File modification time.
	);

	// WP Localized globals. Use dynamic PHP stuff in JavaScript via `cgbGlobal` object.
	wp_localize_script(
		'made-block-js',
		'cgbGlobal', // Array containing dynamic data for a JS Global.
		[
			'pluginDirPath' => plugin_dir_path( __DIR__ ),
			'pluginDirUrl'  => plugin_dir_url( __DIR__ ),
			// Add more data here that you want to access from `cgbGlobal` object.
		]
	);

	/**
	 * Register Gutenberg block on server-side.
	 *
	 * Register the block on server-side to ensure that the block
	 * scripts and styles for both frontend and backend are
	 * enqueued when the editor loads.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/blocks/writing-your-first-block-type#enqueuing-block-scripts
	 * @since 1.16.0
	 */

	//create an aray of blocks
	$blocks = array(
		'made/intro-panel-block',
		'made/category-panel-block',
		'made/two-col-panel-block',
		'made/featured-block',
		'made/intro-text-block',
		'made/full-width-image-block',


		//'made/two-col-images-block'
 		// 'made/testimonial-block',
		// 'made/hero-block',
		// 'made/image-text-block'
	);

	//register their stylesheets
	foreach($blocks as $block){
		register_block_type(
			$block, array(
				// Enqueue blocks.style.build.css on both frontend & backend.
				'style'  => 'made-style-css',
				// Enqueue blocks.build.js in the editor only.
				'editor_script' => 'made-block-js',
				// Enqueue blocks.editor.build.css in the editor only.
				'editor_style'  => 'made-block-editor-css',	
			)
		);
	}

	//Enqueue dynamic Latest Posts block
	register_block_type('made/latest-posts', array(
		'editor_script' => 'made-block-js',
		'editor_style'  => 'made-block-editor-css',	
		'style'  => 'made-style-css',
		'render_callback' => 'latest_posts_block'

	));
}

//Callback for the Latest posts block
// function latest_posts_block(){
// 	global $post;
// 	// can not use wp_query
// 	$posts = wp_get_recent_posts(array(
// 		'post_type' => "post",
// 		'numberposts' => 3,
// 		'post_status' => 'publish'
// 	));

// 	if (count($posts) > 0){
// 		$html = '<h1 class="latest-recipes-heading">Latest Recipes</h1>';
// 		$html .= '<ul class="latest-recipes container">';
// 		foreach($posts as $post):
// 			$postData = get_post($post['ID']);
// 			setup_postdata($postData);
// 			$html .= sprintf(
// 				'<li>
// 					%1$s
//  					<div className="content">
// 						<h2>%2$s</h2>
// 						<p>%3$s</p>
// 						<a href=%4$s class="button">Read More</a>
// 					</div>
// 				</li>', 
// 				get_the_post_thumbnail($postData),
// 				esc_html(get_the_title($postData)),
// 				esc_html(wp_trim_words(get_the_content($postData), 30)),
// 				esc_html(get_the_permalink($postData))
// 			);
// 		endforeach;
// 		$html .= '</ul>';
// 		return $html;
// 	} else {
// 		return "There is no posts...";
// 	}
// }

/** Custom Categories */
add_filter('block_categories', 'made_new_gutenberg_category', 1, 2);
function made_new_gutenberg_category( $categories, $post){
	return array_merge(
		$categories, 
		array(
			array(
				'slug' => 'made-theme',
				'title' => 'Made Theme',
 			),
		)
	);
}

// register custom meta tag field
function featured_block_meta_init() {
    register_post_meta( 'post', 'agencyMeta', array(
		'show_in_rest' => true,
		'single' => true,
		'type' => 'string'
	 ) );
	 register_post_meta( 'post', 'roleMeta', array(
		'show_in_rest' => true,
		'single' => true,
		'type' => 'string'
	 ) );
	 register_post_meta( 'post', 'yearMeta', array(
		'show_in_rest' => true,
		'single' => true,
		'type' => 'string'
	 ) );
}
add_action( 'init', 'featured_block_meta_init' );


//Adds Featured Image URL to the WP REST Post API Response
add_action('rest_api_init', 'get_featured_image');
function get_featured_image(){
	register_rest_field('post', 'featured_image', 
		array(
			'get_callback' => 'made_get_featured_image',
			'update_callback' => null, //we only require the url
			'schema' => null
		)
	);
}

function made_get_featured_image ($object, $field_name, $request){
	if($object['featured_media']){
		$img = wp_get_attachment_image_src( $object['featured_media'], 'full', false);
		return $img[0];
	}
}