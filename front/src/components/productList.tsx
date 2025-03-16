import Card from "./cards"; 
import { notProducts } from "../Helpers/products"; 

const ProductList = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {notProducts.map((product) => (
        <Card 
          key={product.id}
          id={product.id} 
          title={product.name}
          description={product.description}
          price={product.price}
          image={product.image}
          categoryId={product.categoryId}
        />
      ))}
    </div>
  );
};

export default ProductList;

