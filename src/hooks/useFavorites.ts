// src/hooks/useFavorites.ts
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

export const useFavorites = () => {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const favoritesRef = collection(db, "users", user.uid, "favorites");
        const snapshot = await getDocs(favoritesRef);
        const ids = snapshot.docs.map(doc => doc.id);
        setFavoriteIds(ids);
      } else {
        setFavoriteIds([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { favoriteIds, loading };
};
