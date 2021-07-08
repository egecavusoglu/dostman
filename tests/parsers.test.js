const {
    parseDecorator,
    removeSpaces,
    extractVariables,
} = require('../src/lib/parsers');

/**
 * @unit_test Remove extra spaces
 */
test('Remove spaces', () => {
    const text = 'value     value';
    const parsed = removeSpaces(text);
    expect(parsed).toEqual('value value');
});
/**
 * @unit_test Remove extra spaces, newlines, tabs
 */
test('Remove extra spaces, newlines, tabs', () => {
    const text = '\n\t\n  value \t \nvalue';
    const parsed = removeSpaces(text);
    expect(parsed).toEqual(' value value');
});

/**
 * @unit_test Parse decorator
 */
test('Parse decorator', () => {
    const text = '@decorator value';
    const parsed = parseDecorator('decorator', text);
    expect(parsed).toEqual('value');
});

/**
 * @integration_test Parse decorator: absurd spaces and tabs.
 */
test('Parse decorator with absurd whitespaces', () => {
    const text = ' \t@decorator  \t  value \t   ';
    const removedSpaces = removeSpaces(text);
    const parsed = parseDecorator('decorator', removedSpaces);
    expect(parsed).toEqual('value');
});

/**
 * @integration_test Parse decorator: absurd new lines.
 */
test('Parse decorator with absurd newlines', () => {
    const text = '\n  @decorator  \t \n  value\n \t   ';
    const removedSpaces = removeSpaces(text);
    const parsed = parseDecorator('decorator', removedSpaces);
    expect(parsed).toEqual('value');
});

/**
 * @unit_test Parse decorator: no decorator present.
 */

test('Parse decorator with no decorator', () => {
    const text = '\n @  decorator  \t \n  value\n \t   ';
    const removedSpaces = removeSpaces(text);
    const parsed = parseDecorator('decorator', removedSpaces);
    expect(parsed).toBeNull();
});

/**
 * @unit_test Extract single variable
 */
test('Extract multiple variables', () => {
    const text = '\n {{var-one}} {another}';

    const vars = extractVariables(text);
    expect(vars.length).toEqual(1);
    expect(vars).toContain('{{var-one}}');
});

/**
 * @unit_test Extract multiple variables
 */
test('Extract multiple variables', () => {
    const text = '\n {{var-one}} {{var-two}}  ';
    const vars = extractVariables(text);
    expect(vars.length).toEqual(2);
    expect(vars).toContain('{{var-one}}');
    expect(vars).toContain('{{var-two}}');
});

/**
 * @unit_test Extract no variables
 */
test('Extract no variables', () => {
    const text = '\n  }}{{  ';
    const vars = extractVariables(text);
    expect(vars.length).toEqual(0);
});

// Extract variable: function.

// Evaluate config with variable

// Evaluate config with variable as function
