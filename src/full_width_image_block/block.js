//  Import CSS.
import './editor.scss';
import './style.scss';

const { registerBlockType } = wp.blocks;
const { MediaUpload, InspectorControls} = wp.editor;
const { IconButton, CheckboxControl, PanelBody} = wp.components;

//import logo https://mor10.com/a-simpler-way-to-add-svgs-to-custom-wordpress-gutenberg-blocks-using-svgr/
//import {Logo} from '../made-logo.svg'; //Not sure about this

registerBlockType('made/full-width-image-block', {
    title: 'Full Width Image',
    icon: 'table-row-before' ,
    category: 'made-theme',
    attributes: {
        backgroundImage: {
            type: 'string'
        },
        backgroundHeight : {
            type: 'number',
            default: 0
        },
        backgroundTitle: {
            type: 'String',
            default: 'Full width image.'
        },
        fullWidth : {
            type: 'boolean',
            default: true
        },
        showDesktopOnly : {
            type: 'boolean',
            default: false
        },
        showMobileOnly : {
            type: 'boolean',
            default: false
        }
    },
    supports: {
        align: ['wide', 'full']
    },
    edit: props => {
 
        const {attributes : { backgroundImage, backgroundHeight, backgroundTitle, fullWidth, showDesktopOnly, showMobileOnly }, setAttributes } = props;

        //ToDo: May need a responsive height size
        let onSelectImage = value => {
            setAttributes({ backgroundImage : value.url });
            setAttributes({ backgroundHeight : value.height });
            if(value.caption != ""){
                setAttributes({backgroundTitle : value.caption});
            }
         }

        //includes the option to display background within the border
        //eg background-size: calc(100% - 200px);
        let setCheckedInsideBorder = value => {
            setAttributes({ fullWidth : value})
        }

        let setCheckedDesktopOnly = value => {
            setAttributes({ showDesktopOnly : value})
        }

        let setCheckedMobileOnly = value => {
            setAttributes({ showMobileOnly : value})
        }

        return (
            <a 
            className={`full-width-image-block spotlight ${showDesktopOnly ? 'show-for-medium' : ''} ${showMobileOnly ? 'hide-for-medium' : ''}`} 
            href={backgroundImage} 
            data-title={backgroundTitle} > 
                <div 
                className="full-width-image"
                data-mobile-height={`${backgroundHeight / 2}px` }
                style={{ backgroundImage: `url( ${backgroundImage} )`, width: '100%', backgroundPosition: 'center', minHeight: `${backgroundHeight}px`, backgroundRepeat: 'no-repeat', backgroundSize: fullWidth ? 'cover' :  'calc(100% - 200px)' }}>
                </div> 
                <InspectorControls> 
                        <PanelBody title={ 'Background Image' }>
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
                            )}
                        />
                        </PanelBody>
                        <PanelBody title={ 'Background Options' }>
                            <CheckboxControl
                                label="Full width"
                                help="Uncheck if the background should display inside the borders."
                                checked={ fullWidth }
                                onChange={ setCheckedInsideBorder }
                            />
                            <CheckboxControl
                                label="Show on desktop only"
                                help="Display image on desktop screens."
                                checked={ showDesktopOnly }
                                onChange={ setCheckedDesktopOnly }
                            />
                            <CheckboxControl
                                label="Show on mobile only"
                                help="Display image on mobile screens."
                                checked={ showMobileOnly }
                                onChange={ setCheckedMobileOnly }
                            />
                        </PanelBody>
                    </InspectorControls>
            </a>
        );
    },
    save: props =>{
        const {attributes: { backgroundImage, backgroundHeight, backgroundTitle, fullWidth, showDesktopOnly, showMobileOnly } } = props;
        return (
            <a 
            className={`full-width-image-block spotlight ${showDesktopOnly ? 'show-for-medium' : ''} ${showMobileOnly ? 'show-for-small-only' : '' }`} 

            href={backgroundImage} 
            data-title={backgroundTitle}> 
                <div 
                className="full-width-image"
                data-mobile-height={`${backgroundHeight / 2}px` }
                style={{ backgroundImage: `url( ${backgroundImage} )`, width: '100%', backgroundPosition: 'center', minHeight: `${backgroundHeight}px`, backgroundRepeat: 'no-repeat', backgroundSize: fullWidth ? 'cover' :  'calc(100% - 200px)'}}>
                </div> 
            </a>
        );
    }
});