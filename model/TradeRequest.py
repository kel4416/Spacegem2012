from google.appengine.ext import db

class TradeRequest(db.Model):
    sender = db.StringProperty()
    recipient = db.StringProperty()
    goods = db.IntegerProperty()
    amount = db.IntegerProperty()
    price = db.IntegerProperty()
    status = db.StringProperty()

    def newTradeRequest(self,sender,recipient,goods,amount,price,status):
        self.key_name = sender
        self.sender = sender
        self.recipient = recipient
        self.goods = goods
        self.amount = amount
        self.price = price
        self.status = status
        return self