import { useCart } from '../../context/CartContext.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import Button from '../../components/common/Button.jsx'

export default function CartPage() {
	const { items, updateQuantity, removeFromCart, clearCart, totalItems, totalPrice } = useCart()
	const { user, logout } = useAuth()

	return (
		<div>
			<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
				<h2>Your Cart</h2>
				<div>
					<span style={{ marginRight: 12 }}>Signed in as {user?.name || user?.email}</span>
					<Button variant="outline" onClick={logout}>Logout</Button>
				</div>
			</div>
			{items.length === 0 ? (
				<p>Your cart is empty.</p>
			) : (
				<>
					  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
						<thead>
							<tr>
								<th style={{ textAlign: 'left', borderBottom: '1px solid #eee', padding: 8 }}>Item</th>
								<th style={{ textAlign: 'right', borderBottom: '1px solid #eee', padding: 8 }}>Price</th>
								<th style={{ textAlign: 'right', borderBottom: '1px solid #eee', padding: 8 }}>Qty</th>
								<th style={{ textAlign: 'right', borderBottom: '1px solid #eee', padding: 8 }}>Subtotal</th>
								<th style={{ borderBottom: '1px solid #eee', padding: 8 }}></th>
							</tr>
						</thead>
						<tbody>
							{items.map((it) => (
								<tr key={it.id}>
									<td style={{ padding: 8 }}>{it.name}</td>
									<td style={{ padding: 8, textAlign: 'right' }}>${(it.price || 0).toFixed(2)}</td>
									<td style={{ padding: 8, textAlign: 'right' }}>
										<input
											type="number"
											min={1}
											value={it.quantity}
											onChange={(e) => updateQuantity(it.id, Number(e.target.value) || 1)}
											style={{ width: 60, textAlign: 'right' }}
										/>
									</td>
									<td style={{ padding: 8, textAlign: 'right' }}>${((it.quantity || 0) * (it.price || 0)).toFixed(2)}</td>
									<td style={{ padding: 8, textAlign: 'right' }}>
										<Button variant="outline" onClick={() => removeFromCart(it.id)}>Remove</Button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
					<div style={{ marginTop: 16, display: 'flex', justifyContent: 'space-between' }}>
						<div>
							<strong>Items:</strong> {totalItems}
						</div>
						<div>
							<strong>Total:</strong> ${totalPrice.toFixed(2)}
						</div>
					</div>
					<div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
						<Button variant="danger" onClick={clearCart}>Clear Cart</Button>
						<Button disabled={items.length === 0} onClick={() => alert('Checkout coming soon!')}>
							Checkout
						</Button>
					</div>
				</>
			)}
		</div>
	)
}

