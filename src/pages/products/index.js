import ProductCard from "../_components/ProductCard";
import products from "../data/products";

export default function ProductListPage() {
  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">제품 목록</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
