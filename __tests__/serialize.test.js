var php = require('../index');

it ('serializes primitives', () => {
    expect(php.serialize(null)).toEqual('N;');
    expect(php.serialize(true)).toEqual('b:1;');
    expect(php.serialize(false)).toEqual('b:0;');
    expect(php.serialize(1)).toEqual('i:1;');
    expect(php.serialize(2)).toEqual('i:2;');
    expect(php.serialize(-2)).toEqual('i:-2;');
    expect(php.serialize(3.14)).toEqual('d:3.1400000000000001;');
    expect(php.serialize("hello")).toEqual('s:5:"hello";');
    expect(php.serialize("0")).toEqual('i:0;');
});

it ('serializes arrays', () => {
    expect(php.serialize([])).toEqual('a:0:{}');
    expect(php.serialize([2,5,6])).toEqual('a:3:{i:0;i:2;i:1;i:5;i:2;i:6;}');
    expect(php.serialize({})).toEqual('a:0:{}');
    expect(php.serialize({hello:"there"})).toEqual('a:1:{s:5:"hello";s:5:"there";}');
});

it ('serializes objects', () => {
    var obj1 = {
        __phpSerializedObject__: { name: "MyCustomClass" },
        one: 'two',
        three: 'four',
    };
    var obj2 = {
        __phpSerializedObject__: { 
            name: "MyCustomClass",
            access: {
                one: "protected",
                three: "private",
            },
        },
        one: 'two',
        three: 'four',
    };
    var obj3 = {
        __serialized__: { 
            name: "MyCustomClass",
            access: {
                one: "protected",
                three: "private",
            },
        },
        one: 'two',
        three: 'four',
    };
    expect(php.serialize(obj1)).toEqual('O:13:"MyCustomClass":2:{s:3:"one";s:3:"two";s:5:"three";s:4:"four";}');
    expect(php.serialize(obj2)).toEqual('O:13:"MyCustomClass":2:{s:6:"\0*\0one";s:3:"two";s:20:"\0MyCustomClass\0three";s:4:"four";}');
    expect(php.serialize(obj3, {metakey:"__serialized__"})).toEqual('O:13:"MyCustomClass":2:{s:6:"\0*\0one";s:3:"two";s:20:"\0MyCustomClass\0three";s:4:"four";}');
});

