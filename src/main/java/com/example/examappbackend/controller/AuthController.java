package com.example.examappbackend.controller;

import com.example.examappbackend.entity.User;
import com.example.examappbackend.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;

@Controller
public class AuthController {

    @Autowired
    private UserService userService;

    @GetMapping("/login")
    public String loginPage() {
        return "login";
    }

    @GetMapping("/register")
    public String registerPage() {
        return "register";
    }

    @PostMapping("/register")
    public String register(@RequestParam("email") String email,
                           @RequestParam("password") String password,
                           @RequestParam("name") String name,
                           @RequestParam(value = "profilePicture", required = false) MultipartFile profilePicture,
                           Model model) {
        try {
            String profilePictureData = null;
            if (profilePicture != null && !profilePicture.isEmpty()) {
                byte[] bytes = profilePicture.getBytes();
                profilePictureData = Base64.getEncoder().encodeToString(bytes);
            }
            userService.register(email, password, name, profilePictureData);
            return "redirect:/login?registered=true";
        } catch (RuntimeException | IOException e) {
            model.addAttribute("error", e.getMessage());
            return "register";
        }
    }

    @PostMapping("/login")
    public String login(@RequestParam("email") String email,
                        @RequestParam("password") String password,
                        HttpSession session,
                        Model model) {
        try {
            User user = userService.login(email, password);
            session.setAttribute("user", user);
            return "redirect:/";
        } catch (RuntimeException e) {
            model.addAttribute("error", e.getMessage());
            return "login";
        }
    }

    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/login";
    }

    @GetMapping("/profile-picture")
    public void getProfilePicture(HttpSession session, jakarta.servlet.http.HttpServletResponse response) throws IOException {
        User user = (User) session.getAttribute("user");
        if (user != null && user.getProfilePicture() != null) {
            response.setContentType("image/jpeg");
            byte[] imageBytes = Base64.getDecoder().decode(user.getProfilePicture());
            response.getOutputStream().write(imageBytes);
        }
    }
}
