import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiBell, FiMessageSquare, FiShoppingBag, FiTrendingUp, FiCheck, FiTrash2, FiFilter, FiMoreVertical } from 'react-icons/fi';
import './NotificationsPage.css';

export default function NotificationsPage() {
  const [filter, setFilter] = useState('all');
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef(null);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'message',
      title: 'New Message from Anita Max Win',
      message: 'Hi! Is the Rolex still available? I would like to meet up.',
      time: '2025-11-30T14:30:00Z',
      read: false,
      icon: FiMessageSquare,
      link: '/messages?user=2'
    },
    {
      id: 2,
      type: 'order',
      title: 'Order Confirmed',
      message: 'Your order #1234 for iPhone 13 Pro Max has been confirmed.',
      time: '2025-11-30T13:00:00Z',
      read: false,
      icon: FiShoppingBag,
      link: '/order/1234'
    },
    {
      id: 3,
      type: 'message',
      title: 'New Message from John Doe',
      message: 'Can we meet tomorrow at the library?',
      time: '2025-11-29T16:45:00Z',
      read: false,
      icon: FiMessageSquare,
      link: '/messages?user=3'
    },
    {
      id: 4,
      type: 'order',
      title: 'Order Shipped',
      message: 'Your order #1233 is on the way. Expected delivery: Today',
      time: '2025-11-29T10:20:00Z',
      read: true,
      icon: FiShoppingBag,
      link: '/order/1233'
    },
    {
      id: 5,
      type: 'promotion',
      title: 'New Feature: Seller Ratings',
      message: 'You can now rate sellers after completing a transaction!',
      time: '2025-11-28T09:00:00Z',
      read: true,
      icon: FiTrendingUp,
      link: null
    },
    {
      id: 6,
      type: 'message',
      title: 'New Message from Maria Santos',
      message: 'Interested! Can you send more photos?',
      time: '2025-11-28T11:20:00Z',
      read: true,
      icon: FiMessageSquare,
      link: '/messages?user=4'
    },
    {
      id: 7,
      type: 'order',
      title: 'Order Delivered',
      message: 'Your order #1232 has been delivered successfully.',
      time: '2025-11-27T15:30:00Z',
      read: true,
      icon: FiShoppingBag,
      link: '/order/1232'
    },
    {
      id: 8,
      type: 'promotion',
      title: 'Welcome to Campus Mart!',
      message: 'Start buying and selling with fellow CIT-U students.',
      time: '2025-11-26T08:00:00Z',
      read: true,
      icon: FiTrendingUp,
      link: null
    }
  ]);

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 7) {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } else if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      const minutes = Math.floor(diff / (1000 * 60));
      return minutes > 0 ? `${minutes} min ago` : 'Just now';
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    return notification.type === filter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMarkAsRead = (id) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
    setOpenMenuId(null);
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const handleDelete = (id) => {
    if (confirm('Delete this notification?')) {
      setNotifications(prev => prev.filter(n => n.id !== id));
      setOpenMenuId(null);
    }
  };

  const handleClearAll = () => {
    if (confirm('Clear all notifications?')) {
      setNotifications([]);
    }
  };

  return (
    <div className="notifications-page">
      <div className="container">
        <Link to="/dashboard" className="back-link">
          <FiChevronLeft className="back-link__icon" />
          <span>Back to Dashboard</span>
        </Link>

        <div className="notifications-header">
          <div className="notifications-header__title">
            <FiBell className="notifications-header__icon" />
            <h1>Notifications</h1>
            {unreadCount > 0 && (
              <span className="unread-badge">{unreadCount} unread</span>
            )}
          </div>

          <div className="notifications-header__actions">
            {unreadCount > 0 && (
              <button 
                className="header-btn"
                onClick={handleMarkAllAsRead}
              >
                <FiCheck className="btn-icon" />
                Mark All as Read
              </button>
            )}
            {notifications.length > 0 && (
              <button 
                className="header-btn header-btn--danger"
                onClick={handleClearAll}
              >
                <FiTrash2 className="btn-icon" />
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="notifications-filters">
          <button
            className={`filter-tab ${filter === 'all' ? 'filter-tab--active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={`filter-tab ${filter === 'unread' ? 'filter-tab--active' : ''}`}
            onClick={() => setFilter('unread')}
          >
            Unread {unreadCount > 0 && `(${unreadCount})`}
          </button>
          <button
            className={`filter-tab ${filter === 'message' ? 'filter-tab--active' : ''}`}
            onClick={() => setFilter('message')}
          >
            Messages
          </button>
          <button
            className={`filter-tab ${filter === 'order' ? 'filter-tab--active' : ''}`}
            onClick={() => setFilter('order')}
          >
            Orders
          </button>
          <button
            className={`filter-tab ${filter === 'promotion' ? 'filter-tab--active' : ''}`}
            onClick={() => setFilter('promotion')}
          >
            Promotions
          </button>
        </div>

        {/* Notifications List */}
        <div className="notifications-list">
          {filteredNotifications.length === 0 ? (
            <div className="empty-state">
              <FiBell className="empty-state__icon" />
              <h3 className="empty-state__title">No notifications</h3>
              <p className="empty-state__text">
                {filter === 'unread' 
                  ? "You're all caught up!" 
                  : 'You have no notifications at the moment'}
              </p>
            </div>
          ) : (
            filteredNotifications.map(notification => {
              const Icon = notification.icon;
              return (
                <div
                  key={notification.id}
                  className={`notification-card ${!notification.read ? 'notification-card--unread' : ''}`}
                >
                  <div className="notification-card__icon-wrapper">
                    <Icon className="notification-card__icon" />
                  </div>

                  <div className="notification-card__content">
                    <div className="notification-card__header">
                      <h3 className="notification-card__title">{notification.title}</h3>
                      <span className="notification-card__time">{formatTime(notification.time)}</span>
                    </div>
                    <p className="notification-card__message">{notification.message}</p>
                    
                    <div className="notification-card__actions">
                      {notification.link && (
                        <Link 
                          to={notification.link}
                          className="notification-link"
                        >
                          View Details →
                        </Link>
                      )}
                    </div>
                  </div>

                  <div className="notification-card__menu-wrapper" ref={openMenuId === notification.id ? menuRef : null}>
                    <button
                      className="notification-menu-btn"
                      onClick={() => setOpenMenuId(openMenuId === notification.id ? null : notification.id)}
                      title="More options"
                    >
                      <FiMoreVertical />
                    </button>

                    {openMenuId === notification.id && (
                      <div className="notification-menu-dropdown">
                        {!notification.read && (
                          <button
                            className="notification-menu-item"
                            onClick={() => handleMarkAsRead(notification.id)}
                          >
                            <FiCheck className="menu-item-icon" />
                            <span>Mark as read</span>
                          </button>
                        )}
                        <button
                          className="notification-menu-item notification-menu-item--danger"
                          onClick={() => handleDelete(notification.id)}
                        >
                          <FiTrash2 className="menu-item-icon" />
                          <span>Delete</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {!notification.read && (
                    <div className="notification-card__unread-dot"></div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
