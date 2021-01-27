CREATE SCHEMA IF NOT EXISTS `tin`;

-- tables
-- Table: Klient
CREATE TABLE tin.Klients (
    ID int NOT NULL AUTO_INCREMENT,
    Imie varchar(255) NOT NULL,
    Nazwisko varchar(100) NOT NULL,
    Email varchar(100) NOT NULL,
    CONSTRAINT Klient_pk PRIMARY KEY (ID)
);

-- Table: Przedmiot
CREATE TABLE tin.Przedmiots (
    ID int NOT NULL,
    Nazwa varchar(255) NOT NULL,
    Typ varchar(100) NOT NULL,
    Cena decimal(10,10) NOT NULL,
    CONSTRAINT Przedmiot_pk PRIMARY KEY (ID)
);

-- Table: Zakup
CREATE TABLE tin.Zakups (
    ID int NOT NULL,
    Klient_ID int NOT NULL,
    Przedmiot_ID int NOT NULL,
    Data date NOT NULL,
    Data_wysylki date NOT NULL,
    Adres_wysylki varchar(255) NOT NULL,
    CONSTRAINT Zakup_pk PRIMARY KEY (ID)
);

-- foreign keys
-- Reference: Zakup_Przedmiot (table: Zakup)
ALTER TABLE tin.Zakups ADD CONSTRAINT Zakup_Przedmiot FOREIGN KEY Zakup_Przedmiot (Przedmiot_ID)
    REFERENCES Przedmiots (ID);

-- Reference: zakup_Klient (table: Zakup)
ALTER TABLE tin.Zakups ADD CONSTRAINT zakup_Klient FOREIGN KEY zakup_Klient (Klient_ID)
    REFERENCES Klients (ID);

-- End of file.

