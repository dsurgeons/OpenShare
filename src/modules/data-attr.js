module.exports = function() {
	const routine = require('../../lib/init')({
		selector: {
			share: '[data-open-share]:not([data-open-share-node])',
			count: '[data-open-share-count]:not([data-open-share-node])'
		},
		cb: {
			share: require('../../lib/initializeShareNode'),
			count: require('../../lib/initializeCountNode')
		}
	});

	function detach() {
		document.removeEventListener('DOMContentLoaded');
		window.removeEventListener('load');

		routine();
	}

	if (document.readyState === 'complete' || (document.readyState !== 'loading' && !document.documentElement.doScroll)) {
		window.setTimeout(routine);
	} else {
		document.addEventListener('DOMContentLoaded', detach);
		window.addEventListener('load', detach);
	}
};
