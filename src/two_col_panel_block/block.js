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
 
const { InspectorControls, MediaUpload, InnerBlocks, RichText} = wp.editor;
const { PanelBody, Button } = wp.components;

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
registerBlockType( 'made/two-col-block', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: 'Two Column Panel', // Block title.
	//change icon
	icon: icons.twoColPanelBlock,  
	category: 'made-theme', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
 	keywords: [
		__( 'about-block — Made Block' ),
		__( 'Made theme block' ),
		__( 'create-guten-block' ),
	],
	attributes: {
		title: {
			type: 'string',
			default: 'No Title',
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
	edit:  
	( props => {
		const {
 			attributes: { 
				title,
				backgroundImage,
			}, 
			setAttributes
		} = props;

		let onSelectBackgroundImage = value => {
			setAttributes({backgroundImage: value.url });
			console.log({backgroundImage: backgroundImage, value: value.url  })
		}	

		let handleTitleChange = (value) => {
            setAttributes({ title: value });
        }
		 
		let allowedBlocks = ['core/heading',
							'core/columns',
							'core/column',
							'core/freeform'];
		let template = [
				[ 'core/columns', {}, [
					[ 'core/column', {}, [
						[ 'core/freeform' ],

					] ],
					[ 'core/column', {}, [
						[ 'core/freeform'  ],
					] ],
				] ],
			];
		
		return (
 			<div className="two-col-block section">
				<div className="block-inner background-image" style={{ backgroundImage : `url(${ backgroundImage })`}}> 
					<div className="category-container">
						<div className="-inner"> 
							<span class="line"></span>
								<p class="text-center">
									<RichText
										onChange={handleTitleChange}
										value={title}
										placeholder="Add title"
									/>
								</p>
							<span class="line"></span>
						</div>
					</div>
					<div class="content-container"> 
						<InnerBlocks 
								allowedBlocks={allowedBlocks}
								template={template}
							/>
					</div>
					<div class="line-container-bottom">
						<div class="-inner"> 
							<span class="line"></span>
							<p class="text-center">
								<div class="logo"></div>
							</p>
							<span class="line"></span>
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
					<PanelBody title={ 'Contact Content' }>
 
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
	save: (props) => {
		const {
			attributes: { 
				title,
				backgroundImage
		   }, 
 	   } = props;

		return (
			<div className="two-col-block section">
				<div className="block-inner background-image" style={{ backgroundImage : `url(${ backgroundImage })`}}> 
					<div className="category-container">
						<div className="-inner"> 
							<span class="line"></span>
								<p class="text-center">
									<RichText.Content value={title} />    
								</p>
							<span class="line"></span>
						</div>
					</div>
					<div class="content-container"> 
					<InnerBlocks.Content />
					</div>
					<div class="line-container-bottom">
						<div class="-inner"> 
							<span class="line"></span>
							<p class="text-center">
								<div class="logo"></div>
							</p>
							<span class="line"></span>
						</div>
					</div>
				</div>
			</div>
		);
	},
});
