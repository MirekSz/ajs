<%@page contentType="text/plain" pageEncoding="UTF-8" import="java.sql.*"%><%
    //set caching information
    response.addHeader("Cache-control", "No-cache");
    response.addDateHeader("Expires", 0);
    
    //database information
    String dbservername = "localhost";
    String dbname = "test";
    String username = "root";
    String password = "admin";
    String url = "jdbc:mysql://" + dbservername + "/" + dbname + "?user=" + username + "&password=" + password;

    //query
    String sql = "SELECT CommentId, Name, LEFT(Message, 50) AS ShortMessage FROM BlogComments ORDER BY Date DESC Limit 0,1";

    //output message
    String message = "-1|| || ";
        
    try {
        Class.forName("com.mysql.jdbc.Driver").newInstance();

        //create database connection
        Connection conn = DriverManager.getConnection(url);

        //execute query
        Statement stmt = conn.createStatement();
        ResultSet rs = stmt.executeQuery(sql);
        boolean found = rs.next();

        //if there was a match...
        if (found) {
            message = rs.getString("CommentId") + "||" + rs.getString("Name") + "||" + rs.getString("ShortMessage");            
        }

        rs.close();
        conn.close();
    } catch (Exception ex){
        //ignore
    }        
%><%=message%>