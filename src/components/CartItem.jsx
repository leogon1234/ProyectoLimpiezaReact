import React from 'react';


export default function CartItem({ item, updateQuantity, removeItem }) {
  const {
    id,
    name,
    image,
    price,
    offer,
    priceOffer,
    quantity,
  } = item;
  const unitPrice = offer && priceOffer ? priceOffer : price;

  return (
    <tr>
      <td>
        <img
          src={image}
          alt={name}
          style={{ width: '60px', height: '60px', objectFit: 'cover' }}
          className="rounded"
        />
      </td>
      <td>{name}</td>
      <td>
        ${unitPrice.toLocaleString()}
        {offer && priceOffer && (
          <span className="text-muted text-decoration-line-through ms-2 small">
            ${price.toLocaleString()}
          </span>
        )}
      </td>
      <td>
        <div className="input-group input-group-sm" style={{ maxWidth: '140px' }}>
          <button
            className="btn btn-outline-secondary"
            onClick={() => updateQuantity(id, quantity - 1)}
            disabled={quantity <= 1}
          >
            -
          </button>
          <input
            type="number"
            className="form-control text-center"
            value={quantity}
            min="1"
            onChange={(e) => updateQuantity(id, Number(e.target.value))}
          />
          <button
            className="btn btn-outline-secondary"
            onClick={() => updateQuantity(id, quantity + 1)}
          >
            +
          </button>
        </div>
      </td>
      <td>${(unitPrice * quantity).toLocaleString()}</td>
      <td>
        <button className="btn btn-danger btn-sm" onClick={() => removeItem(id)}>
          <i className="bi bi-trash"></i>
        </button>
      </td>
    </tr>
  );
}