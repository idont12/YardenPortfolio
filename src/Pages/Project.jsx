import { useTranslation } from 'react-i18next'

import HtmlParser from 'html-react-parser'
import React,{useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import projectsData from '../data/Projects.json'
import TagCategory from '../Component/TagCategory';
import NextProject from '../Component/NextProject.jsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faHammer, faLocationDot, faFlag, faChildren, faLightbulb, faWeightHanging, faPaw, faStarOfDavid, faBolt, faPeopleGroup, faChevronDown} from '@fortawesome/free-solid-svg-icons';
import { faHandPeace } from '@fortawesome/free-regular-svg-icons';

import start from '../Js/ElementAnimationOnScroll.js'
// Create a mapping of icon keys to icon components
const iconMapping = {
  faClock,
  faHammer,
  faLocationDot,
  faFlag,
  faChildren,
  faLightbulb,
  faWeightHanging,
  faHandPeace,
  faPaw,
  faStarOfDavid,
  faBolt,
  faPeopleGroup
};

const Icon = ({ name }) => {
  const iconComponent = iconMapping[name];
  return <FontAwesomeIcon icon={iconComponent} />;
};


const Projects = () => {
  const { UrlName } = useParams();

  const [t, i18n] = useTranslation("global");
  const baseProject = `pojects.${UrlName}`;
  const data = projectsData.find((project) => project.GeneralName == UrlName);
  const allTags = data.Tags;

  const publicImgBase = "../img/";
  const publicImgProject = publicImgBase + "Projects/" + data.GeneralName + "/";
  const keyExists = i18n.exists("header.title");

  useEffect(() => {
    start();
  }, []); // Empty array means this runs once after initial render
  
  if (t(`${baseProject}.title`) != `${baseProject}.title`) {
    return (
      <>
        <i className="fa fa-cog"></i>
        <div className='minFrontZ' style={{ 'overflow': "hidden" }}>
          {/* div that conrain the fist screen with project img and general info */}
          <section className='projectMainScreen limitWidth noMarginBottom'>
            <div className='have-scroll-animation aniType-MoveUpToDown' style={{"--directionAnimation":"1s"}}>
              <h1 className='withSecondarytext relativeCon'>
                <img src="../img/General/shapeTriangle.svg" className='backShape customPositionX animationPro_LoopInfinite floatAnimation' id="shapeProp1" alt="" style={{ '--customPosition': '-40px' }} />
                <span className='titleLine' style={{ '--titleBackLineColor': data.customColor }}>
                  <Icon name={data.titleIconName} />&nbsp;
                  {t(`${baseProject}.title`)}
                </span>

                <span>{HtmlParser(t(`${baseProject}.superShotDescription`))}</span>
              </h1>

              <div className="tagsCon">
                {allTags.map((tag, index) => (
                  <TagCategory key={index} tagName={tag} />
                ))}
              </div>
              <p>{HtmlParser(t(`${baseProject}.description`))}</p>
              {
               data.projectLink!=null && data.projectLink!=""?
                <Link to={data.projectLink} className="button" target='_blank'>{t(`projectPage.chackProject_Button`)}</Link>
                :
                null
              }
               <FontAwesomeIcon className='CenterIcon' icon={faChevronDown}/>
            </div>
            <div className='demoScreen'>
              <img src={publicImgProject + data.MainScreenExample} alt=""></img>
            </div>

            <img src="../img/General/shapeTriangle.svg" alt="" className='backShape customPositionX reverse  animationPro_LoopInfinite floatAnimation' id="shapeProp2" style={{ '--customPosition': '-40px', '--animationName':'floatUpDownV2' }}></img>
          </section>

          {/* section that conrain the role, framework and duration of the project */}
          <div className='stripe3Grid'>
            <div>
              <div className='have-scroll-animation aniType-ScaleSmallToBig' style={{"--delayAnimation":"0s"}}>
                <FontAwesomeIcon icon={faHammer} />
                <h2>{t(`projectPage.role_Title`)}</h2>
                <span dangerouslySetInnerHTML={{ __html: t(`${baseProject}.role`) }} />
              </div>
              <div  className='have-scroll-animation aniType-ScaleSmallToBig'>
                <FontAwesomeIcon icon={faLocationDot} />
                <h2>{t(`projectPage.framework_Title`)}</h2>
                <span dangerouslySetInnerHTML={{ __html: t(`${baseProject}.framework`) }} />
              </div>
              <div  className='have-scroll-animation aniType-ScaleSmallToBig'  style={{"--delayAnimation":"0.5s"}}>
                <FontAwesomeIcon icon={faClock} />
                <h2>{t(`projectPage.duration_Title`)}</h2>
                <span dangerouslySetInnerHTML={{ __html: t(`${baseProject}.duration`) }} />
              </div>
            </div>
          </div>

        </div>
        {/* section that conrain the project goal and the target audience of the project */}
        <section className='grid1_2Con screenHight limitWidth'>
          <div className='useCustomColorAsBackground flexCenterY' style={{ '--customColor': data.customColor }}>
            {/* <div className='fillTheBlank' style={{ '--customColor': data.customColor }} /> */}
            <div className='spacingCon'>
              <div>
                <h2>
                  <FontAwesomeIcon icon={faFlag} />&nbsp;
                  {t(`projectPage.projectGoal_Title`)}
                </h2>
                <p className='noMargin'>{HtmlParser(t(`${baseProject}.projectGoal`))}</p>
              </div>

              <div className='horizontalLine' style={{ '--customColor': 'var(--myYellowLight)' }}></div>

              <div>
                <h2>
                  <FontAwesomeIcon icon={faChildren} />&nbsp;
                  {t(`projectPage.targetAudience_Title`)}
                </h2>
                <p className='noMargin'>
                  {HtmlParser(t(`${baseProject}.targetAudience`))}
                </p>
              </div>
            </div>
          </div>
          <div className="aspectRatio5_3Con">
            {
              data.presentProject.map((img, index) => (
                <div key={index} className={`customStructure_ceneterOffSlant_${index} ${data.presentProject.length==1 ? "centerXAbs":null}`}>
                  {index == 0 ?
                  <img src="../img/General/shapeEmptyCircle.svg" class="backShape" style={{ 'width': '42%', 'right': '-25%', 'bottom': '20%', 'rotate': '25deg' }} alt="" />
                  : null}
                  {index % 2 === 0 ?
                  <span className='imgTextDisciption'>{t(`${baseProject}.presentProjectDescription.${index}`)}</span>
                  : null}
                  <img src={publicImgProject + img} alt={t(`${baseProject}.presentProjectDescription.${index}`)} />
                  {index % 2 === 1 ? <span className='imgTextDisciption'>{t(`${baseProject}.presentProjectDescription.${index}`)}</span> : null}
                </div>
              ))}
          </div>
        </section>


        {/* need to add here iframe option for video or things like that!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
        {
          data.IframeLink != null && data.IframeLink != ""?
          <div className='limitWidth infoBlock elementWidth40Per'>
            <h2 style={{textAlign:"center"}}>{t(`${baseProject}.IframeText`)}</h2>
            <div className='aspectRatio9_16Con'>
            <iframe src={data.IframeLink}/>
            </div>
          </div>
          :
          null
        }

        {/* section that conrain the challenges and the solutions we figer out along the project */}
        <div>

          {
            data.progressStep.map((imgs, index) => (
              <div key={index}>
                <div className='limitWidth hideOverflowCon'>
                  <h2>
                    { t(`${baseProject}.TheProgress.${index}.title`)}
                  </h2>
                  <div className='grid2EqualColumn'>
                   
                  <div className='infoBlock red  have-scroll-animation aniType-MoveRightToLeft loop-Once-animation'>
                    <h3><FontAwesomeIcon icon={faWeightHanging}/>&nbsp;{t(`projectPage.challenges_Title`)}</h3>            
                    <p>
                      {HtmlParser(t(`${baseProject}.TheProgress.${index}.problem`))}
                    </p>
                  </div>
                  <div className='infoBlock green have-scroll-animation aniType-MoveLeftToRight loop-Once-animation'>
                    <h3><FontAwesomeIcon icon={faLightbulb} />&nbsp;{t(`projectPage.solutions_Title`)}</h3>
                    <p>
                      {HtmlParser(t(`${baseProject}.TheProgress.${index}.solution`))}
                    </p>
                  </div>
                  </div>
                </div>
                {imgs.length>0 && imgs.length ==t(`${baseProject}.TheProgress.${index}.imgDescription.length`) ?
                  <div className='gallery'>
                  {
                    imgs.map((img,indexImg)=>(
                      <div key={indexImg}>
                         <img src={publicImgProject + img} alt={t(`${baseProject}.TheProgress.${index}.imgDescription.${indexImg}`)}/>
                         <span>{t(`${baseProject}.TheProgress.${index}.imgDescription.${indexImg}`)}</span>
                      </div>              
                    ))
                  }
                  </div>
                :null}

              </div>
            ))
          }

          {/* <div>
          <h2>
        
            { t(`projectPage.solutions_Title`)}
          </h2>
          <p  dangerouslySetInnerHTML={{ __html: t(`${baseProject}.solutions`) }}/>
          </div>*/}

        </div>
        <br/>
        {/* sticky section that contain the general info about the projec */}
        <div className='stickyButtomBanner BannerStyle'>
          <div>
            <h1 className='withSecondarytext flexCenterY'>
              {t(`${baseProject}.title`)}
              <span> - {t(`${baseProject}.superShotDescription`)}</span>
            </h1>
            <div className="tagsCon">
              {allTags.map((tag, index) => (
                <TagCategory key={index} tagName={tag} />
              ))}
            </div>
          </div>
          <Link to={data.projectLink} className="button" target='_blank'>{t(`projectPage.chackProject_Button`)}</Link>
        </div>
        <NextProject generalName={UrlName}></NextProject>
      </>
    )
  }
  return (
    <NotFoundPage />
  )

}

export default Projects