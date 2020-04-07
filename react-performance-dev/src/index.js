import React, { useState, useEffect, useCallback, Fragment } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./styles.css";

function App() {
  const [cocktails, setCocktails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState(null);

  const getCocktails = useCallback(query => {
    axios
      .get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${query}`)
      .then(response => {
        setCocktails([...cocktails, ...response.data.drinks]);
        setIsLoading(false);
      })
      .catch(error => {
        setErrors(error);
      });
  }, []);

  useEffect(() => {
    async function fetchData() {
    await getCocktails('a');
    await getCocktails('b');
    await getCocktails('c');
    };
    fetchData();
   }, [getCocktails]);

  return (
    <Fragment>
      <h2>Cocktails</h2>
      <ol>
        {!isLoading ? (
          cocktails.map((cocktail, i) => {
            const { strDrink, strInstructions } = cocktail;
            return (
              <li key={i}>
                <strong>{strDrink}</strong> - {strInstructions}
              </li>
            );
          })
        ) : (
          <p>Loading...</p>
        )}
      </ol>
    </Fragment>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);
