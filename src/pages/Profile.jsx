import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useStatistics } from '../context/StatisticsContext';
import { useAchievements } from '../context/AchievementsContext';
import fondoBlurry from '../assets/Fondo_blurry.png';
import { useTranslation } from 'react-i18next';

const getUserProfileData = (email) => {
  const all = JSON.parse(localStorage.getItem('userProfileData') || '{}');
  return all[email] || {};
};

const setUserProfileData = (email, data) => {
  const all = JSON.parse(localStorage.getItem('userProfileData') || '{}');
  all[email] = { ...all[email], ...data };
  localStorage.setItem('userProfileData', JSON.stringify(all));
};

const Profile = () => {
  const { user, logout } = useAuth();
  const { stats } = useStatistics();
  const { unlock } = useAchievements();
  const registrationDate = stats?.registrationDate;
  const [displayName, setDisplayName] = useState(() => getUserProfileData(user.email).displayName || user.displayName || '');
  const [avatar, setAvatar] = useState(() => getUserProfileData(user.email).avatar || null);
  const [editName, setEditName] = useState(false);
  const [nameInput, setNameInput] = useState(displayName || user.displayName || '');
  const [alert, setAlert] = useState(null);
  const fileInputRef = useRef();
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordAlert, setPasswordAlert] = useState(null);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  const { t } = useTranslation();

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(dm => !dm);

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setPasswordAlert(null);
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordAlert({ type: 'danger', msg: t('alerts.fill_all_fields') });
      return;
    }
    if (newPassword.length < 6) {
      setPasswordAlert({ type: 'danger', msg: t('alerts.password_min_length') });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordAlert({ type: 'danger', msg: t('alerts.passwords_no_match') });
      return;
    }
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordAlert({ type: 'success', msg: t('alerts.password_changed_success') });
    setTimeout(() => setShowPasswordForm(false), 1200);
  };

  const handleSaveName = () => {
    if (!nameInput.trim()) {
      setAlert({ type: 'danger', msg: t('alerts.name_empty') });
      return;
    }
    setDisplayName(nameInput.trim());
    setUserProfileData(user.email, { displayName: nameInput.trim() });
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const idx = users.findIndex(u => u.email === user.email);
    if (idx !== -1) {
      users[idx].name = nameInput.trim();
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('user', JSON.stringify({ ...user, name: nameInput.trim() }));
    }
    if (user) user.name = nameInput.trim();
    setEditName(false);
    setAlert({ type: 'success', msg: t('alerts.name_updated') });
    unlock('first_name_change');
    window.dispatchEvent(new Event('profileDataChanged'));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setAvatar(ev.target.result);
      setUserProfileData(user.email, { avatar: ev.target.result });
      setAlert({ type: 'success', msg: t('alerts.avatar_updated') });
      unlock('first_avatar');
      window.dispatchEvent(new Event('profileDataChanged'));
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteAccount = () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.')) {
      alert('Funcionalidad próximamente.');
    }
  };

  if (!user) return null;

  return (
    <div className="minigame-bg" style={{ minHeight: '100vh', position: 'relative' }}>
      <img src={fondoBlurry} alt={t('common.decorative_bg')} className="minigame-blur-bg" />
      <div className="minigame-overlay"></div>
      <button className="btn btn-link position-absolute top-0 end-0 m-4" style={{ fontSize: 28, zIndex: 10 }} onClick={toggleDarkMode} title={darkMode ? t('profile.light_mode') : t('profile.dark_mode')}>
        <span className={`bi ${darkMode ? 'bi-sun-fill text-warning' : 'bi-moon-stars-fill text-primary'} animate__animated animate__fadeIn`}></span>
      </button>
      <div className="d-flex flex-column align-items-center justify-content-center w-100" style={{ minHeight: '100vh' }}>
        <div className="profile-glass-card animate__animated animate__fadeInDown d-flex flex-column align-items-center px-4 py-5" style={{ width: '90%', maxWidth: 700, borderRadius: '2rem', background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(10px)', boxShadow: '0 8px 32px 0 rgba(67,188,205,0.10), 0 1.5px 8px 0 rgba(108,99,255,0.10)' }}>
          <div className="d-flex flex-column align-items-center w-100 mb-3">
            <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mb-3 overflow-hidden position-relative shadow" style={{ width: 148, height: 148, fontSize: 60, fontWeight: 'bold', border: '5px solid #fff', boxShadow: '0 4px 24px 0 rgba(67,188,205,0.10)' }}>
              {avatar ? (
                <img src={avatar} alt="avatar" style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', imageRendering: 'auto' }} />
              ) : (
                ((displayName || user.displayName || user.email)[0] || 'U').toUpperCase()
              )}
              <input type="file" accept="image/*" ref={fileInputRef} style={{ display: 'none' }} onChange={handleAvatarChange} />
            </div>
            <button className="btn minigame-btn btn-outline-primary btn-sm mb-2 d-flex align-items-center justify-content-center" style={{ fontWeight: 500, fontSize: 15, maxWidth: 180, padding: '6px 14px' }} onClick={() => fileInputRef.current.click()}>
              <span className="bi bi-camera me-2"></span> {t('profile.change_photo')}
            </button>
            <div className="text-muted small mb-2" style={{ marginTop: '-0.5rem' }}>
              {t('profile.avatar_hint')}
            </div>
            {editName ? (
              <div className="w-100 d-flex flex-column align-items-center">
                <input className="form-control mb-2 text-center fw-bold fs-4" value={nameInput} onChange={e => setNameInput(e.target.value)} maxLength={30} autoFocus style={{ maxWidth: 320 }} />
                <div className="d-flex gap-2 mb-2">
                  <button className="btn btn-success btn-sm" onClick={handleSaveName}>{t('common.save')}</button>
                  <button className="btn btn-secondary btn-sm" onClick={() => { setEditName(false); setNameInput(displayName || user.displayName || ''); }}>{t('common.cancel')}</button>
                </div>
              </div>
            ) : (
              <>
                <h2 className="mb-0 fw-bold text-dark" style={{ letterSpacing: 0.5 }}>{displayName || user.displayName || t('profile.user')}</h2>
                <button className="btn btn-link btn-sm p-0 mb-2" onClick={() => setEditName(true)}><span className="bi bi-pencil"></span> {t('profile.edit_name')}</button>
              </>
            )}
            <div className="d-flex flex-column align-items-center gap-1 mt-2 mb-3 w-100">
              <div className="text-muted small d-flex align-items-center"><i className="bi bi-envelope me-2"></i>{user.email}</div>
              {registrationDate && <div className="text-muted small d-flex align-items-center"><i className="bi bi-calendar me-2"></i>{t('stats.registered_since')}: {new Date(registrationDate).toLocaleDateString()}</div>}
            </div>
          </div>
          {alert && <div className={`alert alert-${alert.type} py-2 mb-2 w-100`}>{t(alert.msg)}</div>}
          <div className="d-flex flex-column gap-3 w-100 align-items-center" style={{ maxWidth: 400 }}>
            <button
              className="btn minigame-btn btn-outline-secondary w-100"
              type="button"
              aria-expanded={showPasswordForm}
              aria-controls="collapsePasswordForm"
              onClick={() => setShowPasswordForm((v) => !v)}
            >
              <span className="bi bi-key me-2"></span>
              {t('profile.change_password')}
              <span className={`ms-2 bi ${showPasswordForm ? 'bi-chevron-up' : 'bi-chevron-down'}`}></span>
            </button>
            <div className={`collapse${showPasswordForm ? ' show' : ''}`} id="collapsePasswordForm">
              <form className="mt-3" onSubmit={handlePasswordChange}>
                <input type="text" name="username" autoComplete="username" style={{ display: 'none' }} value={user.email} readOnly />
                <div className="alert alert-info py-2 small mb-2">
                  {t('profile.password_demo_info')}
                </div>
                {passwordAlert && <div className={`alert alert-${passwordAlert.type} py-2`}>{t(passwordAlert.msg)}</div>}
                <div className="mb-2">
                  <label className="form-label small">{t('profile.current_password')}</label>
                  <input type="password" className="form-control" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} autoComplete="current-password" />
                </div>
                <div className="mb-2">
                  <label className="form-label small">{t('profile.new_password')}</label>
                  <input type="password" className="form-control" value={newPassword} onChange={e => setNewPassword(e.target.value)} autoComplete="new-password" minLength={6} />
                </div>
                <div className="mb-3">
                  <label className="form-label small">{t('profile.confirm_new_password')}</label>
                  <input type="password" className="form-control" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} autoComplete="new-password" minLength={6} />
                </div>
                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-success btn-sm">{t('common.save')}</button>
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => { setShowPasswordForm(false); setCurrentPassword(""); setNewPassword(""); setConfirmPassword(""); setPasswordAlert(null); }}>{t('common.cancel')}</button>
                </div>
              </form>
            </div>
            <button className="btn minigame-btn btn-danger w-100" onClick={handleDeleteAccount}>{t('profile.delete_account')}</button>
            <button className="btn minigame-btn btn-outline-primary w-100" onClick={logout}>{t('profile.logout')}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 