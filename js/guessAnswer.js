var guessAnswer = angular.module('guessAnswer', [])

.factory('GuessAnswer', function ($http) {


    var countTimer = 90;
    var questions = [{
        id: 1,
        quesNo: "Q1",
        question: "",
        image:"ajit.png",
        model: "quest1",
        options: [{
            "id": "radio1",
            "name": "Ajit Singh",
            answer: true

        }, {
            "id": "radio2",
            "name": "Somvir Shekhar"

        }, {
            "id": "radio3",
            "name": "Manoj Dhull"

        }, {
            "id": "radio4",
            "name": "Kamal Kishor"
        }]
    }, {
        id: 2,
        quesNo: "Q2",
        question: "",
        image: "jasvit-singh.png",
        model: "quest2",
        options: [{
            "id": "radio1",
            "name": " Kamal Kishor",
            
        }, {
            "id": "radio2",
            "name": "Jasvir Singh",
            answer: true
        }, {
            "id": "radio3",
            "name": "Manoj Dhull"
        }, {
            "id": "radio4",
            "name": "Manjeet Chhillar"
        }]
    }, {
        id: 3,
        quesNo: "Q3",
        question: "",
        image: "santhapalsevalam.png",
        model: "quest3",
        options: [{
            "id": "radio1",
            "name": "Manjeet Chhillar",
            
        }, {
            "id": "radio2",
            "name": "Nitin Rawal"
        }, {
            "id": "radio3",
            "name": "Santhapalsevalam",
            answer: true

        }, {
            "id": "radio4",
            "name": "Abhisehk N."
        }]
    }, {
        id: 4,
        quesNo: "Q4",
        question: "",
        image:"tushar-patil.png",
        model: "quest4",
        options: [{
            "id": "radio1",
            "name": "  Tushar Patil",
            answer: true

        }, {
            "id": "radio2",
            "name": "Santhapanaselvam"
        }, {
            "id": "radio3",
            "name": "Vignesh B"
        }, {
            "id": "radio4",
            "name": "Kamal Kishor"
        }]
    }/*, {
        id: 5,
        quesNo: "Q5",
        question: " Just a Teenager, this Panther is our youngest player on the roster this season, any guesses?",
        model: "quest5",
        options: [{
            "id": "radio1",
            "name": "  Rahul Choudhary",
            answer: true
        }, {
            "id": "radio2",
            "name": "Ajit Singh"
        }, {
            "id": "radio3",
            "name": "Siddharth"
        }, {
            "id": "radio4",
            "name": "Ravinder Kumar"
        }]
    }, {
        id: 6,
        quesNo: "Q6",
        question: "In the recent bidding war, we won this man’s signature ! commanding the rank of Sgt. Af. the nation is in debt to him & we are proud to have him Roar Pink.",
        model: "quest6",
        options: [{
            "id": "radio1",
            "name": " Ravinder Kumar",
            answer: true
        }, {
            "id": "radio2",
            "name": "Siddharth "
        }, {
            "id": "radio3",
            "name": "Sunil Siddhgavali"
        }, {
            "id": "radio4",
            "name": "Ajit Singh"
        }]
    }, {
        id: 7,
        quesNo: "Q7",
        question: "The costliest player in Panther history, this man was also conferred upon the highest prize an athlete can receive in India.",
        model: "quest7",
        options: [{
            "id": "radio1",
            "name": " Manjeet Chhillar",
            answer: true
        }, {
            "id": "radio2",
            "name": "Navneet Gautam"
        }, {
            "id": "radio3",
            "name": "Somvir Shekhar"
        }, {
            "id": "radio4",
            "name": "Selvamani K"
        }]
    }, {
        id: 8,
        quesNo: "Q8",
        question: "Last season’s leading raider with the Pink Panther’s, this man hails from Panipat and won the World Cup in 2016.",
        model: "quest8",
        options: [{
            "id": "radio1",
            "name": " Jasvir Singh.",
            answer: true
        }, {
            "id": "radio2",
            "name": "Ajit Singh"
        }, {
            "id": "radio3",
            "name": "Navneet Gautam"
        }, {
            "id": "radio4",
            "name": "Somvir Shekhar"
        }]
    }, {
        id: 9,
        quesNo: "Q9",
        question: "Our coach for the past 2 seasons and soon to be 3, he is the man who led the Indian National side to the World cup in 2016 & led us all the way to the finals last year.        ",
        model: "quest9",
        options: [{
            "id": "radio1",
            "name": "Balwan Singh",
            answer: true
        }, {
            "id": "radio2",
            "name": "Baskaran Kasinathan "
        }, {
            "id": "radio3",
            "name": "Ravi Shetty"
        }, {
            "id": "radio4",
            "name": "Ashok Shinde"
        }]
    }, {
        id: 10,
        quesNo: "Q10",
        question: "A Panther for the very first time, this All-rounder from the Republic Of Korea, will participate for the very first time in the PKL.",
        model: "quest10",
        options: [{
            "id": "radio1",
            "name": "Donggyu Kim",
            answer: true
        }, {
            "id": "radio2",
            "name": "Jaemin Lee"
        }, {
            "id": "radio3",
            "name": "CHEOL GYU SHIN"
        }, {
            "id": "radio4",
            "name": "GYUNG TAE KIM"
        }]
    }*/];
    var answered;

    return {

        changeTimerGuess: function () {
            var guessTimer = $.jStorage.get("guessTimer");
            var returnVal;
            if (guessTimer && guessTimer != 1) {
                returnVal = guessTimer - 1;
                $.jStorage.set("guessTimer", returnVal);
            } else if (guessTimer != 1) {
                returnVal = countTimer;
                $.jStorage.set("guessTimer", returnVal);
            } else {
                $.jStorage.set("guessTimer", null);
                returnVal = 0;
            }
            return returnVal;
        },
        getTotalTime: function () {
            return countTimer;
        },
        getQuestion: function (questionNo) {
            return questions[questionNo - 1];
        },
        getTotalQuestion: function () {
            return questions.length;
        },
        lastAnswer: function () {
            return questions.length;
        },
        saveAnswer: function (answer) {
            var answered;
            if ($.jStorage.get("Answered")) {
                answered = $.jStorage.get("Answered");
            } else {
                answered = questions;
            }
            console.log(answer);
            var index = _.findIndex(answered, function (question) {
                return (question.id == answer.id);
            });
            console.log(index);
            answered[index] = answer;
            console.log(answered);
            $.jStorage.set("Answered", answered);
        },
        getScore: function () {
            var score;
            var arr = [];
            if ($.jStorage.get("Answered")) {
                answered = $.jStorage.get("Answered");
                arr = _.map(answered, function (n) {
                    return n.options;
                });
                arr = _.flattenDeep(arr);
                var correctAnswer = _.filter(arr, function (n) {
                    return (n.selected && n.answer);
                });
                score = correctAnswer.length;
            } else {
                score = 0;
            }
            $.jStorage.flush();
            return score;
        }

    };
});