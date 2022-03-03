-- Criar a tabela produtos

create table organizacao (
codigo serial not null primary key, 
nome varchar(50) not null,
fundacao integer not null,
localicade varchar(50) not null);

-- inserir alguns registros
insert into organizacao (nome, fundacao, localicade) values ('Conmebol', 1950, 'América do Sul'), ('UEFA', 1960, 'Europa');
