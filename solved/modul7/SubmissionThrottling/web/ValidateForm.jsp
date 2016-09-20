<%@page contentType="text/plain" pageEncoding="UTF-8" import="java.util.regex.*,java.util.Date,java.text.DateFormat" %><%

    //message output
    String valid = "false";
    String message = "An unknown error occurred.";    
    
    if (request.getParameter("txtUsername") != null) {

        //define the username
        String username = request.getParameter("txtUsername");

        //array of taken usernames
        String[] usernames = { "SuperBlue", "Ninja123", "Daisy1724", "NatPack" };

        boolean found = false;
        for ( int i=0; i < usernames.length; i++){
            if (usernames[i] == username) {
                found = true;
                break;
            }
        }
        //check usernames

        if (found){
            message = "This username already exists. Please choose another.";
        } else if (username.length() < 8){
            message = "Username must be at least 8 characters long.";
        } else {
            valid = "true";
            message = "";
        }
    } else if (request.getParameter("txtBirthday") != null) {

        DateFormat df = DateFormat.getDateInstance(DateFormat.SHORT);
        System.out.println(df.format(new Date()));
        try {
            df.setLenient(false);
            if (df.parse(request.getParameter("txtBirthday")) != null) {        
                valid = "true";
                message = "";            
            } else {
                message = "This is not a valid date.";
            }
        } catch (Exception ex){
            message = "This is not a valid date.";
        }

    } else if (request.getParameter("txtEmail") != null) {

       Pattern p = Pattern.compile("^[_a-z0-9-]+(\\.[_a-z0-9-]+)*@[a-z0-9-]+(\\.[a-z0-9-]+)*(\\.[a-z]{2,3})$");
       Matcher m = p.matcher(request.getParameter("txtEmail"));
       
       if (m.find()){
            valid = "true";
            message = "";
       } else {
           message = "This e-mail address is not valid";
           
       }       
    }
%><%=valid%>||<%=message%>