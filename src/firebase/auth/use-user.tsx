
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
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
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
      const userId = result.user.uid;
      
      // Check if profile exists, if not create as buyer
      const userRef = doc(firestore, 'users', userId);
      const userSnap = await getDoc(userRef);
      
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          id: userId,
          externalAuthId: userId,
          email: result.user.email,
          firstName: result.user.displayName?.split(' ')[0] || 'User',
          lastName: result.user.displayName?.split(' ').slice(1).join(' ') || '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });

        // Set default role as buyer
        await setDoc(doc(firestore, 'user_roles_buyer', userId), {
          id: userId,
          userId: userId,
          roleId: 'buyer'
        });
      }
    } catch (error) {
      console.error("Error signing in with Google", error);
      throw error;
    }
  };

  const loginWithEmail = async (email: string, pass: string) => {
    try {
      return await signInWithEmailAndPassword(auth, email, pass);
    } catch (error) {
      console.error("Error signing in with email", error);
      throw error;
    }
  };

  const signUpWithEmail = async (email: string, pass: string, name: string, role: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
      const userId = userCredential.user.uid;
      await updateProfile(userCredential.user, { displayName: name });
      
      // Save profile to Firestore
      const userRef = doc(firestore, 'users', userId);
      await setDoc(userRef, {
        id: userId,
        externalAuthId: userId,
        email: email,
        firstName: name.split(' ')[0] || name,
        lastName: name.split(' ').slice(1).join(' ') || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      // Save role mapping
      const roleCollection = `user_roles_${role.toLowerCase().replace(/\s/g, '')}`;
      await setDoc(doc(firestore, roleCollection, userId), {
        id: userId,
        userId: userId,
        roleId: role
      });

      return userCredential;
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
