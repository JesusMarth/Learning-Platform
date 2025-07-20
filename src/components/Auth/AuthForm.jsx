import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const AuthForm = ({ onSubmit, isRegister = false, loading = false, error = '' }) => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const { t } = useTranslation();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="w-100" style={{ maxWidth: 340 }}>
      {isRegister && (
        <div className="mb-3">
          <label className="form-label">{t('auth.name')}</label>
          <input 
            type="text" 
            className="form-control form-control-lg" 
            name="name" 
            value={form.name} 
            onChange={handleChange} 
            required 
            autoComplete="name"
          />
        </div>
      )}
      <div className="mb-3">
        <label className="form-label">{t('auth.email')}</label>
        <input 
          type="email" 
          className="form-control form-control-lg" 
          name="email" 
          value={form.email} 
          onChange={handleChange} 
          required 
          autoComplete="email"
        />
      </div>
      <div className="mb-3">
        <label className="form-label">{t('auth.password')}</label>
        <input 
          type="password" 
          className="form-control form-control-lg" 
          name="password" 
          value={form.password} 
          onChange={handleChange} 
          required 
          minLength={4} 
          autoComplete={isRegister ? "new-password" : "current-password"}
        />
      </div>
      {error && <div className="alert alert-danger py-2 mb-2 text-center small">{error}</div>}
      <button type="submit" className="btn btn-primary btn-lg w-100" disabled={loading} style={{ fontWeight: 600 }}>
        {loading ? t('auth.loading') : isRegister ? t('auth.register') : t('auth.login')}
      </button>
    </form>
  );
};

export default AuthForm; 