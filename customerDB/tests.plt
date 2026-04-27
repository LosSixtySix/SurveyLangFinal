% Example test for myself
:- begin_tests(lists).
:- use_module(library(lists)).

test(reverse) :-
    reverse([a,b],[b,a]).

:- end_tests(lists).

%Testing bill sum from customerBill.pl
:- begin_tests(billsum).
:- use_module('./customerBill').

    test(bill_sum) :-
        bill_sum(0,A),
        A =:= 0.
    
    test(bill_sum) :-
        bill_sum(1,A),
        A =:= 25.

:-end_tests(billsum).