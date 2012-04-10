__author__ = 'Brian'

import unittest
from StringIO import StringIO
from payment import *
from google.appengine.ext.webapp import Request
from google.appengine.ext.webapp import Response

from model.Player import Player

class Test(unittest.TestCase):

    def test_Payment(self):

        handler = Payment()
        handler.request = Request({
            'REQUEST_METHOD': 'Post',
            'PATH_INFO': '/payment',
            })
        handler.response = Response()
        self.assertEqual(200, handler.response.status)

    def test_getPayment(self):

        handler = getPayment()
        handler.request = Request({
            'REQUEST_METHOD': 'Get',
            'PATH_INFO': '/payment/getPayment',
            })
        handler.response = Response()
        self.assertEqual(200, handler.response.status)


    def test_doPayment(self):

        handler = doPayment()
        handler.request = Request({
            'REQUEST_METHOD': 'Get',
            'PATH_INFO': '/payment/doPayment',
            })
        handler.response = Response()
        self.assertEqual(200, handler.response.status)

    def test_success(self):

        handler = Success()
        form = 'quantity=0&token=0'
        handler.request = Request({
            'REQUEST_METHOD': 'POST',
            'PATH_INFO': '/payment/Success',
            'wsgi.input': StringIO(form),
            'CONTENT_LENGTH': len(form),
            'SERVER_NAME': 'hi',
            'SERVER_PORT': '80',
            'wsgi.url_scheme': 'http',
        })
        handler.response = Response()
        handler.post()
        self.assertEqual(200, handler.response.status)