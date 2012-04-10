__author__ = 'Brian'

import unittest

from ranking import ranking
from google.appengine.ext.webapp import Request
from google.appengine.ext.webapp import Response

from model.Player import Player



class Test(unittest.TestCase):

    def test_post_ranking(self):

        handler = ranking()
        handler.request = Request({
            'REQUEST_METHOD': 'GET',
            'PATH_INFO': '/ranking',
            })
        handler.response = Response()
        handler.get()
        self.failUnless(len(handler.get()) <= 10)
        self.assertEqual('200 OK', response.status)




    def test_post_ranking(self):
        form = ''
        handler = ranking()
        handler.request = Request({
            'REQUEST_METHOD': 'POST',
            'PATH_INFO': '/ranking',
            })
        handler.response = Response()
        handler.post()