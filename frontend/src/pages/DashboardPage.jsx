import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import './DashboardPage.css';

export default function DashboardPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [sortBy, setSortBy] = useState('Latest');

  // Mock data matching ERD structure
  const products = [
    {
      id: 1,
      name: 'Homemade Sandwiches',
      price: 3.50,
      is_available: true,
      seller: { name: 'Maria C.' },
      like_count: 12,
      category: { name: 'Food' },
      tags: ['Lunch', 'Snack'],
      image: 'https://placehold.co/400x300/FF7B7B/ffffff?text=Homemade+Sandwiches' // product_images.image_url
    },
    {
      id: 2,
      name: 'Wooden Desk Lamp',
      price: null,
      is_available: false,
      seller: { name: 'Eve Adams' },
      like_count: 5,
      category: { name: 'Home' },
      tags: ['Dorm', 'Lighting'],
      trade_only: true,
      image: 'https://placehold.co/400x300/4A5568/ffffff?text=Wooden+Desk+Lamp'
    },
    {
      id: 3,
      name: 'Python Tutoring Service',
      price: 15.00,
      is_available: true,
      seller: { name: 'Charlie Davis' },
      like_count: 10,
      category: { name: 'Service' },
      tags: ['Service', 'Programming'],
      trade_ok: true,
      image: 'https://placehold.co/400x300/8B5CF6/ffffff?text=Python+Tutoring'
    },
    {
      id: 4,
      name: 'Nintendo Switch Lite',
      price: 200.00,
      is_available: true,
      seller: { name: 'Bob Brown' },
      like_count: 40,
      category: { name: 'Electronics' },
      tags: ['Gaming', 'Console'],
      image: 'https://placehold.co/400x300/10B981/ffffff?text=Nintendo+Switch+Lite'
    },
    {
      id: 5,
      name: 'Mini Fridge (Black)',
      price: null,
      is_available: false,
      seller: { name: 'Alice Johnson' },
      like_count: 25,
      category: { name: 'Appliance' },
      tags: ['Dorm', 'Appliance'],
      trade_only: true,
      image: 'https://placehold.co/400x300/F97316/ffffff?text=Mini+Fridge'
    },
    {
      id: 6,
      name: 'Calculus Textbook 8th Edition',
      price: 35.50,
      is_available: true,
      seller: { name: 'Jane Smith' },
      like_count: 8,
      category: { name: 'Books' },
      tags: ['Textbook', 'STEM'],
      image: 'https://placehold.co/400x300/3B82F6/ffffff?text=Calculus+Textbook'
    },
    {
      id: 7,
      name: 'Rolex Datejust 36mm Mint Condition',
      price: 400.00,
      is_available: true,
      seller: { name: 'John Doe Brad' },
      like_count: 15,
      category: { name: 'Fashion' },
      tags: ['Dating and Fashion', 'Watch'],
      trade_ok: true,
      image: 'https://placehold.co/400x300/1F2937/ffffff?text=Rolex+Datejust'
    }
  ];

  const filteredProducts = products.filter(product => {
    if (activeTab === 'sale' && !product.is_available) return false;
    if (activeTab === 'tradeable' && !product.trade_only && !product.trade_ok) return false;
    return true;
  });

  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <div className="container">
          <div className="dashboard__welcome">
            <h1>Welcome, {user?.profile?.first_name || 'John Doe'}!</h1>
            <p>Discover amazing items from fellow CIT-U students</p>
          </div>

          <div className="dashboard__filters">
            <div className="filter-tabs">
              <button 
                className={`filter-tab ${activeTab === 'all' ? 'filter-tab--active' : ''}`}
                onClick={() => setActiveTab('all')}
              >
                All Items
              </button>
              <button 
                className={`filter-tab ${activeTab === 'sale' ? 'filter-tab--active' : ''}`}
                onClick={() => setActiveTab('sale')}
              >
                For Sale Only
              </button>
              <button 
                className={`filter-tab ${activeTab === 'tradeable' ? 'filter-tab--active' : ''}`}
                onClick={() => setActiveTab('tradeable')}
              >
                Tradable Items
              </button>
            </div>

            <div className="filter-dropdowns">
              <select 
                className="filter-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option>All Categories</option>
                <option>Food</option>
                <option>Electronics</option>
                <option>Books</option>
                <option>Service</option>
                <option>Fashion</option>
                <option>Home</option>
                <option>Appliance</option>
              </select>

              <select 
                className="filter-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option>Latest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Most Popular</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard__content">
        <div className="container">
          <div className="product-grid">
            {filteredProducts.map(product => (
              <Link 
                key={product.id} 
                to={`/product/${product.id}`}
                className="product-card"
              >
                <div className="product-card__image">
                  <img 
                    src={product.image}
                    alt={product.name}
                  />
                </div>
                <div className="product-card__content">
                  <h3 className="product-card__name">{product.name}</h3>
                  <div className="product-card__price">
                    {product.trade_only ? (
                      <span className="trade-only">Trade Only</span>
                    ) : (
                      <>
                        <span className="price">₱{product.price.toFixed(2)}</span>
                        {product.trade_ok && <span className="trade-ok">(Trade OK)</span>}
                      </>
                    )}
                  </div>
                  <div className="product-card__tags">
                    {product.tags.map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                  <div className="product-card__footer">
                    <div className="seller">
                      <span className="seller-icon">👤</span>
                      <span className="seller-name">{product.seller.name}</span>
                    </div>
                    <div className="likes">
                      <span className="like-icon">❤️</span>
                      <span className="like-count">{product.like_count}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
