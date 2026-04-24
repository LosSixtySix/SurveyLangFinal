:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).

:- use_module(library(pengines)).
:- use_module(library(sandbox)).

:- use_module(pengine_sandbox:'../customerDB/customerRules').

server(Port) :-
    writef('Starting Server at %d',[Port]),
    http_server(http_dispatch, [port(Port)]).
