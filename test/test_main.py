__author__ = 'Brian'

import unittest
from StringIO import StringIO
from google.appengine.ext.webapp import Request
from google.appengine.ext.webapp import Response
from main import MainPage

class Test(unittest.TestCase):

    def test_mainPage(self):
        handler = MainPage()
        handler.request = Request({
            'REQUEST_METHOD': 'GET',
            'PATH_INFO': '/',
            })

        handler.response = Response()
        self.assertEqual(200, handler.response.status)
