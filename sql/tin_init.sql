INSERT INTO klients (imie, nazwisko, email) VALUES ('Jan', 'Kowalski', 'jan.kowalski@acme.com');
INSERT INTO klients (imie, nazwisko, email) VALUES ('Piotr', 'Kowalski', 'piotr.kowalski@acme.com');
INSERT INTO klients (imie, nazwisko, email) VALUES ('Adam', 'Kowalski', 'adam.kowalski@acme.com');

INSERT INTO przedmiots (nazwa, typ, cena) VALUES ('TV','RTV',1000);
INSERT INTO przedmiots (nazwa, typ, cena) VALUES ('Pralka','AGD',1500);


INSERT INTO zakups (klient_id, przedmiot_id, data_zamowienia, data_wysylki, adres_wysylki) 
VALUES (0,1,'2001-01-01','2001-01-01','ul. Konwaliowa 12, 00-001 Warszawa');
INSERT INTO zakups (klient_id, przedmiot_id, data_zamowienia, data_wysylki, adres_wysylki) 
VALUES (1,0,'2001-01-01','2001-01-01','ul. Konwaliowa 12, 00-001 Warszawa');
INSERT INTO zakups (klient_id, przedmiot_id, data_zamowienia, data_wysylki, adres_wysylki) 
VALUES (0,0,'2001-01-01','2001-01-01','ul. Konwaliowa 12, 00-001 Warszawa');