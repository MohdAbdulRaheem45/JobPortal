package com.example.JobPortal.config;

import com.example.JobPortal.user.service.CustomUserDetailService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtFilter extends OncePerRequestFilter {
@Autowired
private JwtUtil jwtUtil;
@Autowired
private CustomUserDetailService customUserDetailService;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authHeader=request.getHeader("Authorization");
        String email=null;
        String token=null;
        if(authHeader!=null && authHeader.startsWith("Bearer ")){
            token = authHeader.substring(7);
            email=jwtUtil.extractEmail(token);
        }
       if(email!=null && SecurityContextHolder.getContext().getAuthentication()==null){
           UserDetails userDetails= customUserDetailService. loadUserByUsername(email);
           if(jwtUtil.isTokenValid(token,email)){
               UsernamePasswordAuthenticationToken authtoken=new UsernamePasswordAuthenticationToken(
                       userDetails,null,userDetails.getAuthorities()
               );
               authtoken.setDetails(
                       new WebAuthenticationDetailsSource()
                               .buildDetails(request)
               );
               SecurityContextHolder.getContext().setAuthentication(authtoken);
           }
       }
       filterChain.doFilter(request,response);

    }
}
