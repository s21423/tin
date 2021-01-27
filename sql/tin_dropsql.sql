-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2021-01-02 11:54:18.448

-- foreign keys
ALTER TABLE Zakups
    DROP FOREIGN KEY Zakup_Przedmiot;

ALTER TABLE Zakups
    DROP FOREIGN KEY zakup_Klient;

-- tables
DROP TABLE Klients;

DROP TABLE Przedmiots;

DROP TABLE Zakups;

-- End of file.

