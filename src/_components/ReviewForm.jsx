import { useState } from "react";

export default function ReviewForm({ onAdd }) {
  const [review, setReview] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!review.trim()) return;
    onAdd(review);
    setReview("");
  };

  return (
    <form className="mt-6" onSubmit={handleSubmit}>
      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="리뷰를 입력하세요."
        className="w-full p-2 border rounded resize-none"
        rows={3}
      />
      <button
        type="submit"
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
      >
        리뷰 등록
      </button>
    </form>
  );
}
