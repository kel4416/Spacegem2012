__author__ = 'Kel4416'


import unittest
import logging
from google.appengine.ext import db
from model.TradeRequest import TradeRequest

class testPlayer(unittest.TestCase):

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
        entity = TradeRequest(sender='brain@gmail.com')
        self.setup_key = entity.put()

    def tearDown(self):
        # There is no need to delete test entities.
        pass

    def test_new_entity(self):
        entity = TradeRequest(sender='deyang@gamil.com')
        self.assertEqual('deyang@gamil.com', entity.sender)

    def test_saved_entity(self):
        entity = TradeRequest(sender='deyang@gamil.com')
        key = entity.put()
        self.assertEqual('deyang@gamil.com', db.get(key).sender)

    def test_new_trade(self):
        trade = TradeRequest.newTradeRequest(TradeRequest(key_name='test@gmail.com'),'test@gamil.com','test@gmail.com',10,10,20,'onging')
        trade.put()



