import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import projectsData from '../data/Projects.json';
import ProjectInfoButton from '../Component/ProjectInfoButton';
import NotFoundPage from './NotFoundPage';

const Category = () => {
  const { t } = useTranslation('global');
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract and normalize categories from URL
  const params = new URLSearchParams(location.search);
  let categories = params.get('categories')?.split(',') || [];
  categories = categories.map(value => value.toLowerCase());
  
  // Filter projects based on categories
  const filteredProjects = projectsData.filter(project => 
    categories.some(cat => project.Tags.map(tag => tag.toLowerCase()).includes(cat))
  );

  // Get and sort categories for dropdown
  const allCategories = t('category', { returnObjects: true });
  const sortedCategories = Object.keys(allCategories)
    .map(key => ({ ...allCategories[key], id: key }))
    .sort((a, b) => a.title.localeCompare(b.title));

  const [selectedCategories, setSelectedCategories] = useState(
    sortedCategories.filter(cat => categories.includes(cat.id)).map(cat => cat.id)
  );

  useEffect(() => {
    setSelectedCategories(sortedCategories.filter(cat => categories.includes(cat.id)).map(cat => cat.id));
  }, [location.search, sortedCategories]);

  const handleCheckboxChange = (id) => {
    setSelectedCategories(prevSelectedCategories => {
      const newSelectedCategories = prevSelectedCategories.includes(id)
        ? prevSelectedCategories.filter(catId => catId !== id)
        : [...prevSelectedCategories, id];
        
      // Update URL with selected categories
      const url = `/Category?categories=${newSelectedCategories.join(',')}`;
      navigate(url);

      return newSelectedCategories;
    });
  };

  const isCategoryChecked = (id) => selectedCategories.includes(id);

  if (categories.length === 0) {
    return <NotFoundPage />;
  }

  return (
    <div className='limitWidth'>
      <h1>
        #{categories.map((cat, index) => (
          <span key={index}>
            {t(`category.${cat}.title`)}
            {index < categories.length - 1 && <span>, </span>}
          </span>
        ))}
      </h1>

      {/* Dropdown for category selection */}
      <div className="dropdown-content">
        <label>
          <input 
            type="checkbox" 
            name="Category" 
            checked={selectedCategories.length === sortedCategories.length} 
            onChange={() => {
              const allChecked = selectedCategories.length === sortedCategories.length;
              const newSelectedCategories = allChecked ? [] : sortedCategories.map(cat => cat.id);
              setSelectedCategories(newSelectedCategories);
              const url = `/Category?categories=${newSelectedCategories.join(',')}`;
              navigate(url);
            }} 
          /> All
        </label>
        {sortedCategories.map(item => (
          <label key={item.id}>
            <input 
              type="checkbox" 
              name="Category" 
              value={item.id} 
              onChange={() => handleCheckboxChange(item.id)} 
              checked={isCategoryChecked(item.id)} 
            />
            {item.title}
          </label>
        ))}
      </div>

      {/* Show description if there is only one selected category */}
      {categories.length === 1 && (
        <p>{t(`category.${categories[0]}.description`)}</p>
      )}

      <div className='flexCenterCon'>
        {filteredProjects.map((project, index) => (
          <ProjectInfoButton key={index} generalName={project.GeneralName} />
        ))}
      </div>
    </div>
  );
}

export default Category;
