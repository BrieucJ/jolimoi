import convertToRoman from './convertToRoman.js';

test('convertToRoman number', () => {
    let checks = [
        [ 'M', 1000 ],
        [ 'D', 500 ],
        [ 'C', 100 ],
        [ 'L', 50 ],
        [ 'X', 10 ],
        [ 'V', 5 ],
        [ 'I', 1 ],
        ['IV', 4 ],
        ['VI', 6 ],
        ['XIX', 19 ],
        ['MCMLXXXVII', 1987]
    ]
    checks.map(arr => {
        expect(convertToRoman(arr[1])).toBe(arr[0]);
    })
});

test('convertToRoman not an integer', () => {
    expect(() => {
        convertToRoman(1.5)
    }).toThrow('value is not an integer');
    expect(() => {
        convertToRoman('bonjour')
    }).toThrow('value is not an integer');
    expect(() => {
        convertToRoman('')
    }).toThrow('value is not an integer');
    expect(() => {
        convertToRoman()
    }).toThrow('value is not an integer');
    expect(() => {
        convertToRoman(null)
    }).toThrow('value is not an integer');
    expect(() => {
        convertToRoman(undefined)
    }).toThrow('value is not an integer');
});