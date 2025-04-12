import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { Player } from "../types/Player";

export const useFavorites = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = async (withDelay = false) => {
    const user = auth.currentUser;
    if (!user) {
      setPlayers([]);
      return;
    }

    const playersRef = collection(db, "users", user.uid, "favorites");
    const snapshot = await getDocs(playersRef);

    const playersData: Player[] = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: data.id,
        name: data.name,
        surName: data.surName,
        team: data.team,
        height: data.height,
        weight: data.weight,
        country: data.country
      };
    });

    if (withDelay) {
      await new Promise((res) => setTimeout(res, 1000)); // Delay para UX
    }

    setPlayers(playersData);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await fetchFavorites(); // sin delay al inicio
      } else {
        setPlayers([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const refreshFavorites = () => fetchFavorites(true); // con delay al refrescar

  return { players, loading, refreshFavorites };
};
