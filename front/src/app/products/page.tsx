import ProductList from "@/components/productList";


  const Products = () => {
    return (
      <div className="min-h-screen flex flex-col items-center justify-start bg-gray-100 pt-20">
      <h1 className="text-gray-500 text-3xl font-bold mb-8">Todos los productos</h1>
        <ProductList /> 
        </ div>
    )

  }

  export default Products;

