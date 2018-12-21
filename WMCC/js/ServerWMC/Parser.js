var Parser = {
    Parse: function (unparsed) {
        var parsed = unparsed.replace('<EOF>', '');
        parsed = parsed.split('<EOL>');
        return parsed;
    }
};