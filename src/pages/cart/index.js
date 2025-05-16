import { useCart } from "@/src/context/cartContext";
import Link from "next/link";

export default function CartPage() {
  const { cart, dispatch } = useCart();
  const cartItems = cart;

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">장바구니</h1>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-600">
          장바구니가 비어있습니다.
          <div className="mt-4">
            <Link href="/products" className="text-blue-600 underline">
              제품 보러 가기
            </Link>
          </div>
        </div>
      ) : (
        <>
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="border p-4 rounded flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-600">
                    {item.price.toLocaleString()}원 x {item.quantity}개
                  </p>
                  <div className="mt-2 flex items-center space-x-2">
                    <button
                      onClick={() =>
                        dispatch({
                          type: "DECREMENT_QUANTITY",
                          payload: item.id,
                        })
                      }
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        dispatch({
                          type: "INCREMENT_QUANTITY",
                          payload: item.id,
                        })
                      }
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      +
                    </button>
                    <button
                      onClick={() =>
                        dispatch({ type: "REMOVE_FROM_CART", payload: item.id })
                      }
                      className="ml-4 text-sm text-red-500"
                    >
                      삭제
                    </button>
                  </div>
                </div>
                <p className="font-bold">
                  {(item.price * item.quantity).toLocaleString()}원
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-6 text-right text-xl font-bold">
            총합 : {totalPrice.toLocaleString()}
          </div>
        </>
      )}
    </div>
  );
}
