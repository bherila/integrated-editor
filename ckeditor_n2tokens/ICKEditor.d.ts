declare module CKEDITOR {

    export var config: config;

    export var plugins: any;

    export function replace(element: any, config: config): editor;
    export function appendTo(element: any, config: config, data: any): editor;
    export function replaceAll();

    export interface config {
        customConfig: string;
        autoUpdateElement: boolean;
        language: string;
        defaultLanguage: string;
        contentsLangDirection: string;
        enterMode: number;
        forceEnterMode: boolean;
        shiftEnterMode: number;
        docType: string;
        bodyId: string;
        bodyClass: string;
        fullPage: boolean;
        height: number;
        plugins: string;
        extraPlugins: string;
        removePlugins: string;
        protectedSource: any[];
        tabIndex: number;
        width: string;
        baseFloatZIndex: number;
        blockedKeystrokes: number[];
    }
    export interface dataProcessor { }
    export interface editable extends JQuery {
        attachListener(obj: editable, event: string, fn: (ev) => void, scope?, listenerData?, priority?);
    }
    export interface filter {
        (selection: string): JQuery;
        (func: (index: any) => any): JQuery;
        (element: any): JQuery;
        (obj: JQuery): JQuery;
    }
    export interface focusManager { }
    export interface keystrokeHandler { }
    export interface ui { }
    export interface command { }
    export interface dialog { }
    export interface editor extends JQuery {

        /** Indicates that the editor is running into an environment where no block elements are accepted inside the content. */
        blockless: boolean;

        /** The configurations for this editor instance. ... */
        config: CKEDITOR.config;

        /** The outermost element in the DOM tree in which the editable element resides. ... */
        container: Element;

        /** If defined, points to the data processor which is responsible to translate and transform the editor data on input and... */
        dataProcessor: CKEDITOR.dataProcessor;

        /** The document that stores the editor contents. ... */
        document: Document;

        /** The original host page element upon which the editor is created, it's only supposed to be provided by the concrete ed... */
        element: Element;

        /** This property indicate the way how this instance is associated with the element. */
        elementMode: number;

        /** Filter instance used for input data filtering, data transformations, and activation of features. ... */
        filter: CKEDITOR.filter;

        /** Controls the focus state of this editor instance. ... */
        focusManager: CKEDITOR.focusManager;

        /** A unique random string assigned to each editor instance in the page. */
        id: string;

        /** Controls keystrokes typing in this editor instance. */
        keystrokeHandler: CKEDITOR.keystrokeHandler;

        /** An object that contains all language strings used by the editor interface. ... */
        lang: any;

        /** The code for the language resources that have been loaded for the user interface elements of this editor instance. ... */
        langCode: string;

        /** The current editing mode. ... */
        mode: string;

        /** A unique identifier of this editor instance. ... */
        name: string;

        /** An object that contains references to all plugins used by this editor instance. ... */
        plugins: any;

        /** Indicates the read-only state of this editor. ... */
        readonly: boolean;

        /** Indicates editor initialization status. ... */
        status: string;

        /** The tabbing navigation order determined for this editor instance. ... */
        tabIndex: number;

        /** Contains all UI templates created for this editor instance. ... */
        templates: any;

        /** Indicates the human-readable title of this editor. ... */
        title: any;

        /** Toolbar definition used by the editor. ... */
        toolbar: any;

        /** Namespace containing UI features related to this editor instance. */
        ui: CKEDITOR.ui;

        /** The window instance related to the document property. ... */
        window: Window;

        ///** Creates an editor class instance. ... */
        //TODO: new (instanceConfig?, element?, mode?);

        /** Adds a command definition to the editor instance. ... */
        addCommand(commandName, commandDefinition);

        /** Shorthand for CKEDITOR.filter.addFeature. ... */
        addFeature(feature): Boolean;

        /** Registers an item group to the editor context menu in order to make it possible to associate it with menu items later. ... */
        addMenuGroup(name: string, order?);

        /** Adds an item from the specified definition to the editor context menu. ... */
        addMenuItem(name: string, definition);

        /** Adds one or more items from the specified definition array to the editor context menu. ... */
        addMenuItems(definitions);

        /** Registers an editing mode. ... */
        addMode(mode: string, exec: () => any);

        /** Add to a collection of functions to decide whether a specific element should be considered as formatting element and ... */
        addRemoveFormatFilter(func);

        /** Apply the style upon the editor's current selection. ... */
        applyStyle(style);

        /** Registers a function to be called whenever the selection position changes in the editing area. ... */
        attachStyleStateChange(style, callback);


        //capture();

        /** Checks whether the current editor contents present changes when compared to the contents loaded into the editor at st... */
        checkDirty(): Boolean;

        /** ... */
        createFakeElement(realElement, className, realElementType, isResizable);

        /** ... */
        createFakeParserElement(realElement, className, realElementType, isResizable);

        /** Shortcut to create a CKEDITOR.dom.range instance from the editable element. ... */
        createRange(): Range;

        /** Predefine some intrinsic properties on a specific event name. ... */
        //define(name, meta);

        /** Destroys the editor instance, releasing all resources used by it. ... */
        destroy(noUpdate?: boolean);

        /** Create, retrieve or detach an editable element of the editor, this method should always be used instead of calling di... */
        editable(): editable;
        editable(elt: Element);
        editable(editable: editable);

        /** ... */
        elementPath(startNode?: Element): ElementTraversal;

        /** Executes a command associated with the editor. ... */
        execCommand(commandName: string, data?): boolean;

        /** Fires an specific event in the object. ... */
        fire(eventName, data?, editor?): any;

        /** Fires an specific event in the object, releasing all listeners registered to that event. ... */
        fireOnce(eventName, data?, editor?): any;

        /** Moves the selection focus to the editing area space in the editor. ... */
        focus();
        focus(eventData?: any, handler?: (eventObject: JQueryEventObject) => any): JQuery;
        focus(handler: (eventObject: JQueryEventObject) => any): JQuery;

        /** ... */
        forceNextSelectionCheck();

        /** Gets clipboard data by directly accessing the clipboard (IE only) or opening paste dialog. ... */
        getClipboardData(options, callback?);

        /** Open up color dialog and to receive the selected color. ... */
        getColorFromDialog(callback, scope?);

        /** Gets one of the registered commands. ... */
        getCommand(commandName): CKEDITOR.command;

        /** Gets the editor data. ... */
        getData(): string;


        /** Retrieves a particular menu item definition from the editor context menu. ... */
        getMenuItem(name): any;

        /** Gets the element that can be used to check the editor size. ... */
        getResizable(forContents): Element;

        /** Retrieve the editor selection in scope of editable element. ... */
        getSelection(forceRealSelection): Selection;

        /** Gets the "raw data" currently available in the editor. ... */
        getSnapshot();

        /** Gets the current styleSet for this instance. ... */
        getStylesSet(callback): Array<string>;

        /** Gets the color of the editor user interface. ... */
        getUiColor(): string;

        /** Checks if there is any listener registered to a given event. ... */
        hasListeners(eventName): boolean;

        /** Inserts an element into the currently selected position in the editor in WYSIWYG mode. ... */
        insertElement(element);

        /** Inserts HTML code into the currently selected position in the editor in WYSIWYG mode. ... */
        insertHtml(html, mode?);

        /** Insert text content into the currently selected position in the editor in WYSIWYG mode. ... */
        insertText(text);

        /** Loads "raw data" into the editor. ... */
        loadSnapshot(snapshot);

        /** Locks the selection made in the editor in order to make it possible to manipulate it without browser interference. ... */
        lockSelection(sel?): boolean;

        /** Registers a listener to a specific event in the current object. ... */
        //on(eventName, listenerFunction, [scopeObj], [listenerData], [priority] ) : any;

        /** Similiar with on but the listener will be called only once upon the next event firing. ... */
        //once();

        /** Loads and opens a registered dialog. ... */
        openDialog(dialogName: string, callback): CKEDITOR.dialog;

        /** Opens Browser in a popup. ... */
        popup(url: string, width?: number, height?: number, options?: any);

        //removeAllListeners();

        /** Unregisters a listener function from being called at the specified event. ... */
        //removeListener(eventName, listenerFunction);

        /** Removes a particular menu item added before from the editor context menu. ... */
        removeMenuItem(name);

        /** Remove the style from the editor's current selection. ... */
        removeStyle(style);

        /** Resets the "dirty state" of the editor so subsequent calls to checkDirty will return false if the user will not have ... */
        resetDirty();

        /** Resets the undo stack. ... */
        resetUndo();

        /** Resizes the editor interface. ... */
        resize(width, height, isContentHeight?: boolean, resizeInner?: boolean);
        resize(eventData?: any, handler?: (eventObject: JQueryEventObject) => any): JQuery;
        resize(handler: (eventObject: JQueryEventObject) => any): JQuery;

        /** ... */
        restoreRealElement(fakeElement);

        /** Check the selection change in editor and potentially fires the selectionChange event. ... */
        selectionChange(checkNow?: boolean);

        /** Sets the editor data. ... */
        setData(data, callback, internal);

        /** Assigns keystrokes associated to editor commands. ... */
        setKeystroke(keystroke, behavior?: any);

        /** Changes the editing mode of this editor instance. ... */
        setMode(newMode?: any, callback?: any);

        /** Puts or restores the editor into read-only state. ... */
        setReadOnly(isReadOnly: boolean);

        /** Sets the color of the editor user interface. ... */
        setUiColor(color);

        /** Unlocks the selection made in the editor and locked with the unlockSelection method. ... */
        unlockSelection(restore?: any);

        /** Updates the <textarea> element that was replaced by the editor with the current data available in the editor. ... */
        updateElement();

        /** Fired after the command execution when execCommand is called. ... */
        afterCommandExec: (ev: Event) => any;

        /** Event fired at the end of the setData call execution. ... */
        afterSetData: (ev: Event) => any;

        /** Fired after an undo image is taken. ... */
        afterUndoImage: (ev: Event) => any;

        /** Fired when some elements are added to the document. ... */
        ariaWidget: (ev: Event) => any;

        /** Fired when the AutoGrow plugin is about to change the size of the editor. ... */
        autogrow: (ev: Event) => any;

        /** Fired before the command execution when execCommand is called. ... */
        beforeCommandExec: (ev: Event) => any;

        /** Internal event to get the current data. ... */
        beforeGetData: (ev: Event) => any;

        /** Fired before changing the editing mode. ... */
        beforeModeUnload: (ev: Event) => any;

        /** Fired before the editor mode is set. ... */
        beforeSetMode: (ev: Event) => any;

        /** Fired before an undo image is to be taken. ... */
        beforeUndoImage: (ev: Event) => any;

        /** Fired when the editor instance loses the input focus. ... */
        //blur: (ev: Event) => any;
        //blur(eventData?: any, handler?: (eventObject: JQueryEventObject) => any): JQuery;
        //blur(handler: (eventObject: JQueryEventObject) => any): JQuery;

        /** Fired when the content of the editor is changed. ... */
        //change: (ev: Event) => any;

        /** Fired once the editor configuration is ready (loaded and processed). ... */
        configLoaded: (ev: Event) => any;

        /** Fired when the language direction in the specific cursor position is changed ... */
        contentDirChanged: (ev: Event) => any;

        /** Fired when content of the editor (its DOM structure) is ready. ... */
        contentDom: (ev: Event) => any;

        /** Fired before contents DOM structure is destroyed. ... */
        contentDomUnload: (ev: Event) => any;

        /** Fired when the custom configuration file is loaded, before the final configurations initialization. ... */
        customConfigLoaded: (ev: Event) => any;

        /** This event is fired when CKEDITOR.filter has stripped some content from the data that was loaded (e.g. ... */
        dataFiltered: (ev: Event) => any;

        /** Fired as an indicator of the editor data loading. ... */
        dataReady: (ev: Event) => any;

        /** Fired when this editor instance is destroyed. ... */
        //TODO:  destroy: (ev: Event) => any;

        /** Fired when a dialog is hidden. ... */
        dialogHide: (ev: Event) => any;

        /** Fired when a dialog is shown. ... */
        dialogShow: (ev: Event) => any;

        /** Fired when the language direction of an element is changed. ... */
        dirChanged: (ev: Event) => any;

        /** Fired when the contents of the elementsPath are changed. ... */
        elementsPathUpdate: (ev: Event) => any;

        /** Fired when the editor instance receives the input focus. ... */
        //TODO:  focus: (ev: Event) => any;

        /** Event fired before the getData call returns allowing additional manipulation. ... */
        getData(ev: Event): any;

        /** Internal event to perform the getSnapshot call. ... */
        //getSnapshot: (ev: Event) => any;

        /** Internal event to perform the insertElement call. ... */
        //insertElement: (ev: Event) => any;

        /** Internal event to perform the insertHtml call. ... */
        //insertHtml: (ev: Event) => any;

        /** Internal event to perform the insertText call. ... */
        //insertText: (ev: Event) => any;

        /** Fired when the CKEDITOR instance is completely created, fully initialized and ready for interaction. ... */
        instanceReady: (ev: Event) => any;

        /** Fired when any keyboard key (or combination) is pressed into the editing area. ... */
        //key: (ev: Event) => any;

        /** Fired when the language is loaded into the editor instance. ... */
        langLoaded: (ev: Event) => any;

        /** Internal event to perform the loadSnapshot call. ... */
        //loadSnapshot: (ev: Event) => any;

        /** Fired when editor's components (config, languages and plugins) are fully loaded and initialized. ... */
        loaded: (ev: Event) => any;

        /** Locks the undo manager to prevent any save/update operations. ... */
        lockSnapshot: (ev: Event) => any;

        /** Event fired when the maximize command is called. ... */
        maximize: (ev: Event) => any;

        /** Fired when a menu is shown. ... */
        menuShow: (ev: Event) => any;

        /** Fired after setting the editing mode. ... */
        //mode: (ev: Event) => any;

        /** Fired when a clipboard operation is about to be taken into the editor. ... */
        paste: (ev: Event) => any;

        /** Fired when all plugins are loaded and initialized into the editor instance. ... */
        pluginsLoaded: (ev: Event) => any;

        /** Event fired after the  readonly property changes. ... */
        //readonly: (ev: Event) => any;

        /** Fired after an element was cleaned by the removeFormat plugin. ... */
        removeFormatCleanup: (ev: Event) => any;

        /** Fired when the editor (replacing a <textarea> which has a required attribute) is empty during form submission. ... */
        required: (ev: Event) => any;

        /** Fired after the editor instance is resized through the CKEDITOR.resize method. ... */
        //resize: (ev: Event) => any;

        /** Fired when the user clicks the Save button on the editor toolbar. ... */
        save: (ev: Event) => any;

        /** Fired when the editor is about to save an undo snapshot. ... */
        saveSnapshot: (ev: Event) => any;

        /** ... */
        //selectionChange: (ev: Event) => any;

        /** Event fired before the setData call is executed allowing additional manipulation. ... */
        //setData: (ev: Event) => any;

        /** Fired when styles set is loaded. ... */
        stylesSet: (ev: Event) => any;

        /** Event fired when an UI template is added to the editor instance. ... */
        template: (ev: Event) => any;

        /** This event is fired when CKEDITOR.htmlDataProcessor is converting internal HTML to output data HTML. ... */
        toDataFormat: (ev: Event) => any;

        /** This event is fired by the CKEDITOR.htmlDataProcessor when input HTML is to be purified by the CKEDITOR.htmlDataProce... */
        toHtml: (ev: Event) => any;

        /** Unlocks the undo manager and updates the latest snapshot. ... */
        unlockSnapshot: (ev: Event) => any;

        /** Amends the top of the undo stack (last undo image) with the current DOM changes. ... */
        updateSnapshot: (ev: Event) => any;



    }

}