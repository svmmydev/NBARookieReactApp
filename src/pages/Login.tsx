import { IonButton, IonContent, IonFooter, IonHeader, IonImg, IonInput, IonItem, IonPage, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import './Login.css';
import { useState } from 'react';
import { auth } from "../firebaseConfig"
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const router = useIonRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setError('');
      
      if (userCredential.user) {
        router.push('/favorites', 'forward', 'replace');
      }
    } catch (err: any) {
      console.error('Error en el login', err);
      setError('Credenciales inválidas. Verifica tu email y contraseña.');
    }
  };

  return (
    <IonPage>
        <IonContent fullscreen class="nba-gradient" scrollY={false}>
          <div className='login-wrapper'>
            <IonImg src="../public/images/nba-logo.png" alt="NBA Logo"></IonImg>
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
          <IonToolbar>
            <IonTitle className='footer'>© NBA API - Sammy</IonTitle>
          </IonToolbar>
        </IonFooter>
    </IonPage>
  );
};

export default Login;