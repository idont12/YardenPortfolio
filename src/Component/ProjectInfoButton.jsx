// ProjectInfoButton.jsx
import { useTranslation } from 'react-i18next'

import React,{useEffect } from 'react';
import projectsData from '../data/Projects.json'
import { Link } from 'react-router-dom'

import start from '../Js/ElementAnimationOnScroll.js'
const ProjectInfoButton = ({ generalName, newStyle, newClass}) => {
    const [t, i18n] = useTranslation("global");
    const baseProject = `pojects.${generalName}`;
    const linkSrc = `/project/${generalName}`;
    const data = projectsData.find((project) => project.GeneralName == generalName);
    const publicImgBase = "../public/img/";
    const publicImgProject = publicImgBase + "Projects/" + data.GeneralName + "/";

    useEffect(() => {
        start();
      }, []); // Empty array means this runs once after initial render

    return (
        <Link to={linkSrc} className={`projectInfoButton linkHoverBaceNo ${newClass}`} style={newStyle}>
            <div className='info'>
                <div>
                <span><strong>{t(`${baseProject}.title`)}</strong></span>        
                <span> {t(`${baseProject}.superShotDescription`)}</span>
                </div>
                <span>{t(`tags.readMore`)}</span>
            </div>
            <div className='backImg' style={{"backgroundImage":`url(${publicImgProject+data.SmallImg})`}} />
        </Link>
    );
};

export default ProjectInfoButton;
