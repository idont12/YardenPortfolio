// ProjectInfoButton.jsx
import { useTranslation } from 'react-i18next'
import HtmlParser from 'html-react-parser'

import React,{useEffect} from 'react';
import projectsData from '../data/Projects.json'
import { Link } from 'react-router-dom'

import start from '../Js/ElementAnimationOnScroll.js'
const CategoryInfoButton = ({allCategories, keyName, newStyle, newClass}) => {
    // let myCategories = allCategories?.split(',') || [];

    const [t, i18n] = useTranslation("global");
    const baseProject = `home.TopicToDisplay.${keyName}`;
    const linkSrc = `/category/?categories=${allCategories}`;

    const publicImgBase = "./img/";
    const publicImgProject =`${publicImgBase}General/CategoryGroups/${keyName}.jpg`;

    useEffect(() => {
        start();
      }, []); // Empty array means this runs once after initial render

    return (
        <Link to={linkSrc} className={`projectInfoButton linkHoverBaceNo ${newClass}`} style={newStyle}>
            <strong className='textBlock'>{HtmlParser(t(`${baseProject}`))}</strong>
            {/* <div className='info'>
                <div>
                <span><strong>{t(`${baseProject}.title`)}</strong></span>     
                <br/>         
                <span> {t(`${baseProject}.superShotDescription`)}</span>
                </div>
                <span>{t(`tags.readMore`)}</span>
            </div> */}
             <div className='info'>
             </div>
            <div className='backImg' style={{"backgroundImage":`url(${publicImgProject})`, backgroundPositionY:"85%"}} />
        </Link>
    );
};

export default CategoryInfoButton;
