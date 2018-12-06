'use strict';
if (process.env.NODE_ENV === 'production') {
  module.exports = {
    mongoURI: 'mongodb://testuser:testuser1@ds257590.mlab.com:57590/my-vidjot'
  };
} else {
  module.exports = {
    mongoURI: 'mongodb://localhost:27017/vidjot-dev'
  };
}
