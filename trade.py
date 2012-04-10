import cgi
import string
from django.utils import simplejson as json
from google.appengine.ext.webapp import util
from google.appengine.api import users
from model.TradeRequest import TradeRequest
from model.Player import Player
from google.appengine.ext import db
from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app

class tradeRequest(webapp.RequestHandler):
    def post(self):
        try:
            tRequest = json.loads(self.request.body)
            sender = tRequest["sender"]
            recipient = tRequest["recipient"]
            goods = tRequest["goods"]
            amount = tRequest["amount"]
            price = tRequest["price"]
            newTRequest = TradeRequest()
            newTRequest.sender = sender
            newTRequest.recipient = recipient
            newTRequest.goods = int(goods)
            newTRequest.amount = int(amount)
            newTRequest.price = int(price)
            newTRequest.put()
            self.response.out.write("Successful")
        except:
            self.response.out.write("Failed")

class tradeReply(webapp.RequestHandler):
    def post(self):
        try:
            tReply = json.loads(self.request.body)
            sender = Player.get_by_key_name(tReply["sender"])
            recipient = Player.get_by_key_name(tReply["recipient"])

            if tReply['action']=="rejected":
                sender.move += 1
                db.delete(tReply["key"])
            elif tReply['action']=="accepted":
                #credit and debit gem
                sender.gem -= tReply["price"]
                recipient.gem += tReply["price"]

                #credit and debit goods
                if tReply["goods"]=="fuel":
                    sender.fuel += int(tReply["amount"])
                    recipient.fuel -= int(tReply["amount"])
                elif tReply["goods"]=="cargo":
                    sender.cargo += tReply["amount"]
                    recipient.cargo -= tReply["amount"]
                elif tReply["goods"]=="food":
                    sender.food += tReply["amount"]
                    recipient.food -= tReply["amount"]

                sender.put()
                recipient.put()

                db.delete(tReply["key"])

            self.response.out.write("Successful")
        except:
            self.response.out.write(sender)

class tradeList(webapp.RequestHandler):
    def get(self):
        getEmail = self.request.get('email')
        tRequests = db.GqlQuery("SELECT * FROM TradeRequest where recipient=:recipient",recipient=getEmail)
        list = []
        for request in tRequests:
            list.append({
                "email": request.sender,
                "sender": request.sender,
                "recipient": request.recipient,
                "goods": request.goods,
                "amount": request.amount,
                "price": request.price,
                "key": str(request.key())
            })
        result = json.dumps(list)
        self.response.out.write(result)

app = webapp.WSGIApplication([('/trade/request', tradeRequest),
                                ('/trade/reply', tradeReply),
                                ('/trade/list', tradeList)],
                                     debug=True)

def main():
    run_wsgi_app(app)

if __name__ == "__main__":
    main()
