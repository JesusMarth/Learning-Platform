import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-dark text-light text-center py-3 mt-auto">
      <div className="container">
        <small>{t('footer.copyright', { year: new Date().getFullYear(), app: 'Aprende+' })}</small>
      </div>
    </footer>
  );
};

export default Footer; 