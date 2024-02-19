package com.task_tracker.exception;

import org.springframework.http.HttpStatus;

public class AlreadyExistException extends RuntimeException {
	
	private static final long serialVersionUID = -2171272011475853092L;
	private HttpStatus httpStatus;
	private String errorMessage;

	public AlreadyExistException(HttpStatus httpStatus, String errorMessage) {
		super();
		this.httpStatus = httpStatus;
		this.errorMessage = errorMessage;
	}

	public HttpStatus getHttpStatus() {
		return httpStatus;
	}

	public void setHttpStatus(HttpStatus httpStatus) {
		this.httpStatus = httpStatus;
	}

	public String getErrorMessage() {
		return errorMessage;
	}

	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}

}
