'use client';

import { useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import { useToast } from '@/hooks/use-toast';
import { FirestorePermissionError } from '@/firebase/errors';

/**
 * Global listener for Firebase errors, providing visual feedback via toasts.
 */
export function FirebaseErrorListener() {
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = errorEmitter.on('permission-error', (error: FirestorePermissionError) => {
      toast({
        variant: 'destructive',
        title: 'Security Access Denied',
        description: `You do not have permission to ${error.context.operation} at ${error.context.path}.`,
      });
    });

    return () => unsubscribe();
  }, [toast]);

  return null;
}
