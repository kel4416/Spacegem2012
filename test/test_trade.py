__author__ = 'Brian'

import unittest
from django.utils import simplejson as json
from StringIO import StringIO
from urllib import urlencode
from google.appengine.ext.webapp import Request
from google.appengine.ext.webapp import Response
from trade import tradeRequest
from trade import tradeReply
from trade import tradeList

from model.TradeRequest import TradeRequest
from model.Player import Player
from google.appengine.ext import db

class Test(unittest.TestCase):

    def test_tradeRequest(self):
        handler = tradeRequest()
        form = {
            'sender':'brian@gamil.com',
            'recipient':'deyang@gamil.com',
            'goods':100 ,
            'amount':10 ,
            'price': 10
        }
        a = urlencode(form)
        handler.request = Request({
            'REQUEST_METHOD': 'POST',
            'PATH_INFO': '/trade/request',
            'wsgi.input':  a,
            'CONTENT_LENGTH': len(a),
            'SERVER_NAME': 'hi',
            'SERVER_PORT': '80',
            'wsgi.url_scheme': 'http',
            })

        handler.response = Response()
        handler.post()

        self.assertEqual(200, handler.response.status)

    def test_tradeRequest(self):
        handler = tradeReply()
        form = {
            'sender':'brian@gamil.com',
            'recipient':'deyang@gamil.com',
            'goods':100 ,
            'amount':10 ,
            'price': 10}
        handler.request = Request({
            'REQUEST_METHOD': 'POST',
            'PATH_INFO': '/trade/request',
            'wsgi.input': form,
            'CONTENT_LENGTH': len(form),
            'SERVER_NAME': 'hi',
            'SERVER_PORT': '80',
            'wsgi.url_scheme': 'http',
            })

        handler.response = Response()
        self.assertEqual(200, handler.response.status)