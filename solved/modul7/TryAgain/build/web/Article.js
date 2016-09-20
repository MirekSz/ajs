
var iFailed = 0;

function downloadLinks() {
    var oXHR = zXmlHttp.createRequest();
    
    if (iFailed < 10) {
        try {
            oXHR.open("get", "AdditionalLinks.txt", true);
            oXHR.onreadystatechange = function () {
                if (oXHR.readyState == 4) {
                    if (oXHR.status == 200) {
                        var divAdditionalLinks = document.getElementById("divAdditionalLinks");
                        divAdditionalLinks.innerHTML = oXHR.responseText;  
                        divAdditionalLinks.style.display = "block";          
                    } else {
                        throw new Error("An error occurred.");
                    }
                }    
            }
            
            oXHR.send(null);
        } catch (oException) {
            iFailed++;
            downloadLinks();
        }        
    }
}

window.onload = function () {
    if (zXmlHttp.isSupported()) {        
        downloadLinks();                  
    }
};