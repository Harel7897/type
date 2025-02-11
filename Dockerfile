# בחר תמונה בסיסית של NGINX
FROM nginx:alpine

# העתק את קובץ הקונפיגורציה של NGINX לתוך הקונטיינר
COPY nginx.conf /etc/nginx/nginx.conf

# העתק את תיקיית ה-build לתוך הקונטיינר
COPY build/ /usr/share/nginx/html

# חשוף את הפורטים 80 ו-443
EXPOSE 80 443
