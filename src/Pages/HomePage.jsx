import { useTranslation } from 'react-i18next'

import { Link } from 'react-router-dom'
import React,{useEffect } from 'react'
import HtmlParser from 'html-react-parser'
import ProjectInfoButton from '../Component/ProjectInfoButton'
import CategoryInfoButton from '../Component/CategotysInfoButton'

import projectsData from '../data/Projects.json'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandPeace } from '@fortawesome/free-regular-svg-icons';

import start from '../Js/ElementAnimationOnScroll.js'
const HomePage = () => {
  const [t, i18n] = useTranslation("global");
  const firstThreeProjects = projectsData.slice(0, 3);
  const baseTranslation = "home.";

  useEffect(() => {
    start();
  }, []); // Empty array means this runs once after initial render

  return (
    <div className='hideOverflowCon'>
      {/* div that conrain the fist screen with project img and general info */}
      <section className='projectMainScreen limitWidth'>
        <div className='have-scroll-animation aniType-MoveRightToLeft'>
          <h1 className='withSecondarytext relativeCon'>
            <img src="../public/img/General/shapeTriangle.svg" className='backShape customPositionX  animationPro_LoopInfinite floatAnimation' id="shapeProp1" alt="" style={{ '--customPosition':'-40px'}} />
            <span className='titleLine'>
              <FontAwesomeIcon icon={faHandPeace} />
              {HtmlParser(t(`${baseTranslation}title`))}
            </span>

            <span>{t(`${baseTranslation}superShotDescription`)}</span>
          </h1>

          <p>{HtmlParser(t(`${baseTranslation}description`))}</p>
          <Link to={'Category'} className="button">{t(`${baseTranslation}exploreAllProjectButton`)}</Link>
        </div>
        <div className='welcomImg  have-scroll-animation aniType-MoveLeftToRight'>
          <img src="../public/img/General/WelcomeImg.png" alt=""></img>
        </div>

        <img src="../public/img/General/shapeTriangle.svg" alt='' className='backShape customPositionX reverse animationPro_LoopInfinite floatAnimation' id="shapeProp2" style={{ '--customPosition':'-40px',  '--animationName':'floatUpDownV2'}}></img>
      </section>

      <section className='limitWidth'>
        <h2 style={{position:"relative", zIndex:"2"}}>{t(`${baseTranslation}Projects`)}</h2>
        <div className='flexCenterCon'>
        {firstThreeProjects.map((project, index) => (
          <ProjectInfoButton n key={index} generalName={project.GeneralName}  newClass='have-scroll-animation aniType-ScaleSmallToBig' newStyle={{"--delayAnimation":`${index * 0.3}S`}}/>
          ))}
          </div>
      </section>

      <section className='limitWidth'>
        <h2>{t(`${baseTranslation}projectByTopic`)}</h2>
        <div className='flexCenterCon'>
          <CategoryInfoButton allCategories="ux" keyName="webDesign" newClass='have-scroll-animation aniType-ScaleSmallToBig' newStyle={{"--delayAnimation":"0.6s"}}/>
          <CategoryInfoButton allCategories="html" keyName="webDevelopment" newClass='have-scroll-animation aniType-ScaleSmallToBig' newStyle={{"--delayAnimation":"0.3s"}}/>
          <CategoryInfoButton allCategories="unity" keyName="gameDevelopment" newClass='have-scroll-animation aniType-ScaleSmallToBig' newStyle={{"--delayAnimation":"0s"}}/>
        </div>
      </section>
      <br/>
    </div>
  )
}

export default HomePage