
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  incrementItem,
  decrementItem,
  updateMealPeople,
  toggleMeal,
} from '../features/selections/selectionsSlice';

function ProductSelection() {
  const dispatch = useDispatch();
  const { rooms, addOns, meals } = useSelector(
    (state) => state.selections
  );

  const [showDetails, setShowDetails] = useState(false);
  const [activeSection, setActiveSection] = useState('rooms');

  const roomImages = {
  'Auditorium Hall':
  'https://images.unsplash.com/photo-1778876091112-f7e985acdb01?auto=format&fit=crop&fm=jpg&q=80&w=1200',

  'Conference Room':
    'https://brasierfreeth.com/wp-content/uploads/2020/03/Compass-1-1.jpg',

  'Presentation Room':
    'https://mapping-solutions.com.eg/assets/projector-D3--muXM.jpg',

  'Large Meeting Room':
    'https://soundlab.com.ua/upload/medialibrary/631/63190493b66f578a97f780236c282588.png',

  'Small Meeting Room':
    'https://asset.matchingcloud.com/image/98b68680-60ee-4e88-a9c0-986f5833d725.jpeg',
};


const addOnImages = {
  Speakers:
    'https://images.unsplash.com/photo-1692246427974-c28629e3617e?auto=format&fit=crop&w=1200&q=80',

  Microphones:
    'https://images.unsplash.com/photo-1643875180552-03b9bb103768?auto=format&fit=crop&w=1200&q=80',

  Whiteboards:
    'https://images.unsplash.com/photo-1676276377376-ab4cacc12b38?auto=format&fit=crop&w=1200&q=80',

  Projectors:
    'https://images.unsplash.com/photo-1589113050289-1c654e7e305d?auto=format&fit=crop&w=1200&q=80',

  Signage:
  'https://www.parrot.co.za/Portals/2/Images/Website/MainBuildingExterior/8.jpg',
};


const mealImages = {
  Breakfast:
    'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=1200&q=80',

  Lunch:
    'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80',

  'High Tea':
    'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=1200&q=80',

  Dinner:
  'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=1200&q=80',
  };
  const formatCurrency = (amount) =>
    `$${amount.toLocaleString('en-US')}`;

 
const renderItems = (items, category) => (
  <div className="product-grid">
    {items.map((item, index) => (
      <div className="product-card" key={item.name}>
        {category === 'rooms' && (
          <img
            className="product-image"
            src={roomImages[item.name]}
            alt={item.name}
          />
        )}

        {category === 'addons' && (
          <img
            className="product-image"
            src={addOnImages[item.name]}
            alt={item.name}
          />
        )}

        <div className="product-info">
          <h3>{item.name}</h3>

          {item.capacity && (
            <p className="product-capacity">
              Capacity: {item.capacity} people
            </p>
          )}

          <p className="product-price">
            {formatCurrency(item.price)} each
          </p>
        </div>

        <div className="quantity-controls">
          <button
            className="quantity-btn"
            onClick={() =>
              dispatch(decrementItem({ category, index }))
            }
          >
            −
          </button>

          <span className="quantity">{item.quantity}</span>

          <button
            className="quantity-btn"
            onClick={() =>
              dispatch(incrementItem({ category, index }))
            }
          >
            +
          </button>
        </div>
      </div>
    ))}
  </div>
);

  const roomTotal = rooms.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const addOnTotal = addOns.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const mealTotal = meals.reduce(
    (total, item) =>
      total + (item.selected ? item.price * item.people : 0),
    0
  );

  const selectedItems = [
    ...rooms
      .filter((item) => item.quantity > 0)
      .map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        subtotal: item.price * item.quantity,
      })),

    ...addOns
      .filter((item) => item.quantity > 0)
      .map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        subtotal: item.price * item.quantity,
      })),

    ...meals
      .filter((item) => item.selected && item.people > 0)
      .map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.people,
        subtotal: item.price * item.people,
      })),
  ];

  const totalCost = selectedItems.reduce(
    (total, item) => total + item.subtotal,
    0
  );

  return (
    <div className="planner-page">
      <header className="planner-header">
        <div className="planner-brand">
          <h2>Conference Planner</h2>
        </div>

        <nav className="planner-nav">
          <button onClick={() => setActiveSection('rooms')}>
            Rooms
          </button>

          <button onClick={() => setActiveSection('addons')}>
            Add-ons
          </button>

          <button onClick={() => setActiveSection('meals')}>
            Meals
          </button>

          <button
            className="show-details-btn"
            onClick={() => setShowDetails(true)}
          >
            Show Details
          </button>
        </nav>
      </header>

      <main className="planner-container">
        <div className="planner-title">
          <p className="planner-subtitle">PLAN YOUR EVENT</p>
          <h1>Conference Expense Planner</h1>
          <p>
            Select your rooms, equipment, and meals
            to organize your perfect conference.
          </p>
        </div>

        {activeSection === 'rooms' && (
          <section className="selection-section">
            <div className="section-heading">
              <span className="section-number">01</span>
              <div>
                <h2>Room Selection</h2>
                <p>Choose the rooms needed for your conference.</p>
              </div>
            </div>

            {renderItems(rooms, 'rooms')}

            <div className="section-total">
              <span>Rooms Total</span>
              <strong>{formatCurrency(roomTotal)}</strong>
            </div>
          </section>
        )}

        {activeSection === 'addons' && (
          <section className="selection-section">
            <div className="section-heading">
              <span className="section-number">02</span>
              <div>
                <h2>Add-ons Selection</h2>
                <p>
                  Select the audio and visual equipment
                  for your presentations.
                </p>
              </div>
            </div>

           {renderItems(addOns, 'addons')}
            <div className="section-total">
              <span>Add-ons Total</span>
              <strong>{formatCurrency(addOnTotal)}</strong>
            </div>
          </section>
        )}

        {activeSection === 'meals' && (
          <section className="selection-section">
            <div className="section-heading">
              <span className="section-number">03</span>
              <div>
                <h2>Meals Selection</h2>
                <p>Choose meals and enter the number of people.</p>
              </div>
            </div>

            <div className="product-grid">
              {meals.map((meal, index) => (
                <div className="product-card meal-card" key={meal.name}>
                    <img
                        className="product-image"
                        src={mealImages[meal.name]}
                        alt={meal.name}
                        />
                  <div className="product-info">
                    <label>
                      <input
                        type="checkbox"
                        checked={meal.selected}
                        onChange={() => dispatch(toggleMeal(index))}
                      />
                      {meal.name}
                    </label>

                    <p className="product-price">
                      {formatCurrency(meal.price)} per person
                    </p>
                  </div>

                  <div className="meal-input">
                    <label htmlFor={`meal-${index}`}>
                      Number of people
                    </label>

                    <input
                      id={`meal-${index}`}
                      type="number"
                      min="0"
                      value={meal.people}
                      onChange={(event) =>
                        dispatch(
                          updateMealPeople({
                            index,
                            people: event.target.value,
                          })
                        )
                      }
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="section-total">
              <span>Meals Total</span>
              <strong>{formatCurrency(mealTotal)}</strong>
            </div>
          </section>
        )}
      </main>

      {showDetails && (
        <div
          className="modal-overlay"
          onClick={() => setShowDetails(false)}
        >
          <div
            className="details-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <p className="planner-subtitle">YOUR SELECTIONS</p>
                <h2>Conference Details</h2>
              </div>

              <button
                className="modal-close-btn"
                onClick={() => setShowDetails(false)}
              >
                ×
              </button>
            </div>

            {selectedItems.length === 0 ? (
              <p className="empty-details">
                You have not selected any items yet.
              </p>
            ) : (
              <div className="details-table-wrapper">
                <table className="details-table">
                  <thead>
                    <tr>
                      <th>Selection Type</th>
                      <th>Unit Cost</th>
                      <th>Quantity</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>

                  <tbody>
                    {selectedItems.map((item) => (
                      <tr key={item.name}>
                        <td>{item.name}</td>
                        <td>{formatCurrency(item.price)}</td>
                        <td>{item.quantity}</td>
                        <td>{formatCurrency(item.subtotal)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="modal-total">
              <span>Total Cost</span>
              <strong>{formatCurrency(totalCost)}</strong>
            </div>

            <button
              className="modal-done-btn"
              onClick={() => setShowDetails(false)}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductSelection;
