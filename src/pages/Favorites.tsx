import { IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Favorites.css';
import { useFavorites } from '../hooks/useFavorites';

const Favorites: React.FC = () => {
  const { favoriteIds, loading } = useFavorites();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
            
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Favorites;