import { useRouter } from "next/router";
import products from "../../data/products";
import Image from "next/image";
import { useEffect, useState } from "react";
import ReviewForm from "../../_components/ReviewForm";
import Head from "next/head";
import { useCart } from "@/src/context/cartContext";

export async function getServerSideProps(context) {
  const { id } = context.params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    return {
      notFound: true,
    };
  }

  const res = await fetch(`http://localhost:3000/api/reviews/${id}`);
  const reviews = await res.json();

  return {
    props: {
      product,
      initialReviews: reviews,
    },
  };
}

export default function ProductDetailPage({ product, initialReviews }) {
  const router = useRouter();
  const { id } = router.query;

  const { dispatch } = useCart();

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: product,
    });
    alert("장바구니에 추가되었습니다.");
  };

  // const product = products.find((p) => p.id === id);

  // const [reviews, setReviews] = useState([]);
  // const handleAddReview = (text) => {
  //   setReviews((prev) => [...prev, { id: Date.now(), text }]);
  // };

  const [reviews, setReviews] = useState(initialReviews || []);
  const handleAddReview = async (text) => {
    if (!product) return;

    const res = await fetch(`/api/reviews/${product.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const newReview = await res.json();
    setReviews((prev) => [...prev, newReview]);
  };

  // id값이 undefind일 수 있어서 useEffect를 사용해 조건을 준다.
  useEffect(() => {
    if (id && !product) {
      router.replace("/404");
    }
  }, [id, product, router]);

  if (!product)
    return (
      <div className="flex justify-center items-center h-40">
        <div className="spinner " />
        <p>해당 제품을 찾을 수 없습니다.</p>
        {/* <button onClick={() => router.push("/products")}>목록으로 이동</button> */}
      </div>
    );

  return (
    <>
      <Head>
        <title>{product.name} - MyShop</title>
        <meta name="description" content={product.description} />
        <meta property="og:title" content={`${product.name} - MyShop`} />
        <meta property="og:description" content={product.description} />
        <meta
          property="og:image"
          content={`https://myshop.com${product.image}`}
        />
        <meta property="og:type" content="product" />
      </Head>
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

        <button
          onClick={handleAddToCart}
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
        >
          장바구니에 담기
        </button>

        <div className="mt-10">
          <h2 className="text-lg font-semibold mb-2">리뷰</h2>
          {reviews.length === 0 && (
            <p className="text-sm text-gray-500">등록된 리뷰가 없습니다.</p>
          )}
          <ul className="space-y-2 mb-4">
            {reviews.map((r) => (
              <li key={r.id} className="bg-gray-100 p-2 rounded text-sm">
                {r.text}
              </li>
            ))}
          </ul>
          <ReviewForm onAdd={handleAddReview} />
        </div>
      </div>
    </>
  );
}
