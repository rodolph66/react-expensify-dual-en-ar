# Expensify Dual En/Ar

This is a modified version of the Expensify App created from Andrew Mead's "The Complete React Web Developer Course". This modified version allows for changing the interface language between English and Arabic. It simply laods a font that supports both languages and then provide a src/intl/messages.js file which defines all text strings used in the app in the two languages used. A state property, called lang, keeps track of the languange throughtout the app and if changed loads the respective language specific strings.

The idea was adapted from the React-intl but without loading or using it since the app operates indefferently to the locale used.