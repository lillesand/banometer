import React from 'react';
import styles from './PhotosView.module.scss';
import { LinkItem } from '../menu/LinkItem';
import { TopBarNavigation } from '../topBarNavigation/TopBarNavigation';
import { makeRequest } from '../http/makeRequest';
import { useFirebasePhotos } from './useFirebasePhotos';

const requestPhoto = async () => {
  try {
    await makeRequest('/request_photo', {method: 'post'});
  } catch (e) {
    console.log(e);
    alert('Klarte ikke be om bilde :(');
  }
}

export const PhotosView = () => {
  const [photos, loading, error] = useFirebasePhotos(`/test/banometer/photos/jorbu/`);

  if (loading) {
    return <div>laddar…</div>;
  }

  if (error) {
    return <div>Feilet: {error}</div>
  }

  const sortedPhotos = photos.sort((a, b) => b.requested_at.localeCompare(a.requested_at));

  return <div className={styles.photosView}>
    <TopBarNavigation title={{capitalized: "Bilder fra hytta"}}>
      <LinkItem onClick={requestPhoto} emoji="📸" text="Ta bilde" />
    </TopBarNavigation>
    {
      sortedPhotos.map(photo =>
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
