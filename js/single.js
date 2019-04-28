function Single(total, time) {
    this.total = total;
    this.nums = new Array(total);
    this.millisec = time * 1000;
    this.answer = 0;
}

Single.prototype.nextNum = function(old) {
    var ok = false;
    var temp = 0;
    do {
        temp = Math.floor(Math.random() * 10);
        if (temp == 0 || temp == old) {
            ok = false;
        }
        else{
            if (this.answer + temp < 10) {
                ok = true;
            }
            else if (this.answer >= temp) {
                ok = true;
                temp = 0 - temp;
            }
            else {
                ok = false;
            }
        }
    } while (!ok)
    
    return temp;
}

Single.prototype.generate = function() {
    var index = 0;
    var old = 0;

    for (var i = 0; i < this.total; i++) {
        var temp = this.nextNum(old);
        old = temp;
        this.nums[index++] = temp;
        this.answer += temp;
    }
}

var timegap = [0, 0.6, 0.7, 0.9, 1];
var headText = "直加直减闪电心算 -";
var numVal = 10; // 总笔数

function init() {
    showTitle();

    $("#num_selector button").click(function() {
        $(this).addClass("active").siblings().removeClass("active");
        numVal = parseInt($(this).attr("value"));
        showTitle();
    });

    $(window).resize(adjustInit);
    adjustInit();
}

function showQuiz(begin, end) {
    if (begin == end) {
        showtips();
        $("#go").removeClass("disabled");
        $(".fa").removeClass("fa-spin");
        $(".card-text").removeClass("negative");
    } else {
        if (quiz.nums[begin] < 0) {
            $(".card-text").addClass("negative");
        } else {
            $(".card-text").removeClass("negative");
        }
        $(".card-text").number(quiz.nums[begin]);
    }
}

function showCount(begin, end) {
    if (begin == end) {
        $(".card-text").text("");
        setTimeout(repeat(0, quiz.total, quiz.millisec / quiz.total, showQuiz), 0);
    } else {
        $(".card-text").text(countStrs[begin]);
        if (begin < end - 1) {
            beep1();
        } else {
            beep2();
        }
    }
}

function showAnswer() {
    if ($(".card-text").text().length > 0) {
        $(".card-text").text("");
        $(".card-text").removeClass("negative");
    } else {
        if (quiz.answer < 0) {
            $(".card-text").addClass("negative");
        } else {
            $(".card-text").removeClass("negative");
        }
        $(".card-text").number(quiz.answer);
    }
}

function showTitle() {
    $(".card-header").text(headText + " " + numVal + "笔 ");
}

function go() {
    if ($("#go").hasClass("disabled")) {
        return false;
    }
    quiz = new Single(numVal, numVal * 0.4);
    quiz.generate();
    showTitle();
    removetips(25);
    $("#go").addClass("disabled");
    $(".fa").addClass("fa-spin");
    setTimeout(repeat(0, 3, 1000, showCount), 0);
    setTimeout(repeat(0, 3, 1000, showMask), 0);
}
