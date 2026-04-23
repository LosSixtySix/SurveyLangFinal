

customer_bill(1,25,date(3,31,2026)).
customer_bill(0,25,date(3,31,2026)).
customer_bill(0,30,date(3,31,2026)).
customer_bill(0,-25,date(3,31,2026)).
customer_bill(0,-30,date(3,31,2026)).


bill_sum(Id,Amount) :- aggregate(sum(X), customer_bill(Id,X,_), Amount).

paid_customer(ID,Name,Email,Phone) :- customer(ID,Name,Email,Phone,true).
customer(1,jill,"jil@gmail.com",4566454555,true).
customer(2,joebob,"test@gmail.com",456664646,false).
customer(4,george,"yourmom",4356667777,true).
customer(13,test,"test",test,true).
customer(14,test,"test",test,true).
customer(15,test,"test",test,true).
customer(16,test,"test",test,true).
customer(17,test,"test",test,true).
customer(18,test,"test",test,true).
customer(19,test,"test",test,true).
customer(20,test,"test",test,true).
customer(21,test,"test",test,true).
customer(22,test,"test",test,true).
customer(23,test3,"tet54",t,false).
customer(0,jane,"jane@gmail.com",111111111,true).
customer(24,jane,"joebob@gmail.com",1112223333,true).

