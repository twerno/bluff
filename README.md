# Zadanie dla praktykantów - gra Blef
[wiki pl](https://pl.wikipedia.org/wiki/Blef_(gra_w_kości))
[wiki en](https://en.wikipedia.org/wiki/Liar%27s_dice)

# Uruchomienie demo
1. `npm i -ws`
2. `npm run demo`

# Lista przykładowych zadań do wyboru
1. Zaimplementować validację ruchu gracza w `BluffStateEngineTransitions.playerMoveBidTransition`
2. Zaimplementować zasady wyliczania punktów w `BluffStateEngineTransitions.playerMoveChallangeTransition`
3. Zaimplmeentować mechanizm wyznaczania kolejności graczy
4. Przygotować implementację AIProviera, która oszukuje i zawsze wygrywa
5. Przygotować implementację AIProviera z użyciem ChatGPT
6. Wykonać dokumentację wybranych modułów
7. Przygotować testy automatyczne dla wybranych modułów
8. Przygotować wizualizację gre w React
9. Przygotować implementację AIProviera pozwalającego wykonywać ruch graczowi

# Skrócona wersja zasad
1. Ilość graczy 2-6 definiowana na początku gry 
2. Każdy gracz zaczyna z 5 kostkami k6 
3. Początek rundy: każdy gracz rzuca wszystkimi posiadanymi kostkami (wyniki nie są widoczne dla innych graczy) 
4. Gracze kolejno wykonują jedną z 2 akcji: 
   1. Bid – deklaruje na ilu kostkach wypadła dana ilość oczek; 1 oczko do joker – nie można go wybrać; Porównując do licytacji poprzedniego gracza można wybrać kostkę z tą samą liczbą oczek, ale licytować większą ich ilość, lub kostkę o większej liczby oczek z dowolną liczbą. 
   2. Challenge – gracz sprawdza poprzednią licytację. Sumowana jest liczba kostek, na których wypadła licytowana liczba. Do tej liczby dodawana jest liczba jedynek. Wygrywa gracz licytujący jeżeli suma jest większa niż liczba, którą licytowana. Wygrywa gracz sprawdzający, jeżeli suma jest niższa niż ostatnio licytowana liczba. Jeżeli obie liczby są równe obaj gracze wygrywają. Gracz, który przegrał traci jedną kostkę. 
5. Runda kończy się po wykonaniu akcji challenge. Jeżeli w grze pozostało co najmniej 2 graczy, zaczyna się kolejna runda. 
6. Gracz, który stracił wszystkie kostki jest eliminowany. Wygrywa ostatni gracz, który pozostaje w grze. 