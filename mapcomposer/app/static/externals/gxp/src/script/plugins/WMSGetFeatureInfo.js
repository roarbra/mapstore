/**
* Copyright (c) 2008-2011 The Open Planning Project
*
* Published under the GPL license.
* See https://github.com/opengeo/gxp/raw/master/license.txt for the full text
* of the license.
*/

/**
 * @requires plugins/Tool.js
 */

/** api: (define)
 *  module = gxp.plugins
 *  class = WMSGetFeatureInfo
 */

/** api: (extends)
 *  plugins/Tool.js
 */
Ext.namespace("gxp.plugins");

/** api: constructor
 *  .. class:: WMSGetFeatureInfo(config)
 *
 *    This plugins provides an action which, when active, will issue a
 *    GetFeatureInfo request to the WMS of all layers on the map. The output
 *    will be displayed in a popup.
 */   
gxp.plugins.WMSGetFeatureInfo = Ext.extend(gxp.plugins.Tool, {
    
    /** api: ptype = gxp_wmsgetfeatureinfo */
    ptype: "gxp_wmsgetfeatureinfo",
    
    /** api: config[outputTarget]
     *  ``String`` Popups created by this tool are added to the map by default.
     */
    outputTarget: "map",

    /** private: property[popupCache]
     *  ``Object``
     */
    popupCache: null,

    /** api: config[infoActionTip]
     *  ``String``
     *  Text for feature info action tooltip (i18n).
     */
    infoActionTip: "Get Feature Info",

    /** api: config[popupTitle]
     *  ``String``
     *  Title for info popup (i18n).
     */
    popupTitle: "Feature Info",
    
    noDataMsg: "No data returned from the server",
    
    /** api: config[vendorParams]
     *  ``Object``
     *  Optional object with properties to be serialized as vendor specific
     *  parameters in the requests (e.g. {buffer: 10}).
     */
     
    /** api: method[addActions]
     */
    addActions: function() {
        this.popupCache = {};
        
        var actions = gxp.plugins.WMSGetFeatureInfo.superclass.addActions.call(this, [{
            tooltip: this.infoActionTip,
            iconCls: "gxp-icon-getfeatureinfo",
            toggleGroup: this.toggleGroup,
            enableToggle: true,
            allowDepress: true,
            toggleHandler: function(button, pressed) {
                for (var i = 0, len = info.controls.length; i < len; i++){
                    if (pressed) {
                        info.controls[i].activate();
                    } else {
                        info.controls[i].deactivate();
                    }
                }
             }
        }]);
        var infoButton = this.actions[0].items[0];

        var info = {controls: []};
        var updateInfo = function() {
            var queryableLayers = this.target.mapPanel.layers.queryBy(function(x){
                return x.get("queryable");
            });

            var map = this.target.mapPanel.map;
            var control;
            for (var i = 0, len = info.controls.length; i < len; i++){
                control = info.controls[i];
                control.deactivate();  // TODO: remove when http://trac.openlayers.org/ticket/2130 is closed
                control.destroy();
            }

            info.controls = [];
            var layersToQuery = 0;
            var atLeastOneResponse = false;
            queryableLayers.each(function(x){                
                
                var control = new OpenLayers.Control.WMSGetFeatureInfo({
                    url: x.getLayer().url,
                    queryVisible: true,
                    layers: [x.getLayer()],
                    vendorParams: x.getLayer().vendorParams || this.vendorParams,
                    eventListeners: {
                        beforegetfeatureinfo: function(evt) {
                            atLeastOneResponse = false
                            layersToQuery++;
                        },
                        getfeatureinfo: function(evt) {
                            layersToQuery--;
                            var match = evt.text.match(/<body[^>]*>([\s\S]*)<\/body>/);
                            if (match && !match[1].match(/^\s*$/)) {
                                atLeastOneResponse = true;
                                this.displayPopup(
                                    evt, x.get("title") || x.get("name"), match[1]
                                );
                            // no response at all
                            } else if(layersToQuery === 0 && !atLeastOneResponse) {
                                Ext.Msg.show({
                                    title: this.popupTitle,
                                    msg: this.noDataMsg,
                                    buttons: Ext.Msg.OK,
                                    icon: Ext.MessageBox.WARNING
                                });
                            }
                            
                        },
                        scope: this
                    }
                });
                map.addControl(control);
                info.controls.push(control);
                if(infoButton.pressed) {
                    control.activate();
                }
            }, this);

        };
        
        this.target.mapPanel.layers.on("update", updateInfo, this);
        this.target.mapPanel.layers.on("add", updateInfo, this);
        this.target.mapPanel.layers.on("remove", updateInfo, this);
        
        return actions;
    },

    /** private: method[displayPopup]
     * :arg evt: the event object from a 
     *     :class:`OpenLayers.Control.GetFeatureInfo` control
     * :arg title: a String to use for the title of the results section 
     *     reporting the info to the user
     * :arg text: ``String`` Body text.
     */
    displayPopup: function(evt, title, text) {
        var popup;
        var popupKey = evt.xy.x + "." + evt.xy.y;

        if (!(popupKey in this.popupCache)) {
            popup = this.addOutput({
                xtype: "gx_popup",
                title: this.popupTitle,
                layout: "accordion",
                location: evt.xy,
                map: this.target.mapPanel,
                width: 490,
                height: 320,
                /*anchored: true,
                unpinnable : true,*/
                draggable: true,
                listeners: {
                    close: (function(key) {
                        return function(panel){
                            delete this.popupCache[key];
                        };
                    })(popupKey),
                    scope: this
                }
            });
            this.popupCache[popupKey] = popup;
        } else {
            popup = this.popupCache[popupKey];
        }

        // extract just the body content
        popup.add({
            title: title,
            layout: "fit",
            html: text,
            autoScroll: true,
            autoWidth: true,
            collapsible: true
        });
        popup.doLayout();
    }
    
});

Ext.preg(gxp.plugins.WMSGetFeatureInfo.prototype.ptype, gxp.plugins.WMSGetFeatureInfo);
