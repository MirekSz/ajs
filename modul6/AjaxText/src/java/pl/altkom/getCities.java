package pl.altkom;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class getCities extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        PrintWriter out = response.getWriter();
        String state = request.getParameter("state");
        if ((state == null) || (state.equals(""))) {
            out.println("No State Sent");
        } else {
            String result = "No Cities Found";
            if (state.equals("MO")) {
                result = prepareHtmlList("St. Louis", "Kansas City");
            } else if (state.equals("WA")) {
                result = prepareHtmlList("Seattle", "Spokane", "Olympia");
            } else if (state.equals("CA")) {
                result = prepareHtmlList("San Francisco", "Los Angeles");
            } else if (state.equals("ID")) {
                result = prepareHtmlList("Boise");
            }
            out.println("<h3>Cities:</h3><p>" + result + "</p>");
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        doGet(request, response);
    }

    private String prepareHtmlList(String ... cities) {
        String list = "<ul>";
        for (String city : cities) {
            list += "<li>" + city + "</li>";
        }
        list += "</ul>";
        return list;
    }

}
