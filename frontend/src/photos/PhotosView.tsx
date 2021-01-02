import React from 'react';
import styles from './PhotosView.module.scss';
import { TopBarNavigation } from '../topBarNavigation/TopBarNavigation';
import { useFirebasePhotos } from './useFirebasePhotos';
import { RequestPhotoMenuItem } from './RequestPhotoMenuItem';

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
      <RequestPhotoMenuItem />
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
