package de.lowani.backend.config;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ReactRoutingForwarding {

    @RequestMapping(value = "api/**/{[path:[^\\.]*}")
    public String forwardToRoutUrl() {
        return "forward:/";
    }
}
