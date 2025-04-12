import { IonButton, IonContent, IonFooter, IonHeader, IonImg, IonInput, IonItem, IonPage, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import './Login.css';
import { useState } from 'react';
import { auth } from "../firebaseConfig"
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login: React.FC = () => {
  // State for form fields and error handling
  const [email, setEmail] = useState('');       // Stores the email input
  const [password, setPassword] = useState(''); // Stores the password input
  const [error, setError] = useState('');       // Stores login error messages


  const router = useIonRouter(); // Ionic hook for navigation between pages


  /**
  * handleSubmit
  * Triggered when the login form is submitted.
  * It calls Firebase Auth with the email and password.
  * If the login is successful, it redirects the user to /favorites.
  * If it fails, an error message is displayed.
  */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form reload

    try {
      // Attempt to sign in the user
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setError(''); // Clear previous error messages if any
      
      // Redirect to /favorites only if login was successful
      if (userCredential.user) {
        router.push('/favorites', 'forward', 'replace');  // Navigation to /Favorites
      }
    } catch (err: any) {
      console.error('Error en el login', err);
      setError('Credenciales inválidas. Verifica tu email y contraseña.');
    }
  };


  return (
    <IonPage>
        <IonContent fullscreen={true} class="nba-gradient" scrollY={false}>
          <div className='login-wrapper'>
            <IonImg src="images/nba-logo.png" alt="NBA Logo"></IonImg>
            <form className='ion-padding login' onSubmit={handleSubmit} autoComplete='off'>
              <IonItem lines="none">
                <IonInput
                  label='Email:'
                  label-placement='floating'
                  type='email'
                  value={email}
                  onIonInput={(e) => setEmail((e.target as unknown as HTMLInputElement).value)}
                  required
                  className='rounded'>
                </IonInput>
              </IonItem>

              <IonItem lines="none">
                <IonInput
                  label='Password:'
                  label-placement='floating'
                  type='password'
                  value={password}
                  onIonInput={(e) => setPassword((e.target as unknown as HTMLInputElement).value)}
                  required
                  className='rounded'>
                </IonInput>
              </IonItem>

              <IonButton expand='block' type='submit' className='ion-padding' fill="outline">
                Iniciar sesión
              </IonButton>

              {error && <div className='error'>{error}</div>}
            </form>
          </div>
        </IonContent>

        <IonFooter translucent={true}>
          <IonToolbar className='footer-toolbar'>
            <IonTitle className='footer'>© NBA API - Sammy</IonTitle>
          </IonToolbar>
        </IonFooter>
    </IonPage>
  );
};


export default Login;