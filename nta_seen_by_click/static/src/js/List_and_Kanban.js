odoo.define('nta_seen_by_click_on_tree.overriding_tree_click', function(require) {
"use strict";
//alert("Test Start");
var ListView = require('web.ListView');
var KanbanView = require('web_kanban.KanbanView');
var Model = require('web.Model');
var ir_model_seen_registery = new Model('ir_model.seen.registery');

	ListView.List.include({
		row_clicked: function (e,view) {
			var _super = this._super.bind(this);
			if (this.dataset.index != null){
				var res_model = this.dataset.model;
				var uid = this.session.uid;	
				var res_id = this.dataset.ids[this.dataset.index]
				ir_model_seen_registery.query(['id'])
					 .filter([['res_model', '=', res_model], ['res_id', '=', res_id],['user_id', '=' , uid]])
					 .limit(1)
					 .all().then(function (rec) {
						// do work with users records
						if (rec.length == 0 ){
							ir_model_seen_registery.call('create', [{'res_model': res_model,'res_id': res_id,'user_id': uid,'create_uid': uid}],{}).then(function (result) {
								// do something 
							});
						}else if(rec[0].id !== undefined){
							// Do Nothing
						}
				});					
			}	
			_super(e, view);
		},
	});	

	KanbanView.include({
		open_record: function (event, options) {
			var this_super = this._super(event, options);
			var res_model = this.model;
			var uid = this.session.uid;	
			var res_id = event.data.id;
			ir_model_seen_registery.query(['id'])
				 .filter([['res_model', '=', res_model], ['res_id', '=', res_id],['user_id', '=' , uid]])
				 .limit(1)
				 .all().then(function (rec) {
					if (rec.length == 0 ){
						ir_model_seen_registery.call('create', [{'res_model': res_model,'res_id': res_id,'user_id': uid,'create_uid': uid}],{}).then(function (result) {
						});
					}else if(rec[0].id !== undefined){
						// Do Nothing
					}
			});				
			
			return this_super;
		},		
	});

//alert("Test End");	
});