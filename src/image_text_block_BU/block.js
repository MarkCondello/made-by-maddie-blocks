//  Import CSS.
//import './editor.scss';
import './style.scss';

const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, URLInputButton, BlockControls, AlignmentToolbar } = wp.editor;
const { IconButton } = wp.components;

//import logo https://mor10.com/a-simpler-way-to-add-svgs-to-custom-wordpress-gutenberg-blocks-using-svgr/
//import {Logo} from '../made-logo.svg'; //Not sure about this

registerBlockType('made/image-text-block', {
    title: 'Made Image / Text',
    icon: 'id-alt' ,
    category: 'made-theme',
    attributes: {
        title: {
            type: 'string',
            source: 'html',
            selector: '.content h1',
         },

         titleMeta: {
            type: 'string',
            source: 'meta',
            meta: 'titleMeta',
         },

         content: {
            type: 'string',
            source: 'html',
            selector: '.content p',
         },
         blockImage: {
            type: 'string',
            source: 'attribute',
            attribute: 'src',
            selector: '.image img',
         },
         blockLink: {
            type: 'string', 
            source: 'attribute',
            attribute: 'href',
            selector: '.image-text-block a', 
        },
        alignContent: {
            type: 'string',
            default: 'center'
        }
    },
    supports: {
        align: ['wide', 'full']
    },
    styles: [
        {
            name: 'default',
            label: 'Blue (Default)',
            isDefault: true
        },
        {
            name: 'green',
            label: 'Green',
        },
        {
            name: 'pink',
            label: 'Pink',
        },
    ],
    edit: props => {
 
        const {attributes : { title, content, blockImage, blockLink, alignContent }, setAttributes } = props;

         let handleTitleChange = (value) => {
            setAttributes({ title: value });
            setAttributes({ titleMeta: value });
        }

        let handleContentChange = (value) => {
            setAttributes({ content: value });
        }
 
        let onSelectImage = ( NewImage) => {
             setAttributes({ blockImage: NewImage.url });
         }

        let handleUrlChange = value => {
            setAttributes({ blockLink: value });
        }

            //access the alignment
        const onChangeAlignment = (NewAlignment) => {
            setAttributes({alignContent: NewAlignment })
            // console.log(NewAlignment)
        }

        return (
            <div className="image-text-block">
                <BlockControls>
                    <AlignmentToolbar 
                        onChange={onChangeAlignment}
                    />
                </BlockControls>
                <div className="container">
                    <div className="content">
                        <h1 style={{ textAlign: alignContent }}>
                            <RichText
                                onChange={handleTitleChange}
                                value={title}
                                placeholder="Add Title Text"
                            />
                        </h1>
                        <p style={{ textAlign: alignContent }}> 
                            <RichText
                                onChange={handleContentChange}
                                value={content}
                                placeholder="Add Content Text"
                            />
                        </p> 
                        <a href={blockLink} className="button" target="_blank" rel="noopener noreferrer">Download</a>
                        <URLInputButton 
                            onChange={handleUrlChange}
                            url={blockLink}
                        />
                    </div>
                    <div className="image">
                        <img src={blockImage} />
                        <MediaUpload
                            onSelect={onSelectImage}
                            type="image"
                            value={ blockImage }
                            render={ ({open})=> (
                                <IconButton
                                    onClick={open}
                                    icon="format-image"
                                    showTooltip="true"
                                    label="Add Image"
                                />
                            ) 
                        }
                        />
                    </div>
                </div>
            </div>
        );
    },
    save: props =>{
        const { attributes : { title, content, blockImage, blockLink, alignContent } } = props;

        return (    
            <div className="image-text-block">
                <div className="container">
                    <div className="content">
                        <h1 style={{ textAlign: alignContent }}>
                            <RichText.Content value={title} />    
                        </h1>
                        <p style={{ textAlign: alignContent }}>
                            <RichText.Content value={content} />   
                        </p>
                        <a href={blockLink} className="button" target="_blank" rel="noopener noreferrer">Download</a>
                    </div>
                    <div className="image">
                        <img src={blockImage} />
                    </div>
                </div>
            </div>   
        );
    }
});