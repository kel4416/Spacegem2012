function gameCtrl($xhr,$location,$resource) {

    var self = this;

    var Player = $resource('/player/get');

    $xhr('GET', '/login/getUsername', function(code,response){
        if(response.name == ""){
            $xhr('GET', '/login', function(code,response){
                $location.updateHash('/login')
            })
        }
    })

    this.currentPlayer = {
        "email":"NULL",
        "gem":0,
        "move":0,
        "fuel":0,
        "cargo":0,
        "food":0
    };

    this.selectedPlayer = {
        "email":"NA",
        "fuel":"NA",
        "cargo":"NA",
        "food":"NA"
    };

    this.tradeFigures = {
        "goods":1,
        "amount":0,
        "price":0
    };

    //Toggle if Trade tab is displayed
    self.ttoggle = false;

    //Toggle if Produce tab is displayed
    self.ptoggle = false;

    //Counter for current trade request displayed
    self.tcounter = 0;

    //Game mode
    self.mode = 'trade';
    self.modeMsg = 'Quiz mode';

    self.swap = function () {
        if (self.mode=='trade') {
            self.quiz();
            self.modeMsg = 'Trade mode';
        }
        else if (self.mode=='game') {
            self.returntogame();
            self.modeMsg = 'Quiz mode';
        }
    };

    //Start of methods---------------------------------------------------------------------

    self.outofmove = function () {
        self.mode='nomove';
        _gaq.push(['_trackPageview', '/app/index.html#outofmoves']);
    }

    self.returntogame = function () {
        self.mode='trade';
        _gaq.push(['_trackPageview', '/app/index.html#game']);
    }

    self.quiz = function () {
        self.mode='game';
        self.modeMsg = 'Trade mode';
        _gaq.push(['_trackPageview', '/app/index.html#quiz']);
    }

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
        self.updateOwnStats();
        u=location.href;
        t=document.title;
        window.open('http://www.facebook.com/sharer.php?u=http://spacegem2012.appspot.com?&t='+encodeURIComponent(t),'sharer','toolbar=0,status=0,width=626,height=436');
    }

    //Function to update stats
    self.setPlayerStats = function (email, gem, move, fuel, cargo, food, spend, share) {
        stats = {
            "email": email,
            "gem": gem,
            "move": move,
            "fuel": fuel,
            "cargo": cargo,
            "food": food,
            "spend": spend,
            "share": share
        }
        $xhr('POST','/player/set',stats,function(code, response) {
            if(response=="Insufficient moves") {
                self.outofmove();
            }
        });
    }

    //Display player's info when player is selected
    self.select = function (email) {
        var player = Player.get({email:email},function() {
            self.selectedPlayer.email = player.email;
            self.selectedPlayer.fuel = player.fuel;
            self.selectedPlayer.cargo = player.cargo;
            self.selectedPlayer.food = player.food;
        });
    }

    //For toggling the Produce panel (if no type passed in)
    //To Produce whatever the user chooses to produce (if type is passed in)
    self.produce = function (type) {
        //If no type passed in, show/ hide the Produce panel
        if (type=="toggle") {
            if (self.ptoggle==0) {
                self.ptoggle = 1;
                self.ttoggle = 0;
            } else {
                self.ptoggle = 0;
            }

            //If type passed in, update player's stats accordingly
        } else {
            switch (type) {
                case 1:
                    //gem, move, fuel, cargo, food
                    self.setPlayerStats(self.currentPlayer.email,0,-1,1,0,0,0,0); //+1 Fuel, -1 move
                    break;
                case 2:
                    self.setPlayerStats(self.currentPlayer.email,0,-1,0,1,0,0,0); //+1 Cargo, -1 move
                    break;
                case 3:
                    self.setPlayerStats(self.currentPlayer.email,0,-1,0,0,1,0,0); //+1 Food, -1 move
                    break;
                default:
                    break;
            }
        }
        //Update model after modifying
        self.updateOwnStats();
    }

    self.trade = function (type) {
        //If no type passed in, show/ hide the Produce panel
        if (type=="toggle") {
            if (self.ttoggle==0) {
                self.ttoggle = 1;
                self.ptoggle = 0;
            } else {
                self.ttoggle = 0;
            }
        } else if (type=="request") {

            tradeRequest = {
                "sender":self.currentPlayer.email,
                "recipient":self.selectedPlayer.email,
                "goods":self.tradeFigures["goods"],
                "amount":self.tradeFigures["amount"],
                "price":self.tradeFigures["price"]
            };

            $xhr('POST','/trade/request',tradeRequest,function(code, response) {
                if (response=="Successful") {
                    self.ttoggle=0;
                }
            });
        } else if (type=="next") {
            if (self.tcounter == self.tradeList.length - 1) {
                self.tcounter=0;
            } else {
                self.tcounter+=1;
            }
        } else if (type=="accepted" || type=="rejected") {
            self.tradeReply = self.tradeList[self.tcounter];
            self.tradeReply["action"]=type;

            $xhr('POST','/trade/reply',self.tradeReply,function(code, response) {
                if (response=="Successful") {
                } else {
                    alert(response);
                }
            });

            //re-initialise values
            self.initialise();

            self.tcounter=0;
        }
    }

    //Function to initialise own stats, get list of other players, and pending trades
    self.initialise = function () {
        $xhr('GET', '/login/getUsername', function(code, response) {
            self.currentPlayer.email=response["name"];
            $xhr('GET', '/player/get?email=' + self.currentPlayer.email, function(code, response) {
                self.result = response;
                self.currentPlayer.gem=self.result["gem"];
                self.currentPlayer.move=self.result["move"];
                self.currentPlayer.fuel=self.result["fuel"];
                self.currentPlayer.cargo=self.result["cargo"];
                self.currentPlayer.food=self.result["food"];
                self.currentPlayer.spend=self.result["spend"];
                self.currentPlayer.share=self.result["share"];
                //Get list of other players
                $xhr('GET', '/player/get', function(code, response) {
                    this.allPlayers = response;
                    this.otherPlayers = [];
                    //Filter out current player's email
                    for (x in this.allPlayers) {
                        if (this.allPlayers[x]!=self.currentPlayer.email) {
                            this.otherPlayers.push(this.allPlayers[x]);
                        }
                    }
                    self.players=otherPlayers;
                });
                //Get list of trade requests
                $xhr('GET', '/trade/list?email=' + self.currentPlayer.email, function(code, response) {
                    self.tradeList = response;
                    for (x in self.tradeList) {
                        if (self.tradeList[x].goods=="1") {
                            self.tradeList[x].goods="fuel";
                        } else if (self.tradeList[x].goods=="2") {
                            self.tradeList[x].goods="cargo";
                        } else if (self.tradeList[x].goods=="3") {
                            self.tradeList[x].goods="food";
                        }
                    }
                });
                ;
            });
        });
    }

    self.updateOwnStats = function () {
        $xhr('GET', '/login/getUsername', function(code, response) {
            self.currentPlayer.email=response["name"];
            $xhr('GET', '/player/get?email=' + self.currentPlayer.email, function(code, response) {
                self.result = response;
                self.currentPlayer.gem=self.result["gem"];
                self.currentPlayer.move=self.result["move"];
                self.currentPlayer.fuel=self.result["fuel"];
                self.currentPlayer.cargo=self.result["cargo"];
                self.currentPlayer.food=self.result["food"];
                self.currentPlayer.spend=self.result["spend"];
                self.currentPlayer.share=self.result["share"];
            });
        });
    }

    //Displaying of 1 question
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
    this.fbShare = function() {
        u=location.href;
        t=document.title;
        window.open('http://www.facebook.com/sharer.php?u=http://spacegem2012.appspot.com/app/index.html%23/staticqn/'+
            self.qn['key']+'?&t='+encodeURIComponent(t),'sharer','toolbar=0,status=0,width=626,height=436');
        //add moves for player
        return false;
    }
    this.submit = function(check,type){
        if(type == 'mcq'){
            if(check.toString() == self.qn['ansList'][0]['num']) {
                self.setPlayerStats(self.currentPlayer.email,0, 3, 0, 0, 0, 0, 0);
                alert("It is correct!");
            } else {
                alert("It is not correct!");
            }
        }
        window.location.reload();
        //self.mode = 'trade';
    }
    //End of methods---------------------------------------------------------------------


    //Initialise
    self.initialise();
}

gameCtrl.$inject = ['$xhr','$location','$resource'];