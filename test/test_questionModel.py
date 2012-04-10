__author__ = 'Kel4416'


import unittest
import logging
from google.appengine.ext import db
from model.Question import Question

class SuccessFailError(unittest.TestCase):

    def setUp(self):
        logging.info('In setUp()')

    def tearDown(self):
        logging.info('In tearDown()')

    def test_success(self):
        logging.info('Running test_success()')
        self.assertTrue(True)

    # This test causes an intentional failure.
    def test_failure(self):
        logging.info('Running test_failure()')
        #self.assertTrue(False)

    # This test causes an intentional error.
    def test_error(self):
        logging.info('Running test_error()')
        #raise Exception('expected exception')


class ModelTest(unittest.TestCase):

    def setUp(self):
        # Populate test entities.
        entity = Question(email='1@1.com')
        self.setup_key = entity.put()

    def tearDown(self):
        # There is no need to delete test entities.
        pass

    def test_new_entity(self):
        entity = Question(mail='1@1.com')
        self.assertEqual(None,  entity.userId)

    def test_saved_entity(self):
        entity = Question(email='1@1.com')
        key = entity.put()
        self.assertEqual(None, db.get(key).userId)

    def test_setup_entity(self):
        entity = db.get(self.setup_key)
        self.assertEqual(None,  entity.userId)

    def test_new_question(self):
        answer = ['help','me']
        answer.append('please')
        question2 = Question()
        question2.questionDescr ='testing_question'
        question2.questionType ='MCQ'
        question2.questionParts = answer
        question2.answerList = answer
        question2.answerList = answer
        question2.userId = 'siewlin@gmail.com'
        question2.ansPos = answer
        question2.put()
        question1 = Question.newQuestion(Question(key_name='help'),'test','MCQ',answer,answer,'test@gmail.com',answer)

