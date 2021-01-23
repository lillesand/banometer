import { prettyDate, prettyTime } from '../utils/date';
import React, { useState } from 'react';
import { PhotoResponse } from './useFirebasePhotos';
import styles from './PhotoView.module.scss';
import { Button } from '../button/Button';

interface OwnProps {
  photo: PhotoResponse;
}

export const PhotoView = (props: OwnProps) => {
  const { photo } = props;
  const date = new Date(Date.parse(photo.requested_at));

  const [ showActionOverlay, setShowActionOverlay ] = useState<boolean>(false);

  return <div className={styles.photoBlock}>
    {
      photo.url
        ? <img draggable={false}
               onDragStart={(e) => {
                 e.preventDefault && e.preventDefault()
               }} // Meh. No sane drag and drop prevention works in Firefox. This does, tho!
               onClick={() => {
                 setShowActionOverlay(true)
               }}
               src={photo.url}
               alt={`Bilde fra ${photo.requested_at}`}/>
        : <span>Har ikke noe bilde :( </span>
    }
    { showActionOverlay &&
      <div className={styles.actionOverlay} onClick={() => {
        setShowActionOverlay(false)
      }}>
          <Button className={styles.deleteButton} onClick={() => {
            const confirmed = window.confirm('Er du sikker på at du vil skjule bildet? 😱');
            if (confirmed) {
              console.log('delete');
            }
          }}>
              🗑
          </Button>
      </div>
    }
    <span className={styles.requestedAt}>{prettyDate(date)}, klokka {prettyTime(date)}</span>
  </div>;
};
