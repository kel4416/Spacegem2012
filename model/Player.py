__author__ = 'Kel4416'

from google.appengine.ext import db

class Player(db.Model):
    email = db.EmailProperty()
    gem = db.IntegerProperty()
    move = db.IntegerProperty()
    fuel = db.IntegerProperty()
    cargo = db.IntegerProperty()
    food = db.IntegerProperty()
    spend = db.IntegerProperty(default=0)
    share = db.IntegerProperty(default=0)

    def newPlayer(self,email,gem,move,fuel,cargo,food,spend,share):
        self.key_name = email
        self.email = email
        self.gem = gem
        self.move = move
        self.fuel = fuel
        self.cargo = cargo
        self.food = food
        self.spend = spend
        self.share = share
        return self
