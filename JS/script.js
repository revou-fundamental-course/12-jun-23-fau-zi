//1st function

function ValidateTemperatureCalculatorForm()
{
    _cmnRemoveAllErrorMessage();
    
    var inputTemperature = document.getElementById("inputTemperature").value;
    if(inputTemperature == "" || isNaN(inputTemperature) || Number(inputTemperature) <= 0)
    {
        _cmnShowErrorMessageBottomOfTheInputField("inputTemperature", "Enter valid temperature.");
        return false;
    }
    return true;
}

function ResetTemperatureCalculator()
{
    if(confirm("Are you sure want to reset the calculator?")){
        document.getElementById("inputTemperature").value = "";
        document.getElementById("toUnit").value = "Fahrenheit";
        document.getElementById("fromUnit").value = "Celsius";
        document.getElementById("outputTemperature").value = "";

        document.getElementById("temperatureResult").innerHTML = "";
        document.getElementById("temperatureFormula").innerHTML = "";
        
        _cmnRemoveAllErrorMessage();

        _cmnHideElement("OutputResult");
        _cmnShowElement("OutputInfo", "flex");
    }
}

function CalculateTemperature()
{
    if(ValidateTemperatureCalculatorForm())
    {
        var fromUnit = document.getElementById("fromUnit").value;
        var toUnit = document.getElementById("toUnit").value;
        var inputTemperature = document.getElementById("inputTemperature").value;
        var outputTemperature = document.getElementById("outputTemperature");
        
        ShowFormula(fromUnit, toUnit);
        
        var result = ConverterTemperature(inputTemperature,  fromUnit,  toUnit);
        
        outputTemperature.value = result.toFixed(2);
        document.getElementById("temperatureResult").innerHTML = formatResult(inputTemperature,result,fromUnit,toUnit);

        //result div show
        _cmnHideElement("OutputInfo");
        _cmnShowElement("OutputResult", "flex");
    }
}

function ConverterTemperature(inputTemperature,  fromUnit,  toUnit)
{
    fromUnit = fromUnit.toLowerCase();
    toUnit = toUnit.toLowerCase();
    inputTemperature = Number(inputTemperature);
    var outputTemperature;

    if (fromUnit == "celsius")
    {
        if (toUnit == "fahrenheit")
        {
            outputTemperature = (inputTemperature * (9 / 5) + 32);
        }
    }
    else if (fromUnit == "fahrenheit")
    {
        if (toUnit == "celsius")
        {
            outputTemperature = (inputTemperature - 32) * 5/9;
        }
    }
    return outputTemperature;
}

function ShowFormula(fromUnit,toUnit)
{
    const formulaJSONobj = JSON.parse(formula);
    for(var i = 0; i <formulaJSONobj.conversions.length; i++)
    {            
        if(
            formulaJSONobj.conversions[i].from.toLowerCase() == fromUnit.toLowerCase() 
            && formulaJSONobj.conversions[i].to.toLowerCase() == toUnit.toLowerCase()
            )
        {
            document.getElementById("temperatureFormula").innerHTML = formulaJSONobj.conversions[i].formula;
        }
    }
}

function formatResult(inputTemperature,outputTemperature,fromUnit,toUnit){

    if(fromUnit.toLowerCase() == 'celsius'){
        fromUnit = '℃';
    }else if(fromUnit.toLowerCase() == 'fahrenheit'){
        fromUnit = '℉'
    }

    if(toUnit.toLowerCase() == 'celsius'){
        toUnit = '℃';
    }else if(toUnit.toLowerCase() == 'fahrenheit'){
        toUnit = '℉'
    }

    return inputTemperature + fromUnit + ' = ' + outputTemperature + toUnit;
}



// 2nd function

function _cmnRemoveAllErrorMessage()
{
    var allErrorBorder = document.getElementsByClassName('tool-error-border');
	var allErrorMessage = document.getElementsByClassName('tool-error-message');
	var i;
    // remove border
    for(i = (allErrorBorder.length) - 1; i>=0; i--)
    {
        allErrorBorder[i].classList.remove("tool-error-border");
    }
    // remove error message
    for(i = (allErrorMessage.length) - 1; i>=0; i--)
    {
        allErrorMessage[i].remove();
    }	  
}

function _cmnShowErrorMessageBottomOfTheInputField(fieldID,errorMessage)
{
    var inputField = document.getElementById(fieldID);   
    inputField.classList.add("tool-error-border"); // add border
    inputField.focus(); // focus error field
    
    var errorMessageElement = document.createElement("p"); // create a p tag for error message
    errorMessageElement.innerHTML = errorMessage; // set the error message in the p tag
    errorMessageElement.classList.add("tool-error-message"); // add the error message stye class
    inputField.parentNode.insertBefore(errorMessageElement, inputField.nextSibling); // set the error message under the error field
}

function _cmnHideElement(elementId)
{
    var displayProperty = document.getElementById(elementId).style.display;
    if(displayProperty != 'none')
    {
        document.getElementById(elementId).style.display = "none";
    }
}

function _cmnShowElement(elementId, givenDisplayProperty)
{
    var displayProperty = document.getElementById(elementId).style.display;
    if(displayProperty != givenDisplayProperty)
    {
        document.getElementById(elementId).style.display = givenDisplayProperty;
    }
}



// formula

var formula = `{
    "conversions": [
        {
            "from": "Celsius",
            "to": "Fahrenheit",
            "formula": "F = (9/5)C + 32"
        },
        {
            "from": "Celsius",
            "to": "Celsius",
            "formula": "C = C"
            
        },
        {
            "from": "Fahrenheit",
            "to": "Celsius",
            "formula": "C = (F - 32) * 5/9"
        },
        {
            "from": "Fahrenheit",
            "to": "Fahrenheit",
            "formula": "F = F"
        }
    ]
}`