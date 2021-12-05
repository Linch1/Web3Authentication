### About

This repo contains the basic settings to use authentication trough web3.
Insipirated from https://www.toptal.com/ethereum/one-click-login-flows-a-metamask-tutorial .
We are now able to surclass the old method of authentication through username/mail/password using instead
our wallets to login in any dapp.

This metod is based on wallet signs that allow the backend to recognise if the wallet that is interacting with the dapp
is really owned by the users or no.


### Setup

- This repo comes along with two folders: *frontend* and *backend*
- Download this repository and follow this setup to start the application
- For any issue feel free to open an issue

#### Backend Setup

- `cd backend`
- `npm i`
- `node server.js`

#### Frontend Setup

- `cd frontend`
- `npm i`
- `npm start`

- Connect your wallet by clicking the metamask or the walletconnect image.
- Once your wallet is connected and you backend is running clicke the *Login* Button
- A popup asking to sign an unique nonce should appear. Sign the message and the signature will be sent to the backend
- The backend reads the submitted signature, validate it, and return a jwt token that is stored as `httpOnly` cookie
- Now click the *Retrive Informations* button and a stringified json should appear containing your user informations. The route that exposed your informations was a restriced to authencated users route so you did it! You are now able to handle user auth with web3 wallets!

