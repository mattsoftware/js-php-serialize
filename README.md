# js-php-serialize
NodeJS Module for working with PHP serialized data

## Usage

In the most basic form, simply pass primitives, objects or arrays into the serialize method.

```
var php = require('js-php-serialize');

console.log(php.serialize({one:"two", 3:"four"}));
// => a:2:{i:3;s:4:"four";s:3:"one";s:3:"two";}
```

For more complex objects, an optional metadata value can be passed through to provide hints on how to serialize the object. By default this is the `__phpSerializedObject__` property, but can be customised by passing through an options object through to the serialize method. (See the `__tests__` folder for more examples.)

```
var php = require('js-php-serialize');

var obj = {
    __phpSerializedObject__: {
        name: "MyCustomClass",
        access: {
            three: "private",
            five: "protected",
        },
    },
    one: "two",
    three: 4,
    five: "six",
};
console.log(php.serialize(obj));
// => O:13:"MyCustomClass":3:{s:3:"one";s:3:"two";s:20:"MyCustomClassthree";i:4;s:7:"*five";s:3:"six";}
```

