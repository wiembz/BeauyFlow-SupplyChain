from app import create_app
from app.routes import getOdooMsg
from app.routes import addOdooMsg
from app.models.odoo_connector import models, uid, db, password
from app.routes.getOdooMsg import odoo_routes  # ✅
from app import create_app
from flask import render_template, jsonify
app = create_app()
   
if __name__ == "__main__":
    app.run(debug=True)
