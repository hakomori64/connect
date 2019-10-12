import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/storage';


const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
};

class Firebase {
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
        this.store = app.firestore();
        this.storage = app.storage();
        this.authUser = null;
    }

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

    onAuthUserListener = (next, fallback) =>
        this.auth.onAuthStateChanged(authUser => {
            if (authUser) {
                const user_ref = this.store.collection('users').doc(authUser.uid);
                user_ref.get()
                .then(doc => {
                    const icon_ref = this.storage.ref(`users/${authUser.uid}/icon`);
                    icon_ref.getDownloadURL().then(url => {
                        this.authUser = doc.data();
                        this.authUser.icon_url = url;
                    }).catch(error => {
                        if (error.code === 'storage/object-not-found') {
                            const icon_ref = this.storage.ref('users/default.png');
                            icon_ref.getDownloadURL().then(url => {
                                this.authUser = doc.data();
                                this.authUser.icon_url = url;
                            })
                        }
                    }).finally(() => {
                        next(this.authUser);
                    });
                });
            } else {
                fallback();
            }
        });
}

export default Firebase;