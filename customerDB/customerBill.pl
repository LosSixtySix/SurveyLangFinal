:- module(customer_bill,
      [ 
         customer_bill/3
      ]).
% bill_sum(Id,Amount) :- aggregate(sum(X), customer_bill(Id,X,_), Amount).


customer_bill(1,25,date(3,31,2026)).
customer_bill(0,25,date(3,31,2026)).
customer_bill(0,30,date(3,31,2026)).
customer_bill(0,-25,date(3,31,2026)).
customer_bill(0,-30,date(3,31,2026)).