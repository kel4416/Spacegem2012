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

class ranking(webapp.RequestHandler):
    def get(self):

        players = db.GqlQuery("SELECT * FROM Player ORDER BY gem Desc LIMIT 10")
        playerInfo  = {}
        test = []

        for player in players:
            email = player.email.encode("utf-8")
            gem =  player.gem
            playerInfo["email"] = email
            playerInfo["gem"] = gem
            test.append({"email" :email, "gem": gem})

        c = json.dumps(test)
        self.response.out.write(c)

    def post(self):
        self.response.out.write("Success!")

app = webapp.WSGIApplication(
    [('/ranking.*?', ranking)],
                              debug=True)

def main():
    run_wsgi_app(app)

if __name__ == "__main__":
    main()
