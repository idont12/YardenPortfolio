import React, { useState, useEffect, useMemo, useCallback, useRef  } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import projectsData from '../data/Projects.json';
import ProjectInfoButton from '../Component/ProjectInfoButton';
import NotFoundPage from './NotFoundPage';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown,faCheck} from '@fortawesome/free-solid-svg-icons';

const Category = () => {
  const { t } = useTranslation('global');
  const location = useLocation();
  const navigate = useNavigate();

  // Extract and normalize categories from URL
  const params = new URLSearchParams(location.search);
  let categories = params.get('categories')?.split(',') || [];
  categories = categories.filter(Boolean).map(value => value.toLowerCase()); // Ensure categories are non-empty and lowercase

  // Filter projects to include only those containing all specified categories
  const filteredProjects = useMemo(() => {
    return categories.length > 0
      ? projectsData.filter(project =>
        categories.every(cat => project.Tags.map(tag => tag.toLowerCase()).includes(cat))
      )
      : projectsData; // Show all projects if no categories are specified
  }, [categories]);

  // Get and sort categories for dropdown
  const allCategories = useMemo(() => t('category', { returnObjects: true }), [t]);
  const sortedCategories = useMemo(() => {
    return Object.keys(allCategories)
      .map(key => ({ ...allCategories[key], id: key }))
      .sort((a, b) => a.title.localeCompare(b.title));
  }, [allCategories]);

  const [selectedCategories, setSelectedCategories] = useState(
    sortedCategories.filter(cat => categories.includes(cat.id)).map(cat => cat.id)
  );

  useEffect(() => {
    // Sync selectedCategories with categories from URL
    const newSelectedCategories = sortedCategories.filter(cat => categories.includes(cat.id)).map(cat => cat.id);
    if (JSON.stringify(newSelectedCategories) !== JSON.stringify(selectedCategories)) {
      setSelectedCategories(newSelectedCategories);
    }
  }, [categories, sortedCategories]); // Only update if categories or sortedCategories change

  const handleCheckboxChange = useCallback((id) => {
    setSelectedCategories(prevSelectedCategories => {
      const newSelectedCategories = prevSelectedCategories.includes(id)
        ? prevSelectedCategories.filter(catId => catId !== id)
        : [...prevSelectedCategories, id];

      // Update URL with selected categories
      const url = `/Category?categories=${encodeURIComponent(newSelectedCategories.join(','))}`;
      navigate(url, { replace: true });

      return newSelectedCategories;
    });
  }, [navigate]);

  const handleReset = useCallback(() => {
    setSelectedCategories([]);
    navigate('/Category?categories=', { replace: true });
  }, [navigate]);

  const isCategoryChecked = (id) => selectedCategories.includes(id);

  // Filter sortedCategories to show only those that are part of the current selection
  const filteredCategoriesForDropdown = sortedCategories.filter(cat =>
    filteredProjects.some(project =>
      project.Tags.map(tag => tag.toLowerCase()).includes(cat.id)
    )
  );

  /*Toggle Dropdown*/

    const [showDropdown, setShowDropdown] = useState(false);
  
    const toggleDropdown = () => {
      setShowDropdown((showDropdown) => !showDropdown);
    };
    const divRef = useRef(null);
    const buttonRef = useRef(null);
    const titleButtonRef = useRef(null);
    const handleClickOutside = (event) => {
      if (
        divRef.current && 
        !divRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)&&
        titleButtonRef.current &&
        !titleButtonRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };
  

    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

  if (categories.length === 0 && projectsData.length === 0) {
    return <NotFoundPage />;
  }

  return (
    <div className='limitWidth topSpace'>
      <button className='noButtonStyle'  onClick={toggleDropdown} ref={titleButtonRef} style={{display:"block"}}>
      <h1 className='smallTitleMargin'>
        # {categories.length > 0 ? categories.map((cat, index) => (
          <span key={index}>
            {t(`category.${cat}.title`)}
            {index < categories.length - 1 && <span>, </span>}
          </span>
        )) : t(`categoryPage.noCategoryTitle`)}
        &nbsp;
        <FontAwesomeIcon icon={faCaretDown} style={{fontSize: "0.55em", marginBottom: "0.15em"}}/>
      </h1> 
      </button>
      <button className={`button ${showDropdown ? 'dropDownButtonActive' : ''}`} onClick={toggleDropdown} ref={buttonRef}>{t(`categoryPage.filter`)}</button>
      {categories.length > 0 ?
      <button className='button secondary spaceX' onClick={handleReset}>{t(`categoryPage.reasteSertch`)}</button>
      : null
      }
      {/* Dropdown for category selection */}
      {showDropdown && (
        <div onClick={(e) => e.stopPropagation()}  className="dropdown-content"  ref={divRef}>
        {filteredCategoriesForDropdown.map((item, index) => (
          <label key={item.id} tabIndex={index + 1}>
            <input
              type="checkbox"
              name="Category"
              value={item.id}
              onChange={() => handleCheckboxChange(item.id)}
              checked={isCategoryChecked(item.id)}
            />
            <span>
              <FontAwesomeIcon icon={faCheck} style={{fontSize: "0.8em",marginLeft : "0.5em"}}/>
              {item.title}</span>
          </label>

        ))}
        </div>
      )}


      {/* Show description if there is only one selected category */}
      {categories.length === 1 && (
        <p>{t(`category.${categories[0]}.description`)}</p>
      )}

      <div className='flexCenterCon topSpaceNormal'>
        {filteredProjects.map((project, index) => (
          <ProjectInfoButton key={index} generalName={project.GeneralName} newClass='have-scroll-animation aniType-ScaleSmallToBig' newStyle={{"--delayAnimation":`${index * 0.2}S`}}/>
        ))}
      </div>
      <br/>
    </div>
  );
}

export default Category;
