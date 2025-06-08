// src/PagesPro/ChangePasswordPage.tsx
import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import TopbarPro from '../components/TopbarPro';
import SidebarPro from '../components/SidebarPro';
import FooterPro from '../components/FooterPro';
import { usePro } from '../components/ProContext';
import '../assets/ProfessionalDashboard.css';

// Import images for banner
import strip1 from '../images/strip1.png';
import strip2 from '../images/strip2.png';
import strip3 from '../images/strip3.png';

export default function ChangePasswordPage() {
  const navigate = useNavigate();
  const { professional, proToken } = usePro();
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!currentPassword) {
      setError('Current password is required');
      return;
    }

    if (!newPassword) {
      setError('New password is required');
      return;
    }

    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters long');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    if (currentPassword === newPassword) {
      setError('New password must be different from current password');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/professional/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${proToken}`
        },
        body: JSON.stringify({
          professional_id: professional?.professional_id,
          currentPassword,
          newPassword
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to change password');
      }

      setSuccess('Password changed successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');

      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate('/pro/dashboard');
      }, 2000);

    } catch (err: any) {
      setError(err.message || 'An error occurred while changing password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pro">
      <div className="pro-dash">
        {/* Professional header */}
        <TopbarPro />
        <br />

        {/* Horizontal banner - identical to other professional pages */}
        <section className="partner-strip">
          <img src={strip1} alt="Partner 1" />
          <img src={strip2} alt="Partner 2" />
          <img src={strip3} alt="Partner 3" />
        </section>
      </div>

      {/* Layout with sidebar - like ProfessionalDashboard */}
      <main className="flex w-full">
        {/* Sidebar - Stuck to the left */}
        <SidebarPro active="Password" />

        <div className="flex-1 flex flex-col gap-6 p-6">
          {/* Main content */}
          <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
            
            {/* Page Header */}
            <div style={{ marginBottom: '2rem' }}>
              <h1 style={{ 
                fontSize: '2rem', 
                color: '#333', 
                marginBottom: '0.5rem',
                fontWeight: 'bold'
              }}>
                🔒 Change Password
              </h1>
              <p style={{ 
                color: '#666',
                fontSize: '1rem',
                margin: '0'
              }}>
                Update your account password to keep your profile secure
              </p>
            </div>

            {/* Change Password Form */}
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '2rem',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              border: '1px solid #f0f0f0'
            }}>
              
              {error && (
                <div style={{
                  background: '#ffecec',
                  color: '#d32f2f',
                  padding: '1rem',
                  borderRadius: '8px',
                  marginBottom: '1.5rem',
                  fontSize: '0.9rem',
                  textAlign: 'center'
                }}>
                  {error}
                </div>
              )}

              {success && (
                <div style={{
                  background: '#e8f5e8',
                  color: '#2e7d32',
                  padding: '1rem',
                  borderRadius: '8px',
                  marginBottom: '1.5rem',
                  fontSize: '0.9rem',
                  textAlign: 'center'
                }}>
                  {success}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '1.5rem' 
                }}>
                  
                  {/* Current Password */}
                  <div>
                    <label style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      fontSize: '1rem',
                      fontWeight: '600',
                      color: '#333'
                    }}>
                      Current Password *
                    </label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter your current password"
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        boxSizing: 'border-box'
                      }}
                      required
                    />
                  </div>

                  {/* New Password */}
                  <div>
                    <label style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      fontSize: '1rem',
                      fontWeight: '600',
                      color: '#333'
                    }}>
                      New Password *
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter your new password (min. 6 characters)"
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        boxSizing: 'border-box'
                      }}
                      required
                      minLength={6}
                    />
                  </div>

                  {/* Confirm New Password */}
                  <div>
                    <label style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      fontSize: '1rem',
                      fontWeight: '600',
                      color: '#333'
                    }}>
                      Confirm New Password *
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your new password"
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        boxSizing: 'border-box'
                      }}
                      required
                    />
                  </div>

                  {/* Password Requirements */}
                  <div style={{
                    background: '#f8f9fa',
                    padding: '1rem',
                    borderRadius: '8px',
                    border: '1px solid #e9ecef'
                  }}>
                    <h4 style={{
                      margin: '0 0 0.5rem',
                      fontSize: '0.9rem',
                      color: '#495057'
                    }}>
                      Password Requirements:
                    </h4>
                    <ul style={{
                      margin: '0',
                      paddingLeft: '1.2rem',
                      fontSize: '0.85rem',
                      color: '#6c757d',
                      lineHeight: '1.5'
                    }}>
                      <li>At least 6 characters long</li>
                      <li>Different from your current password</li>
                      <li>Should contain a mix of letters and numbers (recommended)</li>
                    </ul>
                  </div>

                  {/* Submit Button */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: '1rem',
                    marginTop: '1rem'
                  }}>
                    <button
                      type="button"
                      onClick={() => navigate('/pro/dashboard')}
                      style={{
                        background: '#6c757d',
                        color: 'white',
                        padding: '12px 24px',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#5a6268'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#6c757d'}
                    >
                      Cancel
                    </button>
                    
                    <button
                      type="submit"
                      disabled={loading}
                      style={{
                        background: loading ? '#ccc' : '#007bff',
                        color: 'white',
                        padding: '12px 24px',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        if (!loading) e.currentTarget.style.backgroundColor = '#0056b3';
                      }}
                      onMouseLeave={(e) => {
                        if (!loading) e.currentTarget.style.backgroundColor = '#007bff';
                      }}
                    >
                      {loading ? 'Changing...' : 'Change Password'}
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Security Tips */}
            <div style={{
              background: '#e3f2fd',
              borderRadius: '12px',
              padding: '1.5rem',
              marginTop: '2rem',
              border: '1px solid #bbdefb'
            }}>
              <h3 style={{
                margin: '0 0 1rem',
                fontSize: '1.1rem',
                color: '#1976d2'
              }}>
                🛡️ Security Tips
              </h3>
              <ul style={{
                margin: '0',
                paddingLeft: '1.2rem',
                fontSize: '0.9rem',
                color: '#1565c0',
                lineHeight: '1.6'
              }}>
                <li>Use a strong, unique password that you don't use elsewhere</li>
                <li>Consider using a password manager to generate and store secure passwords</li>
                <li>Never share your password with anyone</li>
                <li>Change your password regularly for better security</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Professional footer */}
      <FooterPro />
    </div>
  );
}
