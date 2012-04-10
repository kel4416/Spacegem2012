__author__ = 'Kel4416'


import unittest
import logging
from google.appengine.ext import db
from model.Player import Player

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
        entity = Player(email='1@1.com')
        self.setup_key = entity.put()

    def tearDown(self):
        # There is no need to delete test entities.
        pass

    def test_new_entity(self):
        entity = Player(email='1@1.com')
        self.assertEqual('1@1.com', entity.email)

    def test_saved_entity(self):
        entity = Player(email='1@1.com')
        key = entity.put()
        self.assertEqual('1@1.com', db.get(key).email)

    def test_setup_entity(self):
        entity = db.get(self.setup_key)
        self.assertEqual('1@1.com', entity.email)

    def test_new_player(self):
        test = Player.newPlayer(Player(key_name='test@gmail.com'),'test@gmail.com',10,10,10,40,20,0,0)
        test.put()

    def test_new_player(self):
        test = Player()
        deyang = Player.newPlayer(Player(key_name='deyang@gmail.com'),'adam@raspberri.es',10,10,10,40,20,0,0)