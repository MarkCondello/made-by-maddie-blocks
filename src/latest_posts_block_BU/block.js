/**
 * BLOCK: my-block
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { RichText } = wp.editor;
const { withSelect, } = wp.data;

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'made/latest-posts', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: 'Latest Posts', // Block title.
	icon: 'megaphone', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'made-theme', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'latest posts — Made Block' ),
		__( 'Made Latest Posts' ),
		__( 'create-guten-block' ),
	],
	attributes: {
		mediaID: {
			type: 'number',
			default: 666,
		},
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */
	edit: (withSelect( (select, props) => {
			return {
				//GET REQUEST TO REST API
				props,
				posts: select('core').getEntityRecords('postType', 'post', {
					per_page: 3,
				})
			};
		}) 
	) (( {props, posts } ) => {
		//console.log(posts);
		const {attributes: {mediaID}, setAttributes } = props;
		
		console.log("Media ID: ", mediaID);

		if(!posts){
			return 'Loading...';
		}

		if(posts && posts.length === 0){
			return "There is no results";
		}
		if(posts && posts.length){
			return (
				<div>
					<h1 className="latest-recipes-heading">Latest Recipes</h1>
					<ul className="latest-recipes container">
						{posts.map(post=>{
							return (
								<li>
									<img src={post.featured_image} />  
									<div className="content">
										<h2>{post.title.rendered}</h2>
										<p>
											<RichText.Content value={post.content.raw && post.content.raw.substring(0, 100) + '...'} />
										</p>
										<a href={post.link} className="button">Read More</a>
									</div>
								</li>
							)
						})}
					</ul>
				</div>
			);
		}
	
	}),

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Frontend HTML.
	 */
	save: (   ) => {
		return null;
	}
} );
