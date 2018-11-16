var matchAnswer = angular.module('matchAnswer', [])

.factory('MatchAnswer', function ($http) {


    var countTimer = 90;
    var questions = [{
        id: 1,
        quesNo: "Q1",
        question: "",
        image:"ajit.png",
        image2:"jasvit-singh.png",
        model: "quest1",
        options: [{
            "id": "radio1",
            "name": "Ajit Singh | Jasvir Singh",
            answer: true

        }, {
            "id": "radio2",
            "name": "Somvir Shekhar | Manoj Dhull"

        }, {
            "id": "radio3",
            "name": "Manoj Dhull | Tushar Patil"

        }, {
            "id": "radio4",
            "name": "Kamal Kishor Manoj Dhull"
        }]
    }, {
        id: 2,
        quesNo: "Q2",
        question: "",
        image: "santhapalsevalam.png",
        image2:"tushar-patil.png",
        model: "quest2",
        options: [{
            "id": "radio1",
            "name": " Kamal Kishor | Manoj Dhull",
            
        }, {
            "id": "radio2",
            "name": "Santhapalsevalam | Tushar Patil",
            answer: true
        }, {
            "id": "radio3",
            "name": "Manoj Dhull | Manjeet Chhillar"
        }, {
            "id": "radio4",
            "name": "Manjeet Chhillar | Kamal Kishor"
        }]
    }];
    var answered;

    return {

        changeTimerMatch: function () {
            var matchTimer = $.jStorage.get("matchTimer");
            var returnVal;
            if (matchTimer && matchTimer != 1) {
                returnVal = matchTimer - 1;
                $.jStorage.set("matchTimer", returnVal);
            } else if (matchTimer != 1) {
                returnVal = countTimer;
                $.jStorage.set("matchTimer", returnVal);
            } else {
                $.jStorage.set("matchTimer", null);
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