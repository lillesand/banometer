import React from 'react';
import styles from './PhotosView.module.scss';
import { TopBarNavigation } from '../topBarNavigation/TopBarNavigation';
import { useFirebasePhotos } from './useFirebasePhotos';
import { RequestPhotoMenuItem } from './RequestPhotoMenuItem';
import { prettyDate, prettyTime } from '../utils/date';
import { photosPath } from '../firebase-storage/firebase-config';

export const PhotosView = () => {
  const [photos, loading, error] = useFirebasePhotos(photosPath);

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
      sortedPhotos.map(photo => {
        const date = new Date(Date.parse(photo.requested_at));
        return <div className={styles.photoBlock} key={`photo-${photo.requested_at}`}>
            {
              photo.url
                ? <img draggable={false} src={photo.url} alt={`Bilde fra ${photo.requested_at}`}/>
                : <span>Har ikke noe bilde :( </span>
            }
            <span className={styles.requestedAt}>{prettyDate(date)}, klokka {prettyTime(date)}</span>
          </div>;
        }
      )
    }
  </div>;
};
