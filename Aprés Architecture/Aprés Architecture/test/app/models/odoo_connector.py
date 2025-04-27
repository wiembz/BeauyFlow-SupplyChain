import xmlrpc.client

# Infos de connexion à Odoo
url = "http://localhost:8069"
db = "Beauty-Flow"
username = "nouha.chine@esprit.tn"
password = "211JFT6526IYED+"

# Point d'accès XML-RPC pour l'authentification et l'accès aux modèles
common = xmlrpc.client.ServerProxy(f'{url}/xmlrpc/2/common')
models = xmlrpc.client.ServerProxy(f'{url}/xmlrpc/2/object')

# Authentification
uid = common.authenticate(db, username, password, {})

if not uid:
    raise ValueError("Échec de l'authentification avec Odoo.")
