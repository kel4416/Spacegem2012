function SpaceGemCtrl($xhr,$route ) {
	var self = this;
	$route.when('/login', {
		template : 'partials/login.html',
		controller : loginCtrl
	});
	$route.when('/game', {
		template : 'partials/game.html',
		controller : gameCtrl
	});
	$route.when('/customise', {
		template : 'partials/customise.html',
		controller : customiseCtrl
	});
	$route.when('/ranking', {
		template : 'partials/ranking.html',
		controller : rankingCtrl
	});
	$route.when('/share', {
		template : 'partials/share.html',
		controller : shareCtrl
	});
	$route.when('/question/createqn', {
		template : 'partials/createqn.html',
		controller : createQnCtrl
	});
	$route.when('/question/manageqn', {
		template : 'partials/manageqn.html',
		controller : manageQnCtrl
	});
	$route.when('/payment', {
		template : 'partials/shop.html',
		controller : paymentCtrl
	});
	$route.when('/quickstart', {
		template : 'partials/quickstart.html',
		controller : arcadeCtrl
	});
	$route.when('/shop', {
		template : 'partials/shop.html',
		controller : paymentCtrl
	});
	$route.when('/success', {
		template : 'partials/success.html',
		controller : paymentCtrl
	});
    $route.when('/completequickstart', {
        template : 'partials/completequickstart.html',
        controller : completequickstartCtrl
    });
    $route.when('/staticqn/:qnKey', {
        template : 'partials/staticqn.html',
        controller : staticQnCtrl
    });

	$route.otherwise({
		redirectTo : '/quickstart'
	});

	$route.onChange(function() {
		self.params = $route.current.params;
	});

	$route.parent(this);
	$xhr('GET', '/login/getUsername', function(code, response) {
		if (response.name != "") {
			$xhr('GET', '/login', function(code, response) {
				self.logoutUrl = response;
			})
		}
	})
}

/*-------------- Get More move ---------------*/
function shareCtrl($xhr) {
	var self = this;

    this.share = function () {
        $xhr('GET', '/login/getUsername', function(code, response) {
            stats = {
                "email": response["name"],
                "gem": 0,
                "move": 3,
                "fuel": 0,
                "cargo": 0,
                "food": 0,
                "spend": 0,
                "share": 1
            }
            $xhr('POST','/player/set',stats,function(code, response) {
            });
        });
        u=location.href;
        t=document.title;
        window.open('http://www.facebook.com/sharer.php?u=http://spacegem2012.appspot.com?&t='+encodeURIComponent(t),'sharer','toolbar=0,status=0,width=626,height=436');
    }
}
/*--------------End of Get More Move ---------------*/

function paymentCtrl($xhr) {
	var self = this;

    self.select = 0;

    self.wait = 0;

    this.setPayment = function() {
        if (self.select==1) {
            self.wait = 1;
            self.abc = {
                "quantity":'5',
                "cost":'1'
            };
            $xhr('POST', '/payment', self.abc, function(code, response) {
                window.location = "https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=" + response.token;
            });
        } else if (self.select==2){
            self.wait = 1;
            self.abc = {
                "quantity":'30',
                "cost":'4.50'
            };
            $xhr('POST', '/payment', self.abc, function(code, response) {
                window.location = "https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=" + response.token;
            });
        } else {
            alert("No package selected");
        }
    }

}

function loginCtrl($xhr, $location) {
	var self = this

	$xhr('GET', '/login/getUsername', function(code, response) {
		if (response.name != "") {
			$xhr('GET', '/login/userExist', function(code, response) {
				if (response == "true") {
					$location.updateHash('/game')
				}
			})
		}
	})

	$xhr('GET', '/login', function(code, response) {
		self.loginUrl = response;
	})
}

/*-------------- Customise ---------------*/

function customiseCtrl($xhr, $location) {

	var self = this;

	$xhr('GET', '/login/getUsername', function(code, response) {
		if (response.name != "") {
			$xhr('GET', '/login/userExist', function(code, response) {
				if (response == "true") {
					$location.updateHash('/game')
				}
			})
		}
	})

	this.process = function() {
		if (checkPoint()) {
			var newPlayer = {
				"fuel" : value,
				"food" : value2,
				"cargo" : value3
			};

			$xhr('POST', '/process', newPlayer, function(code, response) {
				self.x = response;
			});

			window.location = "/app/index.html#/game";
		}
	};
}
/*-------------- End of Customise ---------------*/
/*-------------- Ranking ---------------*/

function rankingCtrl($xhr) {
	var self = this

	$xhr('GET', '/ranking', function(code, response) {
		self.ranking = response;
	});

}
/*--------------End of Ranking ---------------*/
/*--------------Create Question---------------*/
function createQnCtrl($xhr) {
	// this.mcqtoggle = true;
	this.master = {
		questionType : 'mcq',
		descr : 'description here',
		qnParts : [],
		answer : [],
		ansPos : [],
		user : ''
	};
    this.ansBox = {
        totalR : 1,
        totalC : 1,
        values : [{row:1, columns:[{col:1,word:''}]}]
    };
	this.preview = false;
    this.allClear = true;
	// this.form = this.master;
	if (this.master.questionType == 'mcq') {
		this.cancel();
		this.form.qnParts.push({
			num : '1', qn : ''},
            {num : '2', qn : ''},
            {num : '3', qn : ''},
            {num : '4',qn : ''
		});
	}
    this.changeAnsBox = function(colRow, isAdd) {
        if (isAdd && colRow == 'row'){
            num = this.ansBox.totalR + 1;
            numC = this.ansBox.totalC;
            newCol = [];
            for(x = 1; x <= numC; x++) {
                newCol.push({col:numC,word:''});
            }
            this.ansBox.values.push({row:num, columns:newCol});
            this.ansBox.totalR = num;
        } else if (!isAdd && colRow == 'row'){
            if(this.ansBox.totalR > 1){
                this.ansBox.values.splice(this.ansBox.values.length-1,1);
                this.ansBox.totalR = this.ansBox.totalR - 1;
            }
        } else if (isAdd && colRow == 'col'){
            totalCol = this.ansBox.totalC + 1;
            for(x = 0; x < this.ansBox.totalR; x++) {
                this.ansBox.values[x].columns.push({col:totalCol,word:''});
            }
            this.ansBox.totalC = totalCol;
        } else if (!isAdd && colRow == 'col'){
            if(this.ansBox.totalC > 1){
                for(x = 0; x < this.ansBox.totalR; x++){
                    this.ansBox.values[x].columns.splice(this.ansBox.values[x].columns.length-1,1);
                }
                this.ansBox.totalC = this.ansBox.totalC - 1;
            }
        }
    }
    this.helloD = function(elem) {
        check = false;
        checkPos = {};
        for (x = 0; x < this.form.ansPos.length; x++) {
            if(elem.num == this.form.ansPos[x].num) {
                checkPos = this.form.ansPos[x];
            }
        }
        if(checkPos.dir == 'D'){
            check = true;
        }
        return check;
    }
    this.helloA = function(elem) {
        check = false;
        checkPos = {};
        for (x = 0; x < this.form.ansPos.length; x++) {
            if(elem.num == this.form.ansPos[x].num) {
                checkPos = this.form.ansPos[x];
            }
        }
        if(checkPos.dir == 'A'){
            check = true;
        }
        return check;
    }
	this.changeQn = function(qnType) {
		if (qnType == "cross") {
			this.cancel();
			this.form.questionType = qnType;
		} else if (qnType == "drag") {
			this.cancel();
			this.form.questionType = qnType;
		} else {
			this.cancel();
			this.form.questionType = qnType;
			this.form.qnParts.push({
				num : '1',qn : ''}, {num : '2',qn : ''}, {num : '3',qn : ''}, {num : '4',qn : ''});
		}
	}
	this.correctMCQ = function(ansChosen) {
        qn = this.form.qnParts[ansChosen-1]
		this.form.answer = [];
		this.form.answer.push({
			num : qn.num,
			ans : qn.qn
		});
		// document.getElementById()
	};
	this.changeAns = function(a, type) {
		ng: change = "changeAns(qn,'mcq')";
		if (this.form.answer.length > 0 && type == 'mcq') {
			if (this.form.answer[0].num == a.num) {
				this.correctMCQ(a);
			}
		}
        if(type == 'cross') {
            i = a.num-1;
            answer = this.form.answer[i].ans;
            arrayAns = answer.split("");
            position = this.form.ansPos[i].dir;
            posR = this.form.ansPos[i].posR-1;
            posC = this.form.ansPos[i].posC-1;
           // num = 0
            if(position == 'D') {
                if(this.ansBox.totalR < arrayAns.length) {
                    for (x = this.ansBox.values[posR].row-1; x < this.ansBox.totalR; x++) {
                        /*alert(this.ansBox.values[x].columns[posC].word);
                        if(this.ansBox.values[x].columns[posC].word != '' && this.ansBox.values[x].columns[posC].word!=arrayAns[x]){
                            this.allClear = false;
                            alert(this.ansBox.values[x].columns[posC].word);
                            alert(arrayAns[x]);
                            //alert("There is a conflict in your ans!");
                        } else {*/
                            this.ansBox.values[x].columns[posC].word = arrayAns[x];
                       /* }*/
                    }
                } else {
                    for (x = this.ansBox.values[posR].row-1; x < arrayAns.length; x++) {
                       /* alert(this.ansBox.values[x].columns[posC].word);
                        if(this.ansBox.values[x].columns[posC].word != '' && this.ansBox.values[x].columns[posC].word!=arrayAns[x]){
                            this.allClear = false;
                            alert(this.ansBox.values[x].columns[posC].word);
                            alert(arrayAns[x]);
                            //alert("There is a conflict in your ans!");
                        } else {*/
                            this.ansBox.values[x].columns[posC].word = arrayAns[x];
                      /*  }*/
                    }
                }
            } else {
                for (x = this.ansBox.values[posR].columns[posC].col-1; x < this.ansBox.totalC; x++) {
                    /*if(this.ansBox.values[posR].columns[x].word != '' && this.ansBox.values[posR].columns[x].word != arrayAns[x]) {
                        this.allClear = false;
                        return alert("There is a conflict in your ans!");

                    } else {*/
                        this.ansBox.values[posR].columns[x].word = arrayAns[x];
                    /*}*/
                }
            }
        }
		// this.form.answer[0].ans = a;
	}
	this.addQuestion = function(direction) {
		/*
		 * number = angular.Array.count(this.form.answer); countNum = 0; if
		 * (number > 0) { countNum =
		 * angular.Array.count(this.form.answer[number-1].column); } number++;
		 * list = []; for(x = 1; x <= countNum; x++) { list.push({word: ''}); }
		 */
		number = this.form.qnParts.length + 1;
		this.form.qnParts.push({
			num : (number).toString(),
			qn : ''
		});
		this.form.answer.push({
			num : (number).toString(),
			ans : ''
		});
		this.form.ansPos.push({
			num : (number).toString(),
			dir : direction,
			posR : '1',
			posC : '1'
		});
	};
	this.changePos = function(qn, type, add, number) {
		numberR = parseInt(this.form.ansPos[number].posR);
		numberC = parseInt(this.form.ansPos[number].posC);
		if (type == 'row') {
			if (add) {
                if(numberR < this.ansBox.totalR) {
                    numberR += 1;
                }
			} else {
				if (numberR > 1) {
					numberR -= 1;
				}
			}
		} else {
			if (add) {
                if(numberC < this.ansBox.totalC) {
				    numberC += 1;
                }
			} else {
				if (numberC > 1) {
					numberC -= 1;
				}
			}
		}
		this.form.ansPos[number].posC = numberC.toString();
		this.form.ansPos[number].posR = numberR.toString();
	};
	this.remove = function(qn) {
		number = 0;
		for (x = 0; x < this.form.qnParts.length; x++) {
			if (this.form.qnParts[x].num == qn.num) {
				number = x;
			}
		}
        for(x=number; x < this.form.qnParts.length; x++) {
            this.form.qnParts[x].num -=1;
        }
        for(x=number; x < this.form.answer.length; x++) {
            this.form.answer[x].num -=1;
        }
        for(x=number; x < this.form.ansPos.length; x++) {
            this.form.ansPos[x].num -=1;
        }
		this.form.qnParts.splice(number, 1);
		this.form.answer.splice(number, 1);
		this.form.ansPos.splice(number, 1);
		// this.form.answer.remove(qn);
	}
	this.previewAns = function() {
        array = [];
        for(x = 0;x < this.form.answer.length; x++) {
            answer = this.form.answer[x].ans;
            qn = this.form.qnParts[x].qn;
            dir = 0;
            if(this.form.ansPos[x].dir == 'D'){
                dir = 1;
            }
            row = parseInt(this.form.ansPos[x].posR)-1;
            col = parseInt(this.form.ansPos[x].posC)-1;
            var c = new oyCrosswordClue(answer.length,qn,answer, '26f265b96e01081a5ef26a432eda9cff',dir,row,col);
            array.push(c);
        }
        var oygCrosswordPuzzle = new oyCrosswordPuzzle (
            "5748185539682739085",
            "/app/puzzle",
            "/a/a",
            "This is a crossword puzzle",
            "Testing",
            array,
            this.ansBox.totalR,this.ansBox.totalC);
        oygCrosswordPuzzle.canTalkToServer = false;
        if (!oygInit){
            oygError =
                "There was an error requesting puzzle data from the server.\n" +
                    "Please try again shortly or send us a note about the problem."
        } else {
            oygBind(oygCrosswordPuzzle);
        }
        if (oygError){
            alert(oygError);
        }
        this.preview = true;
	}
	this.hideAns = function() {
		this.preview = false;
	}
	this.save = function() {
        if(this.allClear) {
		jsonObj = angular.toJson(this.form);
		$xhr('POST', '/question/createqn', jsonObj, function(code, response) {
			alert("Done!");
			window.location = "/";
		}, function() {
			"Request failed";
		});
        } else {
            alert("There are some errors in the ans!");
        }
	}
}

createQnCtrl.prototype = {
	cancel : function() {
		this.form = angular.copy(this.master);
	}
};
/*----------End of Creating Qn function-----------*/

/*----------Start of Managing Qn function-----------*/
function manageQnCtrl($xhr, $location) {
	var self = this;
	var scope = angular.scope();

	self.warning = true;

	self.hideWarning = function() {
		self.warning = false;
	}

	$xhr('GET', '/question/manageqn', function(code, response) {
		self.qns = response;
	}, function(code, response) {
		"Request failed";
	});
	this.remove = function(qn) {
		$xhr('POST', '/question/removeqn', qn, function(code, response) {
			window.location.reload();
		}, function(code, response) {
			"Request failed";
		});
	};
	this.edit = function(qn) {
		var manage = document.getElementById("qnList");
		var edit = document.getElementById("edit");
		this.form = qn;
		if (manage.style.display == "") {
			manage.style.display = "none";
			edit.style.display = "";
		} else {
			manage.style.display = "";
		}
		// $xhr('POST','/question/editqn',qn,function(code,response){
		// $location.updateHash('/question/editqn');
		// }, function(code, response){
		// "Request failed";
		// });
	};
	this.cancel = function() {
		createQnCtrl($xhr).cancel();
	};
	this.addRow = function() {
		createQnCtrl($xhr).addRow;
	};
	this.save = function() {
		createQnCtrl($xhr).save;
	}
	this.addCol = function() {
		createQnCtrl($xhr).addCol
	};
}
/*------------End of managing Qn----------------------------*/
/*--------------------editing of Qn-------------------------*/
function editQnCtrl($xhr) {
	$xhr('GET', '/question/manageqn', function(code, response) {
		reply = response;
		alert("Here!");
	}, function(code, response) {
		"Request failed";
	});

}
/*-------------------------------------------------*/
/*--------------------preview of 1 Qn-------------------------*/
function staticQnCtrl($xhr) {
    var self = this;
    self.qn = {};
    key = this.params.qnKey;
    url = '/staticqn?key=' + key;
    $xhr('GET', url,function(code, response) {
        reply = response;
        self.qn['questionDescr'] = response['questionDescr'];
        self.qn['questionType'] = response['questionType'];
        self.qn['userId'] = response['userId'];
        self.qn['key'] = response['key'];
        self.qn['qnParts'] = [];
        for(x = 0; x < response['qnParts'].length; x+=2){
            self.qn['qnParts'].push({num:response['qnParts'][x],qn:response['qnParts'][x+1]});
        }
    }, function(code, response) {
        "Request failed";
    });

}
/*--------------------end of preview of 1 Qn-------------------------*/