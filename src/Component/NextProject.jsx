// ProjectInfoButton.jsx
import { useTranslation } from 'react-i18next'

import React, { useEffect }  from 'react';
import projectsData from '../data/Projects.json'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom';

import start from '../Js/ElementAnimationOnScroll';

const getNextProjectName = (projects, currentName) => {
    const currentIndex = projects.findIndex(project => project.GeneralName === currentName);
    const nextIndex = (currentIndex + 1) % projects.length;
    return projects[nextIndex].GeneralName;
};

const NextProject = ({ generalName, newClass}) => {

    const nextProjectName = getNextProjectName(projectsData, generalName);
    const [t, i18n] = useTranslation("global");
    const baseProject = `pojects.${nextProjectName}`;
    const linkSrc = `/project/${nextProjectName}`;
    const data = projectsData.find((project) => project.GeneralName == nextProjectName);
    const publicImgBase = "../public/img/";
    const publicImgProject = publicImgBase + "Projects/" + data.GeneralName + "/";

    const location = useLocation();

    useEffect(() => {
        start();
    }, [location.pathname]);
    
    return (
        <Link to={linkSrc} className={`nextProject ${newClass}`} style={{backgroundColor:`${data.customColor}`}}>
            <div className='limitWidth'>
                <div className='paddingTopBottom'>
                <span>{t(`nextProjectComp.title`)}</span>
                <span><strong>{t(`nextProjectComp.projectPre`)} {t(`${baseProject}.title`)}</strong></span>        
                <span> {t(`${baseProject}.superShotDescription`)}</span>
                </div>
                <img src={publicImgProject+data.SmallImg}/>
            </div>
            
        </Link>
    );
};

export default NextProject;
