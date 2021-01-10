import { useCallback, useEffect, useState } from 'react';
import { database } from '../firebase-storage/firebase-config';

export interface PhotoResponse {
  requested_at: string;
  status: 'REQUESTED' | 'PROCESSING' | 'DONE';
  url?: string;
}

export const useFirebasePhotos = (firebasePath: string) : [PhotoResponse[], boolean, Error?] => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error>();
  const [photos, setPhotos] = useState<PhotoResponse[]>([]);

  const fetchPhotos = useCallback(async () => {
    const res = await database.ref(firebasePath).limitToLast(10).orderByKey().once('value');
    const data = await res.val() ? Object.values(res.val()) : [];
    setLoading(false);
    setPhotos(data as PhotoResponse[]);
  }, [firebasePath]);

  useEffect(() => {
    fetchPhotos().catch((error) => {
      console.error(error);
      setLoading(false);
      setError(error);
    });
  }, [fetchPhotos]);

  useEffect(() => {
    database.ref(firebasePath)
      .on('child_changed', (res) => {
        const newPhoto = res.val() as PhotoResponse;
        if (newPhoto.status === 'DONE') {
          setPhotos([newPhoto, ...photos]);
        }
      })
  }, [photos, firebasePath]);

  return [photos, loading, error];
}
