__author__ = 'Kel4416'

from google.appengine.ext import webapp
from model.Player import Player
from google.appengine.ext import db
from model.TradeRequest import TradeRequest
from model.Question import Question
from google.appengine.ext.webapp.util import run_wsgi_app

class IniPage(webapp.RequestHandler):
	def get(self):
		try:
			#email,gem,move,fuel,cargo,food
			deyang = Player.newPlayer(Player(key_name='deyang'),'deyang',10,10,10,40,20,0,0)
			kelvin = Player.newPlayer(Player(key_name='kelvin'),'kelvin',20,10,20,50,70,0,0)
			siewlin = Player.newPlayer(Player(key_name='siewlin'),'siewlin',30,10,30,20,50,0,0)
			brian = Player.newPlayer(Player(key_name='brian'),'brian',40,10,40,50,60,0,0)
			deyang.put()
			kelvin.put()
			siewlin.put()
			brian.put()
		
			trade = TradeRequest.newTradeRequest(TradeRequest(key_name='deyang@gmail.com'),'deyang@gamil.com','kelvin@gmail.com',10,10,20,'onging')
			trade.put()
			trade2 = TradeRequest.newTradeRequest(TradeRequest(key_name='kelvin@gmail.com'),'siewlin@gamil.com','kelvin@gmail.com',10,10,20,'onging')
			trade2.put()
			trade3 = TradeRequest.newTradeRequest(TradeRequest(key_name='siewlin@gmail.com'),'brian@gamil.com','kelvin@gmail.com',10,10,20,'onging')
			trade3.put()
			trade4 = TradeRequest.newTradeRequest(TradeRequest(key_name='brian@gmail.com'),'deyang@gamil.com','kelvin@gmail.com',10,10,20,'onging')
			trade4.put()
		
			answer = ['help3','me']
			answer.append('please')
			question1 = Question.newQuestion(Question(key_name='help'),'test','MCQ',answer,answer,'test@gmail.com',answer)
			question1.put()

			self.response.out.write('Successful in creating Player Object & trade Object & question Object')

		except:
			self.response.out.write()

app = webapp.WSGIApplication(
    [('/ini', IniPage)],
    debug=True)

def main():
    run_wsgi_app(app)

if __name__ == "__main__":
    main()
