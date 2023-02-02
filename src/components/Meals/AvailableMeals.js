import { useEffect, useState } from 'react';

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      const responce = await fetch('https://react-http-request-5b4de-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json');

      if (!responce.ok) {
        throw new Error('Something went wrong!')
      }

      const responceData = await responce.json();

      const loadMeals = [];
      for (const key in responceData) {
        loadMeals.push({
          id: key,
          name: responceData[key].name,
          description: responceData[key].description,
          price: responceData[key].price
        })
      }
      setMeals(loadMeals);
      setIsLoading(false);
    }

    fetchMeals().catch((error) => {
      console.log(error.message);
      setIsLoading(false)
      setHttpError(error.message)
    });

  }, []);


  if (isLoading) {
    return <section className={classes.MealIsLoading}>
      <p>Loading...</p>
    </section>
  }

  if (httpError) {
    return <section className={classes.MealHasError}>
      <p>{httpError}</p>
    </section>
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
