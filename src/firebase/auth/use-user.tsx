
'use client';

import { useState, useEffect } from 'react';
import { 
  User, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth, useFirestore } from '../provider';

export function useUser() {
  const auth = useAuth();
  const firestore = useFirestore();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [auth]);

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      // Optional: Update/Create profile on Google login too
      const userRef = doc(firestore, 'users', result.user.uid);
      await setDoc(userRef, {
        uid: result.user.uid,
        name: result.user.displayName,
        email: result.user.email,
        role: 'buyer', // Default role for Google login
        updatedAt: serverTimestamp(),
      }, { merge: true });
    } catch (error) {
      console.error("Error signing in with Google", error);
      throw error;
    }
  };

  const loginWithEmail = async (email: string, pass: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, pass);
    } catch (error) {
      console.error("Error signing in with email", error);
      throw error;
    }
  };

  const signUpWithEmail = async (email: string, pass: string, name: string, role: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
      await updateProfile(userCredential.user, { displayName: name });
      
      // Save profile to Firestore
      const userRef = doc(firestore, 'users', userCredential.user.uid);
      await setDoc(userRef, {
        uid: userCredential.user.uid,
        name: name,
        email: email,
        role: role,
        createdAt: serverTimestamp(),
      });

    } catch (error) {
      console.error("Error signing up with email", error);
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error("Error sending password reset email", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  return { 
    user, 
    loading, 
    loginWithGoogle, 
    loginWithEmail, 
    signUpWithEmail, 
    resetPassword, 
    logout 
  };
}
