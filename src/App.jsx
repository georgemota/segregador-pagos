import React, { useState } from 'react';
import './App.css';  // Importar el archivo de estilos

const App = () => {
  const [personOneData, setPersonOneData] = useState([]);
  const [personTwoData, setPersonTwoData] = useState([]);
  const [history, setHistory] = useState({ personOne: [], personTwo: [] });
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);

  const [amountOne, setAmountOne] = useState('');
  const [descOne, setDescOne] = useState('');
  const [dateOne, setDateOne] = useState('');
  const [amountTwo, setAmountTwo] = useState('');
  const [descTwo, setDescTwo] = useState('');
  const [dateTwo, setDateTwo] = useState('');

  const handleAddOne = () => {
    setPersonOneData([...personOneData, { amount: parseFloat(amountOne), desc: descOne, date: dateOne }]);
    setAmountOne('');
    setDescOne('');
    setDateOne('');
  };

  const handleAddTwo = () => {
    setPersonTwoData([...personTwoData, { amount: parseFloat(amountTwo), desc: descTwo, date: dateTwo }]);
    setAmountTwo('');
    setDescTwo('');
    setDateTwo('');
  };

  const handleClear = () => {
    setHistory({ personOne: personOneData, personTwo: personTwoData });
    setPersonOneData([]);
    setPersonTwoData([]);
  };

  const totalOne = personOneData.reduce((acc, curr) => acc + curr.amount, 0);
  const totalTwo = personTwoData.reduce((acc, curr) => acc + curr.amount, 0);

  const halfOne = totalOne / 2;
  const halfTwo = totalTwo / 2;

  const difference = halfOne - halfTwo;
  const personToPay = difference > 0 ? 'Edil' : 'George'; // Persona que debe pagar la diferencia
  const amountToPay = Math.abs(difference);

  return (
    <div className="main-container">
      {/* Título centralizado */}
      <h1>Segregador de Pagos</h1>

      <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
        {/* Sección Izquierda */}
        <div className="left-section">
          <h2 style={{ color: 'white' }}>George</h2>
          
          {/* Formulario para George */}
          <input 
            type="number" 
            placeholder="Monto" 
            value={amountOne} 
            onChange={(e) => setAmountOne(e.target.value)} 
          />
          <input 
            type="text" 
            placeholder="Descripción" 
            value={descOne} 
            onChange={(e) => setDescOne(e.target.value)} 
          />
          <input 
            type="date" 
            value={dateOne} 
            onChange={(e) => setDateOne(e.target.value)} 
          />
          <button onClick={handleAddOne} className="agregar">Agregar</button>

          <h2 style={{ color: 'white' }}>Edil</h2>
          {/* Formulario para Edil */}
          <input 
            type="number" 
            placeholder="Monto" 
            value={amountTwo} 
            onChange={(e) => setAmountTwo(e.target.value)} 
          />
          <input 
            type="text" 
            placeholder="Descripción" 
            value={descTwo} 
            onChange={(e) => setDescTwo(e.target.value)} 
          />
          <input 
            type="date" 
            value={dateTwo} 
            onChange={(e) => setDateTwo(e.target.value)} 
          />
          <button onClick={handleAddTwo} className="agregar">Agregar</button>
        </div>

        {/* Sección Derecha */}
        <div className="right-section">
          <h3>Datos de George</h3>
          <table>
            <thead>
              <tr>
                <th>Descripción</th>
                <th>Monto</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {personOneData.map((item, index) => (
                <tr key={index}>
                  <td>{item.desc}</td>
                  <td>{item.amount}</td>
                  <td>{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3>Datos de Edil</h3>
          <table>
            <thead>
              <tr>
                <th>Descripción</th>
                <th>Monto</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {personTwoData.map((item, index) => (
                <tr key={index}>
                  <td>{item.desc}</td>
                  <td>{item.amount}</td>
                  <td>{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2>Totales</h2>
          <p className={totalOne > totalTwo ? 'total-positive' : 'total-negative'}>Total George: {totalOne}</p>
          <p className={totalTwo > totalOne ? 'total-positive' : 'total-negative'}>Total Edil: {totalTwo}</p>

          <h3>Diferencia: {amountToPay} ({personToPay} debe pagar esta diferencia)</h3>
        </div>
      </div>

      {/* Contenedor para los botones */}
      <div className="buttons-container">
        <button onClick={handleClear} className="limpiar">Limpiar Montos</button>
        <button onClick={() => setIsHistoryVisible(!isHistoryVisible)} className="historial">
          {isHistoryVisible ? 'Ocultar Historial' : 'Mostrar Historial'}
        </button>
      </div>

      {/* Menú lateral para historial */}
      {isHistoryVisible && (
        <div className="historial-menu">
          <h3>Historial de la última limpieza</h3>
          <h4>George</h4>
          <ul>
            {history.personOne.map((item, index) => (
              <li key={index}>{item.desc}: {item.amount} ({item.date})</li>
            ))}
          </ul>

          <h4>Edil</h4>
          <ul>
            {history.personTwo.map((item, index) => (
              <li key={index}>{item.desc}: {item.amount} ({item.date})</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
