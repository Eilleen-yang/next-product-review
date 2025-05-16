import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function ProductAdminPage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("adminLoggedIn") === "true";

    if (!isLoggedIn) {
      router.replace("/admin/login");
      return;
    } else {
      fetch("/api/admin/products")
        .then((res) => res.json())
        .then(setProducts);
    }
  }, []);

  return (
    <div className="w-full p-8">
      <Link href="/admin" className="text-sm text-blue-600 underline">
        돌아가기
      </Link>
      <h2 className="text-xl font-bold mb-4">상품 목록</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">상품이미지</th>
            <th className="p-2 border">상품명</th>
            <th className="p-2 border">가격</th>
            <th className="p-2 border">재고</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td className="p-2 border">
                <Image
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full"
                  width={100}
                  height={100}
                />
              </td>
              <td className="p-2 border">{p.name}</td>
              <td className="p-2 border">{p.price}</td>
              <td className="p-2 border">{p.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
