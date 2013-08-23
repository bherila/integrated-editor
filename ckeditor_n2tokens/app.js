///<reference path="Scripts/typings/jquery/jquery.d.ts"/>
var Keycode;
(function (Keycode) {
    Keycode[Keycode["enter"] = 13] = "enter";
    Keycode[Keycode["left"] = 37] = "left";
    Keycode[Keycode["up"] = 38] = "up";
    Keycode[Keycode["right"] = 39] = "right";
    Keycode[Keycode["down"] = 40] = "down";
    Keycode[Keycode["del"] = 46] = "del";
    Keycode[Keycode["home_end"] = 91] = "home_end";
    Keycode[Keycode["backspace"] = 8] = "backspace";
})(Keycode || (Keycode = {}));

var N2CompletionPluginInstance = (function () {
    function N2CompletionPluginInstance() {
    }
    return N2CompletionPluginInstance;
})();

var N2CompletionPlugin = (function () {
    function N2CompletionPlugin(element) {
        this.timeout_delay = 500;
        this.start_observe_count = 3;
        this.observe = false;
        this.char_input = [];
        this.timeout_id = null;
    }
    N2CompletionPlugin.get_instance = /* limit to one instance of this plug-in per CKEditor instance */
    function (editor) {
        for (var i in this.instances)
            if (this.instances[i].id === editor.id)
                return this.instances[i].instance;

        var p = new N2CompletionPlugin(editor);
        this.instances.push({ id: editor.id, instance: p });
        return p;
    };

    N2CompletionPlugin.prototype.delete_tooltip = function () {
        $('.mention-suggestions').remove();
    };

    N2CompletionPlugin.prototype.start_observing = function () {
        this.observe = true;
    };

    N2CompletionPlugin.prototype.stop_observing = function () {
        this.observe = false;
        this.char_input = [];
        this.delete_tooltip();
    };

    /*
    * This methods send an ajax query to N2 and get a list of items to display in the completion menu.
    *
    * @param {Object} selection result of CKEDITOR.editor.getSelection()
    * @returns {null}
    */
    N2CompletionPlugin.prototype.get_completion_items = function (selection) {
        var _this = this;
        if (this.timeout_id !== null) {
            clearTimeout(this.timeout_id);
        }
        this.timeout_id = setTimeout(function () {
            return _this.get_completion_items_callback(selection);
        }, this.timeout_delay);
    };

    N2CompletionPlugin.prototype.get_completion_items_callback = function (selection) {
        var str = this.char_input.join('');
        if (str.length < this.start_observe_count) {
            this.delete_tooltip();
            return;
        }

        //TODO: Issue ajax query and build the drop-down menu list here.
        alert("Hello world");
    };

    /*
    * This method returns if a char should stop the observation.
    *
    * @param {int} charcode A character key code
    * @returns {Boolean} Whether or not the char should stop the observation
    */
    N2CompletionPlugin.prototype.break_on = function (charcode) {
        var specialChars = [Keycode.backspace, Keycode.del, Keycode.down, Keycode.enter, Keycode.home_end, Keycode.left, Keycode.right, Keycode.up];
        return specialChars.indexOf(charcode) >= 0;
    };
    N2CompletionPlugin.instances = [];
    return N2CompletionPlugin;
})();

window.onload = function () {
    CKEDITOR.replace('editor1', { extraPlugins: 'n2completion' });
};

(function ($) {
    CKEDITOR.plugins.add('n2completion', {
        icons: '',
        init: function (editor) {
            var mentions = N2CompletionPlugin.get_instance(editor);

            /* The only way (it seems) to get a reliable, cross-browser and platform return for which key was pressed,
            * is using the jquery which function onkeypress. On keydown or up returns different values!
            * see also: http://jsfiddle.net/SpYk3/NePCm/
            */
            editor.on('contentDom', function (e) {
                var editable = editor.editable();

                /* we need the keyup listener to detect things like backspace,
                * which does not register on keypress... javascript is weird...
                */
                editable.attachListener(editable, 'keyup', function (evt) {
                    if (evt.data.$.which === Keycode.backspace) {
                        mentions.char_input.pop();
                        var selection = this.editor.getSelection();
                        mentions.get_completion_items(selection);
                    }

                    if (mentions.break_on(evt.data.$.which)) {
                        mentions.stop_observing();
                    }
                });

                editable.attachListener(editable, 'keypress', function (evt) {
                    // btw: keyIdentifier is webkit only.
                    var typed_char = String.fromCharCode(evt.data.$.which);

                    if (typed_char === '@' || mentions.observe === true) {
                        mentions.start_observing();

                        if ((mentions.char_input.length > 0 && typed_char === '@') || mentions.char_input.length > 11) {
                            mentions.stop_observing();
                        } else {
                            mentions.char_input.push(typed_char);
                            var selection = this.editor.getSelection();
                            mentions.get_completion_items(selection);
                        }
                    }
                });
            });
        }
    });
})(jQuery);
//# sourceMappingURL=app.js.map
