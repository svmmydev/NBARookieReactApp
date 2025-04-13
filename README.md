# 🔐 Firebase Configuration

This project uses Firebase for authentication and Firestore database access.

## 📁 File Structure

The Firebase configuration is expected to be in the file:

```
src/firebaseConfig.tsx
```

However, for security reasons, this file is **excluded from version control** and **not included in this repository**.

Instead, you’ll find a template file:

```
src/firebaseConfig.example.tsx
```

## 🚀 How to Use

To set up your Firebase configuration:

1. **Duplicate the template file**

   Rename `firebaseConfig.example.tsx` to `firebaseConfig.tsx`:

   ```bash
   mv src/firebaseConfig.example.tsx src/firebaseConfig.tsx
   ```

2. **Edit the file**

   Replace the placeholder strings with your actual Firebase project credentials:

   ```ts
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY_HERE",
     authDomain: "YOUR_AUTH_DOMAIN_HERE",
     projectId: "YOUR_PROJECT_ID_HERE",
     storageBucket: "YOUR_STORAGE_BUCKET_HERE",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID_HERE",
     appId: "YOUR_APP_ID_HERE",
     measurementId: "YOUR_MEASUREMENT_ID_HERE"
   };
   ```

3. **Use the config**

   The file is used in your app to initialize Firebase services like `auth` and `db`.

---

## 🔒 Security Notice

- Do **NOT** commit your real `firebaseConfig.tsx` file to the repository.
- Make sure it is listed in `.gitignore`.
- If you've accidentally committed it in the past, you should rewrite the Git history using tools like `git filter-repo` or `BFG Repo-Cleaner`.

---

## ✅ Example Entry in `.gitignore`

```gitignore
# Firebase config
src/firebaseConfig.tsx
```
