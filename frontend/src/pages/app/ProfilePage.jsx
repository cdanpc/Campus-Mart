import React from 'react';
import { useNavigate } from 'react-router-dom';

const mockUser = {
    name: 'J. Dela Cruz',
    profileImg: '/images/profile-asdasd.png',
    bio: 'Student at CampusMart. Specializes in electronics and textbooks. Happy to answer any questions!',
    contact: 'jdelacruz@email.com'
};

const mockUserItems = [
    { id: 101, title: 'Old Chemistry Lab Manual', price: '₱300', img: '/images/sample-manual.png', fav: false },
    { id: 102, title: 'Used Gaming Headset', price: '₱1,500', img: '/images/sample-headset.png', fav: true },
    { id: 103, title: 'Custom Code Review Service', price: '₱800', img: '/images/sample-code.png', fav: false },
    { id: 104, title: 'Ergonomic Desk Chair', price: '₱3,500', img: '/images/sample-chair.png', fav: false },
];

const ItemCard = ({ item, onViewDetails }) => (
    <div style={{
        width: 200,
        minHeight: 180,
        borderRadius: 12,
        border: '1px solid var(--border-color)',
        background: 'var(--bg-subtle)',
        boxShadow: 'var(--shadow-md)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    }}>
        <img src={item.img} alt={item.title} style={{ width: '100%', height: 120, objectFit: 'cover', borderRadius: '12px 12px 0 0' }} />
        <div style={{ padding: 12 }}>
            <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 4 }}>{item.title}</div>
            <div style={{ fontWeight: 700, color: 'var(--color-primary-600)', fontSize: 16 }}>{item.price}</div>
            <button
                style={{
                    marginTop: 8,
                    background: 'var(--color-primary-600)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 6,
                    padding: '6px 12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontSize: 14
                }}
                onClick={() => onViewDetails(item.id)}
            >
                View Details
            </button>
        </div>
    </div>
);

function chunkArray(array, size) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
    }
    return result;
}

export default function ProfilePage() {
    const navigate = useNavigate();
    const itemRows = chunkArray(mockUserItems, 4);

    const handleViewDetails = (itemId) => {
        navigate(`/app/items/${itemId}`);
    };

    const handleAddItem = () => {
        navigate('/app/post-item');
    };

    return (
        <div style={{
            maxWidth: 900,
            margin: '40px auto',
            padding: 32,
            background: 'var(--bg-surface)',
            borderRadius: 20,
            boxShadow: 'var(--shadow-md)'
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 32,
                marginBottom: 32
            }}>
                <img
                    src={mockUser.profileImg}
                    alt={mockUser.name}
                    style={{
                        width: 120,
                        height: 120,
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '3px solid var(--color-primary-600)'
                    }}
                />
                <div>
                    <h2 style={{ margin: 0, fontSize: 32 }}>{mockUser.name}</h2>
                    <p style={{ color: 'var(--text-secondary)', margin: '10px 0 0 0', fontSize: 17 }}>{mockUser.bio}</p>
                    <div style={{ marginTop: 10, fontSize: 15 }}>
                        <strong>Contact:</strong> <span style={{ color: 'var(--color-primary-600)' }}>{mockUser.contact}</span>
                    </div>
                </div>
            </div>
            <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                    <h3 style={{ fontSize: 22 }}>Listed Items</h3>
                    <button
                        style={{
                            background: 'var(--color-primary-600)',
                            color: '#fff',
                            border: 'none',
                            borderRadius: 8,
                            padding: '10px 20px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            fontSize: 16
                        }}
                        onClick={handleAddItem}
                    >
                        + Add Item
                    </button>
                </div>
                {itemRows.map((row, idx) => (
                    <div
                        key={idx}
                        style={{
                            display: 'flex',
                            gap: 20,
                            marginBottom: 20,
                            flexWrap: 'nowrap'
                        }}
                    >
                        {row.map(item => (
                            <ItemCard key={item.id} item={item} onViewDetails={handleViewDetails} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}