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

const {RichText, MediaUpload, InspectorControls } = wp.editor;
const {PanelBody, CheckboxControl, Button, RangeControl } = wp.components;

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
registerBlockType( 'made/featured-block', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: 'Featured', // Block title.
	icon: icons.featuredBlock,
	category: 'made-theme', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'featured-block — Made Block' ),
		__( 'Made theme block' ),
		__( 'create-guten-block' ),
	],
	attributes: {
		title: {
			type: 'string',
			default: 'Post title'
		},
		primaryMediaID: {
			type: 'number'
		},

		primaryMediaURL: {
			type: 'string',
			source: 'attribute',
			selector: '.primary-image img',
			attribute: 'src', 
		},

		agency: {
			type: 'string',
			source: 'html',
			selector: '.agency-info p'
		},

		agencyMeta: {
			type: 'string',
 			source: 'meta',
			meta: 'agencyMeta',
		},

		role: {
			type: 'string',
			source: 'html',
			selector: '.role-info p'
		},

		roleMeta: {
			type: 'string',
 			source: 'meta',
			meta: 'roleMeta',
		},

		year: {
			type: 'string',
			source: 'html',
			selector: '.year-info p'
		},

		yearMeta: {
			type: 'string',
 			source: 'meta',
			meta: 'yearMeta',
		},

		secondaryMediaId: {
			type: 'number'
		},
		secondaryMediaUrl: {
			type: 'string',
			source: 'attribute',
			selector: '.secondary-image img',
			attribute: 'src', 
		},
		backgroundImage: {
			type: 'string'
		},

		primaryMediaScale: {
			type: 'number',
			default: 1,
		},

		primaryMediaYPos: {
			type: 'number',
			default: 0,
		},

		primaryMediaXPos: {
			type: 'number',
			default: 0,
		},

		secondaryMediaScale: {
			type: 'number',
			default: 1,
		},

		secondaryMediaYPos: {
			type: 'number',
			default: 0,
		},

		secondaryMediaXPos: {
			type: 'number',
			default: 0,
		},
		imgBorder : {
            type: 'boolean',
            default: false
        }

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
	edit: withSelect( (select) => {
		const { getCurrentPostId, getEditedPostAttribute } = select("core/editor");
 			return {
				//GET REQUEST TO REST API
  				postId: getCurrentPostId(),
				postTitle: getEditedPostAttribute('title'),
			};
		}) 
	( props => {
 
		const {
 			attributes: { 
				primaryMediaID,
				primaryMediaURL, 
				primaryMediaScale,
				primaryMediaYPos,
				primaryMediaXPos,
				agency, 
 				role, 
 				year, 
 				secondaryMediaId, 
				secondaryMediaUrl,
				secondaryMediaScale,
				secondaryMediaYPos,
				secondaryMediaXPos,
				backgroundImage,
				title,
				imgBorder,
				}, 
				postTitle,
   				setAttributes
			} = props;


		setAttributes({title: postTitle});

		let onSelectBackgroundImage = value => {
			setAttributes({backgroundImage: value.url });
		}

		let onSelectImage = (value) => {
 			setAttributes({ primaryMediaID: Number(value.id) });
			setAttributes({ primaryMediaURL: value.url });
		}

		let onPrimaryMediaScaleChange = value => {
			setAttributes({primaryMediaScale : value});
		 }
 
		let onPrimaryMediaYPosChange = value => {
			setAttributes({ primaryMediaYPos : value});
		}
		  
		let onPrimaryMediaXPosChange = value => {
			setAttributes({ primaryMediaXPos : value});
		}

		let onChangeAgency = (value) => {
			setAttributes({ agency: value });
  			setAttributes({ agencyMeta: value });
		}

		let onChangeRole = (value) => {
			setAttributes({ role : value});
 			setAttributes( { roleMeta : value});
		}

		let onChangeYear = (value) => {
			setAttributes({ year : value });
 			setAttributes( { yearMeta : value });
		}

		let onSelectSecondImage = (value) => {
			setAttributes({ secondaryMediaId: Number(value.id) });
		   	setAttributes({ secondaryMediaUrl: value.url });
	   	}

		let onSecondaryMediaScaleChange = value => {
			setAttributes({ secondaryMediaScale : value});
		}
 
		let onSecondaryMediaYPosChange = value => {
			setAttributes({ secondaryMediaYPos : value});
		}
		  
		let onSecondaryMediaXPosChange = value => {
			setAttributes({ secondaryMediaXPos : value});
		}

		let setChecked = value => {
            setAttributes({ imgBorder : value})
        }
		
		return (
 			<div className="made-featured-block background-image" style={{ backgroundImage : `url(${ backgroundImage })` }}>
				<div className="primary-image show-for-large"> 
				{ primaryMediaURL && (
					<a className="spotlight" href={primaryMediaURL}> 
						<img 
							src={primaryMediaURL} 
							alt={__(`${title}'s primary image.`)}
							style={{transform: `scale(${primaryMediaScale}) translateY(${primaryMediaYPos}%) translateX(${primaryMediaXPos}%)`}}
							className={ imgBorder ? 'border' : ''}
						/>
					</a>
				)}	
				</div>
				<div className="info">
					<h1>{title}</h1> 
					<div class="grid-x grid-padding-x content-450w">
						<div className="small-4 cell agency-info">
							<label>Agency</label>
							<p> 
								<RichText 
									onChange={onChangeAgency}
									value={agency}
									placeholder={__('Add agency text')}
								/>
							</p>
						</div>
						<div className="small-4 role-info">
							<label>Role</label>
							<p> 
								<RichText 
									placeholder={__('Add role text')} 
									value={role} 
									onChange={onChangeRole}
								/>
							</p>
						</div>
						<div className="small-4 cell year-info">
							<label>Year</label>
							<p> 
								<RichText 
									placeholder={__('Add year text')}
									value={year} 
									onChange={onChangeYear}
								/>
							</p>
						</div>
					</div>	
				</div>
				<div className="secondary-image show-for-large"> 
					{ secondaryMediaUrl && ( 
					<a className="spotlight" href={secondaryMediaUrl}> 
						<img src={secondaryMediaUrl}  
							alt={__(`${title}'s secondary image.`)}
							style={{transform: `scale(${secondaryMediaScale}) translateY(${secondaryMediaYPos}%) translateX(${secondaryMediaXPos}%)`}}
							className={ imgBorder ? 'border' : ''}
						/>
					 </a>
					)}
				</div>
				<InspectorControls> 
					<PanelBody title={ 'Primary Image' }>
						<MediaUpload onSelect={onSelectImage} 
						type='image' 
						value={primaryMediaID} 
						render={({open}) => (
							<Button  
								className='button image-button' 
								onClick={open}>
								{primaryMediaID ? 'Change image' : 'Upload image' }
							</Button>)} 
						/>
						{ primaryMediaID && ( 
						<RangeControl
							label="Scale"
							value={ primaryMediaScale }
							onChange={onPrimaryMediaScaleChange}
							step={ .5 }
							min={ 1 }
							max={ 5 }
						/> )}
						{ primaryMediaID && ( 
							<RangeControl
							label="Y position"
							value={ primaryMediaYPos }
							onChange={onPrimaryMediaYPosChange}
							step={ .5 }
							min={ 0 }
							max={ 100 }
						/>  )}

						{ primaryMediaID && ( 
							<RangeControl
							label="X position"
							value={ primaryMediaXPos }
							onChange={onPrimaryMediaXPosChange}
							step={ .5 }
							min={ -100 }
							max={ 100 }
						/>  )}
						
					</PanelBody>
					<PanelBody title={ 'Secondary Image' }>
						<MediaUpload onSelect={onSelectSecondImage} type='image' value={secondaryMediaId} 
						render={({open}) => (
							<Button  
								className='button image-button' 
								onClick={open}>
								{ secondaryMediaId ? 'Change image' : 'Upload image' }
							</Button>)} 
						/>
						{ secondaryMediaId && ( 
						<RangeControl
							label="Scale"
							value={ secondaryMediaScale }
							onChange={ onSecondaryMediaScaleChange }
							step={ .5 }
							min={ 1 }
							max={ 5 }
						/> )}
						{  secondaryMediaId && ( 
							<RangeControl
							label="Y position"
							value={ secondaryMediaYPos }
							onChange={ onSecondaryMediaYPosChange }
							step={ .5 }
							min={ 0 }
							max={ 100 }
						/>  )}

						{  secondaryMediaId && ( 
							<RangeControl
							label="X position"
							value={ secondaryMediaXPos }
							onChange={ onSecondaryMediaXPosChange }
							step={ .5 }
							min={ -100 }
							max={ 100 }
						/>  )}
						
					</PanelBody>
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
					<PanelBody title={ ' Image Borders' }> 
					<CheckboxControl
                            label="Show border on image"
                            help="Check to see border around images."
                            checked={ imgBorder }
                            onChange={ setChecked }
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
	    const { attributes: {
					primaryMediaURL,
					primaryMediaScale,
					primaryMediaYPos,
					primaryMediaXPos,
					agency,
 					role,
					year,
					secondaryMediaUrl,
					secondaryMediaScale,
					secondaryMediaYPos,
					secondaryMediaXPos,
					backgroundImage,
					title,
					imgBorder,				
				},
			} = props;

 		return (
 			<div className="made-featured-block background-image" style={{ backgroundImage : `url(${ backgroundImage })` }}>
				<div className="primary-image show-for-large"> 
				{ primaryMediaURL && (
					<a className="spotlight" href={primaryMediaURL}> 
						<img 
							src={primaryMediaURL} 
							alt={__(`${title}'s primary image.`)}
							style={{transform: `scale(${primaryMediaScale}) translateY(${primaryMediaYPos}%) translateX(${primaryMediaXPos}%)`}}
							className={ imgBorder ? 'border' : ''}
						/>
					</a>
				)}	
				</div>
				<div className="info">
					<h1>{title}</h1> 
					<div class="grid-x grid-padding-x content-450w">
						<div className="small-4 cell agency-info">
							<label>Agency</label>
							<p><RichText.Content value={agency} /></p>
						</div>
						<div className="small-4 role-info">
							<label>Role</label>
							<p><RichText.Content value={role} /></p>
						</div>
						<div className="small-4 cell year-info">
							<label>Year</label>
							<p><RichText.Content value={year} /></p>
						</div>
					</div>	
				</div>
				<div className="secondary-image show-for-large"> 
					{ secondaryMediaUrl && ( 
					<a className="spotlight" href={secondaryMediaUrl}> 
						<img src={secondaryMediaUrl}  
							alt={__(`${title}'s secondary image.`)}
							style={{transform: `scale(${secondaryMediaScale}) translateY(${secondaryMediaYPos}%) translateX(${secondaryMediaXPos}%)`}}
							className={ imgBorder ? 'border' : ''}
						/>
					 </a>
					)}
				</div>
			</div>
 		);
	},
});
