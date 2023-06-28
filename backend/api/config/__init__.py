from pydantic import BaseSettings

# Define the CommonSettings class (inherits from BaseSettings)
class CommonSettings(BaseSettings):
    APP_NAME: str = "Cosmos_API"
    DEBUG_MODE: bool = True

# Define the ServerSettings class (inherits from BaseSettings)
class ServerSettings(BaseSettings):
    HOST: str 
    PORT: int

    class Config:
        env_file = './.env'

class AppwriteSettigns(BaseSettings):
    ENDPOINT: str
    PROJECT: str
    APIKEY: str
    DATABASEID: str
    ACCOUNT_COLLECTION_ID : str
    API_PRODUCT_COLLECTION_ID: str
    SUBSCRIPTION_COLLECTION_ID: str
    PAYMENT_HISTORY_COLLECTION_ID: str

    ADMIN_ID: str
    CUSTOMER_ID: str
    ORDER_ID: str
    API_PRODUCT_ID: str
    DASHBOARD_DATA_ID: str
    API_REQUEST_ID: str
    DATA_ID: str

    class Config:
        env_file = './.env'

# Main Settings class that includes all the settings classes
class Settings(CommonSettings, ServerSettings, AppwriteSettigns):
    pass

# Settings variable that will be used in the other files
settings = Settings()