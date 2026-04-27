
:- module(customer_rules,
      [ 
         create_customer/4
      ]).

:- use_module('../customerDB/customerBill.pl').
:- use_module('../customerDB/customers.pl').
:- use_module('../customerDB/customerID.pl').
% :- use_module(library(make)).

% paid_customer(ID,Name,Email,Phone) :- customer(ID,Name,Email,Phone,_), bill_sum(ID,0).
% unpaid_customer(ID,Name,Email,Phone) :- customer(ID,Name,Email,Phone,_), not(bill_sum(ID,0)).
% disconnected_customer(ID,Name,Email,Phone) :- customer(ID,Name,Email,Phone,false).
create_customerT(Name,Email,Phone,Status) :-
      next_ID(Id),
      assertz(customer(Id,Name,Email,Phone,Status)),
      NewID is Id + 1,
      retract(next_ID(Id)),
      assertz(next_ID(NewID)).

update_customer(ID,Name,Email,Phone,Status) :-
      retract(customer(ID,OldName,OldEmail,OldPhone,OldStaus)),
      assertz(customer(ID,Name,Email,Phone,Status)).

% create_customer(Name,Email,Phone,Status) :- 
%       next_ID(ID),
%       open('../customerDB/customers.pl',append,Stream1),
%       format(Stream1,('customer(~w,~w,"~w",~w,~w).'),[ID,Name,Email,Phone,Status]),
%       format(Stream1,'~n',[]),
%       close(Stream1),
%       NewID is ID + 1,
%       open('../customerDB/customerID.pl',write,Stream2),
%       format(Stream2, (':-module(customerID,[next_ID/1]).'),[]),
%       format(Stream2,'~n',[]),
%       write(Stream2,next_ID(NewID)),
%       write(Stream2,'.'),
%       close(Stream2).



% save_each_customer() :-
%       open('customers.pl',write,Stream),
%       write(Stream,:- module(customers,[customer/5])),
%       write(Stream,'.'),
%       nl(Stream),
%       forall((customer(Id,Name,Email,Phone,Status),
%       write(Stream,customer(Id,Name,Email,Phone,Status)),
%       write(Stream,'.'),
%       nl(Stream)),true),
%       close(Stream).
