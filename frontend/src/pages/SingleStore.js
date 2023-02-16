import { useEffect, useState } from 'react';
import { useProductsContext } from '../hooks/useProductsContext';

// components
import ProductDetails from '../components/ProductDetails';
import ProductForm from '../components/ProductForm';

const Home = () => {
  const { products, dispatch } = useProductsContext();
  const [storeInput, setStoreInput] = useState(100);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(`api/products/store/${storeInput}`);
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_PRODUCTS', payload: json });
      }
    };

    fetchProducts();
  }, [dispatch, storeInput]);

  return (
    <div className="home">
      <div className="products">
        <input
          type="text"
          value={storeInput}
          onChange={(e) => setStoreInput(e.target.value)}
        />
        {products &&
          products
            .filter((item) => item.storeNumber == storeInput)
            .map((product) => (
              <ProductDetails product={product} key={product._id} />
            ))}
      </div>
      <ProductForm />
    </div>
  );
};

export default Home;
