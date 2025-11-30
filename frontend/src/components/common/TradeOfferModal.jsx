import { useState } from 'react';
import { FiX, FiUpload } from 'react-icons/fi';
import Input from './Input';
import Button from './Button';
import './TradeOfferModal.css';

export default function TradeOfferModal({ isOpen, onClose, product }) {
  const [formData, setFormData] = useState({
    item_name: '',
    item_estimated_value: '',
    cash_component: '',
    trade_description: '',
    item_image: null
  });

  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        item_image: file
      }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      item_image: null
    }));
    setImagePreview(null);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.item_name?.trim()) {
      newErrors.item_name = 'Item name is required';
    }

    if (!formData.item_estimated_value || formData.item_estimated_value <= 0) {
      newErrors.item_estimated_value = 'Please enter a valid estimated value';
    }

    if (!formData.item_image) {
      newErrors.item_image = 'Please upload an image of your item';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // TODO: Submit to API
      const tradeOffer = {
        product_id: product?.id,
        offerer_id: 1, // TODO: Get from auth context
        offered_price: parseFloat(formData.offered_price),
        trade_description: formData.trade_description,
        status: 'pending',
        created_at: new Date().toISOString()
      };
      
      console.log('Trade Offer:', tradeOffer);
      
      // Reset form and close modal
      setFormData({
        offered_price: '',
        trade_description: ''
      });
      setErrors({});
      onClose();
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
      <div className="modal-content trade-offer-modal">
        {/* Modal Header */}
        <div className="modal-header">
          <h2 className="modal-title">Make a Trade Offer</h2>
          <button className="modal-close" onClick={onClose}>
            <FiX />
          </button>
        </div>

        {/* Product Info */}
        {product && (
          <div className="trade-product-info">
            <div className="trade-product-info__details">
              <h3 className="trade-product-info__name">{product.name}</h3>
              <p className="trade-product-info__price">
                Asking Price: <span>₱{product.price?.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</span>
              </p>
            </div>
          </div>
        )}

        {/* Trade Offer Form */}
        <form className="modal-form" onSubmit={handleSubmit}>
          {/* Item Image Upload */}
          <div className="form-group">
            <label className="form-label">Item Image *</label>
            {imagePreview ? (
              <div className="image-preview-container">
                <img src={imagePreview} alt="Item preview" className="image-preview" />
                <button type="button" className="remove-image-btn" onClick={removeImage}>
                  <FiX /> Remove
                </button>
              </div>
            ) : (
              <label className="image-upload-box">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="image-upload-input"
                />
                <div className="image-upload-content">
                  <FiUpload className="upload-icon" />
                  <p>Click to upload item photo</p>
                  <span className="upload-hint">PNG, JPG up to 10MB</span>
                </div>
              </label>
            )}
            {errors.item_image && (
              <span className="form-error">{errors.item_image}</span>
            )}
          </div>

          {/* Item Name */}
          <Input
            label="Item Name *"
            name="item_name"
            type="text"
            value={formData.item_name}
            onChange={handleChange}
            error={errors.item_name}
            placeholder="e.g., Macbook Pro 2021"
          />

          {/* Estimated Value */}
          <Input
            label="Estimated Item Value (₱) *"
            name="item_estimated_value"
            type="number"
            step="0.01"
            value={formData.item_estimated_value}
            onChange={handleChange}
            error={errors.item_estimated_value}
            placeholder="0.00"
          />

          {/* Cash Component (Optional) */}
          <Input
            label="Additional Cash Offer (₱)"
            name="cash_component"
            type="number"
            step="0.01"
            value={formData.cash_component}
            onChange={handleChange}
            placeholder="0.00 (optional)"
          />

          {/* Trade Description */}
          <div className="form-group">
            <label className="form-label">Trade Description</label>
            <textarea
              name="trade_description"
              value={formData.trade_description}
              onChange={handleChange}
              className="form-textarea"
              placeholder="Describe the condition of your item and any trade terms..."
              rows={4}
            />
            <p className="form-help">
              Optional: Add details about item condition, trade preferences, or meeting arrangements.
            </p>
          </div>

          <div className="modal-actions">
            <Button 
              type="button" 
              variant="secondary" 
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="primary"
            >
              Submit Offer
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
