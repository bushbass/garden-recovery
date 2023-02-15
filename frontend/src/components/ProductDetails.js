import { useProductsContext } from '../hooks/useProductsContext';

const ProductDetails = ({ product }) => {
  const { dispatch } = useProductsContext();

  const handleClick = async () => {
    const response = await fetch('/api/products/' + product._id, {
      method: 'DELETE',
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_PRODUCT', payload: json });
    }
  };

  return (
    <div className="product-details">
      <p>
        {product.productName} {product.storeNumber}{' '}
        <span className="material-symbols-outlined" onClick={handleClick}>
          delete
        </span>
      </p>
    </div>
  );
};

export default ProductDetails;
