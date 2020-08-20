import React from 'react';
import { Route, Redirect, NavLink, useParams } from 'react-router-dom';

import Context from '../../context';

// componentes
import Card from '../../components/Card';
import Header from '../../components/Header';
import Resume from '../../components/Resume';
import PopUp from '../../components/PopUp';
import Loader from '../../components/Loader';

import './menu.css';

function persistOrder(order) {
  localStorage.setItem('dishes', JSON.stringify(order));
}

export default function Menu() {
  let savedDishes = [];
  if (localStorage.getItem('dishes')) {
    savedDishes = JSON.parse(localStorage['dishes']);
  }

  const { menuType } = useParams();
  const { firebase } = React.useContext(Context);

  const [menu, setMenu] = React.useState(null);
  const [dishes, setDishes] = React.useState(savedDishes);
  const [openDish, setOpenDish] = React.useState(false);
  const [selectDish, setSelectDish] = React.useState({});

  React.useEffect(() => {
    // consulta a firebase con los datos de usuario
    firebase
      .database()
      .ref('/')
      .once('value')
      .then(response => {
        const data = response.val();
        setMenu(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [firebase]);

  if (!localStorage.getItem('auth')) return <Redirect to="/login" />;

  function handleAddDish(data) {
    const newDishes = [...dishes, data];
    setDishes(newDishes);
    persistOrder(newDishes);
  }

  function handleRemoveDish(id) {
    const newDishes = dishes.filter(dish => dish.id !== id);
    setDishes(newDishes);
    persistOrder(newDishes);
  }

  function handleSelectDish(data) {
    setSelectDish(data);
    setOpenDish(!openDish);
  }

  return (
    <div className="menu">
      <PopUp
        data={selectDish}
        isOpen={openDish}
        handleClick={handleAddDish}
        handleOpen={() => setOpenDish(!openDish)}
      />
      <Header />
      <div className="tabs">
        <NavLink
          to="/breakfast"
          className="tab"
          activeClassName="tabactive"
          isActive={() => menuType === 'breakfast'}
        >
          Desayuno
        </NavLink>
        <NavLink
          to="/lunch"
          className="tab"
          activeClassName="tabactive"
          isActive={() => menuType === 'lunch'}
        >
          Comidas
        </NavLink>
      </div>
      <div className="menu-container">
        {!menu && <Loader />}
        {!!menu && (
          <div className="cards">
            <Route exact path="/breakfast">
              {menu.breakfast.map(data => {
                const { id, image, item } = data;
                return (
                  <Card
                    key={id}
                    item={item}
                    image={image}
                    handleClick={() => handleSelectDish(data)}
                  />
                );
              })}
            </Route>
            <Route exact path="/lunch">
              {menu.lunch.map(data => {
                const { id, image, item } = data;
                return (
                  <Card
                    key={id}
                    item={item}
                    image={image}
                    handleClick={() => handleSelectDish(data)}
                  />
                );
              })}
            </Route>
          </div>
        )}
        <Resume dishes={dishes} handleRemove={handleRemoveDish} />
      </div>
    </div>
  );
}
