

__author__ = 'Brian'

import os
import unittest
import logging
from google.appengine.ext import webapp
from google.appengine.api import users
from login import *
from google.appengine.ext.webapp import Request
from google.appengine.ext.webapp import Response




class testLogin(unittest.TestCase):
    def test_loginPage(self):
        handler = LoginPage()
        handler.request = Request({
            'REQUEST_METHOD': 'GET',
            'PATH_INFO': '/login',
            })

        handler.response = Response()
        
        self.assertEqual(200, handler.response.status)

    def test_GetUserName(self):
        handler = GetUserName()
        handler.request = Request({
            'REQUEST_METHOD': 'GET',
            'PATH_INFO': '/login/getUsername',
            })

        handler.response = Response()
        handler.get()
        self.assertEqual(200, handler.response.status)

    def test_UserExist(self):
        handler = UserExist()
        handler.request = Request({
        'REQUEST_METHOD': 'GET',
        'PATH_INFO': '/login/userExist',
        })

        handler.response = Response()
        self.assertEqual(200, handler.response.status)

        def test_UserExist(self):
            os.environ['AUTH_DOMAIN'] =  "localhost"
            os.environ['USER_EMAIL'] = 'testing@example.com'
            os.environ['USER_ID'] = 'testing'

            handler = Test()
            handler.request = Request({
            'REQUEST_METHOD': 'Get',
            'PATH_INFO': '/login/test',
            })

        handler.response = Response()

        self.assertEqual(200, handler.response.status)