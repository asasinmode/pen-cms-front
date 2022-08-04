# *pen-cms*
## spis treści

 - [Idea](#idea)
 - [Założenia projektowe](#założenia-projektowe)
 - [Użyte technologie](#użyte-technologie)
   - [Uzasadnienie wyborów](#uzasadnienie-wyborów)
 - [Front end](#front-end)
   - [Układ strony](#układ-strony)
   - [Menu](#menu)
      - [Napotkane wyzwania - menu](#napotkane-wyzwania---menu)
 

## Idea

Przedmiotem projektu jest stworzenie CMS umożliwiającego zarządzanie długopisami oraz przeglądanie listy utworzonych długopisów z wyszukiwarką. Do CMS mają mieć dostęp dwa poziomy użytkowników o różnych uprawnieniach (administrator i użytkownik).

Częścią projektu jest również

> opisanie problemów napotkanych przy jej projektowaniu i ich rozwiązań

co w moim przypadku poskutkowało stworzeniem tego dokumentu.

Biorąc pod uwagę, że, tak moim zdaniem szerokie, opisanie całego procesu może być zbędne, opis napotkanych wyzwań i problemów znaleźć można w rozdziałach **"Napotkane wyzwania"**.

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

# Front end

Z uwagi na założenia projektu na front end składać będą się 3 strony.

 - **dashboard** - ekran główny gdzie można dodawać, usuwać i edytować długopisy.
 - **manage** - panel zawierający "konfigurację" długopisów, czyli przykładowo dodawanie nowych końcówek, kolorów, które później można wybierać przy tworzeniu/edytowaniu długopisów.
 - **browse** - dedykowana podstrona służąca do przeglądania dodanych długopisów.

Dodatkowo osobiście w moich projektach zależy mi na w pełni funkcjonalnej nawigacji klawiaturą oraz responsywności co narzuca pewne wymagania na strukturę strony i kolejność elementów.

## Układ strony

Zdecydowałem się na raczej klasyczny, kojarzący mi się z CMS układ z rozwijaną nawigacją po lewej (1) stronie i resztą strony po prawej (2).

<p align=center>
[układ.jpg]
</p>

## Menu

Menu ma mieć możliwość zwinięcia oraz ma pozwalać na swobodną nawigację po stronie.

Nawigacja zawiera kolejno:

1. Link pomijający nawigację
2. Guzik rozwijający/zwijający menu. Guzik zawiera mini logo oraz ikonkę wskazującą na obecny stan menu.
3. Link do podstrona
4. Guzik widoczny jedynie na mobilnych urządzeniach otwierający/zamykający menu

Powyższa struktura sprawia, że pierwsza rzecz do jakiej nawiguje się klawiaturą to link pomijający nawigację. Po przejściu przez całe menu, zależnie od urządzenia, albo trafia się na kolejny element strony, na której jesteśmy, albo na guzik pozwalający na zamknięcie menu.

### Napotkane wyzwania - menu
<!-- DODAĆ SCREENY -->

#### Wygląd na urządzeniach mobilnych

Uważam, że powinno się unikać dodatkowych elementów na stronie. W przypadkach tworzonych przeze mnie menu, na urządzeniach mobilnych, skutkuje to używaniem tego samego guzika do otwierania menu i zamykania go.

O ile brzmi to absolutnie zwyczajnie, to należy zwrócić uwagę na fakt, że rozwijane menu na telefonie zazwyczaj kojarzą się z "przyciemnieniem" reszty strony i możliwością kliknięcia poza menu w celu zamknięcia go.

Łącząc dwie powyższe rzeczy, doszedłem do zmiany stylu guzika otwierającego menu w zależności od tego, czy menu jest w danym momencie otwarte czy zamknięte. Pozwala to na używanie tego samego elementu do spełnienia dwóch różnych potrzeb.

Przykładowo: Załóżmy menu, które na urządzeniach mobilnych znajduje się poza ekranem i kiedy użytkownik otworzy je guzikiem wsuwa się z dowolnej strony a reszta strony jest przyciemniona.

Gdy użytkownik kliknie na guzik, zamiast usuwać go i wjeżdżać z boku ekranu naszą nawigacją razem z jej półprzeźroczystym całym tłem, zmieniamy styl guzika chowając jego ikonkę, powiększamy go tak, żeby zajmował całe pozostałe miejsce na ekranie i ustawiamy jego tło na półprzeźroczysty czarny.

Gdy użytkownik zamyka menu, albo przy pomocy guzika na górze zawierającego logo, albo klikając poza nawigacją na przyciemnioną część ekranu, chowamy menu poza ekran i przywracamy oryginalny styl guzika.

Z racji, że guzik pełni zarówno funkcję otwierania nawigacji na urządzeniach mobilnych jak i bycia backdropem dla menu, na większych rozdzielczościach po prostu go chowamy.

#### Nawigacja klawiaturą

Menu na urządzeniach mobilnych jest domyślnie zwinięte, natomiast przy większych rozdzielczościach jest rozwinięte. Guzik rozwijający menu jest drugi w kolejności nawigowania po linku pomijającym nawigację lub, na urządzeniach mobilnych, ostatni.

Wynika z tego, że użytkownik nawigujący klawiaturą na urządzeniu mobilnym najpierw zaczyna przemieszczać się po wizualnie ukrytych elementach zanim dojdzie do widocznego guzika pozwalającego mu na otworzenie menu.

Link pomijający nawigację najzwyczajniej zsuwa w dół siebie i resztę nawigacji kiedy jest zfocusowany.

Dodatkowym problemem jest fakt, że guzik otwierający mobilną nawigację, kiedy jest obecnie [aktywnym](https://developer.mozilla.org/en-US/docs/Web/API/Document/activeElement) elementem, ma dookoła siebie domyślny outline wskazujący. Nie jest to problemem kiedy guzik jest w swojej domyślnej formie małego kółka, jednak kiedy guzik zmienia swój wygląda na pełnoekranowy backdrop dla nawigacji, obwódka dookoła niego jest zarówno nie na miejscu jak i zwodnicza.

Adresując najpierw drugi problem, najprostszym rozwiązaniem (poza usunięciem domyślnego stylu [aktywnych](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible) elementów) będzie usunięcie go z indeksowalnych elementów strony zmieniając jego atrybut `tabindex="-1"`.To podejście może wydawać się przesadne. Mając jednak na uwadze poniższe fakty:
1. jedna z dwóch funkcji tego guzika, bycie backdropem, nie wymaga bycia nawigowalną
2. guzik jest ostatnim elementem w kolejności nawigowania (znajduje się na samym końcu menu)
3. i tak musimy zaadresować nawigowanie po elementach znajdujących się poza ekranem

minusy tego rozwiązania są praktycznie niezauważalne.

Przechodząc do pierwszego problemu nawigowania po niewidocznych elementach. Biorąc pod uwagę, że pierwszym elementem do jakiego nawigujemy idąc od początku strony jest nasz link pomijający nawigację, a idąc od środka strony jest ostatni link (do strony */browse*, ostatniemu guzikowi wyłączyliśmy możliwość bycia nawigowanym do), najprościej jest dodać do obydwu tych elementów listener `onfocus` aktywujący się w momencie nawigowania na nie.

Listener `onfocus` po prostu rozwija menu. Teraz kiedy ktoś nawigujący klawiaturą na urządzeniu mobilnym "najedzie" na pierwszy element naszej strony będący w domyślnie niewidocznym menu

Musimy mieć jednak na uwadze fakt, że niezależnie od rozdzielczości strony nasze 2 elementy będą teraz rozwijać menu za każdym razem kiedy są zfocusowane. Oznacza to, że na nie-telefonach, w przypadku, kiedy użytkownik ręcznie zwinie sobie menu (widoczne są tylko ikonki guzików), a następnie nawiguje na pierwszy lub ostatni link, menu się rozwinie.

Rozwiązujemy ten problem dodając w funkcji `onfocus` sprawdzenie czy [poprzednim aktywnym elementem](https://developer.mozilla.org/en-US/docs/Web/API/FocusEvent/relatedTarget) był albo drugi, albo przedostatni element nawigacji. Jeśli elementy są zfocusowane z czegokolwiek znajdującego się poza menu to rozwijamy naszą nawigację.

Po dodaniu otwierania menu przy nawigowaniu do jego ostatniego lub pierwszego elementu z racji, że nasz guzik na samym końcu nie jest nawigowalny do, pozostało nam dodanie zamykania.

Robimy to ustawiając listener `onkeydown` na całej nawigacji zwijający menu (tylko na urządzeniach mobilnych, większe rozdzielczości zawsze mają menu widoczne w jakimś stopniu) kiedy użytkownik kliknie `shift+tab` na pierwszym linku lub `tab` na ostatnim.
