import React, { useEffect, useState } from 'react';
import styles from './PhotosView.module.scss';
import database from '../firebase-storage/config';

interface PhotoResponse {
  requested_at: string;
  status: 'REQUESTED' | 'PROCESSING' | 'DONE';
  url?: string;
}

interface ApiResponse {
  data?: {
    result: PhotoResponse[];
  };
  error?: string;
  loading: boolean;
}

export const PhotosView = () => {

  const [response, setData] = useState<ApiResponse>({ loading: true });

  const fetchPhotos = async () => {
    const res = await database.ref(`/test/banometer/photos/jorbu/`).limitToLast(10).orderByKey().once('value');
    const data = await res.val() ? Object.values(res.val()) : [];
    setData({
      loading: false,
      data: {
        result: data as PhotoResponse[],
      },
    });
  }

  useEffect(() => {
    fetchPhotos().catch((error) => {
      console.error(error);
      setData({ loading: false, error: error.toString()})
    });
  }, []);

  if (!response.data) {
    return <div>laddar…</div>;
  }

  if (response.error) {
    return <div>Feilet: {response.error}</div>
  }

  const sortedResponse = response.data.result.sort((a, b) => b.requested_at.localeCompare(a.requested_at));
  return <div className={styles.photosView}>
    <h2>Bilder fra hytta</h2>
    {
      sortedResponse.map(photo =>
        <div className={styles.photoBlock} key={`photo-${photo.requested_at}`}>
          {
            photo.url
              ? <img src={photo.url} alt={`Bilde fra ${photo.requested_at}`}/>
              : <span>Har ikke noe bilde :( </span>
          }
          <span className={styles.requestedAt}>{photo.requested_at}</span>
        </div>
      )
    }
  </div>;
};
