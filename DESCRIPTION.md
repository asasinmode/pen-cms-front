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
   - [Dashboard](#dashboard)
   - [Configuration](#configuration)
   - [Browse](#browse)
     - [Napotkane wyzwania - browse](#napotkane-wyzwania---browse)
   - [Login](#login)
   - [Modal](#modal)
     - [Napotkane wyzwania - modal](#napotkane-wyzwania---modal)
 - [Back end](#back-end)

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
| baza danych     | [<img alt="mongodb" src="https://img.shields.io/badge/-MongoDB-/?style=flat-square&logo=mongodb&logoColor=47A248&color=333333">](https://www.mongodb.com/) [<img alt="cloudinary" src="https://img.shields.io/badge/-Cloudinary-/?style=flat-square&logoColor=47A248&color=333333">](https://cloudinary.com//)|
| opis projektu   | [<img alt="markdown" src="https://img.shields.io/badge/-markdown-/?style=flat-square&logo=markdown&logoColor=ffffff&color=333333">](https://www.markdownguide.org/)|
| hosting         | [<img alt="netlify" src="https://img.shields.io/badge/-netlify-/?style=flat-square&logo=netlify&logoColor=00C7B7&color=333333">](https://www.netlify.com/) [<img alt="heroku" src="https://img.shields.io/badge/-heroku-/?style=flat-square&logo=heroku&logoColor=430098&color=eeeeee">](https://www.heroku.com/) |

### Uzasadnienie wyborów

Biorąc pod uwagę luźnie narzucone odgórne wymagania co do użytych technologii, większość wyborów sprowadza się do osobistych preferencji. Pomimo tego:

 - **vue.js & tailwindcss & fontawesome** - preferowany przeze mnie stack front-endowy.
 - **node.js & express** - często używane technologie oferujące szeroką gamę możliwości.
   - node.js - dawno nie miałem z nim do czynienia i chciałem odświeżyć sobie jego znajomość.
   - express - biorąc pod uwagę limit czasu na wykonanie projektu, zdecydowanie przyśpiesza tworzenie API od zera.
 - **mongodb** - pomimo niesprecyzowanej potrzeby na bazę danych, z założeń projektu wynika potrzeba takowej. Struktura MongoDB ułatwia pracę z nią w Javascriptcie a [MongoDB Atlas](https://www.mongodb.com/atlas/) oferuje darmowy hosting.
 - **markdown** - podoba mi się wygląd tekstu sformatowanego w tym języku i chciałem podjąć się utworzenia w nim całego opisu.
  - **cloudinary** - moim zdaniem cms zazwyczaj narzuca potrzebę przechowywania obrazów. Dodatkowo większość serwisów hostingowych w swojej darmowej ofercie w najlepszym przypadku oferuje tymczasowy dostęp do plików, które są resetowane przy restarcie aplikacji.
  - **hosting**
    - **heroku** - oferuje tymczasowy dostęp do plików, którego potrzebuje moje api żeby odczytać wysłany przez front plik i wysłać go do cloudinary.
    - **netlify** - bardzo wygodna integracja z popularnymi frameworkami, w tym Vue.

# Front end

Z uwagi na założenia projektu na front end składać będą się 4 strony.

 - **dashboard** - ekran główny gdzie można dodawać, usuwać i edytować długopisy.
 - **manage** - panel zawierający "konfigurację" długopisów, czyli przykładowo dodawanie nowych końcówek, kolorów, które później można wybierać przy tworzeniu/edytowaniu długopisów.
 - **browse** - dedykowana podstrona służąca do przeglądania dodanych długopisów.
 - **login** - podstrona dedykowana do logowania, wylogowywania i usuwania konta zalogowanego użytkownika

Dodatkowo osobiście w moich projektach zależy mi na w pełni funkcjonalnej nawigacji klawiaturą oraz responsywności co narzuca pewne wymagania na strukturę strony i kolejność elementów.

## Układ strony

Zdecydowałem się na raczej klasyczny, kojarzący mi się z CMS układ z rozwijaną nawigacją po lewej (1) stronie i resztą strony po prawej (2).

<p align=center>
![uklad](https://user-images.githubusercontent.com/63049433/184631144-cf9f7097-65ee-4e4d-8e7a-48f5f554d772.jpg)
</p>

## Menu

Menu ma mieć możliwość zwinięcia oraz ma pozwalać na swobodną nawigację po stronie.

Nawigacja zawiera:

<p align=center>
![menu split](https://user-images.githubusercontent.com/63049433/184631173-a10bfd4a-3e49-4b1d-8ab1-d2fcff5cd63d.jpg)
</p>

1. Guzik rozwijający/zwijający menu. Guzik zawiera mini logo oraz ikonkę wskazującą na obecny stan menu.
2. Linki do podstron
3. Link pomijający nawigację

Oraz guzik widoczny jedynie na mobilnych urządzeniach otwierający/zamykający menu

Powyższa struktura sprawia, że pierwsza rzecz do jakiej nawiguje się klawiaturą to link pomijający nawigację. Po przejściu przez całe menu, zależnie od urządzenia, albo trafia się na kolejny element strony, na której jesteśmy, albo na guzik pozwalający na zamknięcie menu.

Link pomijający nawigację najzwyczajniej zsuwa w dół siebie i resztę nawigacji kiedy jest zfocusowany.

### Napotkane wyzwania - menu

#### Wygląd na urządzeniach mobilnych

Uważam, że powinno się unikać dodatkowych elementów na stronie. W przypadkach tworzonych przeze mnie menu, na urządzeniach mobilnych, skutkuje to używaniem tego samego guzika do otwierania menu i zamykania go.

O ile brzmi to absolutnie zwyczajnie, to należy zwrócić uwagę na fakt, że rozwijane menu na telefonie zazwyczaj kojarzą się z "przyciemnieniem" reszty strony i możliwością kliknięcia poza menu w celu zamknięcia go.

Łącząc dwie powyższe rzeczy, doszedłem do zmiany stylu guzika otwierającego menu w zależności od tego, czy menu jest w danym momencie otwarte czy zamknięte. Pozwala to na używanie tego samego elementu do spełnienia dwóch różnych potrzeb.

Przykładowo: Załóżmy menu, które na urządzeniach mobilnych znajduje się poza ekranem i kiedy użytkownik otworzy je guzikiem wsuwa się z dowolnej strony a reszta strony jest przyciemniona.

Gdy użytkownik kliknie na **guzik (1)**, zamiast usuwać go i wjeżdżać z boku ekranu naszą nawigacją razem z jej półprzeźroczystym całym tłem, zmieniamy styl guzika chowając jego ikonkę, powiększamy go tak, żeby zajmował całe pozostałe miejsce na ekranie i ustawiamy jego tło na półprzeźroczysty czarny **(2)**.

<p align=center>
![mobile menu split](https://user-images.githubusercontent.com/63049433/184631190-8ab88634-ac3e-4714-a216-4378ff00dc4e.jpg)
</p>

Gdy użytkownik zamyka menu, albo przy pomocy guzika na górze zawierającego logo, albo klikając poza nawigacją na przyciemnioną część ekranu, chowamy menu poza ekran i przywracamy oryginalny styl guzika.

Z racji, że guzik pełni zarówno funkcję otwierania nawigacji na urządzeniach mobilnych jak i bycia backdropem dla menu, na większych rozdzielczościach po prostu go chowamy.

#### Nawigacja klawiaturą

Menu na urządzeniach mobilnych jest domyślnie zwinięte, natomiast przy większych rozdzielczościach jest rozwinięte. Guzik rozwijający menu jest drugi w kolejności nawigowania po linku pomijającym nawigację lub, na urządzeniach mobilnych, ostatni.

Wynika z tego, że użytkownik nawigujący klawiaturą na urządzeniu mobilnym najpierw zaczyna przemieszczać się po wizualnie ukrytych elementach zanim dojdzie do widocznego guzika pozwalającego mu na otworzenie menu.

Dodatkowym problemem jest fakt, że guzik otwierający mobilną nawigację, kiedy jest obecnie [aktywnym elementem](https://developer.mozilla.org/en-US/docs/Web/API/Document/activeElement), ma dookoła siebie domyślny outline wskazujący. Nie jest to problemem kiedy guzik jest w swojej domyślnej formie małego kółka, jednak kiedy guzik zmienia swój wygląda na pełnoekranowy backdrop dla nawigacji, obwódka dookoła niego jest zarówno nie na miejscu jak i zwodnicza.

Adresując najpierw drugi problem, najprostszym rozwiązaniem (poza usunięciem domyślnego stylu [aktywnych elementów](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible), co nadal pozostawia kogoś nawigującego klawiaturą w sytuacji znalezienia się w nieoczywistym miejscu) będzie usunięcie go z indeksowalnych elementów strony zmieniając jego atrybut `tabindex="-1"`.To podejście może wydawać się przesadne. Mając jednak na uwadze poniższe fakty:
1. jedna z dwóch funkcji tego guzika, bycie backdropem, nie wymaga bycia nawigowalną
2. guzik jest ostatnim elementem w kolejności nawigowania (znajduje się na samym końcu menu)
3. i tak musimy zaadresować nawigowanie po elementach znajdujących się poza ekranem

minusy tego rozwiązania są praktycznie niezauważalne.

Przechodząc do pierwszego problemu nawigowania po niewidocznych elementach. Biorąc pod uwagę, że pierwszym elementem do jakiego nawigujemy idąc od początku strony jest nasz link pomijający nawigację, a idąc od środka strony jest ostatni link (do strony */user*, ostatniemu guzikowi wyłączyliśmy możliwość bycia nawigowanym do), najprościej jest dodać do obydwu tych elementów listener `onfocus` aktywujący się w momencie nawigowania na nie.

```typescript
expandMenuWhenFocused(e: FocusEvent){
  // don't open if focusing last link from outside on desktop
  if(window.innerWidth > 768 && e.target === this.lastLink){ return }
  this.isExpanded = true
}
```

Listener `onfocus` po prostu rozwija menu. Teraz, kiedy ktoś nawigujący klawiaturą na urządzeniu mobilnym "najedzie" na pierwszy element naszej strony, *aktywny* element będzie zawsze widoczny.

Musimy mieć jednak na uwadze fakt, że niezależnie od rozdzielczości strony nasze 2 elementy będą teraz rozwijać menu za każdym razem kiedy są zfocusowane. Oznacza to, że na nie-telefonach, w przypadku, kiedy użytkownik ręcznie zwinie sobie menu (widoczne są tylko ikonki guzików), a następnie nawiguje na pierwszy lub ostatni link, menu się rozwinie.

Rozwiązujemy ten problem dodając w funkcji `onfocus` sprawdzenie czy [poprzednim aktywnym elementem](https://developer.mozilla.org/en-US/docs/Web/API/FocusEvent/relatedTarget) był albo drugi, albo przedostatni element nawigacji. Jeśli elementy są zfocusowane z czegokolwiek znajdującego się poza menu to rozwijamy naszą nawigację.

```typescript
expandMenuWhenFocused(e: FocusEvent){ 
  // expands menu when element is focused from outside
  if(e.relatedTarget !== this.lastLink && e.relatedTarget !== this.firstButton){
    if(window.innerWidth > 768 && e.target === this.lastLink){ return }
    this.isExpanded = true
  }
}
```

Po dodaniu otwierania menu przy nawigowaniu do jego ostatniego lub pierwszego elementu z racji, że nasz guzik na samym końcu nie jest nawigowalny do, pozostało nam dodanie zamykania.

Robimy to ustawiając listener `onkeydown` na całej nawigacji zwijający menu (tylko na urządzeniach mobilnych, większe rozdzielczości zawsze mają menu widoczne w jakimś stopniu) kiedy użytkownik kliknie `shift+tab` na pierwszym linku lub `tab` na ostatnim.

```typescript
handleTabNavigation(e: KeyboardEvent){
  if(window.innerWidth > 768){ return }

  // close when shift tabbing from skip link
  if(document.activeElement === this.$refs.skipLink && e.shiftKey){
    this.isExpanded = false
    return
  }

  // close when tabbing from last link
  if(document.activeElement === this.lastLink && !e.shiftKey){
    this.isExpanded = false
    return
  }

  // always expand when navigation is happening
  this.isExpanded = true
}
```

## Dashboard

Podstrona ma pozwalać na zarządzanie długopisami, czyli dodawanie nowych oraz edytowanie i usuwanie istniejących. Dodawania i usuwanie długopisów dostępne jest jedynie po zalogowaniu.

Zawiera 2 różne elementy:

<p align=center>
![dashboard](https://user-images.githubusercontent.com/63049433/184631209-34e9e971-6950-4163-9d3b-a924c7a98b35.jpg)
</p>

1. Guzik do tworzenia nowego długopisu.
2. Podgląd każdego stworzonego długopisu z guzikami do usuwania i edytowania na samym dole. Podgląd pokazuje 2 domyślnie wymagane właściwości (*brand* i *ink color*) i wielokropek w przypadku, gdy długopis ma dodatkowe właściwości.

Żeby utrzymać raczej czysty wygląd i z uwagi na fakt, że każdy długopis jest tworzony i edytowany w ten sam sposób, zdecydowałem się umieścić edytor w modalu.

Wszystkie 3 guziki otwierają modale. Tworzenie i edytowanie ten sam, z edytorem długopisów, natomiast usuwanie modal proszący o potwierdzenie usunięcia.


Edytor dzieli się na 3 sekcje:

<p align=center>
![pen edit modal](https://user-images.githubusercontent.com/63049433/184631230-c20389d8-5642-4dce-be22-01de8ef4e7bc.jpg)
</p>

1. Nazwa długopisu i rozwijaną listę ze wszystkimi dostępnymi *"właściwościami"* długopisu, jakich ten jeszcze nie ma.
2. Podgląd obrazu długopisu i pole do zuploadowania nowego obrazu.
3. Tabelkę zawierającą obecnie przypisane do długopisu właściwości, rozwijaną listę z dostępnymi wartościami dla tych wartości oraz guzik do usuwania właściwości z długopisu.

Domyślnie każdy długopis musi mieć 2 właściwości. *Brand* - producent i *ink color* - kolor wkładu. Edytować i dodawać właściwości można na kolejnej podstronie [konfiguracja](#configuration).

## Configuration

Ta podstrona ma umożliwiać dodawania, usuwanie i edytowanie dostępnych dla długopisów właściwości. Żeby wprowadzić na niej jakiekolwiek zmiany trzeba być zalogowanym.

Składają się na nią 2 typy rozwijalnych sekcji:

<p align=center>
![configuration](https://user-images.githubusercontent.com/63049433/184631301-ad3e2545-c9ed-41b8-a5aa-6a12c5fb9297.jpg)
</p>

1. Sekcje istniejących właściwości.
2. Sekcja tworzenia nowej właściwości.

Po rozwinięciu sekcje ujawniają:

<p align=center>
![configuration edit expanded](https://user-images.githubusercontent.com/63049433/184631331-78ee8256-10a2-4e6b-bdd6-493b3a2773d3.jpg)
</p>

1. Pole do edytowania nazwy właściwości.
2. Pola/guziki dla każdej wartości właściwości. **CTRL+CLICK PRZEŁĄCZA POLE MIĘDZY PUSTYM (USUNIĘCIE) A ORIGINALNĄ WARTOŚCIĄ**

I na samym dole zawierają guziki, odpowiednio *add* lub *delete/save*, otwierające modale proszące o potwierdzenie zmiany. Więcej o nich w sekcji [modale](#modal)

## Browse

Podstrona służąca do przeglądania długopisów oraz filtrowania ich wyszukiwarką.
Składają się na nią:

<p align=center>
![browse](https://user-images.githubusercontent.com/63049433/184631346-e969551a-f676-4ba3-b269-b27db90e80af.jpg)
</p>

1. Wyszukiwarka
2. Lista długopisów
3. Guziki kontrolujące, na której stronie przeglądania jesteśmy. Domyślnie pokazywane jest maksymalnie 5 długopisów naraz.

### Napotkane wyzwania - browse

### Wyszukiwarka

W przypadku tworzenia wyszukiwarki można wybrać 2 podejścia. Albo produkty filtrowane sa po stronie klienta, albo po stronie serwera.

W drugim wypadku należałoby zaimplementować funkcję filtrowania produktów używając [url queries](https://developer.mozilla.org/en-US/docs/Web/API/URL_API#queries). Dodatkowo, żeby uniknąć wysyłania niepotrzebnie dużej ilości zapytań, jedno za każdym razem, kiedy użytkownik zmieni wartość szukanej frazy, używa się [debouncowania](https://www.freecodecamp.org/news/javascript-debounce-example#what-is-debounce). To podejście, przypadkach, kiedy ilość dostępnych produktów jest większa, niż ma to sens wysyłać za jednym razem do klienta (na przykład gdybyśmy ograniczyli produkty do wyświetlania maksymalnie 10 naraz).

Ponieważ implementacja wyszukiwania po stronie serwera jest o wiele bardziej pracochłonna od filtrowania otrzymanych długopisów po stronie klienta oraz z uwagi na fakt, że w przypadku tego projektu długopisów nie będzie dużo, zdecydowałem się na filtrowanie po stronie klienta.

Funkcja filtrująca długopisy łączy ze sobą nazwę długopisu oraz jego właściwości i ich wartości w jeden długi tekst, a następnie, jeśli ten tekst nie ma w sobie jakiegokolwiek z wyszukiwanych słów (przykładowo fraza *"brand pen"* ma w sobie dwa słowa, *"brand"* i *"pen"*) usuwa go z listy długopisów do wyświetlenia, i zwraca wszystkie pozostałe długopisy.

```typescript
filteredPens(){
  // if there is no search filter return all pens
  if(this.searchFilter === ""){ return this.pens }

  // mergedTextPens contains an array of
  // { id: pen._id, textContent: all of pen's text content merged together }
  const filteredIDs = this.mergedTextPens.filter((textPen) => {
    let rv = true
    this.splitSearchFilter.forEach(word => {
        const mergedTextContainsWord = textPen.textContent.indexOf(word) !== -1
        if(!mergedTextContainsWord){
          rv = false
        }
    })
    return rv
  })
    // get only ids
    .map(textPen => textPen.id)

  // return pens that ids match the ones in filteredIDs
  return this.pens.filter(pen => filteredIDs.includes(pen._id))
}
```

## Login

Podstrona pozwalająca na zarejestrowanie się lub zalogowanie do istniejącego konta. Dodatkowo, kiedy użytkownik jest zalogowany daje możlwość usunięcia konta i wylogowania się.

<p align=center>
![login](https://user-images.githubusercontent.com/63049433/184631367-7c39d5e3-ace5-4a54-bf06-0d1c0e9b6ade.jpg)
]
</p>

## Modal

W całej stronie funkcjonują 2 różne typy modali. Funkcjonalność każdego z nich jest taka sama, różnią się jednak zawartością.

Zaczynając od funkcjonalności, otwarty modal powinien przyciemnić resztę strony, "skupić" dowolny ze swoich elementów oraz "uwięzić" nawigację klawiaturą w sobie.

Przechodząc do zawartości:

#### Modal potwierdzający

<p align=center>
![configuration edit modal](https://user-images.githubusercontent.com/63049433/184631435-9cdd7854-1bca-4f45-b266-05af7fb8572e.jpg)
</p>

Prosi o potwierdzenie wprowadzonej zmiany i, w przypadku *konfiguracji właściwości* wyświetla informacje dotyczące obecnej operacji.

#### Modal z edytorem 

<p align=center>
![new pen modal](https://user-images.githubusercontent.com/63049433/184631450-36fd1a2a-2ad0-46eb-9760-bbb51f6a373e.jpg)
</p>

Zawiera w sobie edytor długopisów.

Dodatkowo każdy z tych modali w przypadku, kiedy operacja się nie powiedzie wyświetla wiadomość błędu otrzymanego od serwera.

<p align=center>
![error modal](https://user-images.githubusercontent.com/63049433/184631459-de4a3e99-e168-4e54-ae3d-43697c5db043.jpg)
</p>

### Napotkane wyzwania - modal

Domyślnie, kiedy ktoś nawigujący klawiaturą otworzy modal klikając `enter` na guziku, albo do dokumentu jest dodawany nowy element zawierający w sobie modal i jego backdrop, albo modalowi i jego elementom zmieniany jest styl `display`.

Ukryty modal i zmiana jego stylu w zależności od potrzeby byłaby preferowanym rozwiązaniem gdyby modal przez większość czasu pozostawał taki sam. W przypadku tej aplikacji rzadko kiedy ma to miejsce, więc w związku z tym oraz faktem, że zależy nam na przesuwaniu *"focusu"* do środka modalu, zdecydowałem się na tworzenie go od zera i usuwanie zamiast chowania.

#### Przenoszenie focusu

Po otworzeniu modalu, aktywny element dokumentu nie zmienia się ponieważ jedyne, co zrobiliśmy to dodaliśmy nowy element do naszej strony. Element ten może znajdować się w dowolnej części strony, jednak w przypadku tej aplikacji dodawany jest on na końcu.

To oznacza, że żeby użytkownik mógł dojść do guzików lub pól tekstowych znajdujących się w modalu będzie on musiał przejść przez wszystkie, częściowo zakryte elementy znajdujące się pomiędzy guzikiem, z którego otworzył modal, a zawartością modalu.

Korzystając z [lifecycle hooku](https://vuejs.org/guide/essentials/lifecycle.html) [mounted](https://vuejs.org/api/options-lifecycle.html#mounted) i tego, że każdy z moich modali ma przynajmniej dwa nawigowalne elementy (guziki *cancel* i *confirm*), do moich guzików dodałem prop `focusOnMounted`. Jeśli jego wartość jest równa `true`, w momencie *"zamontowania"* go przenosi on *focus* dokumentu na siebie.

```typescript
props: {
  focusOnMounted: {
    type: Boolean,
    default: false
  }
},
mounted(){
  this.focusOnMounted && this.focusMe()
},
methods: {
  focusMe(){
    this.$nextTick(() => {
      this.$refs.me.focus()   
    })
  }
}
```

Funkcja `focusMe` używa wbudowanej funkcji aplikacji Vue [$nextTick](https://vuejs.org/api/general.html#nexttick), która jako swój argument bierze funkcję, jaka zostanie wywołana po następnej aktualizacji dokumentu, czyli w naszym przypadku po pojawieniu się modalu.

Bez czekania na aktualizację dokumentu w momencie *"zamontowania"* guzika nie jest on jeszcze częścią dokumentu.

#### Nawigacja klawiaturą

Po otworzeniu modalu i przeniesieniu *focusu* na jeden z jego elementów, użytkownik nadal ma możliwość przemieszczania się po wszystkich elementach strony. Oznacza to, że może wyjść do elementu, który jest wizualnie ukryty za naszym modalem.

Żeby uniemożliwić wyjście poza modal do całego modalu dodajemy listener `onkeydown`, podobnie jak w nawigacji i kiedy użytkownik dojdzie do ostatniego nawigowalnego elementu modalu przesuwamy go na pierwszy, a jeśli spróbuje cofnąć się z pierwszego przesuwamy *focus* na ostatni.

```typescript
handleTabNavigation(e: KeyboardEvent){
  // get list of all focusable elements inside modal
  const focusables = this.$refs.contentContainer.querySelectorAll("button,input,select")

  // if shift tabbing from first one focus the last one
  if(e.shiftKey && document.activeElement === focusables[0]){
    focusables[focusables.length - 1].focus()
    e.preventDefault()
    return
  }

  // if tabbing from last one focus first one
  if(!e.shiftKey && document.activeElement === focusables[focusables.length - 1]){
    focusables[0].focus()
    e.preventDefault()
    return
  }
}
```

W przypadku naszej aplikacji szukamy tylko guzików, pól tekstowych i rozwijanych list w elementach modalu.

Z uwagi na fakt, że zawartość naszego modalu zmienia się po zatwierdzeniu zmiany, musimy wyszukiwać wszystkie nawigowalne elementy za każdym razem kiedy użytkownik przemieszcza się po stronie.

# Back end

## In workings... 📄✒️👷
