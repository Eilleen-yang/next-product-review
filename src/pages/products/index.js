import { useRouter } from "next/router";
import ProductCard from "../../_components/ProductCard";
import products from "../../data/products";
import { useState, useEffect } from "react";
import Head from "next/head";

export default function ProductListPage() {
  const router = useRouter();
  const { q = "", min = 0, max = Infinity } = router.query;

  const [search, setSearch] = useState(q);
  const [minPrice, setMinPrice] = useState(min);
  const [maxPrice, setMaxPrice] = useState(max);

  const filteredProducts = products.filter((p) => {
    const matchName = p.name.includes(q);
    const matchPrice = p.price >= +min && p.price <= +max;
    return matchName && matchPrice;
  });

  const handleSearch = () => {
    router.push({
      pathname: "/products",
      query: {
        q: search,
        min: minPrice || 0,
        max: maxPrice || 999999,
      },
    });
  };

  const handleReset = () => {
    setSearch("");
    setMinPrice("");
    setMaxPrice("");
    router.push("/products");
  };

  useEffect(() => {
    setSearch(q);
    setMinPrice(min);
    setMaxPrice(max);
  }, [q, min, max]);

  return (
    <>
      <Head>
        <title>제품 목록 - MyShop</title>
        <meta name="description" content="다양한 전자제품을 둘러보세요." />
        <meta property="og:title" content="MyShop 제품 목록" />
        <meta
          property="og:description"
          content="다양한 전자제품을 소개합니다."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://myshop.com/products" />
      </Head>
      <div className="p-6">
        <h1 className="mb-4 text-2xl font-bold">제품 목록</h1>

        <div className="mb-6 flex flex-wrap gap-4 items-end">
          <div>
            <label className="block text-sm font-medium">검색어</label>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border p-2 rounded w-48"
              placeholder="제품명 검색"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">최소 가격</label>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="border p-2 rounded w-32"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">최대 가격</label>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="border p-2 rounded w-32"
            />
          </div>

          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            검색
          </button>
          <button
            onClick={handleReset}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
          >
            초기화
          </button>
        </div>

        {filteredProducts.length === 0 ? (
          <p className="text-gray-500">조건에 맞는 제품이 없습니다.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
