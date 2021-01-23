import { useCallback, useEffect, useState } from 'react';
import { database } from '../firebase-storage/firebase-config';

export interface PhotoResponse {
  id: string;
  requested_at: string;
  status: 'REQUESTED' | 'PROCESSING' | 'DONE';
  url?: string;
  hidden: boolean;
}

export const useFirebasePhotos = (firebasePath: string) : [PhotoResponse[], boolean, Error?] => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error>();
  const [photos, setPhotos] = useState<PhotoResponse[]>([]);

  const fetchPhotos = useCallback(async () => {
    const res = await database.ref(firebasePath).limitToLast(20).orderByKey().once('value');
    const data = await res.val() ? Object.entries(res.val()) : [];
    const mappedData = data.map(([key, value]) => {return { id: key, ...(value as PhotoResponse) }})

    setPhotos(mappedData.filter(photo => !photo.hidden));
    setLoading(false);
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
        const changed = { id: res.key, ...(res.val() as PhotoResponse)};
        if (changed.status === 'DONE' && !changed.hidden) {
          setPhotos([changed, ...photos]);
        }

        if (changed.hidden) {
          setPhotos(photos.filter(photo => photo.id !== changed.id));
        }
      })
  }, [photos, firebasePath]);

  return [photos, loading, error];
}
