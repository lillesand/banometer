import { LinkItem } from '../menu/LinkItem';
import React from 'react';
import { makeRequest } from '../http/makeRequest';
import { useCooldown } from './useCooldown';

const requestPhoto = (madeRequest: () => void) => {
  makeRequest('/photo/request', {method: 'post'}).catch((error) => {
    console.log(error);
    alert('Klarte ikke be om bilde :(');
  });
  madeRequest();
}


export const RequestPhotoMenuItem = () => {
  const [isCool, setIsCool] = useCooldown(10);

  const onClick = () => {
    requestPhoto(() => {
      setIsCool(false)
    })
  };

  if (isCool) {
    return <LinkItem onClick={onClick} emoji="📸" text="Ta bilde"/>
  } else {
    return <LinkItem onClick={onClick} emoji="✋" text="Vent" disabled />
  }
};
