/*SCRIPT BASE DE DATOS DE PROYECTO O.T*/

create database SistemaWebOT

/* base de datos rols*/
create table rols(
    id smallserial NOT NULL , 
    rol varchar(20) NOT NULL UNIQUE,
    PRIMARY KEY(id)
);
/* base de datos compañia*/
create table company(
    id smallserial NOT NULL,
    name varchar(30) NOT NULL,
    description varchar(50),
    PRIMARY KEY (id),

);

/*base de datos pivot machine & company*/
create table company_machine(
    company_id smallint,
    machine_id smallint,
    FOREIGN KEY(company_id) REFERENCES company (id),
    FOREIGN KEY(machine_id) REFERENCES machine (id)
)
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


/* base de datos sections*/
create table sections(
    id smallserial NOT NULL,
    description varchar(250), 
    name varchar(30) NOT NULL , 
    PRIMARY KEY (id)
);

/* base de datos estado de machine*/
create table status_machine(
    id smallint NOT NULL , 
    status varchar(30) NOT NULL,
	PRIMARY KEY (id)
);


/* base de datos machine*/
create table machine(
    id smallserial NOT NULL , 
    name varchar(30) NOT NULL,
    section_id smallserial NOT NULL , 
    description varchar(250),
    status_machine_id smallint NOT NULL,
    last_update timestamp,
    user_id smallserial NOT NULL,
    company_id smallint NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (section_id) REFERENCES sections (id),
    FOREIGN KEY (status_machine_id) REFERENCES status_machine (id),
    FOREIGN KEY (company_id) REFERENCES company (id), 
    FOREIGN KEY (user_id) REFERENCES users (id)
);

/* base de datos Line*/
create table line(
   id smallserial NOT NULL, 
   description varchar(250),
   name varchar(30),
   machine_id smallint NOT NULL,
   PRIMARY KEY(id), 
   FOREIGN KEY(machine_id) REFERENCES machine (id) /*Relacion de tabla machine & line*/ 
);

/* Base de datos machine historicos*/

create table old_machine(
    id smallserial NOT NULL , 
    machine_id smallint NOT NULL , 
    name varchar(30) NOT NULL,
    section_id int NOT NULL,
    description varchar(250),
    status_machine_id smallint NOT NULL , 
    last_update timestamp ,
    user_id smallserial NOT NULL,
    justification varchar(250),
    PRIMARY KEY (id),
    FOREIGN KEY (section_id) REFERENCES sections (id),
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