/*SCRIPT BASE DE DATOS DE PROYECTO O.T*/

create database SistemaWebOT

/* base de datos rols*/
create table rols(
    id smallserial NOT NULL , 
    name varchar(20) NOT NULL UNIQUE,
    PRIMARY KEY(id)
);

/* base de datos estado de machine*/
create table status_machine(
    id smallserial NOT NULL , 
    status varchar(30) NOT NULL,
	PRIMARY KEY (id)
);
/* base de datos sections*/
create table sector(
    id smallserial NOT NULL,
    description varchar(250), 
    name varchar(30) NOT NULL , 
    company_id smallint NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY(company_id) REFERENCES company (id)
);
/* base de datos compañia*/
create table company(
    id smallserial NOT NULL,
    name varchar(30) NOT NULL,
    description varchar(50),
    PRIMARY KEY (id),
   
    
);
/* base de datos Line*/
create table line(
   id smallserial NOT NULL, 
   description varchar(250),
   name varchar(30),
   company_id smallint NOT NULL,
   FOREIGN KEY(company_id) REFERENCES company (id)
);
/* base de datos machine*/
create table machine(
    id smallserial NOT NULL , 
    name varchar(30) NOT NULL,
    sector_id smallserial NOT NULL , 
    description varchar(250),
    line_id smallint NOT NULL,
    status_machine_id smallint NOT NULL,
    last_update timestamp,
    PRIMARY KEY (id),
    FOREIGN KEY (sector_id) REFERENCES sector (id),
    FOREIGN KEY (line_id) REFERENCES line (id),
    FOREIGN KEY (status_machine_id) REFERENCES status_machine (id),
);


/* base de datos users*/
create table users(
    id smallserial NOT NULL , 
    username varchar(30) NOT NULL,
    email varchar(50) UNIQUE,
    password varchar(60) NOT NULL ,
    company_id smallint NOT NULL,
    rol_id smallint NOT NULL , 
    PRIMARY KEY(id),
    FOREIGN KEY(rol_id) REFERENCES rols (id) /* Relacion de tabla users & rols*/
    FOREIGN KEY(company_id) REFERENCES company (id)
);

/* base de datos Tokens*/
create table tokens(
  id serial NOT NULL,   
  user_id int NOT NULL,
  token varchar(255),
  type varchar(80),
  is_revoked boolean,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users (id)
);

/* Base de datos machine historicos*/

create table old_machine(
    id smallserial NOT NULL , 
    machine_id smallint NOT NULL , 
    name varchar(30) NOT NULL,
    sector_id int NOT NULL,
    description varchar(250),
    status_machine_id smallint NOT NULL , 
    last_update timestamp ,
    line_id smallint NOT NULL,
    user_id smallserial NOT NULL,
    justification varchar(250),
    PRIMARY KEY (id),
    FOREIGN KEY (sector_id) REFERENCES sector (id),
    FOREIGN KEY (line_id) REFERENCES line (id),
    FOREIGN KEY (status_machine_id) REFERENCES status_machine (id), 
    FOREIGN KEY (user_id) REFERENCES users (id)
);

/* Base de datos task */
 create table task(
    id smallserial NOT NULL , 
    type_task varchar(30) NOT NULL,
    PRIMARY KEY(id)
);

/* Base de datos Estado de OT*/
create table status_o_t(
    id smallserial NOT NULL,
    type varchar(50) NOT NULL,
    PRIMARY KEY (id)
);    

/* Basde de datos Tabla pivot*/

create table company_line(
    company_id smallint NOT NULL,
    line_id smallint NOT NULL,
    FOREIGN KEY (company_id) REFERENCES company (id),
    FOREIGN KEY (line_id) REFERENCES line (id)
)