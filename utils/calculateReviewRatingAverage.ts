import { Review } from "@prisma/client";

const calculateReviewRatingAverage = (reviews: Review[]) => {
  if (!reviews.length) return 0;
  return (
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
  );
};

export default calculateReviewRatingAverage;
