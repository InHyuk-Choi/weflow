export default function StarRating({ rating = 5 }: { rating?: number }) {
  return (
    <span className="text-amber-400" aria-label={`별 ${rating}개`}>
      {"★".repeat(Math.max(0, Math.min(5, rating)))}
    </span>
  );
}
