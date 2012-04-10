function arcadeCtrl($xhr,$location) {

    var self = this;

    $xhr('GET', '/login', function(code, response) {
        self.loginUrl = response;
    })

    $xhr('GET', '/login/getUsername', function(code,response){
        if(response.name != ""){
            $xhr('GET', '/login', function(code,response){
                $location.updateHash('/game')
            })
        }
    })

    this.intro = "1";

    this.glow = "";

    this.status = {
        "first":'',
        "second":'',
        "third":''
    };

    this.statusProduce = {
        "first":'',
        "second":'',
        "third":''
    };

    this.link = {
        "one" : '2',
        "two" : '1',
        "three" : '#/arcade'
    }

    /*--------------Manage Questions---------------*/

    self.qn ={};
    self.ans = 0;
    $xhr('GET','/question/randomqn',function(code, response) {
        self.retrieved = response;
        self.qn['questionDescr'] = self.retrieved['questionDescr'];
        self.qn['questionType'] = self.retrieved['questionType'];
        self.qn['userId'] = self.retrieved['userId'];
        self.qn['key'] = self.retrieved['key'];
        self.qn['qnParts'] = [];
        self.qn['ansList'] = [];
        for(x = 0; x < self.retrieved['qnParts'].length; x+=2){
            self.qn['qnParts'].push({num:self.retrieved['qnParts'][x],qn:self.retrieved['qnParts'][x+1]});
        }
        for(x = 0; x < self.retrieved['ansList'].length; x+=2){
            self.qn['ansList'].push({num:self.retrieved['ansList'][x],ans:self.retrieved['ansList'][x+1]});
        }
    }, function(){
        alert("Request failed");
    });
    this.submit = function(check,type){
        if(type == 'mcq'){
            if(check.toString() == self.qn['ansList'][0]['num']) {
                this.complete(1);
            } else {
                alert("It is not correct!");
            }
        }
    }
    /*-----------End of Manage Questions------------*/
    this.statusMsg = "Get started in 3 easy steps.";

    this.highlight = {
        "one": {color:'#94E01B'},
        "two" : {color:'black'},
        "three" : {color:'black'}
    };

    this.highlightProduce = {
        one : {color:'#94E01B'},
        two : {color:'#94E01B'},
        three : {color:'#94E01B'}
    };

    this.currentPlayer = {
        "email":"Arcade Mode",
        "gem":0,
        "move":0,
        "fuel":0,
        "cargo":0,
        "food":0
    };

    self.ptoggle = false;

    self.complete = function (step) {
        if (step==1) {
            self.intro = "1";
            self.highlight = {
                one : {color:'#702C37'},
                two : {color:'#94E01B'},
                three : {color:'black'}
            };
            self.link.one = '1';
            self.link.two = '3';
            self.status.first = '3';
            self.statusMsg = "Not bad! Now, reward yourself.";
            self.glow = {
                '-webkit-animation-name': 'pulse2',
                '-webkit-animation-duration': '2s',
                '-webkit-animation-iteration-count': 'infinite',
            };
        }
        else if (step==2) {
            self.intro = "1";
            self.link.one = '1';
            self.link.two = '1';
            self.link.three='go';
            self.highlight = {
                one : {color:'#702C37'},
                two : {color:'#702C37'},
                three : {color:'#94E01B'}
            };
            self.status.first = '3';
            self.status.second = '3';
            self.statusMsg = "A bona fide governor you are. Only 1 step left.";
        }
    }

    self.updateStatus = function () {
        if (self.currentPlayer.fuel>0) {
            self.highlightProduce.one = {color:'#702C37'};
            self.statusProduce.first = '3';
        }
        if (self.currentPlayer.cargo>0) {
            self.highlightProduce.two = {color:'#702C37'};
            self.statusProduce.second = '3';
        }
        if (self.currentPlayer.food>0) {
            self.highlightProduce.three = {color:'#702C37'};
            self.statusProduce.third = '3';
        }
        if (self.currentPlayer.fuel>0 && self.currentPlayer.cargo>0 && self.currentPlayer.food>0) {
            self.intro = 4;
        }
    }

    self.trade = function (type) {
        if (type=="accepted") {
            self.currentPlayer.fuel -= 1;
            self.currentPlayer.gem += 20;
        } else {
            self.currentPlayer.fuel -= 1;
            self.currentPlayer.gem += 20;
        }
        self.complete(2);
    }

    self.produce = function (type) {
        //If no type passed in, show/ hide the Produce panel
        if (type=="toggle") {
            if (self.ptoggle==0) {
                self.ptoggle = 1;
            } else {
                self.ptoggle = 0;
            }

            //If type passed in, update player's stats accordingly
        } else {
            switch (type) {
                case 1:
                    //gem, move, fuel, cargo, food
                    self.currentPlayer.fuel += 1;
                    self.currentPlayer.move -= 1;
                    self.updateStatus();
                    break;
                case 2:
                    self.currentPlayer.cargo += 1;
                    self.currentPlayer.move -= 1;
                    self.updateStatus();
                    break;
                case 3:
                    self.currentPlayer.food += 1;
                    self.currentPlayer.move -= 1;
                    self.updateStatus();
                    break;
                default:
                    break;
            }
        }
    }
}

function completequickstartCtrl($xhr, $location) {

    var self = this;

    $xhr('GET', '/login', function(code, response) {
        self.loginUrl = response;
        window.location = self.loginUrl;
    });
}