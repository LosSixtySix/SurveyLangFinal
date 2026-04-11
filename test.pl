
:- use_module(customers).
test_save(Fact) :-
    open('test.txt',append,Stream),
    write(Stream,Fact),
    write(Stream,'.'),
    nl(Stream),
    close(Stream).

test_tell(Fact) :-
    tell('test.txt'),
    write(Fact),
    nl,
    told.

test_save2(Fact) :-
    forall(test_save(Fact),true).

