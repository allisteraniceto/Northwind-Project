import DogeGif from "/dogedance.gif";

import "../styles/EmployeeList.css";
import "../styles/EmployeeDashboard.css";

interface RatingTile {
  ratingNum: number;
}

export default function RatingTile({ ratingNum }: RatingTile) {
  return (
    <div className="rating-tile">
      {!ratingNum && <img src={DogeGif} className="rating-tile-default" />}
      <h1>{ratingNum}</h1>
    </div>
  );
}
