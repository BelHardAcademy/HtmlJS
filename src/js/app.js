var currentYear = new Date().getFullYear();

init();

function init(){
    setCopyrightDates();
}


function setCopyrightDates(){
    if (currentYear > 2016) {
        var copyYear = document.getElementById('currentYear');
        copyYear.innerText = ` - ${currentYear}`;
    }
}