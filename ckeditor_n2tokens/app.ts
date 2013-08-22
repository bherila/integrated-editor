///<reference path="Scripts/typings/jquery/jquery.d.ts"/>
////<reference path="ckeditor.js"/>
declare var CKEDITOR: any;

class N2CompletionPluginInstance {
    id: number;
    instance: N2CompletionPlugin;
}

class N2CompletionPlugin {
    static instances: N2CompletionPluginInstance[] = [];
    timeout_delay: number;
    start_observe_count: number;
    observe: boolean;
    char_input: string[];
    timeout_id: number;

    constructor(element: HTMLElement) {
        this.timeout_delay = 500;
        this.start_observe_count = 3;
        this.observe = false;
        this.char_input = [];
        this.timeout_id = null;
    }

    /* limit to one instance of this plug-in per CKEditor instance */
    static get_instance(editor: any): N2CompletionPlugin {

        for (var i in this.instances)
            if (this.instances[i].id === editor.id)
                return this.instances[i].instance;

        var p = new N2CompletionPlugin(editor);
        this.instances.push({ id: editor.id, instance: p });
        return p;
    }

    delete_tooltip() {
        $('.mention-suggestions').remove();
    }

    start_observing() {
        this.observe = true;
    }

    stop_observing() {
        this.observe = false;
        this.char_input = [];
        this.delete_tooltip();
    }

    /*
     * This methods send an ajax query to N2 and get a list of items to display in the completion menu. 
     *
     * @param {Object} selection result of CKEDITOR.editor.getSelection()
     * @returns {null}
     */
    get_completion_items(selection: any) {
        if (this.timeout_id !== null) {
            clearTimeout(this.timeout_id);
        }
        this.timeout_id = setTimeout(() => this.get_completion_items_callback(selection), this.timeout_delay);
    }

    get_completion_items_callback(selection: any) {
        var str = this.char_input.join('');
        if (str.length < this.start_observe_count) {
            this.delete_tooltip();
            return;
        }

        //TODO: Issue ajax query and build the drop-down menu list here.
        alert("Hello world");
    }

    /*
     * This method returns if a char should stop the observation.
     *
     * @param {int} charcode A character key code
     * @returns {Boolean} Whether or not the char should stop the observation
     */
    break_on(charcode: number): boolean {
        // 13 = enter
        // 37 = left key
        // 38 = up key
        // 39 = right key
        // 40 = down key
        // 46 = delete
        // 91 = home/end (?)
        var special = [13, 37, 38, 39, 40, 46, 91];
        for (var i = 0; i < special.length; i++) {
            if (special[i] == charcode) {
                return true;
            }
        }
        return false;
    }

}

window.onload = () => {
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
                    if (evt.data.$.which === 8) { // 8 == backspace
                        mentions.char_input.pop();
                        var selection = this.editor.getSelection();
                        mentions.get_completion_items(selection);
                    }

                    // things which should trigger a stop observing, like Enter, home, etc.
                    if (mentions.break_on(evt.data.$.which)) {
                        mentions.stop_observing();
                    }

                });

                editable.attachListener(editable, 'keypress', function (evt) {
                    // btw: keyIdentifier is webkit only.

                    var typed_char = String.fromCharCode(evt.data.$.which);

                    if (typed_char === '@' || mentions.observe === true) {
                        mentions.start_observing();
                        /* Things which should trigger "stop observing":
                         * if at this point no result and still a unicode, return false
                         * OR detect another @ while we are already observing
                         * OR the length is longer than 11
                         */
                        if ((mentions.char_input.length > 0 && typed_char === '@') || mentions.char_input.length > 11) {
                            mentions.stop_observing();
                        } else {
                            mentions.char_input.push(typed_char);
                            var selection = this.editor.getSelection();
                            mentions.get_completion_items(selection);
                        }
                    }
                });
            }); // end editor.on
        } // end init function
    });
})(jQuery);