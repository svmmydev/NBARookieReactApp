import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Login.css';
import { useState } from 'react';
import { auth } from "../firebaseConfig"
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Login exitoso:', userCredential.user);
      setError('');
    } catch (err: any) {
      console.error('Error en el login', err);
      setError('Credenciales inválidas. Verifica tu email y contraseña.');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <form className='ion-padding' onSubmit={handleSubmit}>
          <IonItem>
            <IonInput
              label='Email:'
              label-placement='floating'
              type='email'
              value={email}
              onIonChange={(e) => setEmail(e.detail.value!)}
              required>  
            </IonInput>
          </IonItem>

          <IonItem>
            <IonInput
              label='Password:'
              label-placement='floating'
              type='password'
              value={password}
              onIonChange={(e) => setPassword(e.detail.value!)}
              required>
            </IonInput>
          </IonItem>

          <IonButton expand='full' type='submit' className='ion-padding'>
            Iniciar sesión
          </IonButton>
          
          {error && <p className=''>{error}</p>}
        </form>
      </IonContent>
    </IonPage>
  );
};

export default Login;