//  Import CSS.
//import './editor.scss';
import './style.scss';

const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, ColorPalette, InspectorControls } = wp.editor;
const { IconButton, PanelBody } = wp.components;

//import logo https://mor10.com/a-simpler-way-to-add-svgs-to-custom-wordpress-gutenberg-blocks-using-svgr/
//import {Logo} from '../made-logo.svg'; //Not sure about this

registerBlockType('made/testimonial-block', {
    title: 'Made Testimonial',
    icon: 'format-quote' ,
    category: 'made-theme',
    attributes: {
        testimonialText: {
            type: 'string',
            source: 'html',
            selector: '.testimonial-block blockquote'
        },
        reviewerText: {
            type: 'string',
            source: 'html',
            selector: '.testimonial-info p'
        },
        reviewerProfile : {
            type: 'string',
            source: 'attribute',
            attribute: 'src',
            selector: '.testimonial-info img',
            //default: 'pathtofile' ToDo...
        },
        colourValue : {
            type: 'string',
            default: '#ed143d',
        }

    },
    edit: props => {
        const {attributes: {testimonialText,  reviewerText, reviewerProfile, colourValue}, setAttributes } = props;

         let handleTestimonialText = (value) => {
            setAttributes({ testimonialText: value });
        }

        let handleReviewerText = (value) => {
            setAttributes({ reviewerText: value });
        }

        let onSelectImage = (NewImage) => {
            setAttributes({ reviewerProfile: NewImage.url });
            //console.log(NewImage.url);
        }

        let handleColourChange = value => {
             setAttributes({ colourValue: value });
            console.log("Color val", value)
         }

        return (
            <div>
            <InspectorControls>
                <PanelBody title="Color Picker">
                    {/* Guttenberg class below */}
                    <div className="components-base-control">
                        <div className="components-base-control__field">
                            <label className="components-base-control__label">Colour picker</label>
                            <ColorPalette 
                                onChange={handleColourChange}
                            />
                        </div>
                    </div>
                </PanelBody>
            </InspectorControls>
            <div className="section container">
                <div className="testimonial-block" style={{ borderColor: colourValue }}>
                    <blockquote>
                        <RichText 
                            placeholder="Add review content here."
                            value={ testimonialText }
                            onChange={ handleTestimonialText }
                        />
                    </blockquote>
                    <div className="testimonial-info">
                        <img src={ reviewerProfile } />
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
                        <p style={{ color: colourValue }}>
                            <RichText 
                                placeholder="Add the reviewers title here."
                                value={ reviewerText }
                                onChange={ handleReviewerText }
                            />
                        </p>
                    </div>
                </div>
            </div>
            </div>
        );
    },
    save: props =>{
        const {attributes: {testimonialText,  reviewerText, reviewerProfile, colourValue} } = props;

        return (
            <div> 
                <div className="section container">
                    <div className="testimonial-block" style={{ borderColor: colourValue }}> 
                        <blockquote>
                            <RichText.Content 
                                value={ testimonialText }
                            />              
                        </blockquote>
                        <div className="testimonial-info">
                            <img src={ reviewerProfile } />
                            <p style={{ color: colourValue }}> 
                                <RichText.Content 
                                    value={ reviewerText }
                                /> 
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});