import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Login from './pages/Login';
import Favorites from './pages/Favorites';
import { logOutOutline } from 'ionicons/icons'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import { addIcons } from 'ionicons';
import ProtectedRoute from './components/ProtectedRoute';
import { useEffect } from 'react';
import { StatusBar, Style } from '@capacitor/status-bar';

setupIonicReact();
addIcons({ logOutOutline })

const App: React.FC = () => {

  /**
   * useEffect – Runs once when the App component is mounted.
   * Initializes the native StatusBar behavior using Capacitor.
   *
   * - Disables the overlay (prevents content from going under the system status bar)
   * - Sets the status bar style to dark (dark text/icons, good for light backgrounds)
   *
   * This ensures that the header (IonHeader/IonToolbar) is not overlapped by the Android system bar.
   */
  useEffect(() => {
    const initStatusBar = async () => {
      try {
        // Prevent the WebView content from rendering under the native status bar
        await StatusBar.setOverlaysWebView({ overlay: false });

        // Set the status bar content to dark (works best with light backgrounds)
        await StatusBar.setStyle({ style: Style.Dark });
      } catch (err) {
        console.warn('StatusBar overlay not supported:', err);
      }
    };
  
    initStatusBar();
  }, []);


  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/login">
            <Login />
          </Route>
          <ProtectedRoute exact path="/favorites" component={Favorites} />
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};


export default App;
