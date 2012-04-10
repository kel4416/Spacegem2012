__author__ = 'Brian'
import cgi
import string
from django.utils import simplejson as json

from google.appengine.ext import webapp
from google.appengine.ext.webapp import util
from google.appengine.api import users
from model.Player import Player
from google.appengine.ext import db
from google.appengine.ext.webapp.util import run_wsgi_app



class process(webapp.RequestHandler):
    def get(self):
        self.response.out.write(self.request.get('jsonObj'))

    def post(self):
     startingGem = 100
     startingMove = 5
     user = users.get_current_user()
     info = json.loads(self.request.body)


     #email,gem,move,fuel,cargo,food
     player = Player.newPlayer(Player(key_name=user.nickname()),user.nickname(),startingGem,startingMove,info ['fuel'],info ['cargo'],info ['food'],0,0)
     player.put()

     self.response.out.write("success");

app = webapp.WSGIApplication(
    [('/process.*?', process)],
                     debug=True)

def main():
    run_wsgi_app(app)

if __name__ == "__main__":
    main()
