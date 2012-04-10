__author__ = 'Brian'

import unittest
from StringIO import StringIO
from process import *
from google.appengine.ext.webapp import Request
from google.appengine.ext.webapp import Response
from google.appengine.ext import db
from model.Player import Player

class Test(unittest.TestCase):

    def test_Payment(self):

        handler = process()
        handler.request = Request({
            'REQUEST_METHOD': 'get',
            'PATH_INFO': '/process',
            })
        handler.response = Response()
        handler.get()
        self.assertEqual(200, handler.response.status)


    def test_Payment(self):

        handler = process()
        handler.request = Request({
            'REQUEST_METHOD': 'post',
            'PATH_INFO': '/process',
            })
        handler.response = Response()
        
        self.assertEqual(200, handler.response.status)
        test = Player.newPlayer(Player(key_name='test@gmail.com'),'test@gmail.com',10,10,10,40,20,0,0)
        test.put()