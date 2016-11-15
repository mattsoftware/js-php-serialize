
//var item = {
//    __phpSerializeObject__: { 
//        name: 'BaseApp_Queue_Item',
//        access: { 
//            _module: "protected" ,
//            _controller: "protected",
//            _action: "protected",
//            _params: "protected",
//        },
//    },
//    _module: 'crm',
//    _controller: 'lead',
//    _action: 'save-email',
//    _params: {
//        filename: '',
//    },
//    BaseApp_Queue_Item_info: [],
//};
//
////console.log(phpSerialize(o));
////console.log('O:18:"BaseApp_Queue_Item":5:{s:10:"*_module";s:3:"crm";s:14:"*_controller";s:4:"lead";s:10:"*_action";s:10:"save-email";s:10:"*_params";a:1:{s:8:"filename";s:55:"s3://development.tmp.ivvy.com/tmp/ivvy_crm_email_rjh1Ly";}s:25:"BaseApp_Queue_Item_info";a:0:{}}');

var serialize = (v, options) => {
    if (!options) {
        options = {
            metakey: '__phpSerializedObject__',
        };
    }
    var ret = '';
    if (v === null) {
        ret = 'N;';
    } else if (typeof v === 'boolean') {
        ret = 'b:' + (v ? '1' : '0') + ';';
    } else if (typeof v === 'number' || (typeof v === 'string' && +v == v)) {
        if (v % 1 === 0) {
            ret = 'i:' + v + ';';
        } else {
            ret = 'd:' + v.toFixed(16) + ';';
        }
    } else if (typeof v === "string") {
        ret = "s:" + v.length + ':"' + v + '";';
    } else if (v[options.metakey]) {
        var meta = v[options.metakey];
        var properties = Object.keys(v).filter(k => { return k !== options.metakey; }).map(k => {
            var key = k;
            if (meta.access && meta.access[k] && meta.access[k] === "protected") {
                key = "\0*\0" + k;
            }
            else if (meta.access && meta.access[k] && meta.access[k] === "private") {
                key = "\0" + meta.name + "\0" + k;
            }
            return serialize(key) + serialize(v[k]);
        });
        ret = 'O:' + meta.name.length + ':"' + meta.name + '":' + properties.length + ':{' + properties.join('') + '}';
    } else if (typeof v === 'object') {
        var properties = Object.keys(v).map(k => {
            return serialize(k, options) + serialize(v[k], options);
        });
        ret = 'a:' + properties.length + ':{' + properties.join('') + '}';
    }
    return ret;
}

exports.serialize = serialize;
exports.unserialize = function (s, options) {
    throw new Error('TODO');
};
