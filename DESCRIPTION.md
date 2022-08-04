# *pen-cms*
## spis treści

 - [Idea](#idea)
 - [Założenia projektowe](#założenia-projektowe)
 - [Użyte technologie](#użyte-technologie)
   - [Uzasadnienie wyborów](#uzasadnienie-wyborów)
 

## Idea

Przedmiotem projektu jest stworzenie CMS umożliwiającego zarządzanie długopisami oraz przeglądanie listy utworzonych długopisów z wyszukiwarką. Do CMS mają mieć dostęp dwa poziomy użytkowników o różnych uprawnieniach (administrator i użytkownik).

Częścią projektu jest również

> opisanie problemów napotkanych przy jej projektowaniu i ich rozwiązań

co w moim przypadku poskutkowało stworzeniem tego dokumentu.

Biorąc pod uwagę, że, tak moim zdaniem szerokie, opisanie całego procesu może być zbędne, starałem się również zwięźle opisać i streścić problemy i wyzwania techniczne jakie napotkałem i umieścić je w rozdziałach “streszczenie”.

Na swoje usprawiedliwienie lubię opowiadać o moim procesie tworzenia i chciałem podjąć się napisania opisu projektu 😛

## Założenia projektowe

 - Na aplikację składa się front i back end.
 - Front end stworzony jako **SPA**, umożliwiający zarządzanie długopisami, dodawanie nowych lub usuwanie istniejących oraz przeglądanie tych już utworzonych.
 - Zarządzanie odbywające się na dwóch poziomach dostępu, użytkownika i administratora, z różnymi uprawnieniami.
 - Back end wystawiający **REST API** obsługujące bazę danych.
 - Aplikacja zahostowana i dostępna online.

## Użyte technologie

| część projektu  | technologie                     |
| --------------- | ------------------------------  |
| front end       | [<img alt="vue" src="https://img.shields.io/badge/-Vue.js-/?style=flat-square&logo=vue.js&logoColor=4FC08D&color=333333">](https://vuejs.org/) [<img alt="tailwindcss" src="https://img.shields.io/badge/-tailwindcss-/?style=flat-square&logo=tailwindcss&logoColor=646CFF&color=333333">](https://tailwindcss.com/) [<img alt="font awesome" src="https://img.shields.io/badge/-Font_Awesome-/?style=flat-square&logo=fontawesome&logoColor=528DD7&color=333333">](https://fontawesome.com/) |
| back end        | [<img alt="node" src="https://img.shields.io/badge/-Node.js-/?style=flat-square&logo=node.js&logoColor=339933&color=333333">](https://nodejs.org/) [<img alt="express" src="https://img.shields.io/badge/-Express-/?style=flat-square&logo=express&logoColor=ffffff&color=333333">](https://expressjs.com/) |
| baza danych     | [<img alt="mongodb" src="https://img.shields.io/badge/-MongoDB-/?style=flat-square&logo=mongodb&logoColor=47A248&color=333333">](https://www.mongodb.com/)|
| opis projektu   | [<img alt="markdown" src="https://img.shields.io/badge/-markdown-/?style=flat-square&logo=markdown&logoColor=ffffff&color=333333">](https://www.markdownguide.org/)|
| hosting         | *tbd*                               |

### Uzasadnienie wyborów

Biorąc pod uwagę luźnie narzucone odgórne wymagania co do użytych technologii, większość wyborów sprowadza się do osobistych preferencji. Pomimo tego:

 - **vue.js & tailwindcss & fontawesome** - preferowany przeze mnie stack front-endowy.
 - **node.js & express** - często używane technologie oferujące szeroką gamę możliwości.
   - node.js - dawno nie miałem z nim do czynienia i chciałem odświeżyć sobie jego znajomość.
   - express - biorąc pod uwagę limit czasu na wykonanie projektu, zdecydowanie przyśpiesza tworzenie API od zera.
 - **mongodb** - pomimo niesprecyzowanej potrzeby na bazę danych, z założeń projektu wynika potrzeba takowej. Struktura MongoDB ułatwia pracę z nią w Javascriptcie a [MongoDB Atlas](https://www.mongodb.com/atlas/) oferuje darmowy hosting.
 - **markdown** - podoba mi się wygląd tekstu sformatowanego w tym języku i chciałem podjąć się utworzenia w nim całego opisu.
  - **hosting** - firebase?
