function Group(digits, total, mix, negative, time) {
    this.digits = digits;
    this.total = total;
    this.mix = mix;
    this.negative = negative;
    this.nums = new Array(total);
    this.generator = new Array();
    this.millisec = time * 1000;
    this.answer = 0;
}

Group.prototype.generate = function(qIndex) {
    do {
        var index = 0;
        this.generator.splice(0, this.generator.length);

        if (qIndex >= this.mix) {
            for (var i = 0; i < this.total - this.negative; i++) {
                this.nums[index++] = this.nextPositiveInt();
            }
            for (var i = 0; i < this.negative; i++) {
                this.nums[index++] = this.nextNegativeInt();
            }
        } else {
            for (var i = 0; i < this.total; i++) {
                this.nums[index++] = this.nextPositiveInt();
            }
        }
    } while (this.negativeSum());

    this.answer = this.nums.reduce(
        function(a, b) {
            return a + b;
        }, 0);

    do {
        for (var i = this.total - 1; i > 0; i--) {
            this.swap(i, Math.floor(Math.random() * (i + 1)));
        }
    } while (this.invalid());
}

Group.prototype.nextPositiveInt = function() {
    if (this.generator.length == 0) {
        for (var i = Math.pow(10, this.digits - 1); i < Math.pow(10, this.digits); i++) {
            this.generator.push(i);
        }
        for (var i = this.generator.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = this.generator[i];
            this.generator[i] = this.generator[j];
            this.generator[j] = temp;
        }
    }
    return this.generator.pop();
}

Group.prototype.nextNegativeInt = function() {
    return 0 - this.nextPositiveInt();
}

Group.prototype.negativeSum = function() {
    var sum = 0;
    for (var i = 0; i < this.total; i++) {
        sum += this.nums[i];
    }
    return sum < 0;
}

Group.prototype.swap = function(i, j) {
    var temp = this.nums[i];
    this.nums[i] = this.nums[j];
    this.nums[j] = temp;
}

Group.prototype.invalid = function() {
    var old = this.nums[0];
    var sum = old;

    if (sum < 0) {
        return true;
    }

    for (var i = 1; i < this.total; i++) {
        sum += this.nums[i];
        if (sum < 0 || old == this.nums[i] || old + this.nums[i] == 0) {
            return true;
        }
        old = this.nums[i];
    }
    return false;
}

function Group1() {
    Group.call(this, 2, 5, 2, 2, 4);
}
Group1.prototype = Object.create(Group.prototype);
Group1.prototype.constructor = Group1;

function Group2() {
    Group.call(this, 2, 10, 2, 3, 7);
}
Group2.prototype = Object.create(Group.prototype);
Group2.prototype.constructor = Group2;

function Group3() {
    Group.call(this, 2, 15, 2, 5, 10);
}
Group3.prototype = Object.create(Group.prototype);
Group3.prototype.constructor = Group3;

function Group4() {
    Group.call(this, 3, 5, 2, 2, 5);
}
Group4.prototype = Object.create(Group.prototype);
Group4.prototype.constructor = Group4;

function Group5() {
    Group.call(this, 3, 10, 2, 3, 10);
}
Group5.prototype = Object.create(Group.prototype);
Group5.prototype.constructor = Group5;

function Group6() {
    Group.call(this, 3, 15, 2, 5, 13);
}
Group6.prototype = Object.create(Group.prototype);
Group6.prototype.constructor = Group6;

function Group7() {
    Group.call(this, 4, 5, 2, 2, 5);
}
Group7.prototype = Object.create(Group.prototype);
Group7.prototype.constructor = Group7;

function Group8() {
    Group.call(this, 4, 10, 2, 3, 10);
}
Group8.prototype = Object.create(Group.prototype);
Group8.prototype.constructor = Group8;

function Group9() {
    Group.call(this, 4, 15, 2, 5, 13);
}
Group9.prototype = Object.create(Group.prototype);
Group9.prototype.constructor = Group9;

function Group10() {
    Group.call(this, 5, 5, 2, 2, 5);
}
Group10.prototype = Object.create(Group.prototype);
Group10.prototype.constructor = Group10;

function Group11() {
    Group.call(this, 5, 10, 2, 3, 10);
}
Group11.prototype = Object.create(Group.prototype);
Group11.prototype.constructor = Group11;

function Group12() {
    Group.call(this, 5, 15, 2, 5, 13);
}
Group12.prototype = Object.create(Group.prototype);
Group12.prototype.constructor = Group12;

function Group13() {
    Group.call(this, 6, 10, 2, 3, 10);
}
Group13.prototype = Object.create(Group.prototype);
Group13.prototype.constructor = Group13;

function Group14() {
    Group.call(this, 6, 15, 2, 5, 13);
}
Group14.prototype = Object.create(Group.prototype);
Group14.prototype.constructor = Group14;

function Group15() {
    Group.call(this, 6, 20, 2, 7, 16);
}
Group15.prototype = Object.create(Group.prototype);
Group15.prototype.constructor = Group15;
