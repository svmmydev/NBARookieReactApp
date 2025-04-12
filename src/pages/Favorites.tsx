import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonList, IonPage, IonRow, IonSpinner, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonFooter, IonRefresher, IonRefresherContent, RefresherEventDetail } from '@ionic/react';
import './Favorites.css';
import { useFavorites } from '../hooks/useFavorites';
import { logOutOutline } from 'ionicons/icons';
import { useAuth } from '../hooks/useAuth';

const Favorites: React.FC = () => {
  const { players, loading, refreshFavorites } = useFavorites();  // Hook to load and refresh favorite players
  const { logout } = useAuth(); // Hook to handle logout logic


  /**
  * handleRefresh
  * Called when the user pulls to refresh the list.
  * It fetches fresh data using `refreshFavorites` and completes the refresher event.
  */
  const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    await refreshFavorites();
    event.detail.complete();
  };


  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar className='header-toolbar'>
          <IonTitle className='header-tittle'>Favoritos</IonTitle>
          <IonButtons slot="end">
            <IonButton fill='clear' onClick={logout} className="logout-button">
              <IonIcon icon={logOutOutline} slot="icon-only" color='danger'></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen={true} className='nba-gradient'>
        {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50%' }}>
              <IonSpinner name="crescent" />
            </div>
        ) : (
          <>
          <IonRefresher slot="fixed" mode="md" onIonRefresh={handleRefresh}>
            <IonRefresherContent></IonRefresherContent>
          </IonRefresher>
          <div>
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
          </div>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};


export default Favorites;