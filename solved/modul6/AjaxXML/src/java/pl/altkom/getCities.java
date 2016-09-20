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
        response.setHeader("Content-Type: text/xml", "charset=utf-8");
        PrintWriter out = response.getWriter();
        out.println("<?xml version=\"1.0\" encoding=\"UTF-8\" ?>");
        String state = request.getParameter("state");
        if ((state == null) || (state.equals(""))) {
            out.println("<city>No State Sent</city>");
        } else {
            String result = prepareCityElement("", "No Cities Found");
            if (state.equals("MO")) {
                result = prepareCityElement("stlou", "St. Louis") + 
                        prepareCityElement("kc", "Kansas City");
            } else if (state.equals("WA")) {
                result = prepareCityElement("seattle", "Seattle") +
                        prepareCityElement("spokane", "Spokane") +
                        prepareCityElement("olympia", "Olympia");
            } else if (state.equals("CA")) {
                result = prepareCityElement("sanfran", "San Francisco") +
                        prepareCityElement("la", "Los Angeles") +
                        prepareCityElement("barcamp", "BarCamp");
            } else if (state.equals("ID")) {
                result = prepareCityElement("boise", "Boise");
            } 
            out.println("<cities>" + result + "</cities>");
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        doGet(request, response);
    }

    private String prepareCityElement(String value, String title) {
        return "<city><value>" + value + "</value><title>" + title + "</title></city>";
    }

}
