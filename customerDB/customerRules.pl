
:- module(customer_rules,
      [ 
         create_customer/4,
         update_customer/5
      ]).

:- use_module('../customerDB/customerBill.pl').
:- use_module('../customerDB/customers.pl').
:- use_module('../customerDB/customerID.pl').

create_customer(Name,Email,Phone,Status) :- 
    next_ID(ID),
    assertz(customer(ID,Name,Email,Phone,Status)),
    NewID is ID + 1,
    open('customerID.pl',write,Stream2),
    write(Stream2,  (:- module(customerID,[next_ID/1]))),
    write(Stream2,'.'),
    write(Stream2,'~n'),
    write(Stream2,next_ID(NewID)),
    write(Stream2,'.'),
    close(Stream2).

update_customer(ID,Name,Email,Phone,Status) :-
      retract(customer(ID,OldName,OldEmail,OldPhone,OldStaus)),
      assert(customer(ID,Name,Email,Phone,Status)).

save_each_customer() :-
      open('customers.pl',write,Stream),
      write(Stream,(:- module(customers,[customer/5]))),
      write(Stream,'.'),
      nl(Stream),
      write(Stream,(:- dynamic(customer/5))),
      write(Stream,'.'),
      nl(Stream),
      forall((customer(Id,Name,Email,Phone,Status),
      writeq(Stream,(customer(Id,Name,Email,Phone,Status))),
      write(Stream,'.'),
      nl(Stream)),true),
      close(Stream).
