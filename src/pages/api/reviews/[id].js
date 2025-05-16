import { addReview, getReviewsByProductId } from "../../../data/reviews";

export default function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    const reviewList = getReviewsByProductId(id);
    res.status(200).json(reviewList);
  } else if (req.method === "POST") {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: "리뷰 내용이 없습니다." });
    }
    const newReview = addReview(id, text);
    res.status(201).json(newReview);
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
