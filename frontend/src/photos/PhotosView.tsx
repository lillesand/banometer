import React, { useEffect, useState } from 'react';
import styles from './PhotosView.module.scss';
import database from '../firebase-storage/config';
import { LinkItem } from '../menu/LinkItem';
import { TopBarNavigation } from '../topBarNavigation/TopBarNavigation';
import { makeRequest } from '../http/makeRequest';

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

const requestPhoto = async () => {
  try {
    await makeRequest('/request_photo', {method: 'post'});
  } catch (e) {
    console.log(e);
    alert('Klarte ikke be om bilde :(');
  }
}

export const PhotosView = () => {

  const [existingPhotosResponse, setExistingPhotosResponse] = useState<ApiResponse>({ loading: true });
  const [newPhotos, setNewPhotos] = useState<PhotoResponse[]>([]);

  const fetchPhotos = async () => {
    const res = await database.ref(`/test/banometer/photos/jorbu/`).limitToLast(10).orderByKey().once('value');
    const data = await res.val() ? Object.values(res.val()) : [];
    setExistingPhotosResponse({
      loading: false,
      data: {
        result: data as PhotoResponse[],
      },
    });
  }

  useEffect(() => {
    fetchPhotos().catch((error) => {
      console.error(error);
      setExistingPhotosResponse({ loading: false, error: error.toString()})
    });
  }, []);

  useEffect(() => {
    database.ref(`/test/banometer/photos/jorbu/`)
      .on('child_changed', (res) => {
        const newPhoto = res.val() as PhotoResponse;
        if (newPhoto.status === 'DONE') {
          setNewPhotos([newPhoto, ...newPhotos]);
        }
      })
  }, [newPhotos]);

  if (!existingPhotosResponse.data) {
    return <div>laddar…</div>;
  }

  if (existingPhotosResponse.error) {
    return <div>Feilet: {existingPhotosResponse.error}</div>
  }

  const sortedExistingPhotos = existingPhotosResponse.data.result.sort((a, b) => b.requested_at.localeCompare(a.requested_at));
  const allPhotos = newPhotos.concat(sortedExistingPhotos);

  return <div className={styles.photosView}>
    <TopBarNavigation title={{capitalized: "Bilder fra hytta"}}>
      <LinkItem onClick={requestPhoto} emoji="📸" text="Ta bilde" />
    </TopBarNavigation>
    {
      allPhotos.map(photo =>
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
