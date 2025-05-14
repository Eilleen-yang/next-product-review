export default function ProductCard({ product }) {
  return (
    <div className="p-4 border rounded shadow hover:shadow-lg transition">
      <img
        src={product.image}
        alt={product.name}
        className="mb-2 w-full h-60 rounded object-cover"
      />
      <h3 className="text-lg font-semibold"> {product.name}</h3>
      <p className="text-sm text-gray-600">{product.description}</p>
      <p className="mt-2 font-bold text-blue-600">
        {product.price.toLocaleString()}원
      </p>
    </div>
  );
}
