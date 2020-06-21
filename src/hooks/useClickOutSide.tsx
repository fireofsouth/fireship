import { RefObject, useEffect } from 'react';

function useClickOutSide(ref: RefObject<HTMLElement>, handler: Function) {
  useEffect(() => {
    const listenr = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as HTMLElement)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('click', listenr);
    return () => {
      document.removeEventListener('click', listenr);
    };
  }, [handler, ref]);
}
export default useClickOutSide;
