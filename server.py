from flask import Flask, render_template,send_from_directory,request, jsonify, make_response
from flask_cors import CORS, cross_origin
import os
import tweepy
#import ssl
import json
from db import *

#ssl._create_default_https_context = ssl._create_unverified_context



# déclaré l'app name / la redirection du path vers react componenent
app  = Flask(__name__ 
    ,static_folder='build',static_url_path='')


# cors c'est les droit d'accées http, https et les redirection 
cors = CORS(app)

client = db_connect()
#Candidat = client
#BD = Candidat["ChooseMe"]
#TB = BD["Admin"]
#TB.insert_one({'email' : 'yatchi.leet@gmail.com', 'password': 'chooseMe', 'admin': True})

# déf de qlq routes racine /
@app .route('/')
def index():
    return app.send_static_file('index.html')


# déf de qlq routes 404 error
@app .errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')

@app.route('/api/verify', methods = ['POST'])
def get_query_from_react():
    data = request.get_json()
    # the ID of the status
    ID = data['id']
    Gangnant = client
    BD = Gangnant["ChooseMe"]
    TB = BD["Gangnant"]
    res = TB.find_one({"id" : ID})
    if (res != None):
        return (jsonify({'data' : {
            'id' : res['id'],
            'created_at' :res['created_at'],
            'text' : res['text'],
            'username': res['username'],
            'screen_name': res['screen_name'],
            'lotterie_data' : res['lotterie_data'],
            "profile_img" : res['profile_img'],
            'liked' : res['liked'],
            'user_followers_count' : res['user_followers_count'],
            'retweet_count' : res['retweet_count'],
            'favorite_count' : res['favorite_count'],
            'winners' : res['winners']
        } ,'status': 'success'}))
    else:
        return (jsonify({'status': 'error'}))
    





@app.route('/api/saveDataRandom', methods = ['POST'])
def saveOnDatabase():
    
    
    # assign the values accordingly
    consumer_key = "kM6aljV7D83wPpbI2HQr9K7nU"
    consumer_secret = "rr6VljX1KjODj8ANOjDZbAH7YFNNRUZXDjuWhbLfTV7eACS6Uo"
    access_token = "1343159115019931648-XXlhoMEOV56S02ORDEkMFVj6Co2HEy"
    access_token_secret = "iOuCpVI1XneeLa5OWxGVtxyVq0pq8ZUbQLdP8nnFmo1Xe"

    # authorization of consumer key and consumer secret
    auth = tweepy.OAuthHandler(consumer_key, consumer_secret)

    # set access to user's access key and access secret 
    auth.set_access_token(access_token, access_token_secret)

    # calling the api 
    api = tweepy.API(auth,wait_on_rate_limit=True,wait_on_rate_limit_notify=True)
    print("debug ")
    data = request.get_json()
    
    # the ID of the status
    ID = data['id']
    
    # obtaining the status
    status = api.get_status(ID)


    name = status.user.screen_name
    tweet_id = str(ID)
    replies=[]
    for tweet in tweepy.Cursor(api.search,q='to:'+name, result_type='recent', timeout=99999).items(5000):
        if hasattr(tweet, 'in_reply_to_status_id_str'):
            if (tweet.in_reply_to_status_id_str==tweet_id):
                replies.append(tweet)

    ids = []
    found = False
    for elem in replies:
        ids.append({'id' : str(elem.user.id), "name": str(elem.user.name), "screen_name": str(elem.user.screen_name), "profile_img" : str(elem.user.profile_image_url)})
        
    
    return (jsonify({
        'id' : ID,
        'created_at' : str(status.created_at),
        'text' : str(status.text),
        'username': str(status.user.name),
        'screen_name': str(status.user.screen_name),
        "profile_img" : str(status.user.profile_image_url_https),
        'liked' : str(status.favorite_count),
        'user_followers_count' :str(status.user.followers_count),
        'retweet_count' :str(status.retweet_count),
        'favorite_count' :str(status.favorite_count),
        'commented_by' : ids,
        'status' : 'success'
    }))


@app.route('/api/saveDataRandom_sec', methods = ['POST'])
def saveOnDatabase_sec():
    
    
    # assign the values accordingly
    consumer_key = "kM6aljV7D83wPpbI2HQr9K7nU"
    consumer_secret = "rr6VljX1KjODj8ANOjDZbAH7YFNNRUZXDjuWhbLfTV7eACS6Uo"
    access_token = "1343159115019931648-XXlhoMEOV56S02ORDEkMFVj6Co2HEy"
    access_token_secret = "iOuCpVI1XneeLa5OWxGVtxyVq0pq8ZUbQLdP8nnFmo1Xe"

    # authorization of consumer key and consumer secret
    auth = tweepy.OAuthHandler(consumer_key, consumer_secret)

    # set access to user's access key and access secret 
    auth.set_access_token(access_token, access_token_secret)

    # calling the api 
    api = tweepy.API(auth,wait_on_rate_limit=True,wait_on_rate_limit_notify=True)
    print("debug ")
    data = request.get_json()
    
    # the ID of the status
    ID = data['id']
    
    # obtaining the status
    status = api.get_status(ID)

    
    return (jsonify({
        'id' : ID,
        'created_at' : str(status.created_at),
        'text' : str(status.text),
        'username': str(status.user.name),
        'screen_name': str(status.user.screen_name),
        "profile_img" : str(status.user.profile_image_url_https),
        'liked' : str(status.favorite_count),
        'user_followers_count' :str(status.user.followers_count),
        'retweet_count' :str(status.retweet_count),
        'favorite_count' :str(status.favorite_count),
        'status' : 'success'
    }))



@app.route('/api/saveGagnantData', methods = ['POST'])
def saveGagnant():
    data = request.get_json()
    Gangnant = client
    BD = Gangnant["ChooseMe"]
    TB = BD["Gangnant"]
    TB.save(data)
    return (jsonify({'status': 'success'}))



@app.route('/api/login', methods = ['POST'])
def login():
    Gangnant = client
    BD = Gangnant["ChooseMe"]
    TB = BD["Admin"]

    data = request.get_json()

    email = data['email']
    password = data['password']
    
    user = TB.find_one({"email": email})
    if (user != None):
        if (user["password"] == password):
            output = {
                "nom": user["email"]
            }
            return (jsonify({'user' : output, 'status': 'success'}))
        else:
            return (jsonify({'status' : "password error"}))
    else:
        return (jsonify({'status' : "error from backend"}))


@app.route('/api/saveTicket', methods = ['POST'])
def tickekSet():
    Gangnant = client
    BD = Gangnant["ChooseMe"]
    TB = BD["Settings"]

    data = request.get_json()
    ID = data['id']
    ticket = TB.find_one({"id": ID})
    if (ticket != None):
        TB.save(data)
        return (jsonify({'status' : "success"}))
    else:
        return (jsonify({'status' : "error"}))



if __name__ == '__main__':
    app.run()
