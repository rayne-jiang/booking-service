Feature: Reservation Management

  Scenario: Making a reservation
    Given a user wants to make a reservation
    When they request to make a reservation with valid details
    Then the reservation should be confirmed

  Scenario: Canceling a reservation
    Given a reservation exists
    When the user cancels the reservation
    Then the reservation should be canceled

  Scenario: Updating a reservation
    Given a reservation exists
    When the user updates the reservation with new details
    Then the reservation should be updated

  Scenario: Completing a reservation
    Given a reservation exists
    When the user completes the reservation
    Then the reservation should be marked as completed
