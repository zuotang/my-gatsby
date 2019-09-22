import { useEffect } from 'react';

function useSize(autoSize) {
	useEffect(() => {
		function reSize() {
			if (!autoSize) return;
			var clientW = document.documentElement.clientWidth || document.body.clientWidth;
			document.documentElement.style.fontSize = 12 * (clientW / 375) + 'px';
		}
		reSize();
		window.addEventListener('resize', reSize);
		return () => {
			window.removeEventListener('resize', reSize);
		};
	}, []);
}
export default useSize;
