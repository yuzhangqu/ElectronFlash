var timegap = [0, 0.8, 1, 1.2, 1.5];
var mixStrs = ["纯加", "混合"];
var headText = "闪电心算 -";
var digitVal = 1; // 位数
var numVal = 10; // 总笔数
var mixIndex = 0; // 混合 OR 纯加
var mixVal = 0; // 负数的笔数
var listenIndex = 1;

function init() {
    showTitle();
    $("#go_listen").hide();

    $("#digit_selector button").click(function() {
        $(this).addClass("active").siblings().removeClass("active");
        digitVal = parseInt($(this).attr("value"));
        showTitle();
    });

    $("#num_selector button").click(function() {
        $(this).addClass("active").siblings().removeClass("active");
        numVal = parseInt($(this).attr("value"));
        showTitle();
    });

    $("#mix_selector button").click(function() {
        $(this).addClass("active").siblings().removeClass("active");
        mixIndex = parseInt($(this).attr("value"));
        showTitle();

        if (mixIndex == 1) {
            mixVal = Math.floor(numVal / 2);
        } else {
            mixVal = 0;
        }
    });

    $(window).resize(adjustInit);
    adjustInit();
}

function showQuiz(begin, end) {
    if (begin == end) {
        showtips();
        $("#go").removeClass("disabled");
        $(".fa").removeClass("fa-spin");
        $(".card-text").removeClass("negative-15vw");
    } else {
        if (quiz.nums[begin] < 0) {
            $(".card-text").addClass("negative-15vw");
        } else {
            $(".card-text").removeClass("negative-15vw");
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
        $(".card-text").removeClass("negative-15vw");
    } else {
        if (quiz.answer < 0) {
            $(".card-text").addClass("negative-15vw");
        } else {
            $(".card-text").removeClass("negative-15vw");
        }
        $(".card-text").number(quiz.answer);
    }
}

function showTitle() {
    $(".card-header").text(headText + " " + digitVal + "位数 " + numVal + "笔 " + mixStrs[mixIndex]);
}

function go() {
    if ($("#go").hasClass("disabled")) {
        return false;
    }
    quiz = new Group(digitVal, numVal, 1, mixVal, numVal * timegap[digitVal]);
    showTitle();
    removetips(15);
    quiz.generate(mixIndex);
    $("#go").addClass("disabled");
    $(".fa").addClass("fa-spin");
    setTimeout(repeat(0, 3, 1000, showCount), 0);
    setTimeout(repeat(0, 3, 1000, showMask), 0);
}

function listen() {
    $(".card-header").text("听心算");
    $(".card-text").text("");
    $("#go").hide();
    $(".mb-1").hide();
    $("#go_listen").show();
    $(".card-block").removeAttr("onclick");
    removetips(8);
    listenIndex = 1;
}

function go_listen() {
    if (listenIndex == 1) {
        listenIndex++;
        $(".card-text").text("867+5+4231+91+865\n+27+496+80+763+3051");
        $(".card-block").click(function() {
            $(".card-text").text("867+5+4231+91+865\n+27+496+80+763+3051\n=10476");
        });
    } else {
        $(".card-text").text("8527+46+1+4096-17\n+5+9524+26-390+94");
        $(".card-block").click(function() {
            $(".card-text").text("8527+46+1+4096-17\n+5+9524+26-390+94\n=21912");
        });
    }
}
