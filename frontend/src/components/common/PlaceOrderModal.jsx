import { useState } from 'react';
import { FiX, FiPackage, FiMapPin, FiCreditCard, FiMessageSquare } from 'react-icons/fi';
import Input from './Input';
import Button from './Button';
import './PlaceOrderModal.css';

export default function PlaceOrderModal({ isOpen, onClose, product, seller }) {
  const [formData, setFormData] = useState({
    payment_method: 'cash',
    pickup_location: '',
    contact_number: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});

  const paymentMethods = [
    { value: 'cash', label: 'Cash on Pickup' },
    { value: 'gcash', label: 'GCash' },
    { value: 'bank_transfer', label: 'Bank Transfer' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.pickup_location.trim()) {
      newErrors.pickup_location = 'Pickup location is required';
    }

    if (!formData.contact_number.trim()) {
      newErrors.contact_number = 'Contact number is required';
    } else if (!/^09\d{9}$/.test(formData.contact_number)) {
      newErrors.contact_number = 'Please enter a valid Philippine phone number (09XXXXXXXXX)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const orderData = {
        product_id: product.product_id,
        seller_profile_id: seller.profile_id,
        total_amount: product.price,
        payment_method: formData.payment_method,
        pickup_location: formData.pickup_location,
        contact_number: formData.contact_number,
        notes: formData.notes,
        status: 'pending_pickup',
        order_date: new Date().toISOString()
      };

      // TODO: Submit to API
      console.log('Order placed:', orderData);
      
      // Show success message or redirect
      alert('Order placed successfully! The seller will be notified.');
      onClose();
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen || !product || !seller) return null;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="place-order-modal">
        <div className="modal-header">
          <h2 className="modal-title">Place Order</h2>
          <button className="modal-close" onClick={onClose}>
            <FiX />
          </button>
        </div>

        <div className="modal-body">
          {/* Product Summary */}
          <div className="order-summary">
            <FiPackage className="summary-icon" />
            <div className="summary-content">
              <h3 className="summary-product-name">{product.name}</h3>
              <p className="summary-price">₱{product.price.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</p>
            </div>
          </div>

          {/* Seller Info */}
          <div className="seller-info">
            <p className="seller-info__label">Seller:</p>
            <p className="seller-info__name">{seller.first_name} {seller.last_name}</p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Payment Method */}
            <div className="form-group">
              <label className="form-label">
                <FiCreditCard className="label-icon" />
                Payment Method *
              </label>
              <div className="radio-group">
                {paymentMethods.map((method) => (
                  <label key={method.value} className="radio-option">
                    <input
                      type="radio"
                      name="payment_method"
                      value={method.value}
                      checked={formData.payment_method === method.value}
                      onChange={handleChange}
                    />
                    <span className="radio-label">{method.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Pickup Location */}
            <div className="form-group">
              <label className="form-label">
                <FiMapPin className="label-icon" />
                Pickup Location *
              </label>
              <Input
                name="pickup_location"
                value={formData.pickup_location}
                onChange={handleChange}
                error={errors.pickup_location}
                placeholder="e.g., CIT University Main Gate, Building A Lobby"
              />
              <p className="field-hint">Where would you like to meet the seller?</p>
            </div>

            {/* Contact Number */}
            <Input
              label="Contact Number *"
              name="contact_number"
              value={formData.contact_number}
              onChange={handleChange}
              error={errors.contact_number}
              placeholder="09XXXXXXXXX"
            />

            {/* Notes to Seller */}
            <div className="form-group">
              <label className="form-label">
                <FiMessageSquare className="label-icon" />
                Notes to Seller (Optional)
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="form-textarea"
                placeholder="Any special requests or questions for the seller..."
                rows={3}
              />
            </div>

            {/* Important Notice */}
            <div className="order-notice">
              <span className="notice-icon">ℹ️</span>
              <div className="notice-content">
                <p className="notice-title">Important:</p>
                <ul className="notice-list">
                  <li>The seller will be notified of your order</li>
                  <li>Meet in a safe, public location on campus</li>
                  <li>Inspect the item before payment</li>
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="modal-actions">
              <Button 
                type="button" 
                variant="secondary" 
                fullWidth 
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                variant="primary" 
                fullWidth
              >
                Confirm Order
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
