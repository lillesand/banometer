package ruter.realtime;

public class NoBusAvailableException extends RuterException {
	public NoBusAvailableException(String reason) {
		super(reason);
	}
}
