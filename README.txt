STRONA KONFERENCJI – SZYBKI START

1. Wstaw plakat jako include/plakat.png (własny plik PNG).
2. W index.html uzupełnij [opis projektu], członków komitetów i logotypy w stopce.
3. W main.js edytuj tablicę schedule (tytuły pustych referatów pokazują placeholder).
4. Zmień paletę barw u góry main.css w :root.
5. Wgraj pliki do repozytorium GitHub i uruchom Settings > Pages > Deploy from a branch > main / (root).
6. Link do plakatu: https://<uzytkownik>.github.io/<repozytorium>/?plakat

Bez zależności i bez narzędzi budujących. Otwórz index.html lokalnie w przeglądarce, aby zobaczyć podgląd.
Nie dodano fikcyjnego plakatu ani logotypów – wstaw rzeczywiste pliki do include/.

AKTUALIZACJA - ORGANIZATORZY I STOPKA
- W index.html sekcja #organizatorzy ma cztery bloki; wpisuj osoby w <ul class="people-list"><li>...</li></ul>.
- W stopce pierwsza linia to .funding-row. Podmień .funding-placeholder na <img class="funding-image" src="include/belka-finansowanie.png" alt="...">. Dopasuj alt do wymaganej treści belki.
- W drugiej linii stopki .footer-groups rozdziela organizatorów i partnerów. Podmień placeholdery na logotypy.
- Stopka pozostaje przyklejona do dołu. Jej wysokość zmienisz w main.css przez --footer-height (osobno w regule @media dla telefonów).
