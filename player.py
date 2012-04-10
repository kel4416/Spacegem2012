import cgi
import string
from django.utils import simplejson as json
import random
from google.appengine.ext.webapp import util
from google.appengine.api import users
from model.Player import Player
from google.appengine.ext import db
from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app

class getPlayer(webapp.RequestHandler):
	def get(self):
		getEmail = self.request.get('email')
		#if email passed in, then return stats for player
		if (getEmail):
			players = db.GqlQuery("SELECT * FROM Player where email=:email",email=getEmail)
			a = {}
			if players.count()==1:
				for player in players:
					stats = {
						"email":player.email,
						"gem":player.gem,
						"move":player.move,
						"fuel":player.fuel,
						"cargo":player.cargo,
						"food":player.food,
						"spend":player.spend,
						"share":player.share
					}
			result = json.dumps(stats)
			self.response.out.write(result)
		#if no email passed in, return email of all players
		else:
			q = Player.all(keys_only=True)
			player_keys = q.fetch(1000)
			random_keys = random.sample(player_keys, 15)
			list = db.get(random_keys)
			list2 = []
			for x in list:
				player = x
				player.put()
				list2.append(player.email)
			result = json.dumps(list2)
			self.response.out.write(result)

class setPlayer(webapp.RequestHandler):
	def post(self):
		newStats = json.loads(self.request.body)
		
		#Retrieve player object
		player = Player.get_by_key_name(newStats["email"])
		#Modify player object
		player.spend += newStats["spend"]
		player.share += newStats["share"]
		if player.move > 0 or newStats["move"]>=0:
			player.food += newStats["food"]
			player.cargo += newStats["cargo"]
			player.fuel += newStats["fuel"]
			player.move += newStats["move"]
			player.gem += newStats["gem"]
			player.put()
		else:
			self.response.out.write("Insufficient moves")

app = webapp.WSGIApplication([('/player/get', getPlayer),
							('/player/set', setPlayer)],
                                     debug=True)

def main():
    run_wsgi_app(app)

if __name__ == "__main__":
    main()
