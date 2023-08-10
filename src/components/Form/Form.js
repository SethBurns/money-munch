import { useState } from 'react';
import './Form.css';

export const Form = () => {
  const [date, setDate] = useState('2023-10-01');
  const [remainingBalance, setRemainingBalance] = useState(0);
  const [mealsLeft, setMealsLeft] = useState(1);

  const today = new Date();
  const dateToCompare = new Date(date);
  const timeDifference = dateToCompare - today;
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));


  const weeklyBudget = (remainingBalance / (daysDifference / 7)).toFixed(2)
  const dailyBudget = (weeklyBudget/7).toFixed(2)

  const mealBudget = calcMealBudget(weeklyBudget)

  function calcMealBudget(weekBudg) {
    if (weekBudg === '0.00' || mealsLeft === '0') {
      return `You must have a Remaining Balance and Estimated Meals for this calculation.`
    } else {
      return `$${(weekBudg/mealsLeft).toFixed(2)}`
    }
  }

  return (
    <div>
      <form className="input-form">
        <label htmlFor="dateInput">Expiration Day: </label>
        <input
          name="dateInput"
          className="date-input"
          type="date"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
          }}
        ></input>
        <label htmlFor="dollarInput">Remaining Balance $$</label>
        <input
          name="dollarInput"
          className="dollar-input"
          type="number"
          min="0.00"
          step="0.01"
          value={remainingBalance}
          onChange={(e) => {
            setRemainingBalance(e.target.value);
          }}
        ></input>
        <label htmlFor="mealEstimate">
          Estimated Meals On Campus This Week:{' '}
        </label>
        <input
          name="mealEstimate"
          className="meal-estimate"
          type="number"
          min="0"
          max="21"
          step="1"
          value={mealsLeft}
          onChange={(e) => {
            setMealsLeft(e.target.value);
          }}
        ></input>
      </form>
      <div className="info">
        <div className="vert">
          <p>Money Per Meal This Week:</p>
          <section className="permeal">{mealBudget}</section>
        </div>
        <div className="vert">
          <p>Money Per Day:</p>
          <section className="perday">${dailyBudget}</section>
        </div>
        <div className="vert">
          <p>Money Per Week:</p>
          <section className="perweek">${weeklyBudget}</section>
        </div>
      </div>
    </div>
  );
};
