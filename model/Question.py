__author__ = 'Kel4416'
from google.appengine.ext import db

class Question(db.Model):
    questionDescr = db.StringProperty()
    questionType = db.StringProperty()
    questionParts = db.StringListProperty()
    answerList = db.StringListProperty()
    userId = db.StringProperty()
    ansPos = db.StringListProperty()
    correct = db.IntegerProperty(default=0)
    wrong = db.IntegerProperty(default=0)

    def newQuestion(self,questionDescr, questionType, questionParts, answerList, userId, ansPos):
        self.key_name = questionDescr
        self.questionDescr = questionDescr
        self.questionType = questionType
        self.questionParts = questionParts
        self.answerList = answerList
        self.userId = userId
        self.ansPos = ansPos
        return self