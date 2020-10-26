//  Import CSS.
//import './editor.scss';
import './style.scss';

const { registerBlockType } = wp.blocks;
const { MediaUpload, InspectorControls} = wp.editor;
const { IconButton, CheckboxControl, PanelBody} = wp.components;

//import logo https://mor10.com/a-simpler-way-to-add-svgs-to-custom-wordpress-gutenberg-blocks-using-svgr/
//import {Logo} from '../made-logo.svg'; //Not sure about this

registerBlockType('made/two-col-images-block', {
    title: 'Two Col Images',
    icon: 'table-row-before',
    category: 'made-theme',
    attributes: {
        backgroundImageOne: {
            type: 'string',
            default: null,
        },
        backgroundOneHeight : {
            type: 'number',
            default: 0
        },
        backgroundOneTitle: {
            type: 'String',
            default: 'One of two column images.'
        },
        backgroundImageTwo: {
            type: 'string',
            default: null,
        },
        backgroundTwoHeight : {
            type: 'number',
            default: 0
        },
        backgroundTwoTitle: {
            type: 'String',
            default: 'Two of two column images.'
        },
    },
    supports: {
        align: ['wide', 'full']
    },
    edit: props => {
 
        const {attributes : { backgroundImageOne, backgroundOneHeight, backgroundOneTitle, backgroundImageTwo, backgroundTwoHeight, backgroundTwoTitle }, setAttributes } = props;

        //ToDo: May need a responsive height size
        let onSelectImageOne = value => {
            setAttributes({ backgroundImageOne : value.url });
            setAttributes({ backgroundOneHeight : value.height });
            if(value.caption != ""){
                setAttributes({backgroundOneTitle : value.caption});
            }
         }

         let onSelectImageTwo = value => {
            setAttributes({ backgroundImageTwo : value.url });
            setAttributes({ backgroundTwoHeight : value.height });
            if(value.caption != ""){
                setAttributes({backgroundTwoTitle : value.caption});
            }
         }


        // display background images within the border
        //eg background-size: calc(100% - 200px);
 

        return (
            <div className="two-col-image-block"> 
                <a className="spotlight" href={backgroundImageOne} data-title={backgroundOneTitle}> 
                    <div style={{ backgroundImage: `url( ${backgroundImageOne} )`, width: '100%', backgroundPosition: 'center', minHeight: `${backgroundOneHeight}px`, backgroundRepeat: 'no-repeat', backgroundSize:'cover'}}>
                    </div> 
                </a>
                <a className="spotlight" href={backgroundImageTwo} data-title={backgroundTwoTitle}> 
                    <div style={{ backgroundImage: `url( ${backgroundImageTwo} )`, width: '100%', backgroundPosition: 'center', minHeight: `${backgroundTwoHeight}px`, backgroundRepeat: 'no-repeat', backgroundSize:'cover'}}>
                    </div> 
                </a>
                <InspectorControls> 
                    <PanelBody title={ 'Image One' }>
                        <MediaUpload
                            onSelect={ onSelectImageOne }
                            type="image"
                            render={ ({open}) => (
                                <IconButton
                                    onClick={open}
                                    icon="format-image"
                                    showTooltip="true"
                                    label="Add Image"
                                />
                            )}
                        />
                    </PanelBody>
                    <PanelBody title={ 'Image Two' }>
                        <MediaUpload
                            onSelect={ onSelectImageTwo }
                            type="image"
                            render={ ({open}) => (
                                <IconButton
                                    onClick={open}
                                    icon="format-image"
                                    showTooltip="true"
                                    label="Add Image"
                                />
                            )}
                        />
                    </PanelBody>
            
                </InspectorControls>
            </div>
        );
    },
    save: props =>{
       const {attributes : { backgroundImageOne, backgroundOneHeight, backgroundOneTitle, backgroundImageTwo, backgroundTwoHeight, backgroundTwoTitle, } } = props;
        return (
            <div className="two-col-image-block"> 
                <a className="spotlight" href={backgroundImageOne} data-title={backgroundOneTitle}> 
                    <div style={{ backgroundImage: `url( ${backgroundImageOne} )`, width: '100%', backgroundPosition: 'center', minHeight: `${backgroundOneHeight}px`, backgroundRepeat: 'no-repeat', backgroundSize:'cover'}}>
                    </div> 
                </a>
                <a className="spotlight" href={backgroundImageTwo} data-title={backgroundTwoTitle}> 
                    <div style={{ backgroundImage: `url( ${backgroundImageTwo} )`, width: '100%', backgroundPosition: 'center', minHeight: `${backgroundTwoHeight}px`, backgroundRepeat: 'no-repeat', backgroundSize:'cover'}}>
                    </div> 
                </a>
            </div>
        )
    }
});