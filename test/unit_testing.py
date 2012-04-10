__author__ = 'Brian'

import unittest
from StringIO import StringIO
from testing import *
from google.appengine.ext.webapp import Request
from google.appengine.ext.webapp import Response
from google.appengine.ext import testbed
from google.appengine.ext import db

from model.Player import Player



class Test(unittest.TestCase):

    def test_testPage(self):

        handler = Page()
        form = ''
        handler.request = Request({
            'REQUEST_METHOD': 'get',
            'PATH_INFO': '/test',
            'wsgi.input': StringIO(form),
            'CONTENT_LENGTH': len(form),
            'SERVER_NAME': 'hi',
            'SERVER_PORT': '80',
            'wsgi.url_scheme': 'http',
        })
        handler.response = Response()
        handler.get()
        self.assertEqual(200, handler.response.status)

        entity = Player(email='1@1.com')
        key = entity.put()
        self.assertEqual('1@1.com', db.get(key).email)

        entity = Player(email='1@1.com')
        self.assertEqual('1@1.com', entity.email)