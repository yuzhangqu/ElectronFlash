function Single(total, time) {
    this.total = total;
    this.nums = new Array(total);
    this.millisec = time * 1000;
    this.answer = 0;
}

Single.prototype.nextNum = function(old) {
    var temp = 0;
    do {
        if (this.answer < 5) {
            if (randomInt(0, 8 - this.answer) >= this.answer) {
                temp = randomInt(0, 4 - this.answer);
                if (temp == 0 || randomInt(0, 1)) {
                    temp += 5;
                }
            }
            else {
                temp = 0 - randomInt(1, this.answer);
            }
        }
        else {
            if (randomInt(0, this.answer - 1) >= 9 - this.answer) {
                temp = 0 - randomInt(0, this.answer - 5);
                if (temp == 0 || randomInt(0, 1)) {
                    temp -= 5;
                }
            }
            else {
                temp = randomInt(1, 9 - this.answer);
            }
        }
    } while (temp == old)
    
    return temp;
}

Single.prototype.generate = function() {
    var old = 0;
    for (var i = 0; i < this.total; i++) {
        var temp = this.nextNum(old);
        this.nums[i] = temp;
        this.answer += temp;
        old = temp;
    }
}

var timegap = [0, 6, 7, 9, 10, 12];  // 0.几秒
var headText = "直加直减闪电心算 -";
var numVal = 10; // 总笔数
var speed = timegap[1];  // 一笔0.几秒

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
    $(".card-header").text(headText + " " + numVal + "笔 " + speed/10 + "秒/笔");
}

function go() {
    if ($("#go").hasClass("disabled")) {
        return false;
    }
    quiz = new Single(numVal, numVal * speed / 10);
    quiz.generate();
    showTitle();
    removetips(25);
    $("#go").addClass("disabled");
    $(".fa").addClass("fa-spin");
    setTimeout(repeat(0, 3, 1000, showCount), 0);
    setTimeout(repeat(0, 3, 1000, showMask), 0);
}

function speedup() {
    if ($("#go").hasClass("disabled")) {
        return false;
    }

    if (speed <= 1) {
        return false;
    }
    speed -= 1;
    showTitle();
}

function slowdown() {
    if ($("#go").hasClass("disabled")) {
        return false;
    }

    if (speed >= 99) {
        return false;
    }
    speed += 1;
    showTitle();
}