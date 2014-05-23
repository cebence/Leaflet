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
        filenameRe = /[\/^](leaflet|mapbox|webmap)[\-\._]?([\w\-\._]*)\.js\??/;
    var idRe = /(leaflet|mapbox|webmap)[\w\-\._]*(-script)?/;

	var i, len, src, path, id;

	// Filename-based matching
	for (i = 0, len = scripts.length; i < len; i++) {
		src = scripts[i].src;

		if (src.match(filenameRe)) {
			path = src.split(filenameRe)[0];
			return (path ? path + '/' : '') + 'images';
		}
	}

	// ID-based matching
	for (i = 0, len = scripts.length; i < len; i++) {
		src = scripts[i].src;
		id = scripts[i].getAttribute('id');

		if (id && id.match(idRe)) {
			// Strip the filename and any query params after the last "/".
			path = src.split(/\/([\w\-\._]+\.js)(\?(.+))?$/)[0];
			return (path ? path + '/' : '') + 'images';
		}
	}
	return undefined;
}());
