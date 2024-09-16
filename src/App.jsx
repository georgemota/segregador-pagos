import React, { useState } from 'react';

const App = () => {
  const [personOneData, setPersonOneData] = useState([]);
  const [personTwoData, setPersonTwoData] = useState([]);
  const [history, setHistory] = useState({ personOne: [], personTwo: [] });
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);  // Estado para mostrar/ocultar historial

  const [amountOne, setAmountOne] = useState('');
  const [descOne, setDescOne] = useState('');
  const [amountTwo, setAmountTwo] = useState('');
  const [descTwo, setDescTwo] = useState('');

  const handleAddOne = () => {
    setPersonOneData([...personOneData, { amount: parseFloat(amountOne), desc: descOne }]);
    setAmountOne('');
    setDescOne('');
  };

  const handleAddTwo = () => {
    setPersonTwoData([...personTwoData, { amount: parseFloat(amountTwo), desc: descTwo }]);
    setAmountTwo('');
    setDescTwo('');
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

  const difference = Math.abs(halfOne - halfTwo);

  const totalStyleOne = totalOne > totalTwo ? { color: 'green' } : { color: 'red' };
  const totalStyleTwo = totalTwo > totalOne ? { color: 'green' } : { color: 'red' };

  return (
    <div style={{ 
      backgroundImage: `url('https://path-to-rick-and-morty-image.jpg')`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      minHeight: '100vh',
      padding: '20px'
    }}>
      <h1>Segregador de Pagos</h1>
      
      {/* Formulario para persona 1 */}
      <h2>Persona 1</h2>
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
      <button onClick={handleAddOne}>Agregar</button>

      {/* Formulario para persona 2 */}
      <h2>Persona 2</h2>
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
      <button onClick={handleAddTwo}>Agregar</button>

      {/* Tabla para mostrar los datos */}
      <h3>Datos de Persona 1</h3>
      <table border="1">
        <thead>
          <tr>
            <th>Monto</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          {personOneData.map((item, index) => (
            <tr key={index}>
              <td>{item.amount}</td>
              <td>{item.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Datos de Persona 2</h3>
      <table border="1">
        <thead>
          <tr>
            <th>Monto</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          {personTwoData.map((item, index) => (
            <tr key={index}>
              <td>{item.amount}</td>
              <td>{item.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totales */}
      <h2>Totales</h2>
      <p style={totalStyleOne}>Total Persona 1: {totalOne}</p>
      <p style={totalStyleTwo}>Total Persona 2: {totalTwo}</p>

      <h3>Diferencia: {difference}</h3>

      {/* Botón para limpiar datos */}
      <button onClick={handleClear}>Limpiar Montos</button>

      {/* Botón para mostrar/ocultar historial */}
      <button onClick={() => setIsHistoryVisible(!isHistoryVisible)}>
        {isHistoryVisible ? 'Ocultar Historial' : 'Mostrar Historial'}
      </button>

      {/* Menú lateral para historial */}
      {isHistoryVisible && (
        <div style={{
          position: 'fixed', 
          right: 0, 
          top: 0, 
          width: '250px', 
          height: '100%', 
          backgroundColor: 'rgba(0, 0, 0, 0.7)', 
          color: 'white', 
          padding: '20px', 
          overflowY: 'auto'
        }}>
          <h3>Historial de la última limpieza</h3>
          <h4>Persona 1</h4>
          <ul>
            {history.personOne.map((item, index) => (
              <li key={index}>{item.desc}: {item.amount}</li>
            ))}
          </ul>

          <h4>Persona 2</h4>
          <ul>
            {history.personTwo.map((item, index) => (
              <li key={index}>{item.desc}: {item.amount}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};


export default App;
