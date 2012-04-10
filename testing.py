__author__ = 'Kel4416'

from google.appengine.ext import webapp
from google.appengine.api import users
from model.Player import Player
from google.appengine.ext.webapp.util import run_wsgi_app


class Page(webapp.RequestHandler):
    def get(self):
        try:
            p = Player.newPlayer(Player(key_name='lol'),'1@1.com',500,500,500,500,0,0)
            p.put()
        except:
            self.response.out.write('failed')

app = webapp.WSGIApplication(
    [('/test', Page)],
    debug=True)


def main():
    run_wsgi_app(app)

if __name__ == "__main__":
    main()
