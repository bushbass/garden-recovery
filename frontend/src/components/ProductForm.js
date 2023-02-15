import { useState } from 'react';
import { useProductsContext } from '../hooks/useProductsContext';

const ProductForm = () => {
  const { dispatch } = useProductsContext();

  const [productName, setProductName] = useState('');
  const [storeNumber, setStoreNumber] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = { productName, storeNumber };

    const response = await fetch('/api/products', {
      method: 'POST',
      body: JSON.stringify(product),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setEmptyFields([]);
      setError(null);
      setProductName('');
      // setStoreNumber('');
      dispatch({ type: 'CREATE_PRODUCT', payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Product</h3>

      <label>Product Name:</label>
      <input
        type="text"
        onChange={(e) => setProductName(e.target.value)}
        value={productName}
        className={emptyFields.includes('produtName') ? 'error' : ''}
      />

      <label>Store Number:</label>
      <input
        type="string"
        onChange={(e) => setStoreNumber(e.target.value)}
        value={storeNumber}
        className={emptyFields.includes('storeNumber') ? 'error' : ''}
      />

      <button>Add Product</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default ProductForm;
