package ruter.realtime;

class RuterException extends RuntimeException {
    public RuterException(Exception e) {
        super(e);
    }

    public RuterException(String s) {
        super(s);
    }
}
