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
/* base de datos OT*/
create table ot(
 id uuid DEFAULT uuid_generate_v4();
 solicitante varchar(30) NOT NULL,
 ejecutor varchar(30) NOT NULL,
 ingreso varchar(30) NOT NULL,
 sector_id smallint NOT NULL,
 line_id smallint NOT NULL,
 machine_id smallint NOT NULL,
 type_task_id smallint NOT NULL,
 grupo varchar(30) NOT NULL,
 status_id smallint NOT NULL,
 company_id smallint NOT NULL,
 PRIMARY KEY (id),
 FOREIGN KEY (sector_id) REFERENCES sector (id),
 FOREIGN KEY (company_id) REFERENCES company (id),
 FOREIGN KEY(status_id) REFERENCES status_o_t (id),
 FOREIGN KEY (type_task_id) REFERENCES task (id),
 FOREIGN KEY (line_id) REFERENCES line (id),
 FOREIGN KEY (machine_id) REFERENCES machine (id)
);
create table observations(
  id smallserial NOT NULL,
  sections varchar(50),
  title varchar(50),
  real boolean ,
  estado varchar(10),
  observations varchar(100),
  img varchar,
  id_ot uuid NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id_ot) REFERENCES ot (id)
)
create table calendar(
    id_ot uuid DEFAULT uuid_generate_v4();
    create_date timestamp NOT NULL,
    FOREIGN KEY (id_ot) REFERENCES OT (id)

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
    company_id smallint NOT NULL,
    last_update timestamp,
    PRIMARY KEY (id),
    FOREIGN KEY (sector_id) REFERENCES sector (id),
    FOREIGN KEY (line_id) REFERENCES line (id),
    FOREIGN KEY (company_id) REFERENCES company (id),
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


/* Base de datos Estado de OT*/
create table status_o_t(
    id smallserial NOT NULL,
    type varchar(50) NOT NULL,
    PRIMARY KEY (id)
);    

/* base de datos Tipo de tarea*/
create table task(
    id smallint,
    type_task varchar(20),
    PRIMARY KEY (id)
)
