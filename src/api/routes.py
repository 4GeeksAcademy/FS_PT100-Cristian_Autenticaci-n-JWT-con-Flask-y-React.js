"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from sqlalchemy import select
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from werkzeug.security import generate_password_hash, check_password_hash
api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/register', methods=['POST'])
def register():
    try:
     # extraemos la info del cuerpo
        data = request.json

# tengo que tener el email o la contraseña
        if not data['email'] or not data['password']:
            raise Exception({"error": 'missing data'})

# encontrar usuario
        stm = select(User).where(User.email == data['email'])

# para saber si tengo el usuario registrado en la base de datos
        existing_user = db.session.execute(stm).scalar_one_or_none()
        if existing_user:
            raise Exception({"error": 'email taken, try logging in'})
        
        # hashed_password = generate_password_hash(data['password'])
# creamos el nuevo usuario
        new_user = User(
            email=data['email'],
            password=hashed_password,
            is_active=True
        ) 

# añadimos a la base de datos
        db.session.add(new_user)

# almacenamos a la base de datos
        db.session.commit()

# generar token
        token = create_access_token(identity=str(new_user.id))

# retornamos informacion
        return jsonify({"msg": "register ok", "token": token}), 201

    except Exception as e:
        print(e)
        db.session.rollback()
        return jsonify({"error": "something went wrong", "success": False}), 400


@api.route('/login', methods=['POST'])
def login():
    try:
     # extraemos la info del cuerpo
        data = request.json

# tengo que tener el email o la contraseña
        if not data['email'] or not data['password']:
            raise Exception({"error": 'missing data'})

# encontrar usuario
        stm = select(User).where(User.email == data['email'])

# para saber si tengo el usuario registrado en la base de datos
        user = db.session.execute(stm).scalar_one_or_none()
        if not user:
            raise Exception({"error": 'email not found'})

# verificar email y password
        if (user.password != data['password']):
            raise Exception({"error": 'wrong email/password'})

        token = create_access_token(identity=str(user.id))
# retornamos informacion
        return jsonify({"msg": "login ok", "token": token,  "success": True}), 200

    except Exception as e:
        print(e)
        db.session.rollback()
        return jsonify({"error": "something went wrong"}), 400

# ruta protegida
@api.route('/private', methods=['GET'])
@jwt_required()
def get_user_inf():
    try:
        id = get_jwt_identity()
        stm = select(User).where(User.id == id)
        user = db.session.execute(stm).scalar_one_or_none()
        if not user:
            return jsonify({"msg": "what tha hell?"}), 418
        return jsonify(user.serialize())
    except Exception as e:
        print(e)
        return jsonify({"error": "something went wrong"})