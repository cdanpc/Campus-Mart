import { useState } from 'react';
import { FiX, FiSend } from 'react-icons/fi';
import Button from './Button';
import './ContactSellerModal.css';

export default function ContactSellerModal({ isOpen, onClose, product, seller }) {
  const [formData, setFormData] = useState({
    content: '' // messages.content (TEXT)
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { value } = e.target;
    setFormData({ content: value });
    
    if (errors.content) {
      setErrors({});
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.content?.trim()) {
      newErrors.content = 'Please enter a message';
    } else if (formData.content.trim().length < 10) {
      newErrors.content = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Mock message data based on ERD messages table structure
      const messageData = {
        // message_id: AUTO_INCREMENT (handled by backend)
        sender_profile_id: 1, // Current user (mock)
        receiver_profile_id: seller.id, // messages.receiver_profile_id
        product_id: product.id, // messages.product_id (INT, FK to products)
        content: formData.content.trim(), // messages.content (TEXT)
        created_at: new Date().toISOString() // messages.created_at (DATETIME)
      };
      
      console.log('Sending message:', messageData);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setFormData({ content: '' });
        setErrors({});
        onClose();
        // TODO: Show success notification
      }, 1000);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content contact-seller-modal">
        {/* Modal Header */}
        <div className="modal-header">
          <h2 className="modal-title">Contact Seller</h2>
          <button className="modal-close" onClick={onClose}>
            <FiX />
          </button>
        </div>

        {/* Product & Seller Info */}
        {product && seller && (
          <div className="contact-info">
            <div className="contact-info__product">
              <p className="contact-info__label">Regarding:</p>
              <h3 className="contact-info__title">{product.name}</h3>
              <p className="contact-info__price">
                ₱{product.price?.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="contact-info__seller">
              <p className="contact-info__label">Seller:</p>
              <p className="contact-info__name">
                {seller.first_name} {seller.last_name}
              </p>
            </div>
          </div>
        )}

        {/* Message Form */}
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Your Message *</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              className={`form-textarea ${errors.content ? 'form-textarea--error' : ''}`}
              placeholder="Hi! I'm interested in your item. Is it still available?"
              rows={6}
              disabled={isSubmitting}
            />
            {errors.content && (
              <span className="form-error">{errors.content}</span>
            )}
            <p className="form-help">
              Ask about availability, condition, meetup details, or negotiation.
            </p>
          </div>

          <div className="modal-actions">
            <Button 
              type="button" 
              variant="secondary" 
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              variant="primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                'Sending...'
              ) : (
                <>
                  <FiSend className="btn__icon" />
                  Send Message
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
