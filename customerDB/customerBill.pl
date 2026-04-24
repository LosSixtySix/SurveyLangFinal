:- module(customer_bill,
      [ 
         customer_bill/3,
         bill_sum/2
      ]).

sum(0,[]).
sum(Total,[Head|Tail]) :- sum(Sum,Tail), Total is Head + Sum.

bill_sum(Id,Amount) :- bagof(A,customer_bill(Id,A,_),List), sum(Amount,List).

customer_bill(1,25,date(3,31,2026)).
customer_bill(0,25,date(3,31,2026)).
customer_bill(0,30,date(3,31,2026)).
customer_bill(0,-25,date(3,31,2026)).
customer_bill(0,-30,date(3,31,2026)).


