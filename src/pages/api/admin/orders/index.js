const mockOrders = [
  {
    id: 101,
    user: "홍길동",
    product: "티셔츠",
    quantity: 2,
    status: "배송 준비",
  },
  {
    id: 102,
    user: "김영희",
    product: "청바지",
    quantity: 1,
    status: "배송 중",
  },
];

export default function handler(req, res) {
  // 쿠키 설정;
  const token = req.cookies?.authToken;
  if (token !== "admin_token") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.method === "GET") {
    return res.status(200).json(mockOrders);
  }
  if (req.method === "PATCH") {
    const { id, status } = req.body;

    const order = mockOrders.find((o) => o.id === id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    return res.status(200).json({ message: "Order updated", order });
  }
  return res.status(405).end();
}
