import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonList, IonPage, IonRow, IonSpinner, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonFooter } from '@ionic/react';
import './Favorites.css';
import { useFavorites } from '../hooks/useFavorites';
import { logOutOutline } from 'ionicons/icons';
import { useAuth } from '../hooks/useAuth';

const Favorites: React.FC = () => {
  const { players, loading } = useFavorites();
  const { logout } = useAuth();

  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonTitle>Inicio de sesión</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={logout}>
              <IonIcon icon={logOutOutline} slot="icon-only"></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50%' }}>
              <IonSpinner name="crescent" />
            </div>
        ) : (
            <IonList>
                {players.map((player) => (
                    <IonCard key={player.id} className='ion-margin'>
                        <IonCardHeader>
                            <div>
                                <IonCardTitle>{ player.name }</IonCardTitle>
                                <IonCardSubtitle>{ player.surName }</IonCardSubtitle>
                            </div>
                        </IonCardHeader>
                        <IonCardContent>
                            <IonGrid>
                                <IonRow>
                                    <IonCol size='12'>
                                        <strong>Equipo:</strong> { player.team }
                                    </IonCol>
                                    <IonCol size='12'>
                                        <strong>Altura:</strong> { player.height }
                                    </IonCol>
                                    <IonCol size='12'>
                                        <strong>Peso:</strong> { player.weight }
                                    </IonCol>
                                    <IonCol size='12'>
                                        <strong>País:</strong> { player.country }
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        </IonCardContent>
                    </IonCard>
                ))}
            </IonList>
        )}
      </IonContent>

      <IonFooter translucent={true}>
        <IonToolbar>
          <IonTitle >© NBA API - Sammy</IonTitle>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Favorites;