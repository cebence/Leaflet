/*
 * L.Icon.Default is the blue marker icon used by default in Leaflet.
 */

L.Icon.Default = L.Icon.extend({

	options: {
		iconSize:    [25, 41],
		iconAnchor:  [12, 41],
		popupAnchor: [1, -34],
		shadowSize:  [41, 41]
	},

	_getIconUrl: function (name) {
		var key = name + 'Url';

		if (this.options[key]) {
			return this.options[key];
		}

		var path = L.Icon.Default.imagePath;

		if (!path) {
			throw new Error('Couldn\'t autodetect L.Icon.Default.imagePath, set it manually.');
		}

		return path + '/marker-' + name + (L.Browser.retina && name === 'icon' ? '-2x' : '') + '.png';
	}
});

L.Icon.Default.imagePath = (function () {
	var scripts = document.getElementsByTagName('script'),
	    leafletRe = /(?:\/|^)leaflet[\-\._]?([\w\-\._]*)\.js\??/,
	    idRe = /leaflet[\w\-\._]*(-script)?/,
	    // "str.split(splitRe)[0]" will return full path to the resource.
	    splitRe = /\/([\w\-\._]+\.js)(\?(.+))?$/;

	var i, len, src, path, id;

	// Filename-based matching
	for (i = 0, len = scripts.length; i < len; i++) {
		src = scripts[i].src;

		if (src.match(leafletRe)) {
			path = src.split(splitRe)[0];
			return (path ? path + '/' : '') + 'images';
		}
	}

	// ID-based matching
	for (i = 0, len = scripts.length; i < len; i++) {
		src = scripts[i].src;
		id = scripts[i].getAttribute('id');

		if (id && id.match(idRe)) {
			path = src.split(splitRe)[0];
			return (path ? path + '/' : '') + 'images';
		}
	}
}());
