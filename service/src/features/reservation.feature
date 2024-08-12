Feature: Reservation Management

  Scenario: Making a reservation
    Given a user wants to make a reservation
    When they request to make a reservation with valid details
    Then the reservation should be confirmed

  Scenario: Canceling a reservation
    Given a reservation exists
    When the user cancels the reservation
    Then the reservation should be canceled
