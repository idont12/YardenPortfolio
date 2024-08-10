// tagCategoty.jsx
import { useTranslation } from 'react-i18next'

import React from 'react';
import { Link } from 'react-router-dom'

const TagCategory = ({ tagName }) => {
    console.log("tagname" + tagName);
    const [t, i18n] = useTranslation("global");
    const baseProject = `pojects.${tagName}`;
    const linkSrc = `/category/?categories=${tagName}`;
    
    return (
        <Link className='tag' to={linkSrc}>{t(`category.${tagName}.title`)}</Link>
    );
};

export default TagCategory;
