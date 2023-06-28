import uvicorn
import requests
from fastapi import FastAPI, Request, Header, HTTPException, Query
from api.config import settings

from appwrite.client import Client
from appwrite.services.databases import Databases



client = Client()
client.set_endpoint(settings.ENDPOINT)
client.set_project(settings.PROJECT)
client.set_key(settings.APIKEY)

database = Databases(client)

app = FastAPI()


@app.get("/", tags=["Root"])
async def read_root():
    return {
        "hello": "world"
    }

@app.get("/test_api/{apiName}")
async def test_api(apiName:str, api_key: str = Header(None)):
    

    loginAccount = database.list_documents(settings.DATABASEID, settings.ACCOUNT_COLLECTION_ID)
    
    if api_key is None:
        raise HTTPException(status_code=400, detail="API key header is missing")

    for i in range(len(loginAccount['documents'])) :
        if(loginAccount['documents'][i]['apiKey'] == api_key) :
            loginAccountID = loginAccount['documents'][i]['uid']

    apiList = database.list_documents(settings.DATABASEID, settings.API_PRODUCT_COLLECTION_ID)

  
   
    for i in range(len(apiList['documents'])) :
        if(apiName.lower() in apiList['documents'][i]['name'].lower()) :
            pid = apiList['documents'][i]['$id']
            url = apiList['documents'][i]['url']
    
    
    subscription = database.list_documents(settings.DATABASEID, settings.SUBSCRIPTION_COLLECTION_ID)
    got_subscribe = False

    for i in range(len(subscription['documents'])) :
        if (subscription['documents'][i]['uid']== loginAccountID and subscription['documents'][i]['pid'] == pid) :
            current_count = subscription['documents'][i]['usedReq']
            document_id = subscription['documents'][i]['$id']
            got_subscribe = True

    if got_subscribe is False :
        return {"error": "API not subscribed"}

  

    # Get the current count from the database
    current_count = database.get_document(settings.DATABASEID, settings.SUBSCRIPTION_COLLECTION_ID,  document_id)['usedReq']
    
    
    
     # Update the count by 1
    new_count = current_count + 1

    # Update the document in the database
    database.update_document(settings.DATABASEID, settings.SUBSCRIPTION_COLLECTION_ID, document_id, {
        'usedReq': new_count
    })


    
    current_req = database.get_document(settings.DATABASEID, settings.DASHBOARD_DATA_ID, settings.DATA_ID)['requests']
    new_req = current_req + 1
    database.update_document(settings.DATABASEID, settings.DASHBOARD_DATA_ID, settings.DATA_ID, {
        'requests': new_req
    })


    reqs = database.list_documents(settings.DATABASEID, settings.API_REQUEST_ID)
    
    for i in range(len(reqs['documents'])):
        if(reqs['documents'][i]['pid'] == pid):
            rid = reqs['documents'][i]['$id']

    current = database.get_document(settings.DATABASEID, settings.API_REQUEST_ID, rid)['requests']
    new = current + 1
    database.update_document(settings.DATABASEID, settings.API_REQUEST_ID, rid, {
        'requests': new
    })




    response = requests.get(url)
    # Return the updated count
    if response.status_code == 200:
        return response.json()
    else:
        return {"error": "Request failed with status code: " + str(response.status_code)}



if __name__ == '__main__':
    uvicorn.run("main:app",
                host=settings.HOST,
                reload=settings.DEBUG_MODE,
                port=settings.PORT) 

