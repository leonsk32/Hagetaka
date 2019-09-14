Feature: Hagetaka

  Scenario: Open Hagetaka

    Given I open Hagetaka page
    Then the title is "Hagetaka"
    And the navigation bar exists

  Scenario: Go to Login

    Given I open Hagetaka page
    When click Login
    And click Go to Login Page
    Then the login form exists