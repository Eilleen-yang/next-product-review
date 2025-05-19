import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

// 서버사이드 인증 + 데이터 패칭
export async function getServerSideProps({ req }) {
  const cookie = req.headers.cookie || "";
  const isAdmin = cookie.includes("authToken=admin_token");

  if (!isAdmin) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }

  // 서버 측에서 API Route 호출하여 데이터 가져오기
  const res = await fetch("http://localhost:3000/api/admin/orders", {
    headers: {
      cookie: req.headers.cookie, // 쿠키를 API로 전달
    },
  });

  if (!res.ok) {
    return { notFound: true }; // 요청 실패 시 404처리
  }

  const orders = await res.json();

  return {
    props: { orders },
  };
}

export default function OrderAdminPage() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const statusOptions = ["배송 준비", "배송 중", "배송 완료"];

  const fetchOrders = () => {
    fetch("/api/admin/orders")
      .then((res) => {
        if (!res.ok) throw new Error("인증 실패");
        return res.json();
      })
      .then(setOrders)
      .catch(() => {
        localStorage.removeItem("adminLoggedIn");
        router.replace("/admin/login");
      });
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("adminLoggedIn") === "true";

    if (!isLoggedIn) {
      router.replace("/admin/login");
      return;
    }

    fetchOrders();
  }, []);

  const handleStatusChange = (id, newStatus) => {
    fetch("/api/admin/orders", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, status: newStatus }),
    });

    if (res.ok) {
      console.log(res);
      location.reload(); // 간단히 새로고침으로 갱신;
    } else {
      alert("상태 변경 실패");
    }

    // .then((res) => {
    //   if (!res.ok) throw new Error("업데이트 실패");
    //   return res.json();
    // })
    // .then((data) => {
    //   alert(`${data.message} : ${data.order.id} - ${data.order.status}`);
    //   fetchOrders();
    // })
    // .catch((err) => {
    //   console.error(err);
    //   alert("상태 변경 중 오류가 발생했습니다.");
    // });
  };

  return (
    <div className="p-8">
      <Link href="/admin" className="text-sm text-blue-600 underline">
        돌아가기
      </Link>
      <h2 className="text-xl font-bold mb-4">주문 목록</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">주문 ID</th>
            <th className="p-2 border">고객명</th>
            <th className="p-2 border">상품</th>
            <th className="p-2 border">수량</th>
            <th className="p-2 border">상태</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="p-2 border">{order.id}</td>
              <td className="p-2 border">{order.user}</td>
              <td className="p-2 border">{order.product}</td>
              <td className="p-2 border">{order.quantity}</td>
              <td className="p-2 border">
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  className="border rounded px-2 py-1"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
