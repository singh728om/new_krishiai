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
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useAuth, useFirestore } from '../provider';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

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
      
      const userRef = doc(firestore, 'users', userId);
      const userSnap = await getDoc(userRef);
      
      if (!userSnap.exists()) {
        const userData = {
          id: userId,
          externalAuthId: userId,
          email: result.user.email,
          firstName: result.user.displayName?.split(' ')[0] || 'User',
          lastName: result.user.displayName?.split(' ').slice(1).join(' ') || '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        setDoc(userRef, userData).catch(err => {
          errorEmitter.emit('permission-error', new FirestorePermissionError({
            path: userRef.path,
            operation: 'create',
            requestResourceData: userData
          }));
        });

        const roleRef = doc(firestore, 'user_roles_buyer', userId);
        const roleData = {
          id: userId,
          userId: userId,
          roleId: 'buyer'
        };
        setDoc(roleRef, roleData).catch(err => {
           errorEmitter.emit('permission-error', new FirestorePermissionError({
            path: roleRef.path,
            operation: 'create',
            requestResourceData: roleData
          }));
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
      
      const userRef = doc(firestore, 'users', userId);
      const userData = {
        id: userId,
        externalAuthId: userId,
        email: email,
        firstName: name.split(' ')[0] || name,
        lastName: name.split(' ').slice(1).join(' ') || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setDoc(userRef, userData).catch(err => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({
          path: userRef.path,
          operation: 'create',
          requestResourceData: userData
        }));
      });

      const roleCollection = `user_roles_${role.toLowerCase().replace(/\s/g, '')}`;
      const roleRef = doc(firestore, roleCollection, userId);
      const roleData = {
        id: userId,
        userId: userId,
        roleId: role
      };

      setDoc(roleRef, roleData).catch(err => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({
          path: roleRef.path,
          operation: 'create',
          requestResourceData: roleData
        }));
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
