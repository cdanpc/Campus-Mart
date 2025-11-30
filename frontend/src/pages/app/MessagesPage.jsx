import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FiSearch, FiSend, FiMoreVertical, FiImage, FiPaperclip, FiEye, FiUser, FiAlertCircle, FiTrash2, FiArchive, FiBellOff } from 'react-icons/fi';
import './MessagesPage.css';

export default function MessagesPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Mock conversations based on ERD messages table
  // Groups messages by conversation (sender/receiver pair + product)
  const conversations = [
    {
      id: 1,
      profile_id: 2, // Other user's profile_id
      first_name: 'Anita',
      last_name: 'Max Win',
      product_id: 1,
      product_name: 'Rolex Datejust 36mm men',
      product_price: 50000.00,
      last_message: 'Yes, it\'s still available! When would you like to meet?',
      last_message_time: '2025-11-30T14:30:00Z',
      unread_count: 2,
      messages: [
        {
          message_id: 1,
          sender_profile_id: 1, // Current user
          receiver_profile_id: 2,
          product_id: 1,
          content: 'Hi! Is this Rolex still available?',
          created_at: '2025-11-30T10:15:00Z'
        },
        {
          message_id: 2,
          sender_profile_id: 2,
          receiver_profile_id: 1,
          product_id: 1,
          content: 'Yes, it\'s still available! When would you like to meet?',
          created_at: '2025-11-30T14:30:00Z'
        }
      ]
    },
    {
      id: 2,
      profile_id: 3,
      first_name: 'John',
      last_name: 'Doe',
      product_id: 2,
      product_name: 'iPhone 13 Pro Max 256GB',
      product_price: 45000.00,
      last_message: 'Can we meet tomorrow at the library?',
      last_message_time: '2025-11-29T16:45:00Z',
      unread_count: 0,
      messages: [
        {
          message_id: 3,
          sender_profile_id: 3,
          receiver_profile_id: 1,
          product_id: 2,
          content: 'Hi! I\'m interested in your iPhone. Is it brand new?',
          created_at: '2025-11-29T15:20:00Z'
        },
        {
          message_id: 4,
          sender_profile_id: 1,
          receiver_profile_id: 3,
          product_id: 2,
          content: 'Hi! Yes, it\'s brand new, sealed box with warranty.',
          created_at: '2025-11-29T15:30:00Z'
        },
        {
          message_id: 5,
          sender_profile_id: 3,
          receiver_profile_id: 1,
          product_id: 2,
          content: 'Great! Can we meet tomorrow at the library?',
          created_at: '2025-11-29T16:45:00Z'
        }
      ]
    },
    {
      id: 3,
      profile_id: 4,
      first_name: 'Maria',
      last_name: 'Santos',
      product_id: 3,
      product_name: 'MacBook Air M2 2023',
      product_price: 55000.00,
      last_message: 'Interested! Can you send more photos?',
      last_message_time: '2025-11-28T11:20:00Z',
      unread_count: 1,
      messages: [
        {
          message_id: 6,
          sender_profile_id: 4,
          receiver_profile_id: 1,
          product_id: 3,
          content: 'Hello! I saw your MacBook listing. Interested! Can you send more photos?',
          created_at: '2025-11-28T11:20:00Z'
        }
      ]
    }
  ];

  const currentUserId = 1; // Mock current user profile_id

  // Auto-select conversation based on query parameter
  useEffect(() => {
    const userParam = searchParams.get('user');
    if (userParam) {
      const conversation = conversations.find(
        conv => conv.profile_id === parseInt(userParam)
      );
      if (conversation) {
        setSelectedConversation(conversation);
      }
    }
  }, [searchParams]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMenuAction = (action) => {
    if (!selectedConversation) return;

    switch (action) {
      case 'view-product':
        navigate(`/product/${selectedConversation.product_id}`);
        break;
      case 'view-profile':
        navigate(`/seller/${selectedConversation.profile_id}`);
        break;
      case 'report':
        alert('Report conversation functionality will be implemented');
        break;
      case 'delete':
        if (confirm(`Delete conversation with ${selectedConversation.first_name} ${selectedConversation.last_name}?`)) {
          console.log('Delete conversation:', selectedConversation.id);
          // TODO: Implement delete conversation
        }
        break;
      case 'archive':
        console.log('Archive conversation:', selectedConversation.id);
        alert('Conversation archived');
        // TODO: Implement archive functionality
        break;
      case 'mute':
        console.log('Mute conversation:', selectedConversation.id);
        alert('Notifications muted for this conversation');
        // TODO: Implement mute functionality
        break;
      default:
        break;
    }
    setIsMenuOpen(false);
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days}d ago`;
    } else if (hours > 0) {
      return `${hours}h ago`;
    } else {
      return 'Just now';
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (!messageInput.trim() || !selectedConversation) return;

    // Create new message based on ERD structure
    const newMessage = {
      message_id: Date.now(), // Mock ID
      sender_profile_id: currentUserId,
      receiver_profile_id: selectedConversation.profile_id,
      product_id: selectedConversation.product_id,
      content: messageInput.trim(),
      created_at: new Date().toISOString()
    };

    console.log('Sending message:', newMessage);
    
    // TODO: Send to backend API
    // For now, just clear input
    setMessageInput('');
  };

  const filteredConversations = conversations.filter(conv => {
    const fullName = `${conv.first_name} ${conv.last_name}`.toLowerCase();
    const productName = conv.product_name.toLowerCase();
    const query = searchQuery.toLowerCase();
    return fullName.includes(query) || productName.includes(query);
  });

  return (
    <div className="messages-page">
      <div className="messages-container">
        
        {/* Conversations List */}
        <div className="conversations-panel">
          <div className="conversations-header">
            <h1 className="conversations-title">Messages</h1>
            <div className="conversations-search">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          <div className="conversations-list">
            {filteredConversations.length === 0 ? (
              <div className="empty-state">
                <p>No conversations found</p>
              </div>
            ) : (
              filteredConversations.map((conv) => (
                <div
                  key={conv.id}
                  className={`conversation-item ${selectedConversation?.id === conv.id ? 'conversation-item--active' : ''}`}
                  onClick={() => setSelectedConversation(conv)}
                >
                  <div className="conversation-avatar">
                    {conv.first_name[0]}{conv.last_name[0]}
                  </div>
                  <div className="conversation-content">
                    <div className="conversation-header">
                      <h3 className="conversation-name">
                        {conv.first_name} {conv.last_name}
                      </h3>
                      <span className="conversation-time">
                        {formatTime(conv.last_message_time)}
                      </span>
                    </div>
                    <p className="conversation-product">{conv.product_name}</p>
                    <p className="conversation-last-message">
                      {conv.last_message}
                    </p>
                  </div>
                  {conv.unread_count > 0 && (
                    <div className="conversation-badge">
                      {conv.unread_count}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Chat Panel */}
        <div className="chat-panel">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="chat-header">
                <div className="chat-header-info">
                  <div className="chat-avatar">
                    {selectedConversation.first_name[0]}{selectedConversation.last_name[0]}
                  </div>
                  <div className="chat-header-text">
                    <h2 className="chat-header-name">
                      {selectedConversation.first_name} {selectedConversation.last_name}
                    </h2>
                    <p className="chat-header-product">
                      {selectedConversation.product_name} • ₱{selectedConversation.product_price.toLocaleString('en-PH')}
                    </p>
                  </div>
                </div>
                <div className="chat-header-menu-wrapper" ref={menuRef}>
                  <button 
                    className="chat-header-menu"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                  >
                    <FiMoreVertical />
                  </button>
                  
                  {isMenuOpen && (
                    <div className="chat-menu-dropdown">
                      <button 
                        className="chat-menu-item"
                        onClick={() => handleMenuAction('view-product')}
                      >
                        <FiEye className="chat-menu-icon" />
                        View Product
                      </button>
                      <button 
                        className="chat-menu-item"
                        onClick={() => handleMenuAction('view-profile')}
                      >
                        <FiUser className="chat-menu-icon" />
                        View Profile
                      </button>
                      <div className="chat-menu-divider"></div>
                      <button 
                        className="chat-menu-item"
                        onClick={() => handleMenuAction('mute')}
                      >
                        <FiBellOff className="chat-menu-icon" />
                        Mute Notifications
                      </button>
                      <button 
                        className="chat-menu-item"
                        onClick={() => handleMenuAction('archive')}
                      >
                        <FiArchive className="chat-menu-icon" />
                        Archive Conversation
                      </button>
                      <div className="chat-menu-divider"></div>
                      <button 
                        className="chat-menu-item chat-menu-item--warning"
                        onClick={() => handleMenuAction('report')}
                      >
                        <FiAlertCircle className="chat-menu-icon" />
                        Report
                      </button>
                      <button 
                        className="chat-menu-item chat-menu-item--danger"
                        onClick={() => handleMenuAction('delete')}
                      >
                        <FiTrash2 className="chat-menu-icon" />
                        Delete Conversation
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Messages Area */}
              <div className="messages-area">
                {selectedConversation.messages.map((msg) => (
                  <div
                    key={msg.message_id}
                    className={`message ${msg.sender_profile_id === currentUserId ? 'message--sent' : 'message--received'}`}
                  >
                    <div className="message-bubble">
                      <p className="message-content">{msg.content}</p>
                      <span className="message-time">
                        {new Date(msg.created_at).toLocaleTimeString('en-US', {
                          hour: 'numeric',
                          minute: '2-digit',
                          hour12: true
                        })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <form className="message-input-form" onSubmit={handleSendMessage}>
                <button type="button" className="attachment-btn" title="Attach file">
                  <FiPaperclip />
                </button>
                <button type="button" className="attachment-btn" title="Send image">
                  <FiImage />
                </button>
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  className="message-input"
                />
                <button type="submit" className="send-btn" disabled={!messageInput.trim()}>
                  <FiSend />
                </button>
              </form>
            </>
          ) : (
            <div className="empty-chat">
              <div className="empty-chat-content">
                <FiSearch className="empty-chat-icon" />
                <h2>Select a conversation</h2>
                <p>Choose a conversation from the list to start messaging</p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
