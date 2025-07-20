import React from 'react';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center text-center" style={{ minHeight: '100%' }}>
      <h1 className="mb-3">404</h1>
      <p className="mb-0">{t('notfound.message')}</p>
    </div>
  );
};

export default NotFound; 