import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function AdminDashboard() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("adminLoggedIn") === "true";

    if (!isLoggedIn) {
      router.replace("/admin/login");
    } else {
      setAuthorized(true);
    }
  }, []);

  if (!authorized) return null;

  return (
    <div className="p-8">
      <h1 className="mb-4 text-2xl font-bold text-blue-700">관리자 대시보드</h1>
      <ul className="space-y-2">
        <li>
          <Link href="/admin/products" className="text-blue-600 underline">
            상품 관리
          </Link>
        </li>
        <li>
          <Link href="/admin/orders" className="text-blue-600 underline">
            주문 관리
          </Link>
        </li>
        <button
          className="rounded bg-blue-200 p-2 mt-4 text-white font-semibold"
          onClick={() => {
            localStorage.removeItem("adminLoggedIn");
            router.reload();
          }}
        >
          로그아웃
        </button>
      </ul>
    </div>
  );
}
