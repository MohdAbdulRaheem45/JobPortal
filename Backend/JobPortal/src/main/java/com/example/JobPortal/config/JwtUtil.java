package com.example.JobPortal.config;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;


import javax.crypto.SecretKey;
import java.util.Date;
@Component
public class JwtUtil {
    private static final String secretKey="mySecretKey12345mySecretKey12345";

    public static String generateToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis()+1000*60*60*10))
                .signWith(getSecretKey())
                .compact();
    }
    public static SecretKey getSecretKey(){
        return Keys.hmacShaKeyFor(secretKey.getBytes());
    }
    public String extractEmail(String token){
        return getCliams(token).getSubject();
    }
    public boolean isExpired(String token){
        return getCliams(token).getExpiration().before(new Date());
    }
    public boolean isTokenValid(String token,String email){
         String e=extractEmail(token);
         return e.equals(email) && !isExpired(token);
    }
    public Claims getCliams(String token){
        return Jwts.parserBuilder()
                .setSigningKey(getSecretKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
