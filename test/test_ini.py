__author__ = 'Brian'

import unittest
from StringIO import StringIO
from google.appengine.ext.webapp import Request
from google.appengine.ext.webapp import Response
from ini import IniPage

class Test(unittest.TestCase):

    def test_ini_get(self):
        handler = IniPage()
        handler.request = Request({
            'REQUEST_METHOD': 'get',
            'PATH_INFO': '/ini',
            })

        handler.response = Response()
        handler.get()
        self.assertEqual(200, handler.response.status)