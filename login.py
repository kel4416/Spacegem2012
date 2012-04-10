from google.appengine.ext import webapp
from google.appengine.api import users
from model.Player import Player
from google.appengine.ext.webapp.util import run_wsgi_app

class LoginPage(webapp.RequestHandler):

    def get(self):
        if(users.get_current_user() == None):
            self.response.out.write(users.create_login_url('/app/index.html#/customise'))
        else:
            self.response.out.write(users.create_logout_url('/'))

class GetUserName(webapp.RequestHandler):
    def get(self):
        user = users.get_current_user()
        if user != None:
            self.response.out.write('{"name": "' + user.nickname() + '"}')
        else:
            self.response.out.write('{"name":""}')

class UserExist(webapp.RequestHandler):
    def get(self):
        username = users.get_current_user().nickname()
        q = Player.all()
        q.filter('email =', username)
        result = q.fetch(1)
        for r in result:
            if r.email == username:
                self.response.out.write("true")
            else:
                self.response.out.write("false")

class Test(webapp.RequestHandler):
    def get(self):
        if not user_exist():
            self.response.out.write('User record not found in the database!')
        else:
            self.response.out.write('User record is found in the database!')

def user_exist():
    username = "Does Not Exist"
    if users.get_current_user() != None:
        username = users.get_current_user().nickname()
    q = Player.all()
    q.filter('email =', username)
    result = q.fetch(1)
    for r in result:
        return r.email == username

app = webapp.WSGIApplication(
    [('/login', LoginPage),
        ('/login/getUsername', GetUserName),
        ('/login/userExist' , UserExist),
        ('/login/test', Test)],
    debug=True)


def main():
    run_wsgi_app(app)

if __name__ == "__main__":
    main()
