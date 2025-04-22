from werkzeug.security import generate_password_hash

# Mot de passe à hacher
password = "maher1234"

# Générer le hash
hashed_password = generate_password_hash(password)

# Afficher le hash
print(hashed_password)
