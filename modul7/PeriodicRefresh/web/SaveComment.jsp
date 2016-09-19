<%@page contentType="text/html"%>
<%@page pageEncoding="UTF-8"%>
<%@ page import="java.sql.*" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
    <head>
        <title>Save Comment</title>
    </head>
    <body>
<% 

    //get information (replace apostrophes with double apostrophes to prevent SQL injection attacks)
    String name = request.getParameter("txtName").replace("'", "''");
    String message = request.getParameter("txtMessage").replace("'", "''");
                            
    //the message to send back
    String status = "";

    //database information
    String dbservername = "localhost";
    String dbname = "test";
    String username = "root";
    String password = "admin";
    String url = "jdbc:mysql://" + dbservername + "/" + dbname + "?user=" + username + "&password=" + password;

    try {
        
        //create instance of the MySQL driver
        Class.forName("com.mysql.jdbc.Driver").newInstance();
        
        //create database connection
        Connection conn = DriverManager.getConnection(url);
        
        //construct the query
        StringBuffer buffer = new StringBuffer();
        buffer.append("Insert into BlogComments(BlogEntryId,Name,Message,Date) values (0, '");
        buffer.append(name);
        buffer.append("','");
        buffer.append(message);
        buffer.append("',NOW());");
        String sql = buffer.toString();
            
        //execute it
        Statement stmt = conn.createStatement();
        if (stmt.executeUpdate(sql) > 0) {
            status = "Added comment";
        } else {
            status = "Error occurred while trying to connect to database.";
        }
        
    } catch (Exception ex){
        status = "Error occurred while trying to connect to database: " + ex.getMessage();
    }        
%><%=status%>

    </body>
</html>
