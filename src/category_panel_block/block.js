/**
 * BLOCK: my-block
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

import icons from '../../src/icons';
 
const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { withSelect, } = wp.data;

const { InspectorControls } = wp.editor;
const { SelectControl } = wp.components;

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
registerBlockType( 'made/category-panel-block', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: 'Category Panel', // Block title.
	//change icon
	icon: icons.logo, 
	category: 'made-theme', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'category-panel-block — Made Block' ),
		__( 'Made theme block' ),
		__( 'create-guten-block' ),
	],
	attributes: {
		categoryId :{
			type: 'number',
		},
		categoryName :{
			type: 'string',
			default: "No Category",
		},
		categorySlug :{
			type: 'string',
			default: "no-category",
		},

		primaryPermalink: {
			type: 'string',
			default: '#',
		},
		primaryTitle: {
			type: 'string',
			default: 'No Title',
		},
		primaryMediaURL: {
			type: 'string',
			source: 'attribute',
			selector: '.primary-image img',
			attribute: 'src', 
		},

		primaryAgency: {
			type: 'string',
			default: 'No Agency'
		},
		primaryRole: {
			type: 'string',
			default: 'No Role'
		},
		primaryYear: {
			type: 'string',
			default: 'No Year'
		},

		secondaryPermalink: {
			type: 'string',
			default: '#',
		},
		secondaryTitle: {
			type: 'string',
			default: 'No Title',
		},
		secondaryMediaURL: {
			type: 'string',
			source: 'attribute',
			selector: '.secondary-image img',
			attribute: 'src', 
		},

		secondaryAgency: {
			type: 'string',
			default: 'No Agency'
		},
		secondaryRole: {
			type: 'string',
			default: 'No Role'
		},
		secondaryYear: {
			type: 'string',
			default: 'No Year'
		},
	},
	supports: {
        align: ['wide', 'full']
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
	edit: withSelect( (select, props) => {
		const query = { 
			per_page : -1, //to display ALL
 			orderby : 'date',
			order : 'asc',
			status : 'publish',  
 		}
 			return {
				//GET REQUEST TO REST API
				posts : wp.data.select('core').getEntityRecords('postType', 'post', query),
				categories : wp.data.select('core').getEntityRecords('taxonomy', 'category', ),
			};
		}) 
	( props => {
		const {
 			attributes: { 
			categoryId,
			categoryName,

			primaryPermalink, 
			primaryTitle,
			primaryMediaURL, 
	 
			primaryAgency,
			primaryRole,
			primaryYear,

			secondaryPermalink, 
			secondaryTitle,
			secondaryMediaURL,
 
			secondaryAgency,
			secondaryRole,
			secondaryYear,
			}, 
			setAttributes
		} = props;

		let options = [];

		if(props.posts && props.categories){
			options.push( { value: 0, label: "Select a category"});
			props.categories.forEach(cat=>{
				//check number of posts for each category
				if(cat.count > 1) {
					options.push({ value: cat.id, label: cat.name })
				}
			});
		} else {
			options.push( { value: 0, label: "There are no category options"});
		}

		let onHandleCategorySelectChange = value => {
			setAttributes({categoryId : value});

			let category = props.categories.filter( cat => {
				if (cat.id == value ){
					return cat;
				}
			});

			foo
			setAttributes({categoryName : category[0].name});
			setAttributes({categorySlug : category[0].slug});

			let categoryPosts = props.posts.map( post => {
 				if(post.categories[0] == value){
					console.log("Inside posts map, cat check", post.categories[0], "cat id selected", value, "Post ", post)
					return post;
				}
			});

			console.log("Cat posts: ", categoryPosts)
			
			if(categoryPosts[0]){
				let firstPost = categoryPosts[0];
				console.log('First Post', firstPost);

 				if(firstPost.link){
					setAttributes({ primaryPermalink: firstPost.link});
				}
				if(firstPost.title.rendered){
					setAttributes({ primaryTitle: firstPost.title.rendered});
				}
				if(firstPost.featured_image){
					setAttributes({ primaryMediaURL : firstPost.featured_image });
				}
				if(firstPost.meta.agencyMeta){
					setAttributes({ primaryAgency: firstPost.meta.agencyMeta });
				}
				if(firstPost.meta.roleMeta){
					setAttributes({ primaryRole: firstPost.meta.roleMeta });
				}
				if(firstPost.meta.yearMeta){
					setAttributes({ primaryYear: firstPost.meta.yearMeta });
				}
			}

			if(categoryPosts[1]){
				let secondPost = categoryPosts[1];
				console.log('Second Post', secondPost);

				if(secondPost.link){
					setAttributes({ secondaryPermalink: secondPost.link});
				}
				if(secondPost.title.rendered){
					setAttributes({ secondaryTitle: secondPost.title.rendered});
				}
				if(secondPost.featured_image){
					setAttributes({ secondaryMediaURL: secondPost.featured_image });
				}
				if(secondPost.meta.agencyMeta){
					setAttributes({ secondaryAgency: secondPost.meta.agencyMeta });
				}
				if(secondPost.meta.roleMeta){
					setAttributes({ secondaryRole: secondPost.meta.roleMeta });
				}
				if(secondPost.meta.yearMeta){
					setAttributes({ secondaryYear: secondPost.meta.yearMeta });
				}
			}
		}
		  
		return (
 			<div className="made-category-panel-block section">
				<div class="category-container">
					<div class="-inner"> 
						<span class="line"></span>
							<h2 class="text-center">{ categoryName }</h2>
						<span class="line"></span>
					</div>
				</div>
				<div class="media-container"> 
					{primaryMediaURL && (
					<a className="primary-image" href={primaryPermalink}>
						<div className="img-container">
							<img src={primaryMediaURL} />
						</div>
						<div className="content-container"> 
							<div class="grid-x grid-padding-x content-450w">
								<div className="small-12 medium-4 cell agency-info">
									<label>Agency</label>
									<p>{primaryAgency}</p>
								</div>
								<div className="small-12 medium-4 role-info">
									<label>Role</label>
									<p>{primaryRole}</p>
								</div>
								<div className="small-12 medium-4 cell year-info">
									<label>Year</label>
									<p>{primaryYear}</p>
								</div>
							</div>
						</div>	
					</a>
					)}
					{secondaryMediaURL && (
					<a className="secondary-image" href={secondaryPermalink}> 
						<div className="img-container"> 
							<img src={secondaryMediaURL} />
						</div>
						<div className="content-container"> 
							<div class="grid-x grid-padding-x content-450w">
								<div className="small-12 medium-4 cell agency-info">
									<label>Agency</label>
									<p>{secondaryAgency}</p>
								</div>
								<div className="small-12 medium-4 role-info">
									<label>Role</label>
									<p>{secondaryRole}</p>
								</div>
								<div className="small-12 medium-4 cell year-info">
									<label>Year</label>
									<p>{secondaryYear}</p>
								</div>
							</div>
						</div>
					</a>
					)}
				</div>
				<div class="line-container-bottom">
					<div class="-inner"> 
						<span class="line"></span>
						<p class="text-center">
							<span>{primaryTitle} / {secondaryTitle}</span>
						</p>
						<span class="line"></span>
					</div>
				</div>     
				<InspectorControls> 
					<SelectControl
						label="Select a category"
						options={options}
						onChange={onHandleCategorySelectChange}
						value={categoryId}
					>
					</SelectControl>
					
				</InspectorControls>
			</div>
		 )
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
	save: (props) => {
		const {
			attributes: { 
			categoryName,

			primaryPermalink,
			primaryTitle,
			primaryMediaURL, 
	 
			primaryAgency,
			primaryRole,
			primaryYear,

			secondaryPermalink,
			secondaryTitle,
			secondaryMediaURL,
	
			secondaryAgency,
			secondaryRole,
			secondaryYear,
		   }, 
 	   } = props;

		return (
			<div className="made-category-panel-block section">
				<div class="category-container">
					<div class="-inner"> 
						<span class="line"></span>
							<h2 class="text-center">{ categoryName }</h2>
						<span class="line"></span>
					</div>
				</div>
				<div class="media-container"> 
					{primaryMediaURL && (
					<a className="primary-image" href={primaryPermalink}> 
						<div className="img-container">
							<img src={primaryMediaURL} />
						</div>
						<div className="content-container"> 
							<div class="grid-x grid-padding-x content-450w">
								<div className="small-12 medium-4 cell agency-info">
									<label>Agency</label>
									<p>{primaryAgency}</p>
								</div>
								<div className="small-12 medium-4 role-info">
									<label>Role</label>
									<p>{primaryRole}</p>
								</div>
								<div className="small-12 medium-4 cell year-info">
									<label>Year</label>
									<p>{primaryYear}</p>
								</div>
							</div>	
						</div>
					</a>
					)}
					{secondaryMediaURL && (
					<a className="secondary-image" href={secondaryPermalink}> 
						<div className="img-container">
							<img src={secondaryMediaURL} />
						</div>
						<div className="content-container"> 
							<div class="grid-x grid-padding-x content-450w">
								<div className="small-12 medium-4 cell agency-info">
									<label>Agency</label>
									<p>{secondaryAgency}</p>
								</div>
								<div className="small-12 medium-4 role-info">
									<label>Role</label>
									<p>{secondaryRole}</p>
								</div>
								<div className="small-12 medium-4 cell year-info">
									<label>Year</label>
									<p>{secondaryYear}</p>
								</div>
							</div>
						</div>
					</a>
				)}
				</div>
				<div class="line-container-bottom">
					<div class="-inner"> 
						<span class="line"></span>
						<p class="text-center">
							<span>{primaryTitle} / {secondaryTitle}</span>
						</p>
						<span class="line"></span>
					</div>
				</div>
			</div>
		)
	},
});
