import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiSettings, FiLogOut, FiUser, FiBell, FiMessageSquare, FiSearch } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import ListItemPanel from '../common/ListItemPanel';
import Logo from '../common/Logo';
import './AppHeader.css';

export default function AppHeader() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const notificationRef = useRef(null);

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      type: 'message',
      title: 'New Message',
      message: 'Anita Max Win sent you a message about Rolex Datejust',
      time: '5 min ago',
      read: false
    },
    {
      id: 2,
      type: 'order',
      title: 'Order Update',
      message: 'Your order #1234 has been confirmed',
      time: '1 hour ago',
      read: false
    },
    {
      id: 3,
      type: 'promotion',
      title: 'New Feature',
      message: 'Check out our new rating system!',
      time: '2 hours ago',
      read: true
    }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMarkAsRead = (notificationId) => {
    console.log('Marking notification as read:', notificationId);
    // TODO: Implement mark as read API call
  };

  const handleClearAll = () => {
    console.log('Clearing all notifications');
    setIsNotificationOpen(false);
    // TODO: Implement clear all API call
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      logout();
      navigate('/login');
    }
    setIsProfileMenuOpen(false);
  };

  return (
    <>
      <header className="app-header">
        <div className="container">
          <div className="app-header__content">
            <Link to="/dashboard" className="app-header__brand">
              <div className="app-header__logo">
                <Logo size={32} />
              </div>
              <span className="app-header__title">
                Campus <span className="app-header__title--highlight">Mart</span>
              </span>
            </Link>

            <div className="app-header__search">
              <FiSearch className="app-header__search-icon" />
              <input 
                type="text" 
                placeholder="Search items, sellers..." 
                className="app-header__search-input"
              />
            </div>

            <div className="app-header__actions">
              <button 
                className="app-header__btn app-header__btn--primary"
                onClick={() => setIsPanelOpen(true)}
              >
                + List Item
              </button>
              <Link to="/messages" className="app-header__btn app-header__btn--icon">
                <FiMessageSquare />
              </Link>
              
              <div className="app-header__notification" ref={notificationRef}>
                <button 
                  className="app-header__btn app-header__btn--icon"
                  onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                >
                  <FiBell />
                  {unreadCount > 0 && (
                    <span className="notification-badge">{unreadCount}</span>
                  )}
                </button>

                {isNotificationOpen && (
                  <div className="notification-dropdown">
                    <div className="notification-dropdown__header">
                      <h3>Notifications</h3>
                      <button 
                        className="clear-all-btn"
                        onClick={handleClearAll}
                      >
                        Clear All
                      </button>
                    </div>
                    
                    <div className="notification-dropdown__list">
                      {notifications.length === 0 ? (
                        <div className="notification-empty">
                          <FiBell className="notification-empty__icon" />
                          <p>No notifications</p>
                        </div>
                      ) : (
                        notifications.map(notification => (
                          <div 
                            key={notification.id}
                            className={`notification-item ${!notification.read ? 'notification-item--unread' : ''}`}
                            onClick={() => handleMarkAsRead(notification.id)}
                          >
                            <div className="notification-item__content">
                              <h4 className="notification-item__title">{notification.title}</h4>
                              <p className="notification-item__message">{notification.message}</p>
                              <span className="notification-item__time">{notification.time}</span>
                            </div>
                            {!notification.read && (
                              <div className="notification-item__dot"></div>
                            )}
                          </div>
                        ))
                      )}
                    </div>

                    <div className="notification-dropdown__footer">
                      <Link 
                        to="/notifications" 
                        className="view-all-link"
                        onClick={() => setIsNotificationOpen(false)}
                      >
                        View All Notifications
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <div className="app-header__profile-menu" ref={profileMenuRef}>
                <button 
                  className="app-header__btn app-header__btn--icon"
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                >
                  <FiUser />
                </button>
                
                {isProfileMenuOpen && (
                  <div className="profile-dropdown">
                    <Link 
                      to="/profile" 
                      className="profile-dropdown__item"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <FiUser className="profile-dropdown__icon" />
                      My Profile
                    </Link>
                    <Link 
                      to="/settings" 
                      className="profile-dropdown__item"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <FiSettings className="profile-dropdown__icon" />
                      Settings
                    </Link>
                    <div className="profile-dropdown__divider"></div>
                    <button 
                      className="profile-dropdown__item profile-dropdown__item--danger"
                      onClick={handleLogout}
                    >
                      <FiLogOut className="profile-dropdown__icon" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <ListItemPanel 
        isOpen={isPanelOpen} 
        onClose={() => setIsPanelOpen(false)} 
      />
    </>
  );
}
