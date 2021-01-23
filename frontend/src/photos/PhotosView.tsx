import React from 'react';
import { TopBarNavigation } from '../topBarNavigation/TopBarNavigation';
import { useFirebasePhotos } from './useFirebasePhotos';
import { RequestPhotoMenuItem } from './RequestPhotoMenuItem';
import { photosPath } from '../firebase-storage/firebase-config';
import { PhotoView } from './PhotoView';
import styles from './PhotosView.module.scss';

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
    { sortedPhotos.map(photo => <PhotoView photo={photo} key={`photo-${photo.requested_at}`} />) }
  </div>;
};
