# -*- coding: utf-8 -*-
from openerp import models, fields, api

class ir_model_seen_registery(models.Model):
    _name = 'ir_model.seen.registery'
  
    user_id = fields.Many2one("res.users",string="User ID")
    res_model = fields.Char(string="Model Name")
    res_id = fields.Integer(string="Res ID")
    
    
class nta_seen_by_click(models.Model):
    _name = 'nta.seen.by.click'
    
    @api.multi
    def _get_nta_special_seen(self):
        for rec in self:
            res_model,res_id,cr,uid,context = str(rec._model),rec.id,rec._cr,rec._uid,rec._context
            target_record_ids = rec.pool.get('ir_model.seen.registery').search(cr,uid,[('res_model','=',res_model),('user_id','=',uid),('res_id','=',res_id)])
            if len(target_record_ids) > 0 :
                rec.nta_special_seen = True
            else:
                rec.nta_special_seen = False
           
    nta_special_seen = fields.Boolean(compute="_get_nta_special_seen",string="Seen",store=False)
    
    
class YourModel(models.Model):
    _name = "Your_Model_name"
    
    _inherit = ["nta.seen.by.click"]
    
    @api.multi
    def myFunction(self):
        for myModelRec in self:
            if myModelRec.nta_special_seen:
                return "This record for the user ID :" + str(self._uid) + "had been seen"
    
    
    
    
    
    
    
    
    
    
    
    
    
    