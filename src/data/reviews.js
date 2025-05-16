const reviews = {
  p1: [
    { id: "r1", text: "좋은 키보드네요!" },
    { id: "r2", text: "배송도 빠르고 만족합니다." },
  ],
  p2: [{ id: "r3", text: "헤드폰 사운드가 좋아요." }],
  p3: [],
};

export function getReviewsByProductId(productId) {
  return reviews[productId] || [];
}

export function addReview(productId, text) {
  const newReview = { id: Date.now().toString(), text };
  if (!reviews[productId]) {
    reviews[productId] = [];
  }
  reviews[productId].push(newReview);
  return newReview;
}
