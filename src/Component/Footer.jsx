import React from 'react'
import { useTranslation } from 'react-i18next'

import HtmlParser from 'html-react-parser'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe, faHouse} from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
const Footer = () =>{
    const [t, i18n] = useTranslation("global");
    const handleChangeLanguage = (lang)=>{
        i18n.changeLanguage(lang);
    }

    return(
    <>
    <footer>
        <div className='limitWidth'>
            <h2 className='smallTitleMargin'>{HtmlParser(t(`footer.connectWithMe`))}</h2>
            <div className='tagsCon'>
                <Link to="mailto:yardenzilbrman.mail@gmail.com" className='buttonIcon'> <FontAwesomeIcon icon={faEnvelope} title={t(`footer.mailButton`)} alt={t(`footer.mailButton`)} /></Link>
                <Link to="https://www.instagram.com/hapy_toon/" className='buttonIcon' target='_blank'> <FontAwesomeIcon icon={faInstagram} title={t(`footer.instegramButton`)} alt={t(`footer.instegramButton`)} /></Link>
                <Link to="https://www.linkedin.com/in/yarden-zilberman-graphic-and-game-design/" className='buttonIcon' target='_blank' > <FontAwesomeIcon icon={faLinkedinIn} title={t(`footer.linkinButton`)} alt={t(`footer.linkinButton`)} /></Link>      
            </div>
            <span className='reverseTextAlignment'>{t(`footer.creditText`)}</span>
        </div>
    </footer>
    </>
    )
}

export default Footer