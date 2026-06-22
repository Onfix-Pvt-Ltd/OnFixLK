package middleware

import (
	"context"
	"net/http"
	"strings"

	"backend/internal/config"

	"github.com/golang-jwt/jwt/v5"
)

type contextKey string

const UsernameKey contextKey = "username"

func Auth(cfg *config.Config) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			authHeader := r.Header.Get("Authorization")
			if authHeader == "" {
				http.Error(w, `{"success":false,"message":"Authorization header is missing"}`, http.StatusUnauthorized)
				return
			}

			parts := strings.Split(authHeader, " ")
			if len(parts) != 2 || strings.ToLower(parts[0]) != "bearer" {
				http.Error(w, `{"success":false,"message":"Invalid authorization header format"}`, http.StatusUnauthorized)
				return
			}

			tokenString := parts[1]
			claims := &jwt.RegisteredClaims{}

			token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
				return []byte(cfg.JWTSecret), nil
			})

			if err != nil || !token.Valid {
				http.Error(w, `{"success":false,"message":"Invalid or expired token"}`, http.StatusUnauthorized)
				return
			}

			// Add username to request context
			ctx := context.WithValue(r.Context(), UsernameKey, claims.Subject)
			next.ServeHTTP(w, r.WithContext(ctx))
		})
	}
}
