define([
    "app",
    "models/commands",
    "models/modem",
],function(app, commands, modem){
    var command_request_view = {
        type: "clean",
        rows: [
            {view: "toolbar", css: "highlighted_header header1", height: 40, cols: [
                {template: "Request"},
                {
                    view: "button",
                    value: "Execute",
                    width: 90,
                    click: function () {
                        var form = $$("execute_command_form");
                        if (form.validate()) {
                            // TODO post?
                            console.log(form.getValues());
                            modem.execute_command(form.getValues(), function (data) {
                                console.log("server response: " + JSON.stringify(data));
                            })
                        }
                    }
                }
            ]},
            {
                view: "form", id: "execute_command_form", elements: [
                    {template: "Read file", type: "section"}, // TODO other operations
                    {view: "text", label: 'file ID', validate: webix.rules.isNumber, name: "file_id", value: "0"},
                    {view: "text", label: 'offset', validate: webix.rules.isNumber, name: "offset", value: "0"},
                    {view: "text", label: 'length', validate: webix.rules.isNumber, name: "length", value: "8"},
                    {
                        view: "select", label: "Interface", value: 0, name: "interface", options: [
                        {id: 0, value: "HOST"},
                        {id: 0xD7, value: "D7ASP"}
                    ],
                        on: {
                            onChange: function (value) {
                                if (value == 0xD7) {
                                    $$("d7asp_interface").show();
                                } else {
                                    $$("d7asp_interface").hide();
                                }
                            }
                        }
                    },
                    {
                        view: "fieldset",
                        id: "d7asp_interface",
                        label: "D7ASP Interface Configuration",
                        hidden: true,
                        body: {
                            rows: [
                                {template: "QoS", type: "section"},
                                {
                                    view: "select",
                                    label: "Response mode",
                                    value: 1,
                                    name: "qos_response_mode",
                                    options: "/responsemodes"
                                },
                                {template: "Addressee", type: "section"},
                                {
                                    view: "text",
                                    label: "Access Class",
                                    value: "0",
                                    validate: webix.rules.isNumber,
                                    name: "access_class"
                                },
                                {view: "select", label: "IdType", value: 1, name: "id_type", options: "/idtypes"},
                                {view: "text", label: "ID", validate: webix.rules.isNumber, name: "id", value: "0"},

                            ]
                        }
                    },
                    // interface config
                    // operation
                    // file

                ]
            }
        ]
    };

    var command_response_view = {
        rows: [
            {view: "toolbar", css: "highlighted_header header1", height: 40, cols: [{template: "Responses"}]},
            {id:"cmd_response", template:"#cmd_string#"}
        ]
    };

    var query_window = {
        view:"window",
        id:"query_window",
        position:"center",
        width: 1000,
        head:{
            view:"toolbar", elements:[
              {height: 49, id: "title", css: "title", template: "Command #tag_id#", data: {tag_id: ""}},
              { view:"button", value:"Close", width:150, click:function(){
                this.getTopParentView().hide();
              }}
            ]
        },
        body:{ rows:[
            /*{height: 49, id: "title", css: "title", template: "Command #tag_id#", data: {tag_id: ""}},*/
            {
                type: "space",
                cols: [
                    command_request_view,
                    command_response_view
                ]
            }
        ]}
    };

    var ui = {
        rows:[
            {view: "toolbar", css: "highlighted_header header1", height: 40, cols: [
                {template: "ALP Command Log"},
                {
                    view: "button",
                    value: "New Query",
                    width: 120,
                    click: function () {
                        $$("query_window").show();
                    }
                }
            ]},
            {
                view:"datatable",
                id:"received_alp_commands_list",
                columns:[
                    {id:"id", header:"Tag", sort:"int"},
                    {id:"interface", header:"Interface"},
                    {id:"status", header:"Status"},
                    {id:"command_description", header:"Request", fillspace:true},
                    {id:"response_command_description", header:"Response", fillspace:true},
                ],
                data:commands.data,
                on:{
                    'onItemClick':function(id){
                        showCommandDetail(this.getItem(id));
                    }
                }
            }
        ]
    };

    function showCommandDetail(command){
		console.log("show detail: " + command.tag_id);
		$$("title").parse({'tag_id': command.tag_id});
		$$("cmd_response").parse({'cmd_string': command.response_command_description});
        $$("query_window").show();
	}

	return {
		$ui: ui,
		$menu: "top:menu",
        $windows: [query_window]
	};
});