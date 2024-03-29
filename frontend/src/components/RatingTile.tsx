import "../styles/EmployeeDashboard.css";

interface RatingTile {
  ratingNum: number;
}

export default function RatingTile({ ratingNum }: RatingTile) {
  return (
    <div className="rating-tile">
      <h1>{ratingNum}</h1>
    </div>
  );
}
