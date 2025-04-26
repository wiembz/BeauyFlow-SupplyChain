import xmlrpc.client

# Infos Odoo
url = "http://localhost:8069"
db = "Beauty-Flow"
username = "nouha.chine@esprit.tn"
password = "211JFT6526IYED+"

common = xmlrpc.client.ServerProxy(f'{url}/xmlrpc/2/common')
uid = common.authenticate(db, username, password, {})

models = xmlrpc.client.ServerProxy(f'{url}/xmlrpc/2/object')
