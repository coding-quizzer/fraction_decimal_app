# Fraction Decimal Explorer

Fraction Decimal Converter is a program that prints out the decimal representation for fractions given by the user. My goal is to facilitate exploring how fractions and their decimal equivilants are related, both for myself and others.

## Getting started

This project can be viewed at https://main--fraction-decimal-app.netlify.app/.

![initial_view](https://github.com/coding-quizzer/fraction_decimal_app/blob/feature/create-read-me/docs/initial_view.png?raw=true)

Type in a fraction at the top of the screen and click calculate to see the decimal expansion (note: this app does not currently support complex fractions - fractions where the numerator (the top number) is larger than the denominator (the bottom number). If you hover your mouse pointer over digit after the decimal point, a fraction will be displayed as a tooltip.
![view_fraction](https://github.com/coding-quizzer/fraction_decimal_app/blob/feature/create-read-me/docs/view_fraction.png?raw=true)

If you calculate the decimal expansion of that new fraction, the expansion will include the original expansion starting with that digit.
![new_fraction](https://github.com/coding-quizzer/fraction_decimal_app/blob/feature/create-read-me/docs/new_fraction.png?raw=true)

## Dependencies

-- react
-- @floating-ui/react (Used to make for the tooltips on the decimal digits and the github tooltip)

## Developments

I hope to evntually support endless scrolling, so that the user can scroll arbitrarilly far along the fraction without needing a limit as it is required so far. I think I might also allow the user to view the whole decimal expansion all at once to better see and explore patterns in the expansions. I hope to make an explanation in the website itself, so that the user can understand what's happening in the app.