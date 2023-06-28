import { Client, Account, Databases, Query, User} from 'appwrite'


export const client = new Client();


client.setEndpoint('https://8080-appwrite-integrationfor-c03hbfeaqbk.ws-us96b.gitpod.io/v1').setProject('6437f1dab6023c6e124c');

export const account = new Account(client)
export const databases = new Databases(client)

export const Server = {
    endpoint : process.env.REACT_APP_ENDPOINT,
    project: process.env.REACT_APP_PROJECT,
    databaseID : process.env.REACT_APP_DATABASE_ID,
    accountID: process.env.REACT_APP_ACCOUNT_COLLECTION_ID,
    subscriptionID: process.env.REACT_APP_SUBSCRIPTION_COLLECTION_ID,
    paymentHistoryID: process.env.REACT_APP_PAYMENT_HISTORY_COLLECTION_ID
}

// Database ID
export const databaseID = '6437fcefce65d72cd6e5'

// Collection ID
export const apiKeysID = '6444bafcc87f8ff5fbe4'
export const apiProductID = '643b8b9b718b8cef8c4b'
export const paymentHistoryID = '6437fcf799abbcaad87c'
export const customersID = '643b8e67ccfaf2bfa3ce'
export const accountID = '643b8c7851a55e7544fc'
export const subscriptionsID = '643b8b463ca6343799ea'
export const paymentMethodsID = '643b8ada854d50acc10e'

// Document ID
export var loginAccountID = ''

export const translationAPIDemoID = '643ba2dc63b5e4062880'
export const customerID = '643b8e67ccfaf2bfa3ce'

// Current Session ID
export var sessionID = ''

//Route name
export const loginRoute = "/login"
export const landingRoute = "/"
export const subscriptionRoute = "/subscription"

export const paymentMethodRoute = "/paymentmethod"
export const paymentHistoryRoute = "/paymenthistory"

export var isLoggedIn = false;
export var userId = '';
export var userName = '';
export var userEmail = '';

export async function checkSession() {
    try {
        var user = await account.get();
        isLoggedIn = true
        userId = user.$id
        userName = user.name
        userEmail = user.email
        await databases.listDocuments(databaseID, accountID, [Query.equal('uid', [userId])]
        ).then(response => {
            loginAccountID = response.documents[0].$id
        }).catch(error => {
            console.log(error)
        })
        console.log(loginAccountID)
        // User is logged in and has an active session
    } catch (error) {
        isLoggedIn = false
        // User is not logged in or session has expired
    }
    console.log(isLoggedIn)
}