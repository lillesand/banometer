import { useEffect, useState } from 'react';

export const useCooldown = (cooldownSeconds: number): [boolean, (arg: boolean) => void] => {
  const [isCool, setIsCool] = useState<boolean>(true);

  useEffect(() => {
    if (!isCool) {
      setTimeout(() => {
        setIsCool(true);
      }, cooldownSeconds * 1000);
    }
  }, [isCool, cooldownSeconds]);

  return [isCool, setIsCool];
};
