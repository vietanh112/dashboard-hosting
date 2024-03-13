## Install node_modules
RUN `npm install`


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

# Build index.html
RUN `ng build --prod`
ren vào folder frontend/dist/dashboard-hosting

# Copy dist to nginx
`rm -rf Docker/nginx/html/dashboard-hosting`
`cp -r frontend/dist/dashboard-hosting Docker/nginx/html/dashboard-hosting`