
import { useDispatch, useSelector } from 'react-redux';
import {
  incrementItem,
  decrementItem,
  updateMealPeople,
} from '../features/selections/selectionsSlice';

function ProductSelection() {
  const dispatch = useDispatch();
  const { rooms, addOns, meals } = useSelector(
    (state) => state.selections
  );

  const renderItems = (items, category) => (
    <div className="product-grid">
      {items.map((item, index) => (
        <div className="product-card" key={item.name}>
          <div className="product-info">
            <h3>{item.name}</h3>

            {item.capacity && (
              <p className="product-capacity">
                Capacity: {item.capacity} people
              </p>
            )}

            <p className="product-price">
              ${item.price.toLocaleString()} each
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

            <span className="quantity">
              {item.quantity}
            </span>

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

  return (
    <div className="planner-page">

      <header className="planner-header">
        <div className="planner-brand">
          <h2>Conference Planner</h2>
        </div>

        <nav className="planner-nav">
          <a href="#rooms">Rooms</a>
          <a href="#addons">Add-ons</a>
          <a href="#meals">Meals</a>
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

        <section id="rooms" className="selection-section">
          <div className="section-heading">
            <span className="section-number">01</span>
            <div>
              <h2>Room Selection</h2>
              <p>Choose the rooms needed for your conference.</p>
            </div>
          </div>

          {renderItems(rooms, 'rooms')}
        </section>

        <section id="addons" className="selection-section">
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

          {renderItems(addOns, 'addOns')}
        </section>

        <section id="meals" className="selection-section">
          <div className="section-heading">
            <span className="section-number">03</span>
            <div>
              <h2>Meals Selection</h2>
              <p>Enter the number of people for each meal.</p>
            </div>
          </div>

          <div className="product-grid">
            {meals.map((meal, index) => (
              <div className="product-card meal-card" key={meal.name}>
                <div className="product-info">
                  <h3>{meal.name}</h3>
                  <p className="product-price">
                    ${meal.price.toLocaleString()} per person
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
        </section>

      </main>
    </div>
  );
}

export default ProductSelection;
