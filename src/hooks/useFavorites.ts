// src/hooks/useFavorites.ts
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { Player } from "../types/Player";

export const useFavorites = () => {

  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
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

        setPlayers(playersData);
      } else {
        setPlayers([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { players, loading };
};
