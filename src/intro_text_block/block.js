//  Import CSS.
//import './editor.scss';
import './style.scss';

const { registerBlockType } = wp.blocks;
const { RichText,  BlockControls, AlignmentToolbar } = wp.editor;
 
//import logo https://mor10.com/a-simpler-way-to-add-svgs-to-custom-wordpress-gutenberg-blocks-using-svgr/
//import {Logo} from '../made-logo.svg'; //Not sure about this

registerBlockType('made/intro-text-block', {
    title: 'Intro Text',
    icon: 'id-alt' ,
    category: 'made-theme',
    attributes: {
        leadingContent: {
            type: 'string',
            source: 'html',
            selector: 'p.leading-content',
        },
        content: {
            type: 'string',
            source: 'html',
            selector: 'p.secondary-content',
        },
         alignContent: {
            type: 'string',
            default: 'center'
        }
    },
    supports: {
        align: ['wide', 'full']
    },
 
    edit: props => {
 
        const {attributes : { leadingContent, content, alignContent}, setAttributes } = props;

        let leadingContentChange = (value) => {
             setAttributes({ leadingContent: value });
        }

        let handleContentChange = (value) => {
            setAttributes({ content: value });
        }

        const onChangeAlignment = (value) => {
            setAttributes({ alignContent : value })
        }
 
        return (
            <div className="intro-text-block">
                <BlockControls>
                    <AlignmentToolbar onChange={onChangeAlignment} />
                </BlockControls>
                <div className="grid-x grid-padding-x content-450w">
                    <div className="small-12 cell">
                        <p className="leading-content" style={{ textAlign: alignContent }}>
                            <RichText
                                onChange={leadingContentChange}
                                value={leadingContent}
                                placeholder="Add leading content"
                            />
                        </p>
                        <p className="secondary-content" style={{ textAlign: alignContent }}> 
                            <RichText
                                onChange={handleContentChange}
                                value={content}
                                placeholder="Add content"
                            />
                        </p> 
                    </div>
                </div>
            </div>
        );
    },
    save: props =>{
        const {attributes : { leadingContent, content, alignContent} } = props;

        return (    
            <div className="intro-text-block">
                <div className="grid-x grid-padding-x content-450w">
                    <div className="small-12 cell">
                        <p className="leading-content" style={{ textAlign: alignContent }}>
                            <RichText.Content value={leadingContent} />    
                        </p>
                        <p className="secondary-content" style={{ textAlign: alignContent }}>
                            <RichText.Content value={content} />   
                        </p>
                    </div>
                </div>
            </div>   
        );
    }
});