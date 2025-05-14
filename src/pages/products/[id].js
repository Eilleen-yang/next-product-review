import { useRouter } from "next/router";
import products from "../data/products";
import Image from "next/image";
import { useEffect } from "react";

export default function ProductDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const product = products.find((p) => p.id === id);

  // id값이 undefind일 수 있어서 useEffect를 사용해 조건을 준다.
  useEffect(() => {
    if (id && !product) {
      router.replace("/404");
    }
  }, [id, product, router]);

  if (!product) return null;
  // <div>
  //   <p>해당 제품을 찾을 수 없습니다.</p>
  //   <button onClick={() => router.push("/products")}>목록으로 이동</button>
  // </div>

  return (
    <div className="p-6">
      <button
        className="mb-4 text-blue-600 underline cursor-pointer"
        onClick={() => router.back()}
      >
        돌아가기
      </button>

      <div className="flex flex-col md:flex-row gap-6">
        <Image
          src={product.image}
          alt={product.name}
          width={500}
          height={300}
          className="rounded object-cover"
        />
        <div className="md:flex-1">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="mt-2 text-gray-600">{product.description}</p>
          <p className="mt-4 text-xl font-semibold text-blue-600">
            {product.price.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
