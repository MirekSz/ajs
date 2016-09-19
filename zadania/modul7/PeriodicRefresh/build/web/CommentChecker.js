
var oXHR = null;
var iInterval = 1000;
var iLastCommentId = -1;
var divNotification = null;

function checkComments() {
    if (!oXHR) {
        oXHR = zXmlHttp.createRequest();
    } else if (oXHR.readyState != 0) {
        oXHR.abort();
    }    
    
    oXHR.open("get", "CheckComments.jsp", true);
    oXHR.onreadystatechange = function () {               
        
        if (oXHR.readyState == 4) {
            if (oXHR.status == 200) {

                var aData = oXHR.responseText.split("||");
                if (aData[0] != iLastCommentId) {                   
                    
                    iLastCommentId = aData[0];
                    
                    if (iLastCommentId != -1) {                        
                        showNotification(aData[1], aData[2]);
                    }
                    
                }
                
                setTimeout(checkComments, iInterval);             
            }                         
        }
    };    

    oXHR.send(null);       

}

function showNotification(sName, sMessage) {
    if (!divNotification) {
        divNotification = document.createElement("div");
        divNotification.className = "notification";
        document.body.appendChild(divNotification);
    }
    
    divNotification.innerHTML = "<strong>New Comment</strong><br />" + sName 
              + " says: " + sMessage + "...<br /><a href=\"ViewComment.jsp?id="
              + iLastCommentId + "\">View</a>";
    divNotification.style.top = document.body.scrollTop + "px";
    divNotification.style.left = document.body.scrollLeft + "px";
    divNotification.style.display = "block";
    setTimeout(function () {
        divNotification.style.display = "none";
    }, 10000);
}

//if Ajax is enabled, assign event handlers and begin fetching
window.onload = function () {
    if (zXmlHttp.isSupported()) {
        checkComments();              
    }
};