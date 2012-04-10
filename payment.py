import urllib
from google.appengine.ext import webapp
from google.appengine.api import urlfetch
from google.appengine.api import users
from google.appengine.ext import db
from model.Player import Player
from django.utils import simplejson as json
from google.appengine.ext.webapp.util import run_wsgi_app

class Payment(webapp.RequestHandler):

    def post(self):
        param = json.loads(self.request.body)
        cost = param['cost']
        orderQty = param['quantity']
        url = 'https://api-3t.sandbox.paypal.com/nvp'
        USER = 'kel89_1333862340_biz_api1.gmail.com'
        PWD = '1333862365'
        SIGNATURE = 'AY4s-MgLCtC5Gk-9dpvFcblELDNRAK62SIpHYXF35N3wVzZhce8wrU5u'
        VERSION = 65.0
        PAYMENTREQUEST_0_PAYMENTACTION = 'Sale'
        PAYMENTREQUEST_0_AMT = float(cost)
        RETURNURL = 'http://spacegem2012.appspot.com/payment/getPayment' + "?quantity=" + orderQty + "&cost=" + str(cost)
        CANCELURL = 'http://www.google.com'
        METHOD = "SetExpressCheckout"
        form_fields = {
                       "USER": USER,
                       "PWD": PWD,
                       "SIGNATURE": SIGNATURE,
                       "VERSION": VERSION,
                       "PAYMENTREQUEST_0_PAYMENTACTION": PAYMENTREQUEST_0_PAYMENTACTION,
                       "PAYMENTREQUEST_0_AMT": PAYMENTREQUEST_0_AMT,
                       "RETURNURL": RETURNURL,
                       "CANCELURL": CANCELURL,
                       "METHOD": METHOD,
                       }
        form_data = urllib.urlencode(form_fields)
        result = urlfetch.fetch(url=url,
                    payload=form_data,
                    method=urlfetch.POST)
        tokenStart = result.content.find("TOKEN=")
        tokenEnd = result.content.find("TIMESTAMP")
        toReturn = result.content[tokenStart + 6:tokenEnd - 1].replace("%2d", "-")
        self.response.out.write('{"token":"' + toReturn + '"}')

class getPayment(webapp.RequestHandler):
    
    def get(self):
        orderQty=self.request.get("quantity")
        cost = self.request.get("cost")
        url = 'https://api-3t.sandbox.paypal.com/nvp'
        USER = 'kel89_1333862340_biz_api1.gmail.com'
        PWD = '1333862365'
        SIGNATURE = 'AY4s-MgLCtC5Gk-9dpvFcblELDNRAK62SIpHYXF35N3wVzZhce8wrU5u'
        VERSION = 65.0
        TOKEN = self.request.get("token");
        METHOD = "GetExpressCheckoutDetails"
        form_fields = {
                       "USER": USER,
                       "PWD": PWD,
                       "SIGNATURE": SIGNATURE,
                       "VERSION": VERSION,
                       "TOKEN":TOKEN,
                       "METHOD": METHOD
                       }
        form_data = urllib.urlencode(form_fields)
        result = urlfetch.fetch(url=url,
                    payload=form_data,
                    method=urlfetch.POST)
        tokenStart = result.content.find("TOKEN=")
        tokenEnd = result.content.find("&CHECKOUTSTATUS")
        payerStart = result.content.find("PAYERID=")
        payerEnd = result.content.find("&PAYERSTATUS")
        tokenResult = result.content[tokenStart + 6:tokenEnd].replace("%2d", "-")
        payerID = result.content[payerStart + 8:payerEnd]
        toReturn = {}
        #toReturn["token"] = tokenResult
        #toReturn["payerId"] = payerID
        #self.response.out.write(json.dumps(toReturn))
        self.redirect("/payment/doPayment?token=" + tokenResult + "&payerid=" + payerID + "&quantity=" + orderQty + "&cost=" + str(cost))
                     
class doPayment(webapp.RequestHandler):
    def get(self):
        url = 'https://api-3t.sandbox.paypal.com/nvp'
        USER = 'kel89_1333862340_biz_api1.gmail.com'
        PWD = '1333862365'
        SIGNATURE = 'AY4s-MgLCtC5Gk-9dpvFcblELDNRAK62SIpHYXF35N3wVzZhce8wrU5u'
        VERSION = 65.0
        PAYMENTREQUEST_0_PAYMENTACTION = 'Sale'
        PAYMENTREQUEST_0_AMT = self.request.get("cost")
        PAYERID = self.request.get("payerid")
        METHOD = "DoExpressCheckoutPayment"
        TOKEN = self.request.get("token")
        form_fields = {
                       "USER": USER,
                       "PWD": PWD,
                       "SIGNATURE": SIGNATURE,
                       "VERSION": VERSION,
                       "PAYMENTREQUEST_0_PAYMENTACTION": PAYMENTREQUEST_0_PAYMENTACTION,
                       "PAYMENTREQUEST_0_AMT": PAYMENTREQUEST_0_AMT,
                       "TOKEN" : TOKEN,
                       "PAYERID" : PAYERID,
                       "METHOD": METHOD,
                       }
        form_data = urllib.urlencode(form_fields)
        try:
            result = urlfetch.fetch(url=url,
                        payload=form_data,
                        method=urlfetch.POST)
            self.response.out.write(result.content)
        except:
           currentUserEmail = users.get_current_user().nickname()
           players = db.GqlQuery("SELECT * FROM Player where email=:email",email=currentUserEmail)
           for player in players:
               player.move = player.move+int(self.request.get("quantity"))
               player.spend = player.spend+int(self.request.get("cost"))
               player.put()
               
           self.redirect("http://spacegem2012.appspot.com/app/index.html#/success?quantity="+str(self.request.get("quantity")))
            

class Success(webapp.RequestHandler):
    def post(self):
        self.request.get("quantity")
        self.request.get("token")
        self.response.out.write('lol')

class Test(webapp.RequestHandler):
    def post(self):
        self.response.out.write(self.request.get("quantity"))

app = webapp.WSGIApplication(
    [('/payment', Payment),
     ('/payment/Test', Test),
     ('/payment/Success', Success),
     ('/payment/doPayment', doPayment),
     ('/payment/getPayment', getPayment),
     ('/payment/Test', Test)],
    debug=True)

def main():
    run_wsgi_app(app)

if __name__ == "__main__":
    main()
