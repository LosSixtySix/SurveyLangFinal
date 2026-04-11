:- module(customer_bill,
      [ 
         customer_bill/3
      ]).


customer_bill(1,25,date(3,31,2026)).
customer_bill(0,25,date(3,31,2026)).
customer_bill(0,30,date(3,31,2026)).
customer_bill(0,-25,date(3,31,2026)).
customer_bill(0,-30,date(3,31,2026)).