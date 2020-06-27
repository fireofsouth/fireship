import { useEffect } from 'react';
function useClickOutSide(ref, handler) {
    useEffect(function () {
        var listenr = function (event) {
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            handler(event);
        };
        document.addEventListener('click', listenr);
        return function () {
            document.removeEventListener('click', listenr);
        };
    }, [handler, ref]);
}
export default useClickOutSide;
