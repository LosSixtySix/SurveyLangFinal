:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_server)).
:- use_module(library(http/http_cors)).
:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(settings)).
:- use_module(library(http/http_json)).

:- use_module(library(pengines)).
:- use_module(library(sandbox)).

:- use_module(pengine_sandbox:'../customerDB/customerRules').
:- set_setting_default(http:cors,[*]).

:-http_handler(root(.),addCustomer,[prefix]).

addCustomer(Request) :-
    cors_enable,
    http_read_json_dict(Request, In),
    pengine_rpc('http://localhost:5050',create_customer(In.name,In.email,In.phone,In.status),[]).
    

server(Port) :-
    writef('Starting Server at %d',[Port]),
    http_server(http_dispatch,[port(Port)]).
