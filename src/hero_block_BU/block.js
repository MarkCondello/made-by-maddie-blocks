//  Import CSS.
//import './editor.scss';
import './style.scss';

const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, BlockControls, AlignmentToolbar } = wp.editor;
const { IconButton } = wp.components;

//import logo https://mor10.com/a-simpler-way-to-add-svgs-to-custom-wordpress-gutenberg-blocks-using-svgr/
//import {Logo} from '../made-logo.svg'; //Not sure about this

registerBlockType('made/hero-block', {
    title: 'Made Hero',
    icon: 'table-row-before' ,
    category: 'made-theme',
    attributes: {
        heroTitle: {
            type: 'string',
            source: 'html',
            selector: '.hero-block h1'
        },
        heroTagLine: {
            type: 'string',
            source: 'html',
            selector: '.hero-block p'
        },
        heroImage: {
            type: 'string'
        },
        alignContent : {
            type: 'string',
            default: 'center'
        }
    },
    supports: {
        align: ['wide', 'full']
    },
    edit: props => {
 
        const {attributes : { heroTitle, heroTagLine, heroImage, alignContent }, setAttributes } = props;

         let handleTitleChange = (value) => {
            props.setAttributes({ heroTitle: value });
        }

        let handleTagLineChange = (value) => {
            props.setAttributes({ heroTagLine: value });
        }

        let onSelectImage = (NewImage) => {
            props.setAttributes({ heroImage : NewImage.url });
            //console.log(NewImage.url);
        }

        //access the alignment
        const onChangeAlignment = (NewAlignment) => {
            setAttributes({alignContent : NewAlignment })
           // console.log(NewAlignment)
        }

        return (
            <div className="section" style={{ backgroundImage: `url( ${heroImage} )`}}>
                <BlockControls>
                    <AlignmentToolbar 
                        onChange={onChangeAlignment}
                    />
                </BlockControls>
                <MediaUpload
                    onSelect={ onSelectImage }
                    type="image"
                    render={ ({open}) => (
                        <IconButton
                            onClick={open}
                            icon="format-image"
                            showTooltip="true"
                            label="Add Image"
                        />
                    )
                    }
                />
                <h1>Hero Block</h1>
                <div class="hero-block">
                    <h1>
                        <RichText 
                            placeholder="Save the title"
                            value={heroTitle}
                            onChange={handleTitleChange}
                            style={{ textAlign: alignContent }}
                        />
                    </h1>
                    <p>      
                        <RichText 
                            placeholder="Save the tagline"
                            value={heroTagLine}
                            onChange={handleTagLineChange}
                            style={{ textAlign: alignContent }}
                        />
                    </p>
                </div>
            </div> 
        );
    },
    save: props =>{
        const {attributes : { heroTitle, heroTagLine, heroImage, alignContent } } = props;

        return (
            <div className="section" style={{ backgroundImage: `url( ${heroImage} )`}}>
                <h1>Hero Block</h1>
                <div class="hero-block">
                    <h1 style={{ textAlign: alignContent }}>
                        <RichText.Content value={heroTitle} />
                    </h1>
                    <p style={{ textAlign: alignContent }} >
                        <RichText.Content value={heroTagLine} />
                    </p>
                </div>
            </div> 
        );
    }
});