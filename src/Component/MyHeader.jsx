import React from 'react'
import { useTranslation } from 'react-i18next'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe, faHouse} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
const MyHeader = () =>{
    const [t, i18n] = useTranslation("global");

    const handleChangeLanguage = (lang)=>{
        i18n.changeLanguage(lang);
    }

    return(
    <>
    <div className="header">
        <div className='limitWidth'>
        <div>
            <Link to="/"> {t(`header.homeButton`)}</Link>
            <Link to={'Category'} className="spaceX">{t(`header.allProject`)}</Link>
        </div>

    {i18n.language === 'en' ? (
                <button onClick={() => handleChangeLanguage('he')}>
                     עברית
                     &nbsp;
                     <FontAwesomeIcon icon={faGlobe} />
                    </button>
            ) : (
                <button onClick={() => handleChangeLanguage('en')}>
                     English
                     &nbsp;
                    <FontAwesomeIcon icon={faGlobe} />
                    </button>
            )}
                        
        </div>
    </div>
    </>
    )
}

export default MyHeader