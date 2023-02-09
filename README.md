# Fraction Decimal Explorer

Fraction Decimal Converter is a program that prints out the decimal representation for fractions given by the user. My goal is to facilitate exploring how fractions and their decimal equivilants are related, both for myself and others.

## Getting started

This project can be viewed at https://main--fraction-decimal-app.netlify.app/.

![initial_view](https://github.com/coding-quizzer/fraction_decimal_app/blob/feature/create-read-me/docs/initial_view.png?raw=true)

Type in a fraction at the top of the screen and click calculate to see the decimal expansion (note: this app does not currently support complex fractions - fractions where the numerator (the top number) is larger than the denominator (the bottom number). If you hover your mouse pointer over digit after the decimal point, a fraction will be displayed as a tooltip.
If you calculate the decimal expansion of that new fraction, the expansion will include the original expansion starting with that digit.

For example, here is the decimal expansion for 1/13. When I hover my mouse over the digit 9, the tooltip shows the fraction 12/13.
![view_fraction](https://github.com/coding-quizzer/fraction_decimal_app/blob/feature/create-read-me/docs/view_fraction.png?raw=true)

When I calculate the decimal expansion for 12/13, the expansion continues from where 1/13 leaves off, starting at that nine.
![new_fraction](https://github.com/coding-quizzer/fraction_decimal_app/blob/feature/create-read-me/docs/new_fraction.png?raw=true)

## Dependencies

-- react
-- @floating-ui/react (Used to make for the tooltips on the decimal digits and the github tooltip)

## Developments

I hope to eventually support endless scrolling, so that the user can scroll arbitrarilly far along the fraction without requiring a limit as it does now. I think I might also allow the user to view the whole decimal expansion all at once, allowing him to better see and explore patterns in the expansions. I hope to make an explanation in the website itself, so that the user can understand what's happening in the app.
