from google.appengine.ext import webapp
from google.appengine.api import users
from google.appengine.ext.webapp.util import run_wsgi_app
from model.Question import Question
from google.appengine.ext import db
from django.utils import simplejson as json
from random import randint

class createQuestion (webapp.RequestHandler):
    def post(self):
        trial = json.loads(self.request.body)
        qn = Question()
        qn.questionDescr = trial['descr']
        qn.questionType = trial['questionType']
        questionParts = trial['qnParts']
        answerLong = trial['answer']
        qnPartsLong = trial['qnParts']
        ansPosLong = trial['ansPos']
        answer = []
        qnParts = []
        ansPos = []
        for x in answerLong:
            number = x['num']
            answer.append(str(number))
            ans = x['ans']
            answer.append(str(ans))
        qn.answerList = answer
        for x in qnPartsLong:
            number = x['num']
            qnParts.append(str(number))
            qnss = x['qn']
            qnParts.append(str(qnss))
        qn.questionParts = qnParts
        for x in ansPosLong:
            number = x['num']
            ansPos.append(str(number))
            dir = x['dir']
            ansPos.append(str(dir))
            posR = x['posR']
            ansPos.append(str(posR))
            posC = x['posC']
            ansPos.append(str(posC))
        qn.ansPos = ansPos
        user = users.get_current_user()
        qn.userId = user.email()
        qn.put()
        self.response.out.write("Success")

def getAll():
    query = db.Query(Question)
    stringQuery = []
    num = 0
    for a in query:
        result ={}
        qn = str(a.questionDescr).encode("utf-8")
        qnType = str(a.questionType).encode("utf-8")
        userId = str(a.userId).encode("utf-8")
        #qnParts = str(a.questionParts).encode("utf-8").split(",")
        qnParts = a.questionParts
        #for x in qnParts:
         #   x = str(x)
         #   if "u'" in x:
         #       x = x.replace("u'","'",1)
        ansList = a.answerList
        address_k = str(a.key())
        result['questionDescr'] = qn
        result['questionType'] = qnType
        result['qnParts'] = qnParts
        result['userId'] = userId
        result['ansList'] = ansList
        result['key'] = address_k
        #            result['ansList'] = ansList2
        stringQuery.append(result)
    #self.response.out.write(json.dumps(stringQuery))
    return stringQuery

class removeQuestion(webapp.RequestHandler):
    def post(self):
        response = json.loads(self.request.body)
        db.delete(response['key'])
        self.response.out.write("Success")

class getRandomQuestion(webapp.RequestHandler):
    def get(self):
        array = getAll()
        num = randint(0,len(array)-1)
        qn = array[num]
        self.response.out.write(json.dumps(qn))

class getUserQuestion(webapp.RequestHandler):
    def get(self):
        array = getAll()
        newArray =[]
        user = users.get_current_user()
        num = 0
        for x in array:
            if x['userId'] == user.email():
               newArray.append(x)
            num = num + 1
        self.response.out.write(json.dumps(newArray))

class getKeyQuestion(webapp.RequestHandler):
    def get(self):
        key = self.request.get('key')
        qn = db.get(key)
        result = {}
        result['questionDescr'] = qn.questionDescr
        result['questionType'] = qn.questionType
        result['qnParts'] = qn.questionParts
        result['userId'] = qn.userId
        self.response.out.write(json.dumps(result))

#class updateField(webapp.RequestHandler):
#    def get(self):
#        q = Question.all(keys_only=True)
#        question_keys = q.fetch(1000)
#        list = db.get(question_keys)
#
#        for x in list:
#            question = x
#            question.put()

app = webapp.WSGIApplication(
    [('/question/createqn', createQuestion),
        ('/question/manageqn', getUserQuestion),
        ('/question/randomqn', getRandomQuestion),
        ('/staticqn', getKeyQuestion),
#        ,('/question/updatefield', updateField)
        ('/question/removeqn', removeQuestion)],
    debug=True)

def main():
    run_wsgi_app(app)

if __name__ == "__main__":
    main()