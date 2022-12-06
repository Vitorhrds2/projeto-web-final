CREATE TABLE cmrv_builder_construction_summary ( 
	id                   INTEGER NOT NULL  PRIMARY KEY AUTOINCREMENT ,
	name                 VARCHAR(100)     ,
	description          TEXT     ,
	is_with_mrv          BOOLEAN  DEFAULT 0   ,
	user_builder_id      INTEGER     
 );

CREATE TABLE cmrv_builder_construction_summary_image ( 
	id                   INTEGER NOT NULL  PRIMARY KEY AUTOINCREMENT ,
	path                 VARCHAR(50)     ,
	filename             VARCHAR(100)     ,
	builder_construction_summary_id INTEGER     ,
	creation_date        DATE  DEFAULT CURRENT_DATE   
 );

CREATE TABLE cmrv_builder_tag ( 
	builder_id           INTEGER     ,
	tag_id               INTEGER     
 );

CREATE TABLE cmrv_construction ( 
	id                   INTEGER NOT NULL  PRIMARY KEY  AUTOINCREMENT,
	name                 VARCHAR(100)     ,
	description          TEXT     ,
	city_id              INTEGER     ,
	type_id              INTEGER     ,
	creation_date        DATE  DEFAULT CURRENT_DATE   ,
	update_date          DATE     
 );

CREATE TABLE cmrv_construction_builder_interest ( 
	id_construction      INTEGER     ,
	id_builder           INTEGER     ,
	creation_date        DATE  DEFAULT CURRENT_DATE   
 );

CREATE TABLE cmrv_construction_image ( 
	id                   INTEGER NOT NULL  PRIMARY KEY  AUTOINCREMENT,
	path                 VARCHAR(50)     ,
	filename             VARCHAR(30)     ,
	construction_id      INTEGER     ,
	creation_date        DATE  DEFAULT CURRENT_DATE   
 );

CREATE TABLE cmrv_construction_type ( 
	id                   INTEGER NOT NULL  PRIMARY KEY  ,
	name                 VARCHAR(100)     
 );

CREATE TABLE cmrv_tag ( 
	id                   INTEGER NOT NULL  PRIMARY KEY  ,
	name                 VARCHAR(50)     
 );

CREATE TABLE cmrv_tag_construction ( 
	construction_id      INTEGER     ,
	tag_id               INTEGER     
 );

CREATE TABLE cmrv_user_administrator ( 
	id                   INTEGER NOT NULL  PRIMARY KEY  AUTOINCREMENT,
	name                 VARCHAR(100)     ,
	email                VARCHAR(60)     ,
	password_hash        VARCHAR(255)     ,
	password_salt        VARCHAR(10)     ,
	creation_date        DATE  DEFAULT CURRENT_DATE   ,
	update_date          DATE     
 );

CREATE TABLE cmrv_user_builder ( 
	id                   INTEGER NOT NULL  PRIMARY KEY  AUTOINCREMENT,
	name                 VARCHAR(100)     ,
	email                VARCHAR(60)     ,
	cellphone            VARCHAR(12)     ,
	cnpj                 VARCHAR(18)     ,
	employees_number     INTEGER     ,
	password_hash        VARCHAR(255)     ,
	password_salt        VARCHAR(10)     ,
	owner_name           VARCHAR(100)     ,
	owner_cellphone      VARCHAR(20)     ,
	owner_cpf            VARCHAR(15)     ,
	owner_birth_date     DATE     ,
	creation_date        DATE  DEFAULT CURRENT_DATE   ,
	update_date          DATE     ,
	avatar_image_id      INTEGER     
 );

CREATE TABLE cmrv_user_builder_image ( 
	id                   INTEGER NOT NULL  PRIMARY KEY  AUTOINCREMENT,
	path                 VARCHAR(50)     ,
	filename             VARCHAR(30)     ,
	is_avatar            BOOLEAN  DEFAULT 0   ,
	user_builder_id      INTEGER     
 );

CREATE TABLE cmrv_user_builder_occupation_area ( 
	id                   INTEGER NOT NULL  PRIMARY KEY  AUTOINCREMENT,
	city_id              INTEGER     ,
	user_builder_id      INTEGER     
 );

CREATE TABLE ibge_city ( 
	id                   INTEGER NOT NULL  PRIMARY KEY  AUTOINCREMENT,
	name                 VARCHAR(100)     ,
	state_id             INTEGER     ,
	number_people        INTEGER     ,
	is_capital           BOOLEAN  DEFAULT 0   
 );

CREATE INDEX idx_ibge_city_is_capital ON ibge_city ( is_capital );

CREATE TABLE ibge_state ( 
	id                   INTEGER NOT NULL  PRIMARY KEY  AUTOINCREMENT,
	name                 VARCHAR(100)     ,
	uf                   VARCHAR(2)     ,
	capital_city_id      INTEGER     
 );