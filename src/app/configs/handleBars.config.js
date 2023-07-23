const path = require('path');
const expressHandlebars = require('express-handlebars').engine;

function handlebarsEngine(app) {
  // route folder src/resource/views/
  const pathdir = path.join(__dirname, '../../resources/views');

  // Template Engine ('handlebars')
  app.engine(
    'hbs',
    expressHandlebars({
      // đổi tên cho đuôi file
      extname: '.hbs',
      helpers: {
        datetime: function (date) {
          const now = new Date(date);
          const offsetMs = now.getTimezoneOffset() * 60 * 1000;
          const dateLocal = new Date(now.getTime() - offsetMs);
          const str = dateLocal
            .toISOString()
            .slice(0, 19)
            .replace(/-/g, '/')
            .replace('T', ' ');
          return str;
        },
        roles: function (role) {
          if (role == 5) return (role = 'Administrator');
          else if (role == 4) return (role = 'Manager');
          else if (role == 3) return (role = 'Moderator');
          else return (role = 'User');
        },
        avatar: (url) => `${url}`,
        sum: (a, b) => a + b,
        color: (color) => {
          if (color) return (color = `text-success`);
          else return (color = `text-danger`);
        },
        status: (stt, type) => {
          switch (type) {
            case 0: {
              stt ? stt = 'Activated' : stt = 'Not Activated';
              break;
            }
            case 1: {
              stt ? stt = 'Active' : stt = 'Banned';
              break;
            }
            case 2: {
              !stt ? stt = 'Opened' : stt = 'Closed';
              break;
            }
          }
          return stt;
        },
        hrefLink: (originalURL, Slug) => `${originalURL}${Slug}`,
        checked: (value, nameKey) => {
          if (Array.isArray(value)) return value[0][nameKey] ? 1 : 0;
          else return value ? 1 : 0;
        },
        tags: (arr = []) => arr.toString(),
      },
    }),
  );
  app.set('view engine', 'hbs');
  app.set('views', pathdir);
}

module.exports = handlebarsEngine;
