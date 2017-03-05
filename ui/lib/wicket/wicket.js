/**
 * Wicket
 * a small door or gate, especially one beside or in a larger one.
 *
 * A browser based REST communication service.
 * Once complete, this code should be externalized into its own repo.
 * @author Matthew W. Jackson
 */

class Wicket {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
};

var Wicket = function () {
  const supportedHTTPMethods = [
    'GET',
    // 'HEAD',
    'POST',
    'PUT',
    'DELETE',
    // 'TRACE',
    // 'OPTIONS',
    // 'CONNECT',
    'PATCH'
  ];

  var requestProcessor = function (method, uri, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200) { // the check on status is optomistic and wrong
        callback(xmlHttp, callback);
      }
    }
    xmlHttp.open(method, uri, true);
    xmlHttp.send(null);
  };
  var responseProcessor = function (response, callback) {

  };

  // Public instance values
  supportedHTTPMethods.forEach(method => {
    this[method.toLowerCase()] = (uri, callback) =>
      requestProcessor(method, uri, callback);
  });
  this.$_headers = {};

  this._patchHeader = headerObj => {

  };
  this._setHeaders = headerObj => {

  };
};
