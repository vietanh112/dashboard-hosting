<div align="center" id="top"> 
    <a href="https://www.docker.com">
      	<img width="200" src="https://www.docker.com/sites/default/files/d8/styles/role_icon/public/2019-07/horizontal-logo-monochromatic-white.png?itok=SBlK2TGU" alt="Base Docker" />
    </a>
</div>

<div align="center"><h1>Base Docker</h1></div>

<div align="center">🚧  Projects 🚀 Under construction...  🚧</div>

<div align="center">
    <a href="#-about">About</a> &#xa0; | &#xa0;
    <a href="#-technologies">Technologies</a> &#xa0; | &#xa0;
    <a href="#-starting">Starting</a> &#xa0; | &#xa0;
    <a href="#-license">License</a>
</div>
<hr>

<br>
<div id="about"></div>

## 🎯 About

This is a platform built for developers to build and run applications.

<br>
<div id="technologies"></div>

## 🚀 Technologies

This background includes the following default images

- [nginx](https://hub.docker.com/_/nginx/)
- [php-fpm](https://hub.docker.com/r/devilbox/php-fpm/)
- [mysql](https://hub.docker.com/_/mysql/)
- [memcached](https://hub.docker.com/_/memcached/)
- [redis](https://hub.docker.com/_/redis/)

<br/>
<div id="starting"></div>

## 🏁 Starting (Step by Step)
1. Clone this project 
```bash
    git clone 
```
2. Start docker command syntax
```bash
    docker-compose up -d --build
    docker-compose down
    winpty docker exec -it docker-php7 bash
    winpty docker exec -it docker-nginx bash

    docker composer down && docker composer up 
    docker composer down && docker composer up -d ( van chay khi tat terminal )
    docker composer up
    dokcker ps -a
    docker images
    docker stop [container_id]
    docker exec -it php74 sh
    winpty docker exec -it nginx bash

    docker rmi [image_id] --force  ( xoa image )
    docker container rm [container_id] ( xoa container )

    docker network ls
    docker network rm [name_network]
    docker network remove [name_network]
    docker network prune

    docker restart [ID_container]
```

<br/>
<div id="license"></div>

## 📝 License

<a href="#top">Back to top</a>
