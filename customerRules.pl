
:- module(customer_rules,
      [ 
         paid_customer/4,
         unpaid_customer/4,
         disconnected_customer/4,
         create_customer/4,
         update_customer/5,
         save_each_customer
      ]).

:- use_module(customerBill).
:- use_module(customers).
:- use_module(customerID).
:- use_module(library(make)).

paid_customer(ID,Name,Email,Phone) :- customer(ID,Name,Email,Phone,_), bill_sum(ID,0).
unpaid_customer(ID,Name,Email,Phone) :- customer(ID,Name,Email,Phone,_), not(bill_sum(ID,0)).
disconnected_customer(ID,Name,Email,Phone) :- customer(ID,Name,Email,Phone,false).
bill_sum(ID,TotalSum) :- findall(Amount,customer_bill(ID,Amount,_),Amounts),sum_list(Amounts,TotalSum).

create_customer(Name,Email,Phone,Status) :- 
    next_ID(ID),
    assert(customer(ID,Name,Email,Phone,Status)),
    NewID is ID + 1,
    open('customerID.pl',write,Stream2),
    write(Stream2,  :- module(customerID,[next_ID/1])),
    write(Stream2,'.'),
    nl(Stream2),
    write(Stream2,next_ID(NewID)),
    write(Stream2,'.'),
    close(Stream2),
    make().

update_customer(ID,Name,Email,Phone,Status) :-
      retract(customer(ID,OldName,OldEmail,OldPhone,OldStaus)),
      assert(customer(ID,Name,Email,Phone,Status)).

save_each_customer() :-
      open('customers.pl',write,Stream),
      write(Stream,:- module(customers,[customer/5])),
      write(Stream,'.'),
      nl(Stream),
      write(Stream,:- dynamic(customer/5)),
      write(Stream,'.'),
      nl(Stream),
      forall((customer(Id,Name,Email,Phone,Status),
      writeq(Stream,customer(Id,Name,Email,Phone,Status)),
      write(Stream,'.'),
      nl(Stream)),true),
      close(Stream).
