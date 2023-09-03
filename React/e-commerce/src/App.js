import contenido from './productData.js';
import ProductData from './components/ConstCards.js'



function App() {
  return (
    <div>
      <header>
        <h1>E-commerce in React and SnipCart</h1>
      </header>
      <div className='cards'>
        <ProductData data={contenido[0]}/>
        <ProductData data={contenido[1]}/>
        <ProductData data={contenido[2]}/>
        <ProductData data={contenido[3]}/>
        <ProductData data={contenido[4]}/>
        <ProductData data={contenido[5]}/>
      </div>
    </div>
  );
}

export default App;
