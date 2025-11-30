import { useState, useEffect } from 'react';
import { FiX, FiUpload } from 'react-icons/fi';
import Input from './Input';
import Button from './Button';
import './ListItemPanel.css';

export default function ListItemPanel({ isOpen, onClose, productData = null }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    brand_type: '',
    condition: '',
    stock: '1',
    contact_info: '',
    category_id: '',
    listing_type: 'sale', // 'sale', 'trade_only', 'trade_ok'
    images: []
  });

  const [errors, setErrors] = useState({});
  const isEditMode = !!productData;

  // Populate form when editing
  useEffect(() => {
    if (productData && isOpen) {
      setFormData({
        name: productData.name || '',
        description: productData.description || '',
        price: productData.price?.toString() || '',
        brand_type: productData.brand_type || '',
        condition: productData.condition || '',
        stock: productData.stock?.toString() || '1',
        contact_info: productData.contact_info || '',
        category_id: productData.category_id?.toString() || '',
        listing_type: productData.trade_only ? 'trade_only' : (productData.price ? 'sale' : 'trade_ok'),
        images: [] // Keep empty, show existing image separately
      });
    } else if (!isOpen) {
      // Reset form when panel closes
      setFormData({
        name: '',
        description: '',
        price: '',
        brand_type: '',
        condition: '',
        stock: '1',
        contact_info: '',
        category_id: '',
        listing_type: 'sale',
        images: []
      });
      setErrors({});
    }
  }, [productData, isOpen]);

  const categories = [
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Books' },
    { id: 3, name: 'Fashion' },
    { id: 4, name: 'Home' },
    { id: 5, name: 'Food' },
    { id: 6, name: 'Service' },
    { id: 7, name: 'Appliance' },
    { id: 8, name: 'Apparel & Watch' },
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

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files]
    }));
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    // Price is required only for 'sale' and 'trade_ok'
    if (formData.listing_type !== 'trade_only') {
      if (!formData.price) {
        newErrors.price = 'Price is required for sale items';
      } else if (isNaN(formData.price) || Number(formData.price) < 0) {
        newErrors.price = 'Please enter a valid price';
      }
    }

    if (!formData.category_id) {
      newErrors.category_id = 'Please select a category';
    }

    if (!formData.condition) {
      newErrors.condition = 'Please select item condition';
    }

    if (!formData.stock || formData.stock < 1) {
      newErrors.stock = 'Stock must be at least 1';
    }

    if (!formData.contact_info.trim()) {
      newErrors.contact_info = 'Contact information is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      if (isEditMode) {
        // TODO: Update existing product via API
        console.log('Updating product:', productData.product_id, formData);
      } else {
        // TODO: Create new product via API
        console.log('Creating new product:', formData);
      }
      
      onClose();
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className={`panel-overlay ${isOpen ? 'panel-overlay--active' : ''}`}
        onClick={handleOverlayClick}
      />

      {/* Slide Panel */}
      <div className={`list-item-panel ${isOpen ? 'list-item-panel--open' : ''}`}>
        <div className="panel-header">
          <h2 className="panel-title">{isEditMode ? 'Edit Item' : 'List New Item'}</h2>
          <button className="panel-close" onClick={onClose}>
            <FiX />
          </button>
        </div>

        <form className="panel-form" onSubmit={handleSubmit}>
          {/* Product Name */}
          <Input
            label="Product Name *"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            placeholder="e.g., iPhone 13 Pro Max"
          />

          {/* Description */}
          <div className="form-group">
            <label className="form-label">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`form-textarea ${errors.description ? 'form-textarea--error' : ''}`}
              placeholder="Describe your item in detail..."
              rows={4}
            />
            {errors.description && (
              <span className="form-error">{errors.description}</span>
            )}
          </div>

          {/* Listing Type */}
          <div className="form-group">
            <label className="form-label">Listing Type *</label>
            <div className="radio-group">
              <label className="radio-option">
                <input
                  type="radio"
                  name="listing_type"
                  value="sale"
                  checked={formData.listing_type === 'sale'}
                  onChange={handleChange}
                />
                <span className="radio-label">
                  <strong>For Sale</strong>
                  <small>Sell for cash only</small>
                </span>
              </label>
              
              <label className="radio-option">
                <input
                  type="radio"
                  name="listing_type"
                  value="trade_only"
                  checked={formData.listing_type === 'trade_only'}
                  onChange={handleChange}
                />
                <span className="radio-label">
                  <strong>Trade Only</strong>
                  <small>Looking to trade, not selling for cash</small>
                </span>
              </label>
              
              <label className="radio-option">
                <input
                  type="radio"
                  name="listing_type"
                  value="trade_ok"
                  checked={formData.listing_type === 'trade_ok'}
                  onChange={handleChange}
                />
                <span className="radio-label">
                  <strong>For Sale (Trade OK)</strong>
                  <small>Prefer cash but open to trade offers</small>
                </span>
              </label>
            </div>
          </div>

          {/* Price */}
          <Input
            label={formData.listing_type === 'trade_only' ? 'Price (₱) - Optional' : 'Price (₱) *'}
            name="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            error={errors.price}
            placeholder="0.00"
            disabled={formData.listing_type === 'trade_only'}
          />

          {/* Category */}
          <div className="form-group">
            <label className="form-label">Category *</label>
            <select
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              className={`form-select ${errors.category_id ? 'form-select--error' : ''}`}
            >
              <option value="">Select a category</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            {errors.category_id && (
              <span className="form-error">{errors.category_id}</span>
            )}
          </div>

          {/* Brand/Type */}
          <Input
            label="Brand/Model (Optional)"
            name="brand_type"
            value={formData.brand_type}
            onChange={handleChange}
            placeholder="e.g., Apple, Nike, Sony"
          />

          {/* Condition */}
          <div className="form-group">
            <label className="form-label">Condition *</label>
            <select
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              className={`form-select ${errors.condition ? 'form-select--error' : ''}`}
            >
              <option value="">Select condition</option>
              <option value="Brand New">Brand New</option>
              <option value="Like New">Like New</option>
              <option value="Excellent">Excellent</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
            </select>
            {errors.condition && (
              <span className="form-error">{errors.condition}</span>
            )}
          </div>

          {/* Stock/Quantity */}
          <Input
            label="Stock Quantity *"
            name="stock"
            type="number"
            min="1"
            value={formData.stock}
            onChange={handleChange}
            error={errors.stock}
            placeholder="1"
          />

          {/* Contact Info */}
          <div className="form-group">
            <label className="form-label">Contact Information *</label>
            <textarea
              name="contact_info"
              value={formData.contact_info}
              onChange={handleChange}
              className={`form-textarea ${errors.contact_info ? 'form-textarea--error' : ''}`}
              placeholder="How should buyers contact you? (Phone, email, meet-up location, etc.)"
              rows={3}
            />
            {errors.contact_info && (
              <span className="form-error">{errors.contact_info}</span>
            )}
          </div>

          {/* Image Upload */}
          <div className="form-group">
            <label className="form-label">Product Images</label>
            
            {/* Show existing image if in edit mode */}
            {isEditMode && productData?.image && (
              <div className="existing-image">
                <img src={productData.image} alt={productData.name} />
                <span className="existing-image__label">Current Image</span>
              </div>
            )}
            
            <div className="image-upload">
              <input
                type="file"
                id="image-upload"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="image-upload__input"
              />
              <label htmlFor="image-upload" className="image-upload__label">
                <FiUpload />
                <span>{isEditMode ? 'Upload New Images' : 'Upload Images'}</span>
              </label>
            </div>
            
            {formData.images.length > 0 && (
              <div className="image-preview">
                {formData.images.map((image, index) => (
                  <div key={index} className="image-preview__item">
                    <img 
                      src={URL.createObjectURL(image)} 
                      alt={`Preview ${index + 1}`}
                    />
                    <button
                      type="button"
                      className="image-preview__remove"
                      onClick={() => removeImage(index)}
                    >
                      <FiX />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Buttons */}
          <div className="panel-actions">
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
              {isEditMode ? 'Update Item' : 'List Item'}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
