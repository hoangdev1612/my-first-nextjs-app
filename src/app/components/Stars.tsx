import fullStar from "../../../public/icons/full-star.png";
import haffStar from "../../../public/icons/half-star.png";
import emptyStar from "../../../public/icons/empty-star.png";
import Image from "next/image";
import { Review } from "@prisma/client";
import calculateReviewRatingAverage from "../../../utils/calculateReviewRatingAverage";
const Stars = ({ reviews }: { reviews: Review[] }) => {
  const rating = calculateReviewRatingAverage(reviews);
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      const difference = parseFloat((rating - i).toFixed(1));

      switch (true) {
        case difference >= 1:
          stars.push(fullStar);
          break;
        case difference > 0 && difference <= 0.2:
          stars.push(emptyStar);
          break;
        case difference > 0.2 && difference <= 0.6:
          stars.push(haffStar);
          break;
        default:
          stars.push(emptyStar);
          break;
      }
    }
    return stars.map((star) => (
      <Image src={star} alt="star" className="w-4 h-4 mr-1" />
    ));
  };
  return <div className="flex mb-2">{renderStars()}</div>;
};

export default Stars;
