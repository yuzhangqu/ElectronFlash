var gStrs = ["第{0}组", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二", "十三", "十四", "十五"];
var qStrs = ["第{1}题", "1", "2", "3"];
var headText = "学前组视频心算题 - ";
var template = gStrs[0] + " " + qStrs[0];
var gIndex = 1;
var qIndex = 1;
var gObjs = new Array(16);

function init() {
    showTitle();
    gObjs[1] = new Group1();
    gObjs[2] = new Group2();
    gObjs[3] = new Group3();
    gObjs[4] = new Group4();
    gObjs[5] = new Group5();
    gObjs[6] = new Group6();
    gObjs[7] = new Group7();
    gObjs[8] = new Group8();
    gObjs[9] = new Group9();
    gObjs[10] = new Group10();
    gObjs[11] = new Group11();
    gObjs[12] = new Group12();
    gObjs[13] = new Group13();
    gObjs[14] = new Group14();
    gObjs[15] = new Group15();

    $(window).resize(adjustInit);
    adjustInit();
}

function showQuiz(begin, end) {
    if (begin == end) {
        showtips();
        $("#go").removeClass("disabled");
        $("#go_icon").removeClass("fa-spin");
        $(".card-text").removeClass("negative-hubei");
        flushButton();
    } else {
        if (gObjs[gIndex].nums[begin] < 0) {
            $(".card-text").addClass("negative-hubei");
        } else {
            $(".card-text").removeClass("negative-hubei");
        }
        $(".card-text").number(gObjs[gIndex].nums[begin]);
    }
}

function showCount(begin, end) {
    if (begin == end) {
        $(".card-text").text("");
        setTimeout(repeat(0, gObjs[gIndex].total, gObjs[gIndex].millisec / gObjs[gIndex].total, showQuiz), 0);
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
        $(".card-text").removeClass("negative-hubei");
    } else {
        if (gObjs[gIndex].answer < 0) {
            $(".card-text").addClass("negative-hubei");
        } else {
            $(".card-text").removeClass("negative-hubei");
        }
        $(".card-text").number(gObjs[gIndex].answer);
    }
}

function prevGroup() {
    if ($("#prev").hasClass("disabled")) {
        return false;
    }
    gIndex--;
    qIndex = 1;
    flushButton();
    resumePlayButton();
    showTitle();
}

function prevQuiz() {
    if ($("#prev_mini").hasClass("disabled")) {
        return false;
    }
    qIndex--;
    if (qIndex < 1) {
        gIndex--;
        qIndex = gObjs[gIndex].mix;
    }
    flushButton();
    resumePlayButton();
    showTitle();
}

function nextQuiz() {
    if ($("#next_mini").hasClass("disabled")) {
        return false;
    }
    qIndex++;
    if (qIndex > gObjs[gIndex].mix) {
        gIndex++;
        qIndex = 1;
    }
    flushButton();
    resumePlayButton();
    showTitle();
}

function nextGroup() {
    if ($("#next").hasClass("disabled")) {
        return false;
    }
    gIndex++;
    qIndex = 1;
    flushButton();
    resumePlayButton();
    showTitle();
}

function flushButton() {
    enableAll();

    if (gIndex == 1) {
        $("#prev").addClass("disabled");
        if (qIndex == 1) {
            $("#prev_mini").addClass("disabled");
        }
    }

    if (gIndex == (gStrs.length - 1)) {
        $("#next").addClass("disabled");
        if (qIndex == gObjs[gIndex].mix) {
            $("#next_mini").addClass("disabled");
        }
    }
}

function disableAll() {
    $("#prev").addClass("disabled");
    $("#prev_mini").addClass("disabled");
    $("#go").addClass("disabled");
    $("#next_mini").addClass("disabled");
    $("#next").addClass("disabled");
}

function enableAll() {
    $("#prev").removeClass("disabled");
    $("#prev_mini").removeClass("disabled");
    $("#go").removeClass("disabled");
    $("#next").removeClass("disabled");
    $("#next_mini").removeClass("disabled");
}

function resumePlayButton() {
    $("#go_icon").removeClass("fa-refresh");
    $("#go_icon").addClass("fa-play-circle-o");
}

function showTitle() {
    $(".card-header").text(headText + String.format(template, gStrs[gIndex], qStrs[qIndex]));
}

function go() {
    if ($("#go").hasClass("disabled")) {
        return false;
    }
    removetips(20);
    gObjs[gIndex].generate(qIndex);
    disableAll();
    $("#go_icon").removeClass("fa-play-circle-o");
    $("#go_icon").addClass("fa-refresh fa-spin");
    setTimeout(repeat(0, 3, 1000, showCount), 0);
    setTimeout(repeat(0, 3, 1000, showMask), 0);
}
