// components/FavoriteButton.tsx
import { useState, useEffect } from "preact/hooks";
import { Heart } from "lucide-preact"

type Props = {
  slug: string;
  type: "muscle" | "terminology";
  size: "small" | "large";
};

export default function FavoriteButton({ slug, type, size }: Props) {
  const storageKey = `favorite_${type}s`;
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem(storageKey) || "[]");
    setIsFav(favs.includes(slug));
  }, [slug]);

  const toggleFavorite = () => {
    const favs: string[] = JSON.parse(localStorage.getItem(storageKey) || "[]");
    let updated;
    if (favs.includes(slug)) {
      updated = favs.filter((fid) => fid !== slug);
    } else {
      updated = [...favs, slug];
    }
    localStorage.setItem(storageKey, JSON.stringify(updated));
    setIsFav(!isFav);
  };

  return (
    <button
      type="button"
      onClick={toggleFavorite}
      aria-label="Toggle favorite"
      class="text-gray-500 hover:text-red-600 transition">
      <Heart class={`${size=="small" ? "w-4 h-4" : "w-9 h-9"} ${isFav ? "fill-red-500 text-red-500" : "stroke-2"}`} />
    </button>
  );
}
