import React from 'react';

import { ReactComponent as Checked } from '../Icons/radio_button_checked.svg';
import { ReactComponent as Uncheked } from '../Icons/radio_button_unchecked.svg';
import './popup.css';

export default function PopupDish({ handleClick, handleOpen, isOpen, data }) {
  const [accompanimentId, setAccompanimentId] = React.useState(null);
  const [complementId, setComplementId] = React.useState(null);
  const [sizeId, setSizeId] = React.useState(null);

  if (!isOpen) return null;

  function toggleOpen(event) {
    if (event.target.id === 'popup' || event.target.id === 'addbutton') {
      setAccompanimentId(null);
      setComplementId(null);
      setSizeId(null);
      handleOpen();
    }
  }

  function handleSize(id) {
    if (sizeId === id) return setSizeId(null);
    setSizeId(id);
  }

  function handleAccompaniment(id) {
    if (accompanimentId === id) return setAccompanimentId(null);
    setAccompanimentId(id);
  }

  function handleComplementId(id) {
    if (complementId === id) return setComplementId(null);
    setComplementId(id);
  }

  // guarda el platillo
  function handleAdd() {
    handleClick({ ...data, sizeId, complementId, accompanimentId });
  }

  return (
    <div id="popup" className="popup" onClick={toggleOpen}>
      <div className={`popup-content ${(isOpen && 'open') || ''}`}>
        <div
          className="image-dish"
          style={{ backgroundImage: `url(${data.image})` }}
        />
        <div className="dish-detail">
          <p className="title">{data.item}</p>
          <br />

          {/* seleccion de tamaño */}
          <p className="popup-subtitle">Elije el tamaño: </p>
          <div className="sizes">
            {(data.sizes || []).map(({ id, size, formattedPrice }) => {
              return (
                <div key={id} className="size" onClick={() => handleSize(id)}>
                  {(sizeId === id && <Checked className="icon-button" />) || (
                    <Uncheked className="icon-button" />
                  )}
                  <span className="black bold">{size}</span>
                  <span className="yellow bold">{formattedPrice}</span>
                </div>
              );
            })}
          </div>

          {/* seleccion de acompañamiento */}
          {!!data.accompaniment && (
            <p className="popup-subtitle">Elije el acompañamiento:</p>
          )}
          <div className="accompIdaniments">
            {(data.accompaniment || []).map(({ id, image, item, name }) => {
              return (
                <div
                  key={id}
                  className="size"
                  onClick={() => handleAccompaniment(id)}
                >
                  {(accompanimentId === id && (
                    <Checked className="icon-button" />
                  )) || <Uncheked className="icon-button" />}
                  <span className="black bold">{item || name}</span>
                </div>
              );
            })}
          </div>

          {/* seleccin de complemento */}
          {!!data.complements && (
            <p className="popup-subtitle">¿Quieres algún complementIdo?</p>
          )}
          <div className="complementIds">
            {(data.complements || []).map(({ id, image, item, name }) => (
              <div
                key={id}
                className="size"
                onClick={() => handleComplementId(id)}
              >
                {(complementId === id && (
                  <Checked className="icon-button" />
                )) || <Uncheked className="icon-button" />}
                <span className="black bold">{item || name}</span>
              </div>
            ))}
          </div>
          <div className="button-container">
            <button
              id="addbutton"
              className="button"
              onClick={handleAdd}
              disabled={!sizeId}
            >
              AGREGAR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
