import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { Player } from "../types/Player";

export const useFavorites = () => {
  const [players, setPlayers] = useState<Player[]>([]); // State to store the list of favorite players
  const [loading, setLoading] = useState(true); // State to track if the data is still loading


  /**
  * fetchFavorites
  * Retrieves the user's favorite players from Firestore.
  * Can optionally delay the response (for pull-to-refresh UX).
  * 
  * @param withDelay boolean - adds a 1-second delay if true
  */
  const fetchFavorites = async (withDelay = false) => {
    const user = auth.currentUser;
    if (!user) {
      setPlayers([]);  // No user = no favorites
      return;
    }

    // Reference to the user's "favorites" subcollection in Firestore
    const playersRef = collection(db, "users", user.uid, "favorites");
    const snapshot = await getDocs(playersRef);

    // Map Firestore documents to Player objects
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

    // Optional delay to simulate loading animation (useful for UI refresh)
    if (withDelay) {
      await new Promise((res) => setTimeout(res, 1000));
    }

    setPlayers(playersData);
  };


  /**
  * useEffect hook
  * Listens to authentication state changes (login/logout).
  * Automatically fetches or clears favorites based on auth status.
  */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await fetchFavorites(); // Fetch favorites on login (no delay)
      } else {
        setPlayers([]); // Clear favorites on logout
      }
      setLoading(false); // Stop loading once auth state is known
    });

    // Cleanup the listener when the component using this hook unmounts
    return () => unsubscribe();
  }, []);


  /**
  * refreshFavorites
  * Triggers a reload of the favorites list with a 1-second delay.
  * This is used for pull-to-refresh actions in the UI.
  */
  const refreshFavorites = () => fetchFavorites(true); // con delay al refrescar


  return { players, loading, refreshFavorites };
};
