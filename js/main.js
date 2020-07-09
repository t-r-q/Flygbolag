// ---   function get Page Name.----------------------------------------------
var path = window.location.pathname;
var page = path.split("/").pop();


//**************  Person Class ******************
class Person {
    constructor(fName, lName, pernr, clastyp, seatnr) {
        this.firstName = fName || "unknown";
        this.lastName = lName || "unknown";
        this.personnr = pernr || "000000-0000";
        this.classType = clastyp || "unknown";
        this.seatNumber = seatnr || 30;
        Object.defineProperties(this, {
            "fName": {
                get: function () {
                    return this.firstName;
                },
                set: function (value) {
                    this.firstName = value;
                }
            },
            "lName": {
                get: function () {
                    return this.lastName;
                },
                set: function (value) {
                    this.lastName = value;
                }
            },
            "pernr": {
                get: function () {
                    return this.personnr;
                },
                set: function (value) {
                    this.personnr = value;
                }
            },
            "clastyp": {
                get: function () {
                    return this.classType;
                },
                set: function (value) {
                    this.classType = value;
                }
            },
            "seatnr": {
                get: function () {
                    return this.seatNumber;
                },
                set: function (value) {
                    this.seatNumber = value;
                }
            }
        });
    }

    fullInfo() {
        return "First Name: " + this.firstName
            + " Last Name: " + this.lastName
            + "Social Number: " + this.personnr
            + "Class Type: " + this.classType
            + "Seat Number: " + this.seatNumber;
    }
}


// ------    Bildnamnen  --------------
// If employees Initialize array has photos for employees
if (page === "employees.html") {
    var images = ["01.jpg", "02.jpg", "03.jpg", "04.jpg"];
}

// If ourfleet Initialize array has fleet photos
else if (page === "ourfleet.html") {
    var images = ["p1.jpg", "p2.jpg", "p3.jpg", "p4.jpg"];
}

/* If booking page Initialize variables and array
and create person class for get user information */
else if (page === "booking.html") {
    var coordArr = [];
    var stolBoket = [];
}

var img = []; // definition av en tom array

//----------  Initialization small photos Album---------------------------------
function init() {
    for (var i = 0; i < images.length; i++) {
        img[i] = new Image();
        img[i].src = "img/small/" + images[i];
        img[i].className = ("left-photos");
        img[i].style.width = '190px';
        img[i].style.height = '150px';
        img[i].alt = (images[i]);
        img[i].setAttribute('onclick', "getBigIMG(alt);");
        document.getElementById("left-aside").appendChild(img[i]);
    }
}

//----------  Initialization big photo -----------------------------------
function getBigIMG(ImgsName) {
    var expandImg = document.getElementById("expandedImg");
    expandImg.src = ("img/big/" + ImgsName);
    expandImg.style.height = '380px';
    expandImg.style.width = '550px';
    expandImg.parentElement.style.display = "block";
}

// function listener when laod pages from website ------------------------------------
window.addEventListener("load", function () {
    // If contactus page call getBrowsName for get browser's name.
    if (page === "contactus.html") {
        let browserNm;
        // CHROME
        if (navigator.userAgent.indexOf("Chrome") !== -1) {
            browserNm = ("Google Chrome");
        }
        // FIREFOX
        else if (navigator.userAgent.indexOf("Firefox") !== -1) {
            browserNm = ("Mozilla Firefox");
        }
        // INTERNET EXPLORER
        else if (navigator.userAgent.indexOf("MSIE") !== -1) {
            browserNm = ("Internet Exploder");
        }
        // EDGE
        else if (navigator.userAgent.indexOf("Edge") !== -1) {
            browserNm = ("Internet Exploder");
        }
        // SAFARI
        else if (navigator.userAgent.indexOf("Safari") !== -1) {
            browserNm = ("Safari");
        }
        // OPERA
        else if (navigator.userAgent.indexOf("Opera") !== -1) {
            browserNm = ("Opera");
        }
        // YANDEX BROWSER
        else if (navigator.userAgent.indexOf("YaBrowser") !== -1) {
            browserNm = ("YaBrowser");
        }
        // OTHERS
        else {
            browserNm = ("Others");
        }

        document.getElementById("browserName").innerHTML = "Hello, your browser is " + browserNm;
    }
    // If employees or ourfleet pages call Special function
    else if (page === "employees.html" || page === "ourfleet.html") {
        init();
    }

// If booking page call Special function
    else if (page === "booking.html") {
        if (typeof coordArr != null && coordArr.length > 0) {
            for (var i = 0; i <= coordArr; ++i) {
                drawCanvas(coordArr[i][0], coordArr[i][1], coordArr[i][2]);
            }
        } else {
            createCanvas();
        }
    }
});

//------------------------------------------
//* Draw airplane chairs place in Canvas */
function createCanvas() {
    var canv = document.getElementById("canvas");
    var contx = canv.getContext("2d");
    contx.lineWidth = 10;
    var colorV;
    contx.strokeStyle = '#E4B8FF';
    contx.beginPath();
    contx.moveTo(250, 145);
    contx.lineTo(90, 145);
    contx.stroke();
    contx.arc(80, 75, 70, 0.5 * Math.PI, 1.5 * Math.PI);
    contx.lineTo(250, 5);
    contx.stroke();
    var chairN = [];
    chairN = getSeatnrFromSession();

    var num = 10;
    var x = 60;
    var y = 18;
    var w = 20; // width
    var h = 30;  //Height
    var idNum = 0; // Variable increasing by array length

    for (var i = 0; i < 3; ++i) {
        for (var j = 0; j < 6; ++j) {
            colorV = '#008000';
            // If a number in the list which get it from session storage changes the color to red
            if (chairN.includes(idNum)) {
                colorV = '#ff262f';
            }
            var tmp = 0;
            drawCanvas(x, y, colorV);
            coordArr.push([x, y, colorV]);
            if (j === 1) {
                tmp = 8;
            }
            x += num + w + tmp;
            idNum += 1;
        }
        x = 60;
        y += num + h;
    }
    canvas.addEventListener('click', canvasClicked, false);
}

//---------   Function for draw element  Need x, y coordinates to point place to start ----------------
function drawCanvas(x, y, colorV) {
    var canv = document.getElementById("canvas");
    var contx = canv.getContext("2d");
    contx.fillStyle = colorV;
    contx.beginPath();
    contx.fillRect(x, y, 20, 30);
}

// -------------------------------------------------------
/*
 When user click on canvas for find plce click it get coordinates from screen where user clicks on it,
 and change that place's colour from green to blue, (x, y) are Coordinates which specified for the suitability start of each element in,
 (ex, ey) coordinates of the user clicked on it, get it from calculated from the top/left edge screen.
 if there chairs booked still read.
*/
function canvasClicked(e) {
    var ex, ey, x, y;  // Coordinates
    var blu = '#0000ff';
    var green = '#008000';
    var red = '#ff262f';
    /* for get Coordinates from screen where user clicked. returns the size of an element and its position relative to the viewport.*/
    var rect = canvas.getBoundingClientRect();
    ex = Math.round(e.clientX - rect.left);
    ey = Math.round(e.clientY - rect.top);
    var chair = getSeatnrFromSession(); //  Reserved seat numbers
    for (var i = 0; i < 18; ++i) {
        x = (coordArr[i][0]);
        y = (coordArr[i][1]);
        if (ex >= x && ex <= x + 20 && ey >= y && ey <= y + 30) {
            if (chair.includes(i)) {
                drawCanvas(x, y, red);
            } else {
                drawCanvas(x, y, blu);
                changeLabel(i);
            }
        } else {
            if (chair.includes(i)) {
                drawCanvas(x, y, red);
            } else {
                drawCanvas(x, y, green);
            }
        }
    }
}

//   Sync changes with Label -----------------------------
function changeLabel(i) {
    var labClass = document.getElementById("classType");
    document.getElementById("seatNumber").value = i + 1;
    if (i === 1 || i === 0 || i === 6 || i === 7 || i === 12 || i === 13) {
        document.getElementById("classType").value = 'Business';
    } else document.getElementById("classType").value = 'Economy';
}

//----------------------
// Selecting the input elements and get its value from user
function getInputValue() {
    var fnm = document.getElementById("firstName").value;
    var lnm = document.getElementById("lastName").value;
    var pernr = document.getElementById("personNr").value;
    var clstyp = document.getElementById("classType").value;
    var seatn = document.getElementById("seatNumber").value;
    if (fnm !== null && lnm !== null && clstyp !== '' && seatn !== null && seatn !== '') {
        var stolBok = seatn - 1;
        coordArr[stolBok][2] = '#ff262f';
        drawCanvas(coordArr[stolBok][0], coordArr[stolBok][1], coordArr[stolBok][2]);
        var numCh = getSeatnrFromSession();
        var pers = [fnm, lnm, pernr, clstyp, seatn];

        if (numCh == null || numCh == "undefined") {
            setSessionStNr(fnm, lnm, pernr, clstyp, seatn);
            submitToReceipt(fnm, lnm, pernr, clstyp, seatn);
        } else {
            if (numCh.includes(stolBok)) {
                alert("Sorry! You can't booking this place!!");
            } else {
                setSessionStNr(fnm, lnm, pernr, clstyp, seatn);
                submitToReceipt(fnm, lnm, pernr, clstyp, seatn);
            }
        }
    }
}

//---------------------------------------------------------
// Send report to user about receipt
function submitToReceipt(fnm, lnm, pernr, clty, seatn) {
    var openNewPage = window.open("");
    openNewPage.document.write("<html><head><title>Receipt</title></head><body><section><p>***AIR TICKET ***</p><p>Your information is: </p> <p>First Name: " + fnm + "</p><p> Last Name: " + lnm + "</p> <p> Social Number: " + pernr +
        "</p><p> class Type: " + clty + "</p><p> Seat Number:  " + seatn + "</p><p><H3>***  You have been booked place into the plane ***</H3></p><p>||||||||||||||||||||||||||||||</p></section></body></html>");
}

//--------------- Chick if information in label are right, -------------------------------
function chickValue() {
    var fName = document.getElementById("firstName").value;
    var lName = document.getElementById("lastName").value;
    var pNum = document.getElementById("personNr").value;
    var seatN = document.getElementById("seatNumber").value;
    var clTy = document.getElementById("classType").value;
    submitOK = "true";

    if (fName.length > 10) {
        alert("The name may have no more than 10 characters");
        submitOK = "false";
    }
    if (lName.length > 10) {
        alert("The name may have no more than 10 characters");
        submitOK = "false";
    }
    if (isNaN(pNum) || pNum < 1111111111 || pNum > 9999999999) {
        alert("The Social Number must be a number like 1234560000");
        submitOK = "false";
    }
    if (isNaN(seatN) || seatN < 1 || seatN > 18) {
        alert("The Seat Number must be a number between 1 and 18");
        submitOK = "false";
    }

    if (clTy === -1) {
        alert("Put class type");
        submitOK = "false";
    }

    if (submitOK === "false") {
        return false;
    }
    if (submitOK) {
        getInputValue();
    }
}

//------------- Add data to session storage ----------------------------------
function setSessionStNr(vfName, vlName, vPersoNr, vClasstyp, vSeatNr) {
    var perObj = (vfName + "," + vlName + "," + vPersoNr + "," + vClasstyp + "," + vSeatNr);
    var listPersons;
    var dataSession = JSON.parse(sessionStorage.getItem("chair_num"));
    if (dataSession !== null && dataSession.length > 0) {
        listPersons = dataSession + "," + perObj;
    } else {
        listPersons = perObj;
    }
    sessionStorage.setItem("chair_num", JSON.stringify(listPersons));
}

//  ---------   Get data from session storage ------------------
function getSeatnrFromSession() {
    var listStol = [];
    var perList;
    var listPersons = JSON.parse(sessionStorage.getItem("chair_num"));
    if (listPersons !== null) {
        perList = listPersons.split(',');
        for (var itV = 0; itV < perList.length; itV += 5) {
            let num = perList[itV + (4)] - 1;
            listStol.push(num);
            console.log(listStol);
        }
    } else {
        listStol = [99];
    }

    return listStol;
}

//----- Clear all information in labels and reset it to default and information in session storage. --------------
function resetFunction() {
    document.getElementById("formInfo").reset();
    createCanvas();
}

