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

const {RichText, MediaUpload, InspectorControls } = wp.editor;
const {PanelBody, Button } = wp.components;

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
registerBlockType( 'made/made-intro-block', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: 'Intro Panel', // Block title.
	icon: icons.introPanel,
	category: 'made-theme', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'made-intro-block — Made Block' ),
		__( 'Made theme block' ),
		__( 'create-guten-block' ),
	],
	attributes: {
		content: {
			type: 'string',
			default: 'Intro content.',
			selector: '.-inner p'
		},
		backgroundImage: {
			type: 'string'
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
	edit:( props => {
 
		const {
 			attributes: { 
				backgroundImage,
				content,
				}, 
    			setAttributes
			} = props;
 
		let onSelectBackgroundImage = value => {
			setAttributes({backgroundImage: value.url });
		}		 

		let onContentChange = (value) => {
			setAttributes({ content: value });
 		}
		
		return (
 			<div className="made-intro-block section">
				<div className="-inner background-image" style={{ backgroundImage : `url(${ backgroundImage })`}}> 
					<div className="grid-x grid-padding-x align-center content-450w">
						<h1 className="text-center"> 
							<div className="logo"></div>
						</h1>
						<h2 className="text-center ff-serif">with <i className="fal fa-heart"></i> by Madeleine &#214;rn&#233;us</h2>
					</div> 
					<div className="grid-x grid-padding-x align-center content-450w">
						<div className="small-12 cell">
							<p className="text-center"> 
								<RichText 
									onChange={onContentChange}
									value={content}
									placeholder={__('Add intro content text')}
								/>
							</p>
						</div>
					</div>	
				</div>
				<InspectorControls> 
					<PanelBody title={ 'Background Image' }> 
						<MediaUpload
							onSelect={ onSelectBackgroundImage }
							type="image"
							render={ ({open}) => (
							<Button  
								className='button image-button' 
								onClick={open}>
								{backgroundImage ? 'Change image' : 'Upload image' }							 
							</Button>)} 
						/>
					</PanelBody>
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
	save: ( props ) => {
	    const { 
				attributes: {
					backgroundImage,
					content,
				},
			} = props;

 		return  (
			<div className="made-intro-block section">
				<div className="-inner background-image" style={{ backgroundImage : `url(${ backgroundImage })`}}> 
					<div className="grid-x grid-padding-x align-center content-450w">
						<h1 className="text-center"> 
							<div className="logo"></div>
						</h1>
						<h2 className="text-center ff-serif">with <i class="fal fa-heart"></i> by Madeleine &#214;rn&#233;us</h2>
					</div> 
					<div className="grid-x grid-padding-x align-center content-450w">
						<div className="small-12 cell">
							<p className="text-center"> 
								<RichText.Content value={content} />
							</p>
						</div>
					</div>	
				</div>
			</div>
		)
	},
});
