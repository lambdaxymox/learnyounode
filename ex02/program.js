function Maybe (value) {
    this.value = value;
}

Maybe.prototype.isSome = function () {
    if (this.value !== undefined) {
        return true;
    } else {
        return false;
    }
};

Maybe.prototype.isNone = function () {
    return !this.isSome();
};

Maybe.prototype.toString = function () {
    if (this.isSome()) {
        return "Some(" + this.value + ")";
    } else {
        return "None";
    }
};


var sum = function (numbers) {
    var total = 0;
    numbers.forEach(function (number) {
        total += number;
    });

    return total;
};


var parseNumber = function (inputString) {
    var result = Number(inputString);
    if (isNaN(result)) {
        return new Maybe(undefined);
    } else {
        return new Maybe(result);
    }
};


var parseInputVector = function (inputVector, parser) {
    
    var outputVector = new Array();

    inputVector.forEach(function (value) {
        outputVector.push(parser(value));
    });

    return outputVector
};


var cleanedAndParsedInputVector = function (inputVector, parser) {
    
    var outputVector = parseInputVector(inputVector, parser);
    var cleanedOutputVector = [];
    outputVector.forEach(function (entry) {
        if (entry.isSome()) {
            cleanedOutputVector.push(entry);
        }
    });

    return cleanedOutputVector;
};


var extractNumbers = function (inputVector) {
    var outputVector = cleanedAndParsedInputVector(inputVector, parseNumber);
    var numbers = [];
    outputVector.forEach(function (entry) {
        numbers.push(entry.value);
    });

    return numbers;

};


var main = function () {
    var args = new Array();
    var numbers = new Array();

    for(var i = 2; i < process.argv.length; i++) {
        args.push(process.argv[i]);
    }

    numbers = extractNumbers(args);
    console.log(sum(numbers));
}

main();