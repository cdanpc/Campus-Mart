import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Placeholder Data
const mockItem = {
    id: '123',
    title: 'Engineering Calculus Textbook (Used)',
    price: '₱850',
    condition: 'Good (8/10)',
    seller: 'J. Dela Cruz',
    description: "Selling my Engineering Calculus textbook. Barely used, no missing pages, only light highlights on the first chapter.",
    imageUrl: "https://placehold.co/400x400/8b5cf6/ffffff?text=Product+Image",
    category: 'Textbooks',
    relatedItems: [
        { id: 1, title: 'Old Chemistry Lab Manual', price: '₱300', img: "https://placehold.co/100x100/9ca3af/ffffff?text=Item+A" },
        { id: 2, title: 'Used Gaming Headset', price: '₱1,500', img: "https://placehold.co/100x100/9ca3af/ffffff?text=Item+B" },
        { id: 3, title: 'Ergonomic Desk Chair', price: '₱3,500', img: "https://placehold.co/100x100/9ca3af/ffffff?text=Item+C" },
    ]
};

const RelatedItemCard = ({ item }) => (
    <div style={{ width: 140, borderRadius: 8, border: '1px solid var(--border-color)', background: 'var(--bg-subtle)', marginRight: 12 }}>
        <img src={item.img} alt={item.title} style={{ width: '100%', height: 80, objectFit: 'cover', borderRadius: '8px 8px 0 0' }} />
        <div style={{ padding: 8 }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>{item.title}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-primary-600)' }}>{item.price}</div>
        </div>
    </div>
);

export default function ItemDetailsPage() {
    const [isFavorite, setIsFavorite] = useState(false);
    const navigate = useNavigate();
    const item = mockItem;

    return (
        <div style={{ maxWidth: 700, margin: '32px auto', padding: 24, background: 'var(--bg-surface)', borderRadius: 16, boxShadow: 'var(--shadow-md)' }}>
            <button
                onClick={() => navigate(-1)}
                style={{
                    marginBottom: 16,
                    background: 'var(--bg-subtle)',
                    color: 'var(--color-primary-600)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 8,
                    padding: '8px 16px',
                    fontWeight: 600,
                    cursor: 'pointer'
                }}
            >
                ← Back
            </button>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                <img
                    src={item.imageUrl}
                    alt={item.title}
                    style={{ width: 220, height: 220, objectFit: 'cover', borderRadius: 12, background: '#f8fafc' }}
                />
                <div style={{ flex: 1 }}>
                    <h2 style={{ fontSize: 24, margin: '0 0 8px 0' }}>{item.title}</h2>
                    <div style={{ fontWeight: 700, color: 'var(--color-primary-600)', fontSize: 20, marginBottom: 8 }}>
                        {item.price}
                    </div>
                    <div style={{ fontSize: 14, marginBottom: 8 }}>Condition: <strong>{item.condition}</strong></div>
                    <div style={{ fontSize: 14, marginBottom: 8 }}>Seller: <strong style={{ color: 'var(--color-primary-600)' }}>{item.seller}</strong></div>
                    <div style={{ fontSize: 14, marginBottom: 8 }}>Category: <strong>{item.category}</strong></div>
                    <p style={{ margin: '16px 0', fontSize: 15, lineHeight: 1.5 }}>{item.description}</p>
                    <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
                        <button
                            style={{
                                background: 'var(--color-primary-600)',
                                color: '#fff',
                                border: 'none',
                                borderRadius: 8,
                                padding: '10px 18px',
                                fontWeight: 600,
                                cursor: 'pointer'
                            }}
                            onClick={() => alert("Added to Cart!")}
                        >
                            Add to Cart
                        </button>
                        <button
                            style={{
                                background: 'var(--bg-subtle)',
                                color: 'var(--text-primary)',
                                border: '1px solid var(--border-color)',
                                borderRadius: 8,
                                padding: '10px 18px',
                                fontWeight: 600,
                                cursor: 'pointer'
                            }}
                            onClick={() => navigate('/app/messages/new')}
                        >
                            Chat with Seller
                        </button>
                        <button
                            style={{
                                background: 'none',
                                border: 'none',
                                color: isFavorite ? 'red' : 'var(--color-primary-600)',
                                fontWeight: 700,
                                cursor: 'pointer'
                            }}
                            onClick={() => setIsFavorite(!isFavorite)}
                        >
                            ♥
                        </button>
                    </div>
                </div>
            </div>
            <div style={{ marginTop: 32 }}>
                <h3 style={{ fontSize: 18, marginBottom: 12 }}>More from {item.seller}</h3>
                <div style={{ display: 'flex', gap: 0, overflowX: 'auto' }}>
                    {item.relatedItems.map(relItem => (
                        <RelatedItemCard key={relItem.id} item={relItem} />
                    ))}
                </div>
            </div>
        </div>
    );
}