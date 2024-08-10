import { useTranslation } from 'react-i18next'

import { Link } from 'react-router-dom'
import React from 'react'

const NotFoundPage = () => {
  const [t, i18n] = useTranslation("global");

  return (
    <>
    <div className='notFoundPage'>
        <h1>404</h1>
        <span>{t('page404.text')}</span>
      <Link to="Category" className='button'>{t('page404.exploreProjects')}</Link>
    </div>
    </>
  )
}

export default NotFoundPage