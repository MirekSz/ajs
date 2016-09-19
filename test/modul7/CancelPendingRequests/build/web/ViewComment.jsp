<%@page contentType="text/html"%>
<%@page pageEncoding="UTF-8"%>
<%@ page import="java.sql.*" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
    <head>
        <title>Comment</title>
    </head>
    <body>
<%
    String strId = request.getParameter("id");
    int id = -1;
    
    try {
        id = Integer.parseInt(strId);
    } catch (Exception ex) {
        //ignore
    }

    //database information
    String dbservername = "localhost";
    String dbname = "ProAjax";
    String username = "root";
    String password = "admin";
    String url = "jdbc:mysql://" + dbservername + "/" + dbname + "?user=" + username + "&password=" + password;

    //message to output
    String message = "";
        
    if (id != -1) {

        try {
            Class.forName("com.mysql.jdbc.Driver").newInstance();            

            //create database connection
            Connection conn = DriverManager.getConnection(url);
            
            //execute query
            String sql = "Select * from BlogComments where CommentId=" + id;
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery(sql);
            boolean found = rs.next();
            StringBuffer buffer = new StringBuffer();
                
            //if there was a match...
            if (found) {
                buffer.append("<p>Comment from ");
                buffer.append(rs.getString("Name"));
                buffer.append("</p><p>");                
                buffer.append(rs.getString("Message"));                
                buffer.append("</p>");  
            } else {
                buffer.append("Comment with ID ");
                buffer.append(id);
                buffer.append(" could not be found.");
            }
            
            rs.close();
            conn.close();
            
            message =  buffer.toString();
        } catch (Exception ex){
            message =  "An error occurred while trying to read comments.";
        }
        
    } else {
        message = "Invalid comment ID";
    }
%><%=message%>
    </body>
</html>
